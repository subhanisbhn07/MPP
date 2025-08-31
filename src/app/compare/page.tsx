
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { PlusCircle, X } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState } from "react";
import { AddPhoneDialog } from "./components/add-phone-dialog";
import Link from "next/link";

export default function ComparePage() {
  const [comparisonPhones, setComparisonPhones] = useState<Phone[]>(allPhones.slice(0, 2)); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPhone = (phone: Phone) => {
    if (comparisonPhones.length < 4 && !comparisonPhones.find(p => p.id === phone.id)) {
      setComparisonPhones([...comparisonPhones, phone]);
    }
    setIsDialogOpen(false);
  };
  
  const handleRemovePhone = (phoneId: number) => {
    setComparisonPhones(comparisonPhones.filter(p => p.id !== phoneId));
  }

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
                    {comparisonPhones.map(phone => (
                      <TableHead key={phone.id} className="min-w-[200px] text-center">
                        <div className="flex flex-col items-center p-2 relative group">
                           <Image src={phone.image} alt={phone.model} width={100} height={150} className="object-contain rounded-md mb-2 h-36" data-ai-hint="mobile phone" />
                           <p className="font-bold">{phone.brand}</p>
                           <p>{phone.model}</p>
                           <Button 
                             variant="destructive" 
                             size="icon" 
                             className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                             onClick={() => handleRemovePhone(phone.id)}
                           >
                             <X className="h-4 w-4" />
                           </Button>
                        </div>
                      </TableHead>
                    ))}
                    {comparisonPhones.length < 4 && (
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
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={comparisonPhones.length + 2} className="font-bold text-primary sticky left-0 bg-muted/50 z-10">
                          {group.title}
                        </TableCell>
                      </TableRow>
                      {group.specs.map(spec => {
                        const category = group.category as keyof PhoneSpec;
                        const specKey = spec.key as keyof PhoneSpec[typeof category];

                        return (
                         <TableRow key={spec.key}>
                            <TableCell className="font-medium sticky left-0 bg-background z-10">{spec.label}</TableCell>
                            {comparisonPhones.map(phone => (
                               <TableCell key={phone.id} className="text-center">
                                 {(phone.specs[category] as any)?.[specKey] || 'N/A'}
                               </TableCell>
                            ))}
                             {comparisonPhones.length < 4 && <TableCell />}
                         </TableRow>
                        )
                      })}
                    </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Price</TableCell>
                    {comparisonPhones.map(phone => (
                       <TableCell key={phone.id} className="text-center text-lg font-bold text-primary">${phone.price}</TableCell>
                    ))}
                    {comparisonPhones.length < 4 && <TableCell />}
                  </TableRow>
                   <TableRow>
                    <TableCell className="sticky left-0 bg-background z-10"></TableCell>
                    {comparisonPhones.map(phone => (
                       <TableCell key={phone.id} className="text-center">
                          <Button asChild>
                            <Link href={`/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`}>View Details</Link>
                          </Button>
                       </TableCell>
                    ))}
                    {comparisonPhones.length < 4 && <TableCell />}
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
        currentPhones={comparisonPhones}
      />
    </div>
  )
}
