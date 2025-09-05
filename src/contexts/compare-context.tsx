
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Phone } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { generateCompareUrl } from '@/lib/utils';
import { allPhones } from '@/lib/data';

interface CompareContextType {
  compareList: Phone[];
  handleAddToCompare: (phone: Phone, index?: number | null) => void;
  handleRemoveFromCompare: (phoneId: number) => void;
  handleClearCompare: () => void;
  setCompareList: (phones: Phone[]) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // This is the key change: A single useEffect to handle the side-effect of URL synchronization.
  // It runs AFTER the state has been updated, preventing the "update during render" error.
  useEffect(() => {
    // Only update the URL on the compare pages to avoid changing the URL on the homepage etc.
    if (pathname.startsWith('/compare')) {
      const newUrl = generateCompareUrl(compareList);
      // Use replace to avoid adding to history, making the back button work as expected.
      router.replace(newUrl, { scroll: false });
    }
  }, [compareList, pathname, router]);


  const handleAddToCompare = useCallback((phone: Phone, index: number | null = null) => {
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
      
      const newList = [...prevList];
      if (index !== null && index < 4) {
         // This logic is tricky. If we want to insert, we need a sparse array or object.
         // For now, let's just add to the end as it's simpler and less error-prone.
         // A more complex implementation would use an object `{0: phone1, 2: phone2}`
         return [...prevList, phone];

      } else {
        return [...prevList, phone];
      }
    });
  }, [toast]);

  const handleRemoveFromCompare = useCallback((phoneId: number) => {
    // This function now ONLY updates state. The useEffect will handle the URL.
    setCompareList((prevList) => prevList.filter((p) => p.id !== phoneId));
  }, []);
  
  const handleClearCompare = useCallback(() => {
    // This function now ONLY updates state. The useEffect will handle the URL.
    setCompareList([]);
  }, []);
  
  const value = {
    compareList,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
    setCompareList,
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
