
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Phone } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { generateCompareUrl } from '@/lib/utils';

interface CompareContextType {
  compareList: Phone[];
  handleAddToCompare: (phone: Phone) => void;
  handleRemoveFromCompare: (phoneId: number) => void;
  handleClearCompare: () => void;
  handleSetCompareList: (phones: Phone[]) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleAddToCompare = useCallback((phone: Phone) => {
    setCompareList((prevList) => {
      if (prevList.find((p) => p.id === phone.id)) {
        toast({
          description: `${phone.model} is already in the comparison list.`,
        });
        return prevList;
      }
      if (prevList.length >= 4) {
        toast({
          variant: 'destructive',
          title: 'Comparison Limit Reached',
          description: 'You can only compare up to 4 phones at a time.',
        });
        return prevList;
      }
      const newList = [...prevList, phone];
      // Only update URL if on a compare page
      if (pathname.startsWith('/compare')) {
        const newUrl = generateCompareUrl(newList);
        router.replace(newUrl, { scroll: false });
      }
      return newList;
    });
  }, [toast, pathname, router]);

  const handleRemoveFromCompare = useCallback((phoneId: number) => {
    setCompareList((prevList) => {
       const newList = prevList.filter((p) => p.id !== phoneId);
       // Only update URL if on a compare page
       if (pathname.startsWith('/compare')) {
        const newUrl = generateCompareUrl(newList);
        router.replace(newUrl, { scroll: false });
      }
       return newList;
    });
  }, [pathname, router]);
  
  const handleClearCompare = useCallback(() => {
    setCompareList([]);
     // Only update URL if on a compare page
    if (pathname.startsWith('/compare')) {
        const newUrl = generateCompareUrl([]);
        router.replace(newUrl, { scroll: false });
    }
  }, [pathname, router]);

  const handleSetCompareList = useCallback((phones: Phone[]) => {
      setCompareList(phones);
  }, []);
  
  const value = {
    compareList,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
    handleSetCompareList,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

