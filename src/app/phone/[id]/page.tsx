
'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec, SpecCategory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { PlusCircle, Heart, Share2, Award, Star, CheckCircle, XCircle } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PhoneDetailsPage({ params }: { params: { id: string } }) {
  const phone = allPhones.find(p => p.id === parseInt(params.id));

  if (!phone) {
    return <div>Phone not found</div>
  }

  const renderSpecValue = (value: string) => {
    if (value.toLowerCase() === 'yes') return <CheckCircle className="text-green-500" />;
    if (value.toLowerCase() === 'no') return <XCircle className="text-red-500" />;
    return value;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="aspect-[4/5] relative mb-4">
                <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
              </div>
              <h1 className="text-2xl font-bold">{phone.brand} {phone.model}</h1>
              <p className="text-3xl font-bold text-primary mt-2">${phone.price}</p>
              <div className="flex gap-2 mt-4">
                <Button className="w-full">Buy Now</Button>
                <Button variant="outline" size="icon"><Heart /></Button>
                <Button variant="outline" size="icon"><Share2 /></Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Specifications</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    <Card>
                        <CardContent className="p-4">
                            <Award className="mx-auto h-8 w-8 text-primary mb-2" />
                            <p className="text-sm text-muted-foreground">Display</p>
                            <p className="font-semibold">{phone.specs.display.size_inches}"</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <Award className="mx-auto h-8 w-8 text-primary mb-2" />
                            <p className="text-sm text-muted-foreground">Main Camera</p>
                            <p className="font-semibold">{phone.specs.main_camera.main_sensor_resolution}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="p-4">
                            <Award className="mx-auto h-8 w-8 text-primary mb-2" />
                            <p className="text-sm text-muted-foreground">Chipset</p>
                            <p className="font-semibold truncate">{phone.specs.platform.chipset}</p>
                        </CardContent>
                    </Card>
                </div>
              </div>
             
              <div>
                <h2 className="text-2xl font-bold mb-4">Full Specifications</h2>
                {specCategoryGroups.map((group) => (
                    <Card key={group.title} className="mb-6">
                      <CardHeader>
                        <CardTitle>{group.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <Table>
                          <TableBody>
                            {group.specs.map(spec => {
                              const category = group.category as keyof PhoneSpec;
                              const specKey = spec.key as keyof PhoneSpec[typeof category];
                              const value = (phone.specs[category] as any)?.[specKey] || 'N/A';

                              return (
                               <TableRow key={spec.key}>
                                  <TableCell className="font-medium w-1/3">{spec.label}</TableCell>
                                  <TableCell>{renderSpecValue(value)}</TableCell>
                               </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
