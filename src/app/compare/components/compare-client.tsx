'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, X, CheckCircle, XCircle } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect, useRef } from "react";
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

const renderSpecValue = (value: string | undefined | null) => {
    if (value === undefined || value === null || value.trim() === '') return 'N/A';
    if (value.toLowerCase() === 'yes') return <CheckCircle className="text-green-500 mx-auto" />;
    if (value.toLowerCase() === 'no') return <XCircle className="text-red-500 mx-auto" />;
    return <span className="break-words">{value}</span>;
}

const PhoneSelection = ({ phone, onAdd, onRemove, isCompact }: { phone: Phone | null, onAdd: () => void, onRemove: () => void, isCompact: boolean }) => {
  if (!phone) {
    return (
      <Card className={cn(
        "border-2 border-dashed transition-all duration-300",
        isCompact ? "h-auto" : "h-full"
      )}>
        <CardContent className={cn(
          "transition-all duration-300",
          isCompact ? "p-1" : "p-2 sm:p-4 h-full"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center justify-center w-full text-muted-foreground transition-all duration-300",
              isCompact ? "flex-row h-8 gap-1" : "flex-col h-full"
            )}
            onClick={onAdd}
            aria-label="Add phone to compare"
          >
            <PlusCircle className={cn("transition-all duration-300", isCompact ? "h-4 w-4" : "h-8 w-8")} aria-hidden="true" />
            <span className={cn("font-semibold transition-all duration-300", isCompact ? "text-[8px]" : "mt-2 text-xs")}>Add</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const phoneUrl = `/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;

  return (
    <Card className={cn(
      "relative group/card overflow-hidden transition-all duration-300",
      isCompact ? "h-auto" : "h-full"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute bg-background/50 backdrop-blur-sm rounded-full opacity-0 group-hover/card:opacity-100 transition-all z-10",
          isCompact ? "top-0 right-0 h-4 w-4" : "top-1 right-1 h-6 w-6"
        )}
        onClick={onRemove}
        aria-label={`Remove ${phone.brand} ${phone.model}`}
      >
        <X className={cn("transition-all duration-300", isCompact ? "h-3 w-3" : "h-4 w-4")} aria-hidden="true" />
      </Button>
      <Link href={phoneUrl} className={cn(
        "flex items-center text-center transition-all duration-300",
        isCompact ? "flex-row p-1 gap-1" : "flex-col p-1 sm:p-2 h-full justify-between"
      )}>
        <div className={cn(
          "relative transition-all duration-300 flex-shrink-0",
          isCompact ? "w-[28px] h-[28px]" : "w-full aspect-square max-h-[60px] sm:max-h-[100px] md:max-h-[120px]"
        )}>
          <Image
            src={phone.image}
            alt={phone.model}
            fill
            className="object-contain"
            data-ai-hint="mobile phone"
          />
        </div>
        <div className={cn(
          "transition-all duration-300",
          isCompact ? "flex-1 text-left min-w-0" : "w-full"
        )}>
          <p className={cn(
            "font-bold truncate transition-all duration-300",
            isCompact ? "text-[8px] leading-tight" : "text-[10px] sm:text-xs md:text-sm mt-1"
          )}>{phone.brand} {phone.model}</p>
          <p className={cn(
            "text-primary transition-all duration-300",
            isCompact ? "text-[7px] leading-tight" : "text-[10px] sm:text-xs md:text-sm"
          )}>${phone.price}</p>
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
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for compact header mode (91mobiles-style)
  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        // When the trigger element scrolls past the top of the viewport, enable compact mode
        setIsCompactHeader(triggerRect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Compare Phones
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Select up to {MAX_COMPARE_PHONES} phones and compare their specs side-by-side.
        </p>
      </div>

      {/* Trigger element for scroll detection - when this scrolls out of view, header becomes compact */}
      <div ref={triggerRef} className="h-0" />

       <div 
         ref={headerRef}
         className={cn(
           "grid grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-8 sticky top-0 z-20 bg-background/95 backdrop-blur-sm rounded-lg border transition-all duration-300",
           isCompactHeader ? "p-1 items-center" : "p-2 sm:p-4 items-stretch"
         )}
       >
          {[...Array(MAX_COMPARE_PHONES)].map((_, index) => {
            const phone = compareList[index];
            return (
              <PhoneSelection
                key={phone?.id || `placeholder-${index}`}
                phone={phone || null}
                onAdd={() => handleAddPhoneClick(index)}
                onRemove={() => handleRemoveFromCompare(phone.id)}
                isCompact={isCompactHeader}
              />
            )
          })}
       </div>
      
      
      {/* Spec Categories and Rows */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        {specCategoryGroups.map((group: SpecCategory, groupIndex) => (
          <div key={group.title} id={group.category} className={cn(groupIndex > 0 && "border-t")}>
              <h2 className={cn(
                  "p-3 font-bold text-lg text-center bg-primary text-primary-foreground sticky z-10 transition-all duration-300",
                  isCompactHeader ? "top-[52px]" : "top-[140px] sm:top-[160px]"
                )}>
                  {group.title}
              </h2>

              {group.specs.map((spec, specIndex) => {
                const category = group.category as keyof PhoneSpec;
                const specKey = spec.key as keyof PhoneSpec[typeof category];
                
                return (
                  <div key={spec.key} className={cn("border-t", specIndex === 0 && "border-t-0")}>
                    {/* Spec Label Row */}
                    <div className="p-1.5 sm:p-2 md:p-3 bg-card">
                      <h3 className="font-semibold text-[10px] sm:text-xs md:text-sm">{spec.label}</h3>
                    </div>
                    
                    {/* Spec Value Row */}
                     <div className={cn(
                        "grid items-start",
                        `grid-cols-${Math.max(1, numPhones)}`,
                        specIndex % 2 === 0 ? 'bg-background' : 'bg-card'
                     )}>
                      {compareList.map((phone, index) => (
                        <div key={phone.id} className={cn("text-left p-1.5 sm:p-2 md:p-3 text-[10px] sm:text-xs md:text-sm", index > 0 && "border-l")}>
                            {renderSpecValue((phone.specs[category] as any)?.[specKey])}
                        </div>
                      ))}
                       {numPhones === 0 && (
                          <div className="text-left p-1.5 sm:p-2 md:p-3 text-[10px] sm:text-xs md:text-sm text-muted-foreground">Add a phone to see specs</div>
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
  )
}
