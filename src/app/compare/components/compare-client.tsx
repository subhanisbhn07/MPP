
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import Link from "next/link";
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
  
  const emptySlots = Array(MAX_COMPARE_PHONES - compareList.length).fill(null);

  const gridCols = `repeat(${compareList.length + emptySlots.length}, minmax(0, 1fr))`;

  const PhoneHeaderCard = ({ phone }: { phone: Phone }) => (
    <div key={phone.id} className="relative group text-center p-1 flex flex-col">
        <Button 
           variant="destructive" 
           size="icon" 
           className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
           onClick={() => handleRemoveFromCompare(phone.id)}
         >
           <X className="h-4 w-4" />
         </Button>
        <Card className="overflow-hidden h-full flex flex-col bg-card flex-1">
            <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>
              <div className="aspect-square relative bg-muted p-1">
                  <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
              </div>
              <CardHeader className="p-2">
                  <p className="text-sm font-bold truncate">{phone.brand} {phone.model}</p>
              </CardHeader>
            </Link>
             <CardFooter className="p-2 mt-auto">
                <p className="text-lg font-bold w-full text-primary">${phone.price}</p>
            </CardFooter>
        </Card>
    </div>
  );

  const PlaceholderCard = ({ index }: { index: number }) => (
    <div key={`placeholder-${index}`} className="flex items-center justify-center h-full p-2">
       <Button variant="dashed" className="w-full h-full min-h-48" onClick={() => setIsDialogOpen(true)}>
          <div className="flex flex-col items-center">
            <PlusCircle className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm mt-1">Add Phone</span>
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

      <div className="w-full">
         <div className="sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-30">
            <div className="grid gap-x-1" style={{ gridTemplateColumns: gridCols }}>
                {compareList.map((phone) => <PhoneHeaderCard key={phone.id} phone={phone} />)}
                {emptySlots.map((_, index) => <PlaceholderCard key={index} index={index} />)}
             </div>
         </div>
      
         <div className="mt-4 border-t">
             {specCategoryGroups.map((group: SpecCategory) => (
               <div key={group.title} id={group.category} className="mb-4">
                  <h2 className="bg-primary text-primary-foreground p-3 font-bold text-lg text-center my-4 rounded-md sticky top-[18.5rem] md:top-[19rem] z-20">
                      {group.title}
                  </h2>
                  {group.specs.map(spec => {
                    const category = group.category as keyof PhoneSpec;
                    const specKey = spec.key as keyof PhoneSpec[typeof category];
                    
                    return (
                      <div key={spec.key} className="border-b">
                          <div className="font-medium text-muted-foreground bg-muted/50 p-3 text-sm">
                            {spec.label}
                          </div>
                          <div className="grid items-stretch" style={{ gridTemplateColumns: gridCols }}>
                              {compareList.map((phone, idx) => (
                                <div key={phone.id} className="text-left p-3 text-sm flex items-center">
                                    <div className="w-full">
                                      {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                    </div>
                                    {idx < compareList.length -1 && <Separator orientation="vertical" className="ml-2 h-full" />}
                                </div>
                              ))}
                              {emptySlots.map((_, index) => <div key={index} className="border-r last:border-r-0" />)}
                          </div>
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
