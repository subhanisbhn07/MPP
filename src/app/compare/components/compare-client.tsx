
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect, useRef } from "react";
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
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (initialPhones.length > 0) {
      setCompareList(initialPhones);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhones]);

  useEffect(() => {
    if (stickyHeaderRef.current) {
        setHeaderHeight(stickyHeaderRef.current.offsetHeight);
    }
  }, [compareList]); // Recalculate when the list changes

  const handleAddPhone = (phone: Phone) => {
    if (compareList.length < MAX_COMPARE_PHONES) {
      handleAddToCompare(phone);
    }
    setIsDialogOpen(false);
  };
  
  const emptySlots = Array(MAX_COMPARE_PHONES - compareList.length).fill(null);

  const gridTemplateColumns = `minmax(200px, 1fr) repeat(${MAX_COMPARE_PHONES}, minmax(180px, 1fr))`;

  const PhoneHeaderCard = ({ phone }: { phone: Phone }) => (
    <div key={phone.id} className="relative group text-center p-2">
        <Button 
           variant="destructive" 
           size="icon" 
           className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
           onClick={() => handleRemoveFromCompare(phone.id)}
         >
           <X className="h-4 w-4" />
         </Button>
        <Card className="overflow-hidden h-full flex flex-col bg-card">
            <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>
              <div className="aspect-[4/5] relative bg-muted p-2">
                  <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
              </div>
              <CardHeader className="p-2">
                  <p className="text-sm font-bold truncate">{phone.brand}</p>
                  <p className="text-xs text-muted-foreground truncate">{phone.model}</p>
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

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
           <div ref={stickyHeaderRef} className="sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-30 pb-2">
              <div className="grid gap-x-4 items-end" style={{ gridTemplateColumns }}>
                  <div className="font-bold text-lg invisible">
                    Feature
                  </div>
                  {compareList.map((phone) => <PhoneHeaderCard key={phone.id} phone={phone} />)}
                  {emptySlots.map((_, index) => <PlaceholderCard key={index} index={index} />)}
               </div>
           </div>
        
           <div className="mt-4">
               {specCategoryGroups.map((group: SpecCategory) => (
                 <div key={group.title} id={group.category} className="mb-4">
                    <div className="grid sticky z-20" style={{ gridTemplateColumns, top: `${headerHeight}px` }}>
                      <div 
                        style={{gridColumn: `span ${MAX_COMPARE_PHONES + 1}`}} 
                        className="bg-primary text-primary-foreground p-3 font-bold text-lg"
                      >
                        {group.title}
                      </div>
                    </div>
                    {group.specs.map(spec => {
                      const category = group.category as keyof PhoneSpec;
                      const specKey = spec.key as keyof PhoneSpec[typeof category];
                      
                      return (
                        <div key={spec.key} className="grid items-stretch border-b" style={{ gridTemplateColumns }}>
                             <div className="font-medium text-muted-foreground bg-background p-3 flex items-center sticky left-0 z-10 border-r">{spec.label}</div>
                             {compareList.map((phone) => (
                                <div key={phone.id} className="text-left p-3 text-sm flex items-center border-r">
                                    {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                </div>
                            ))}
                             {emptySlots.map((_, index) => <div key={index} className="border-r" />)}
                        </div>
                      )
                    })}
                 </div>
               ))}
           </div>
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
