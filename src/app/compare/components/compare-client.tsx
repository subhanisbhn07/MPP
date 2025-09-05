
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect, useRef } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import { useCompare } from "@/contexts/compare-context";
import { Separator } from "@/components/ui/separator";

interface CompareClientProps {
  initialPhones?: Phone[];
}

const MAX_COMPARE_PHONES = 4;

export function CompareClient({ initialPhones = [] }: CompareClientProps) {
  const { 
    compareList,
    handleAddToCompare, 
    handleRemoveFromCompare,
    setCompareList 
  } = useCompare();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (initialPhones.length > 0) {
      setCompareList(initialPhones);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhones]);

  const handleAddPhone = (phone: Phone) => {
    if (compareList.length < MAX_COMPARE_PHONES) {
      handleAddToCompare(phone);
    }
    setIsDialogOpen(false);
  };
  
  const emptySlotsCount = Math.max(0, MAX_COMPARE_PHONES - compareList.length);
  const totalSlots = compareList.length + emptySlotsCount;
  const firstColWidth = '150px';
  const phoneGridCols = `repeat(${totalSlots}, 1fr)`;

  const PlaceholderCard = ({ index }: { index: number }) => (
    <div key={`placeholder-${index}`} className="flex items-center justify-center h-full p-2">
       <Button variant="dashed" className="w-full h-full min-h-24" onClick={() => setIsDialogOpen(true)}>
          <div className="flex flex-col items-center">
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Add Phone</span>
          </div>
       </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Compare Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Select up to 4 phones and compare their specs side-by-side.
        </p>
      </div>

      <div className="w-full relative">
         <div className="border-t">
              <div className="grid border-b" style={{ gridTemplateColumns: `${firstColWidth} ${phoneGridCols}` }}>
                  <div className="font-medium text-muted-foreground bg-background p-3 text-sm sticky left-0 z-10">
                     <p>Phone</p>
                  </div>
                  {compareList.map((phone) => (
                    <div key={phone.id} className="text-left p-3 text-sm flex items-center border-l relative group">
                        <div className="w-full">
                          <p className="font-bold">{phone.brand}</p>
                          <p className="text-muted-foreground">{phone.model}</p>
                        </div>
                         <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={() => handleRemoveFromCompare(phone.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                    </div>
                  ))}
                  {[...Array(emptySlotsCount)].map((_, index) => <div key={index} className="border-l p-3"><PlaceholderCard index={index} /></div>)}
              </div>
             {specCategoryGroups.map((group: SpecCategory) => (
               <div key={group.title} id={group.category} className="border-b">
                  <div className="sticky z-20 bg-muted top-16 md:top-20">
                      <h2 className="p-3 font-bold text-base text-center">
                          {group.title}
                      </h2>
                      <Separator />
                  </div>

                  {group.specs.map(spec => {
                    const category = group.category as keyof PhoneSpec;
                    const specKey = spec.key as keyof PhoneSpec[typeof category];
                    
                    return (
                      <div key={spec.key} className="grid items-stretch border-b" style={{ gridTemplateColumns: `${firstColWidth} ${phoneGridCols}` }}>
                          <div className="font-medium text-muted-foreground bg-background p-3 text-sm sticky left-0 z-10">
                            {spec.label}
                          </div>
                          {compareList.map((phone, idx) => (
                            <div key={phone.id} className="text-left p-3 text-sm flex items-center border-l">
                                <div className="w-full">
                                  {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                </div>
                            </div>
                          ))}
                          {[...Array(emptySlotsCount)].map((_, index) => <div key={index} className="border-l p-3" />)}
                      </div>
                    )
                  })}
               </div>
             ))}
         </div>
      </div>
      
      <AddPhoneDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSelectPhone={handleAddPhone}
        allPhones={allPhones}
        currentPhones={compareList}
      />
    </div>
  )
}
