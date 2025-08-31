'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  wishlist: number[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isPhoneInWishlist: (phoneId: number) => boolean;
  toggleWishlist: (phoneId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        
        // Ensure user document exists
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, { email: firebaseUser.email, wishlist: [] });
        }

      } else {
        setUser(null);
        setWishlist([]);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user?.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setWishlist(data.wishlist || []);
            }
        });
        return () => unsubscribeFirestore();
    }
  }, [user]);


  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle setting the user and routing
    } catch (error) {
      console.error('Error signing in with Google', error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
    } finally {
        setLoading(false);
    }
  };

  const isPhoneInWishlist = useCallback((phoneId: number) => {
      return wishlist.includes(phoneId);
  }, [wishlist]);

  const toggleWishlist = async (phoneId: number) => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Please log in',
            description: 'You need to be logged in to manage your wishlist.',
        });
        return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const inWishlist = isPhoneInWishlist(phoneId);

    try {
        if (inWishlist) {
            await updateDoc(userDocRef, {
                wishlist: arrayRemove(phoneId)
            });
            toast({ description: 'Removed from wishlist.' });
        } else {
            await updateDoc(userDocRef, {
                wishlist: arrayUnion(phoneId)
            });
            toast({ description: 'Added to wishlist.' });
        }
    } catch (error) {
        console.error("Error updating wishlist: ", error);
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'Could not update your wishlist. Please try again.',
        });
    }
  };


  const value = {
    user,
    loading,
    wishlist,
    signInWithGoogle,
    signOut,
    isPhoneInWishlist,
    toggleWishlist,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
