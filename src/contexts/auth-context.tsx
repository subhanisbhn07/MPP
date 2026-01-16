'use client';

import * as React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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

  const mapSupabaseUser = (supabaseUser: SupabaseUser): User => ({
    uid: supabaseUser.id,
    email: supabaseUser.email ?? null,
    displayName: supabaseUser.user_metadata?.full_name ?? supabaseUser.user_metadata?.name ?? null,
    photoURL: supabaseUser.user_metadata?.avatar_url ?? supabaseUser.user_metadata?.picture ?? null,
  });

  const fetchWishlist = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('wishlist')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('users')
          .insert({ id: userId, wishlist: [] });
        if (insertError) {
          console.error('Error creating user:', insertError);
        }
        return [];
      }
      console.error('Error fetching wishlist:', error);
      return [];
    }

    return data?.wishlist || [];
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = mapSupabaseUser(session.user);
          setUser(userData);
          const userWishlist = await fetchWishlist(session.user.id);
          setWishlist(userWishlist);
        } else {
          setUser(null);
          setWishlist([]);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = mapSupabaseUser(session.user);
        setUser(userData);
        const userWishlist = await fetchWishlist(session.user.id);
        setWishlist(userWishlist);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;

    const channel = supabase
      .channel('wishlist-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.uid}`,
        },
        (payload) => {
          if (payload.new && 'wishlist' in payload.new) {
            setWishlist((payload.new as { wishlist: number[] }).wishlist || []);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.uid]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error('Error signing in with Google:', error);
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: error.message,
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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

    const inWishlist = isPhoneInWishlist(phoneId);
    const newWishlist = inWishlist
      ? wishlist.filter((id) => id !== phoneId)
      : [...wishlist, phoneId];

    setWishlist(newWishlist);

    try {
      const { error } = await supabase
        .from('users')
        .update({ wishlist: newWishlist })
        .eq('id', user.uid);

      if (error) {
        setWishlist(wishlist);
        throw error;
      }

      toast({
        description: inWishlist ? 'Removed from wishlist.' : 'Added to wishlist.',
      });
    } catch (error) {
      console.error('Error updating wishlist:', error);
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
