
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { PlusCircle, X, ChevronsRight } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import Link from "next/link";
import { useCompare } from "@/contexts/compare-context";
import { cn } from "@/lib/utils";
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

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Compare Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Select up to 4 phones and compare their specs side-by-side.
        </p>
      </div>

      <div className="mt-8">
        <div className="sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-20 py-4 -mx-4 px-4 border-b">
           <div className="grid gap-4 items-start" style={{ gridTemplateColumns: `1fr repeat(${MAX_COMPARE_PHONES}, 2fr)`}}>
              <div className="flex items-center h-full">
                <h2 className="text-base font-bold text-muted-foreground">Feature</h2>
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
                        <div className="aspect-[4/5] relative bg-muted">
                             <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
                        </div>
                        <CardHeader className="p-2">
                            <p className="text-sm font-bold truncate">{phone.brand}</p>
                            <p className="text-xs text-muted-foreground truncate">{phone.model}</p>
                        </CardHeader>
                    </Card>
                </div>
              ))}
               {emptySlots.map((_, index) => (
                  <div key={`placeholder-${index}`} className="flex items-center justify-center h-full">
                     <Button variant="dashed" className="w-full h-32" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="h-6 w-6 text-muted-foreground" />
                     </Button>
                  </div>
              ))}
           </div>
        </div>
        
        <div className="mt-4">
           {specCategoryGroups.map((group: SpecCategory) => (
             <div key={group.title} id={group.category} className="mb-4">
                <h3 className="text-lg font-bold bg-primary text-primary-foreground p-3 rounded-lg my-4 sticky top-12 z-10 flex items-center justify-between">
                    {group.title}
                    <Link href={`#${group.category}`} className="hidden">
                        <ChevronsRight className="h-5 w-5" />
                    </Link>
                </h3>
                 <div className="space-y-2">
                    {group.specs.map(spec => {
                      const category = group.category as keyof PhoneSpec;
                      const specKey = spec.key as keyof PhoneSpec[typeof category];
                      
                      return (
                        <div key={spec.key} className="grid items-center gap-4 text-sm border-b pb-2" style={{ gridTemplateColumns: `1fr repeat(${MAX_COMPARE_PHONES}, 2fr)`}}>
                            <div className="font-medium text-muted-foreground">{spec.label}</div>
                            {compareList.map((phone) => (
                                <div key={phone.id} className="text-center">
                                    {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                                </div>
                            ))}
                             {emptySlots.map((_, index) => <div key={index} />)}
                        </div>
                      )
                    })}
                 </div>
             </div>
           ))}
           
           <div className="grid items-center gap-4 text-sm mt-8" style={{ gridTemplateColumns: `1fr repeat(${MAX_COMPARE_PHONES}, 2fr)`}}>
                <div className="font-bold text-lg">Price</div>
                {compareList.map((phone) => (
                    <div key={phone.id} className="text-center text-lg font-bold text-primary">
                        ${phone.price}
                    </div>
                ))}
                {emptySlots.map((_, index) => <div key={index} />)}
           </div>
           
            <div className="grid items-center gap-4 mt-4" style={{ gridTemplateColumns: `1fr repeat(${MAX_COMPARE_PHONES}, 2fr)`}}>
                <div />
                {compareList.map((phone) => (
                    <div key={phone.id} className="text-center">
                       <Button asChild>
                         <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>View Details</Link>
                       </Button>
                    </div>
                ))}
                {emptySlots.map((_, index) => <div key={index} />)}
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

    