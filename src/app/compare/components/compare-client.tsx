
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
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
  
  const gridCols = `repeat(${compareList.length || 1}, 1fr)`;

  const PlaceholderCard = () => (
    <Card className="flex items-center justify-center h-full p-2 border-2 border-dashed">
       <Button variant="ghost" className="w-full h-full min-h-24" onClick={() => setIsDialogOpen(true)}>
          <div className="flex flex-col items-center">
            <PlusCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs mt-1">Add Phone</span>
          </div>
       </Button>
    </Card>
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

      <div className="w-full overflow-x-auto">
         <div className="border rounded-lg">
             {/* Phone Headers */}
             <div className="grid gap-px p-1" style={{ gridTemplateColumns: `minmax(150px, 1fr) ${gridCols}` }}>
                  <div className="font-medium text-muted-foreground p-3 text-sm">
                     <p>&nbsp;</p>
                  </div>
                  {compareList.map((phone) => (
                    <Card key={phone.id} className="p-2 relative group text-center shadow-none border-0 rounded-none">
                       <h3 className="font-bold text-sm">{phone.brand} {phone.model}</h3>
                       <p className="text-xs text-muted-foreground">${phone.price}</p>
                       <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={() => handleRemoveFromCompare(phone.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                    </Card>
                  ))}
                  {[...Array(Math.max(0, MAX_COMPARE_PHONES - compareList.length))].map((_, index) => (
                    index === 0 && compareList.length < MAX_COMPARE_PHONES ? <PlaceholderCard key={`placeholder-${index}`} /> : <div key={`empty-${index}`}></div>
                  ))}
             </div>
             <Separator />
            
             {/* Spec Categories and Rows */}
             {specCategoryGroups.map((group: SpecCategory) => (
               <div key={group.title} id={group.category} className="border-b last:border-b-0">
                  <div className="bg-muted">
                      <h2 className="p-2 font-bold text-sm text-center">
                          {group.title}
                      </h2>
                  </div>

                  {group.specs.map(spec => {
                    const category = group.category as keyof PhoneSpec;
                    const specKey = spec.key as keyof PhoneSpec[typeof category];
                    
                    return (
                      <div key={spec.key} className="grid items-stretch border-b" style={{ gridTemplateColumns: `minmax(150px, 1fr) ${gridCols}` }}>
                          <div className="font-medium text-muted-foreground bg-background/20 p-2 text-xs">
                            {spec.label}
                          </div>
                          {compareList.map((phone) => (
                            <div key={phone.id} className="text-left p-2 text-xs flex items-center border-l">
                                <div className="w-full">
                                  {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                </div>
                            </div>
                          ))}
                          {[...Array(Math.max(0, MAX_COMPARE_PHONES - compareList.length))].map((_, index) => <div key={`spec-empty-${index}`} className="border-l"/>)}
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
