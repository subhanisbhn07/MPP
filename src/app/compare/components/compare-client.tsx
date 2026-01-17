'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, X, CheckCircle, XCircle } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import { useCompare } from "@/contexts/compare-context";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { JsonLd, generateComparisonSchema, Breadcrumb } from "@/components/seo";


interface CompareClientProps {
  initialPhones?: Phone[];
}

const MAX_COMPARE_PHONES = 4;

const renderSpecValue = (value: string | undefined | null) => {
    if (value === undefined || value === null || value.trim() === '') return 'N/A';
    if (value.toLowerCase() === 'yes') return <CheckCircle className="text-green-500 mx-auto" />;
    if (value.toLowerCase() === 'no') return <XCircle className="text-red-500 mx-auto" />;
    return <span className="break-words">{value}</span>;
}

const PhoneSelection = ({ phone, onAdd, onRemove }: { phone: Phone | null, onAdd: () => void, onRemove: () => void }) => {
  if (!phone) {
    return (
      <Card className="border-2 border-dashed h-full">
        <CardContent className="p-2 sm:p-4 h-full">
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center w-full h-full text-muted-foreground"
            onClick={onAdd}
            aria-label="Add phone to compare"
          >
            <PlusCircle className="h-8 w-8" aria-hidden="true" />
            <span className="mt-2 text-xs font-semibold">Add Phone</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const phoneUrl = `/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;

  return (
    <Card className="relative group/card h-full overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 bg-background/50 backdrop-blur-sm rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity z-10"
        onClick={onRemove}
        aria-label={`Remove ${phone.brand} ${phone.model}`}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Link href={phoneUrl} className="flex flex-col items-center p-2 text-center h-full justify-between">
        <div className="relative w-full aspect-square max-h-[120px]">
          <Image
            src={phone.image}
            alt={phone.model}
            fill
            className="object-contain"
            data-ai-hint="mobile phone"
          />
        </div>
        <div>
          <p className="text-sm font-bold mt-1 truncate w-full">{phone.brand} {phone.model}</p>
          <p className="text-sm text-primary">${phone.price}</p>
        </div>
      </Link>
    </Card>
  );
};


export function CompareClient({ initialPhones = [] }: CompareClientProps) {
  const { 
    compareList,
    handleAddToCompare, 
    handleRemoveFromCompare,
    setCompareList 
  } = useCompare();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneSlotToAdd, setPhoneSlotToAdd] = useState<number | null>(null);

  useEffect(() => {
    if (initialPhones.length > 0) {
      setCompareList(initialPhones);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhones]);

  const handleAddPhoneClick = (index: number) => {
    setPhoneSlotToAdd(index);
    setIsDialogOpen(true);
  }

  const handleSelectPhone = (phone: Phone) => {
    handleAddToCompare(phone, phoneSlotToAdd);
    setIsDialogOpen(false);
    setPhoneSlotToAdd(null);
  };
  
  const numPhones = compareList.length;
  const gridColsClass = `grid-cols-2 md:grid-cols-${Math.max(2, numPhones === 3 ? 4 : numPhones)}`;
  const valueGridColsClass = `grid-cols-${numPhones > 0 ? numPhones : 1}`;

  const breadcrumbItems = compareList.length > 0 
    ? [
        { label: 'Compare', href: '/compare' },
        { label: compareList.map(p => p.model).join(' vs '), href: '#' },
      ]
    : [{ label: 'Compare', href: '/compare' }];

  const comparisonSchema = compareList.length > 0 ? generateComparisonSchema(compareList) : null;

  return (
    <>
      {comparisonSchema && <JsonLd data={comparisonSchema} />}
      
      <div className="container mx-auto py-12 px-4 md:px-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {compareList.length > 0 
              ? `${compareList.map(p => `${p.brand} ${p.model}`).join(' vs ')}`
              : 'Compare Phones'
            }
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            {compareList.length > 0
              ? `Side-by-side comparison of ${compareList.length} phones with detailed specifications.`
              : `Select up to ${MAX_COMPARE_PHONES} phones and compare their specs side-by-side.`
            }
          </p>
        </div>

       <div className="grid grid-cols-2 md:grid-cols-4 items-stretch gap-2 mb-8 sticky top-4 z-20 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
          {[...Array(MAX_COMPARE_PHONES)].map((_, index) => {
            const phone = compareList[index];
            return (
              <PhoneSelection
                key={phone?.id || `placeholder-${index}`}
                phone={phone || null}
                onAdd={() => handleAddPhoneClick(index)}
                onRemove={() => handleRemoveFromCompare(phone.id)}
              />
            )
          })}
       </div>
      
      
      {/* Spec Categories and Rows */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        {specCategoryGroups.map((group: SpecCategory, groupIndex) => (
          <div key={group.title} id={group.category} className={cn(groupIndex > 0 && "border-t")}>
              <h2 className="p-3 font-bold text-lg text-center bg-primary text-primary-foreground sticky top-[150px] z-10">
                  {group.title}
              </h2>

              {group.specs.map((spec, specIndex) => {
                const category = group.category as keyof PhoneSpec;
                const specKey = spec.key as keyof PhoneSpec[typeof category];
                
                return (
                  <div key={spec.key} className={cn("border-t", specIndex === 0 && "border-t-0")}>
                    {/* Spec Label Row */}
                    <div className="p-3 bg-card">
                      <h3 className="font-semibold text-sm">{spec.label}</h3>
                    </div>
                    
                    {/* Spec Value Row */}
                     <div className={cn(
                        "grid items-start",
                        `grid-cols-${Math.max(1, numPhones)}`,
                        specIndex % 2 === 0 ? 'bg-background' : 'bg-card'
                     )}>
                      {compareList.map((phone, index) => (
                        <div key={phone.id} className={cn("text-left p-3 text-sm", index > 0 && "border-l")}>
                            {renderSpecValue((phone.specs[category] as any)?.[specKey])}
                        </div>
                      ))}
                       {numPhones === 0 && (
                          <div className="text-left p-3 text-sm text-muted-foreground">Add a phone to see specs</div>
                        )}
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
        onSelectPhone={handleSelectPhone}
        allPhones={allPhones}
        currentPhones={compareList}
      />
      </div>
    </>
  )
}
