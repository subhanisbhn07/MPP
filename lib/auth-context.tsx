'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from './storage';

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  wishlist: string[];
  createdAt: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  wishlist: string[];
  addToWishlist: (phoneId: string) => void;
  removeFromWishlist: (phoneId: string) => void;
  isInWishlist: (phoneId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedWishlist = storage.getWishlist();
    setWishlist(savedWishlist);
    setLoading(false);
  }, []);

  const addToWishlist = (phoneId: string) => {
    storage.addToWishlist(phoneId);
    setWishlist(storage.getWishlist());
  };

  const removeFromWishlist = (phoneId: string) => {
    storage.removeFromWishlist(phoneId);
    setWishlist(storage.getWishlist());
  };

  const isInWishlist = (phoneId: string) => {
    return wishlist.includes(phoneId);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: null,
        loading,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
