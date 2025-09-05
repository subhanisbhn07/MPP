
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AddPhoneDialog } from "./add-phone-dialog";
import Link from "next/link";
import { useCompare } from "@/contexts/compare-context";
import { cn } from "@/lib/utils";

interface CompareClientProps {
  initialPhones?: Phone[];
}

// This component displays the phones and handles adding/removing.
// The context handles the state and URL synchronization.
export function CompareClient({ initialPhones = [] }: CompareClientProps) {
  const { 
    compareList,
    handleAddToCompare, 
    handleRemoveFromCompare,
    setCompareList // Use the context's setter
  } = useCompare();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // On initial mount, sync the context with the phones from the URL slug.
  // This should only happen once to avoid overriding user actions.
  useEffect(() => {
    setCompareList(initialPhones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhones, setCompareList]);


  const handleAddPhone = (phone: Phone) => {
    if (compareList.length < 4) {
      handleAddToCompare(phone);
    }
    setIsDialogOpen(false);
  };

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

      <div className="mt-12">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] min-w-[150px] font-semibold text-foreground sticky left-0 bg-background z-10">Feature</TableHead>
                    {compareList.map((phone, index) => (
                      <TableHead 
                        key={phone.id} 
                        className={cn(
                          "min-w-[200px] text-center",
                          index < compareList.length - 1 && "border-r"
                        )}
                      >
                        <div className="flex flex-col items-center p-2 relative group">
                           <Image src={phone.image} alt={phone.model} width={100} height={150} className="object-contain rounded-md mb-2 h-36" data-ai-hint="mobile phone" />
                           <p className="font-bold">{phone.brand}</p>
                           <p>{phone.model}</p>
                           <Button 
                             variant="destructive" 
                             size="icon" 
                             className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                             onClick={() => handleRemoveFromCompare(phone.id)}
                           >
                             <X className="h-4 w-4" />
                           </Button>
                        </div>
                      </TableHead>
                    ))}
                    {compareList.length < 4 && (
                       <TableHead className="min-w-[200px]">
                        <div className="flex flex-col items-center justify-center h-full text-center p-4 border-2 border-dashed rounded-lg">
                           <Button variant="ghost" className="flex flex-col h-auto p-4" onClick={() => setIsDialogOpen(true)}>
                            <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Add Phone</span>
                           </Button>
                        </div>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specCategoryGroups.map((group) => (
                    <React.Fragment key={group.title}>
                      <TableRow className="bg-primary hover:bg-primary border-b-4 border-background">
                        <TableCell colSpan={compareList.length + 2} className="font-bold text-primary-foreground sticky left-0 bg-primary z-10">
                          {group.title}
                        </TableCell>
                      </TableRow>
                      {group.specs.map(spec => {
                        const category = group.category as keyof PhoneSpec;
                        const specKey = spec.key as keyof PhoneSpec[typeof category];

                        return (
                         <TableRow key={spec.key}>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">{spec.label}</TableCell>
                            {compareList.map((phone, index) => (
                               <TableCell 
                                key={phone.id} 
                                className={cn(
                                  "text-center",
                                  index < compareList.length - 1 && "border-r"
                                )}
                               >
                                 {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                               </TableCell>
                            ))}
                             {compareList.length < 4 && <TableCell />}
                         </TableRow>
                        )
                      })}
                    </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Price</TableCell>
                    {compareList.map((phone, index) => (
                       <TableCell 
                        key={phone.id} 
                        className={cn(
                          "text-center text-lg font-bold text-primary",
                          index < compareList.length - 1 && "border-r"
                        )}
                       >
                          ${phone.price}
                       </TableCell>
                    ))}
                    {compareList.length < 4 && <TableCell />}
                  </TableRow>
                   <TableRow>
                    <TableCell className="sticky left-0 bg-background z-10"></TableCell>
                    {compareList.map((phone, index) => (
                       <TableCell 
                        key={phone.id} 
                        className={cn(
                          "text-center",
                           index < compareList.length - 1 && "border-r"
                        )}
                       >
                          <Button asChild>
                            <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>View Details</Link>
                          </Button>
                       </TableCell>
                    ))}
                    {compareList.length < 4 && <TableCell />}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
