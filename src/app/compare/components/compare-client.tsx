'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X, CheckCircle, XCircle } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import { useCompare } from "@/contexts/compare-context";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CompareClientProps {
  initialPhones?: Phone[];
}

const MAX_COMPARE_PHONES = 4;

const PhoneHeaderCard = ({ phone, onRemove }: { phone: Phone | null, onRemove: () => void }) => {
  if (!phone) return null;

  const phoneUrl = `/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;

  return (
    <div className="flex-1 min-w-0">
      <Card className="relative group/header-card h-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 bg-muted rounded-full opacity-0 group-hover/header-card:opacity-100 transition-opacity z-10"
          onClick={onRemove}
          aria-label={`Remove ${phone.brand} ${phone.model}`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Link href={phoneUrl} className="flex flex-col items-center p-2 text-center">
            <div className="relative w-16 h-20">
               <Image
                  src={phone.image}
                  alt={phone.model}
                  fill
                  className="object-contain"
                  data-ai-hint="mobile phone"
                />
            </div>
            <p className="text-xs font-bold mt-1 truncate w-full">{phone.brand} {phone.model}</p>
            <p className="text-xs text-muted-foreground">${phone.price}</p>
        </Link>
      </Card>
    </div>
  )
};


const renderSpecValue = (value: string | undefined | null) => {
    if (value === undefined || value === null || value.trim() === '') return 'N/A';
    if (value.toLowerCase() === 'yes') return <CheckCircle className="text-green-500 mx-auto" />;
    if (value.toLowerCase() === 'no') return <XCircle className="text-red-500 mx-auto" />;
    return value;
}


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
  
  const numPhones = compareList.length;
  const gridColsClass = `grid-cols-${numPhones > 0 ? numPhones : 1}`;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Compare Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Select up to {MAX_COMPARE_PHONES} phones and compare their specs side-by-side.
        </p>
      </div>

       {/* Sticky Phone Headers */}
       <div className={cn("sticky top-16 md:top-20 z-30 bg-background pt-1 pb-2", numPhones > 0 && "border-b")}>
        <div className="flex items-stretch gap-2">
            {compareList.map((phone) => (
              <PhoneHeaderCard 
                key={phone.id} 
                phone={phone}
                onRemove={() => handleRemoveFromCompare(phone.id)}
              />
            ))}
            {[...Array(Math.max(0, MAX_COMPARE_PHONES - numPhones))].map((_, index) => (
              <div key={`placeholder-${index}`} className="flex-1">
                 { index === 0 ? (
                    <Card className="flex items-center justify-center h-full p-2 border-2 border-dashed">
                      <Button variant="ghost" className="w-full h-full flex-col" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs mt-1 text-muted-foreground">Add Phone</span>
                      </Button>
                    </Card>
                 ) : <div className="h-full w-full" /> }
              </div>
            ))}
        </div>
       </div>
      
      
      {/* Spec Categories and Rows */}
      <div className="mt-4">
        {specCategoryGroups.map((group: SpecCategory) => (
          <div key={group.title} id={group.category} className="mb-6">
              <h2 className="p-2 font-bold text-lg text-center bg-muted rounded-md my-4">
                  {group.title}
              </h2>

              {group.specs.map(spec => {
                const category = group.category as keyof PhoneSpec;
                const specKey = spec.key as keyof PhoneSpec[typeof category];
                
                return (
                  <div key={spec.key} className="border-b last:border-b-0">
                    {/* Spec Label Row */}
                    <div className="bg-muted/50 p-2">
                      <h3 className="font-semibold text-sm">{spec.label}</h3>
                    </div>
                    
                    {/* Spec Value Row */}
                     <div className={`grid ${gridColsClass} items-stretch`}>
                      {compareList.map((phone, index) => (
                        <div key={phone.id} className={cn("text-left p-2 text-sm flex items-center", index > 0 && "border-l")}>
                            {renderSpecValue((phone.specs[category] as any)?.[specKey])}
                        </div>
                      ))}
                      {[...Array(Math.max(0, MAX_COMPARE_PHONES - numPhones))].map((_, index) => <div key={`spec-empty-${index}`} className={cn(index > 0 && "border-l")}/>)}
                    </div>
                  </div>
                )
              })}
          </div>
        ))}
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
