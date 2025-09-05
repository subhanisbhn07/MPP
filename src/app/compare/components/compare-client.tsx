
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    setCompareList(initialPhones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhones, setCompareList]);

  const handleAddPhone = (phone: Phone) => {
    if (compareList.length < MAX_COMPARE_PHONES) {
      handleAddToCompare(phone);
    }
    setIsDialogOpen(false);
  };
  
  const emptySlots = Array(MAX_COMPARE_PHONES - compareList.length).fill(null);

  const gridTemplateColumns = `minmax(120px, 1fr) repeat(${MAX_COMPARE_PHONES}, minmax(150px, 2fr))`;
  const gridTemplateColumnsValues = `minmax(120px, 1fr) repeat(${MAX_COMPARE_PHONES}, minmax(150px, 2fr))`;


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
        <div className="min-w-[800px]">
            {/* Sticky Header */}
           <div className="sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-20 py-4">
              <div className="grid gap-4 items-start" style={{ gridTemplateColumns }}>
                  <div className="flex items-center h-full invisible">
                     {/* Placeholder for alignment */}
                  </div>
                  {compareList.map((phone) => (
                    <div key={phone.id} className="relative group text-center">
                        <Button 
                           variant="destructive" 
                           size="icon" 
                           className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                           onClick={() => handleRemoveFromCompare(phone.id)}
                         >
                           <X className="h-4 w-4" />
                         </Button>
                        <Card className="overflow-hidden">
                            <div className="aspect-[4/5] relative bg-muted p-2">
                                 <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
                            </div>
                            <CardHeader className="p-2">
                                <p className="text-sm font-bold truncate">{phone.brand}</p>
                                <p className="text-xs text-muted-foreground truncate">{phone.model}</p>
                            </CardHeader>
                             <CardFooter className="p-2">
                                <Button asChild className="w-full" size="sm">
                                    <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>View</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                  ))}
                   {emptySlots.map((_, index) => (
                      <div key={`placeholder-${index}`} className="flex items-center justify-center h-full">
                         <Button variant="dashed" className="w-full h-full min-h-48" onClick={() => setIsDialogOpen(true)}>
                            <div className="flex flex-col items-center">
                              <PlusCircle className="h-6 w-6 text-muted-foreground" />
                              <span className="text-sm mt-1">Add Phone</span>
                            </div>
                         </Button>
                      </div>
                  ))}
               </div>
           </div>
        
           {/* Specs List */}
           <div className="mt-4">
               {specCategoryGroups.map((group: SpecCategory) => (
                 <div key={group.title} id={group.category} className="mb-4">
                    <div className="grid" style={{ gridTemplateColumns }}>
                      <div style={{gridColumn: `span ${MAX_COMPARE_PHONES + 1}`}} className="bg-primary text-primary-foreground p-3 rounded-t-lg font-bold text-lg sticky top-12 z-10">
                        {group.title}
                      </div>
                    </div>
                    {group.specs.map(spec => {
                      const category = group.category as keyof PhoneSpec;
                      const specKey = spec.key as keyof PhoneSpec[typeof category];
                      
                      return (
                        <div key={spec.key} className="grid items-center border-b" style={{ gridTemplateColumns }}>
                             <div className="font-medium text-muted-foreground bg-muted/30 p-3 h-full flex items-center sticky left-0">{spec.label}</div>
                             {compareList.map((phone, index) => (
                                <div key={phone.id} className="text-left p-3 text-sm flex items-center">
                                    {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                </div>
                            ))}
                             {emptySlots.map((_, index) => <div key={index} />)}
                        </div>
                      )
                    })}
                 </div>
               ))}
               
               <div className="grid items-center mt-8 border-t-2 pt-4" style={{ gridTemplateColumns }}>
                    <div className="font-bold text-lg sticky left-0 bg-background">Price</div>
                    {compareList.map((phone) => (
                        <div key={phone.id} className="text-left text-xl font-bold text-primary p-3">
                            ${phone.price}
                        </div>
                    ))}
                    {emptySlots.map((_, index) => <div key={index} />)}
               </div>
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
