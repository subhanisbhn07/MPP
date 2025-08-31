'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Phone } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CompareContextType {
  compareList: Phone[];
  handleAddToCompare: (phone: Phone) => void;
  handleRemoveFromCompare: (phoneId: number) => void;
  handleClearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const { toast } = useToast();

  const handleAddToCompare = (phone: Phone) => {
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
      return [...prevList, phone];
    });
  };

  const handleRemoveFromCompare = (phoneId: number) => {
    setCompareList((prevList) => prevList.filter((p) => p.id !== phoneId));
  };
  
  const handleClearCompare = () => {
    setCompareList([]);
  }

  const value = {
    compareList,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
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
