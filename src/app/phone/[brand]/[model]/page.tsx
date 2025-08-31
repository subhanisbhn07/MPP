

'use client';

import { allPhones } from "@/lib/data"
import type { Phone, PhoneSpec } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { Heart, Share2, Award, Star, CheckCircle, XCircle, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { specCategoryGroups } from "@/lib/types";
import React, { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function PhoneDetailsPage() {
  const params = useParams();
  const brand = Array.isArray(params.brand) ? params.brand[0] : params.brand;
  const model = Array.isArray(params.model) ? params.model[0] : params.model;

  const phone = allPhones.find(p => p.brand.toLowerCase() === decodeURIComponent(brand).toLowerCase() && p.model.toLowerCase().replace(/ /g, '-') === decodeURIComponent(model).toLowerCase());
  
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!phone) {
    return <div>Phone not found</div>
  }
  
  const allImages = [phone.image, ...(phone.images || [])];

  const renderSpecValue = (value: string | undefined | null) => {
    if(!value) return 'N/A';
    if (value.toLowerCase() === 'yes') return <CheckCircle className="text-green-500" />;
    if (value.toLowerCase() === 'no') return <XCircle className="text-red-500" />;
    return value;
  }
  
  const reviews = [
    { name: "Alex R.", rating: 5, date: "2 weeks ago", comment: "Absolutely love the camera on this phone! The zoom is incredible and the photos are so crisp. Battery life is also a huge plus." },
    { name: "Ben C.", rating: 4, date: "1 month ago", comment: "Great performance and beautiful display. My only complaint is that it feels a bit heavy, but you get used to it. Solid phone overall." },
    { name: "Chloe D.", rating: 5, date: "3 months ago", comment: "The best phone I've ever owned. It's fast, the software is clean, and the build quality is top-notch. Highly recommend!" },
  ];
  const totalReviews = 186;
  const ratingDistribution = [120, 45, 11, 5, 5];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <Carousel setApi={setApi} className="relative mb-4">
                  <CarouselContent>
                    {allImages.map((img, index) => (
                      <CarouselItem key={index}>
                         <div className="aspect-[4/5] relative">
                            <Image src={img} alt={`${phone.model} image ${index + 1}`} fill className="object-contain rounded-md" data-ai-hint="mobile phone" />
                          </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </Carousel>
              <div className="flex justify-center gap-2 mb-4">
                {allImages.map((_, index) => (
                  <button key={index} onClick={() => api?.scrollTo(index)} className={cn("w-12 h-16 border-2 rounded-md overflow-hidden", (current -1) === index ? 'border-primary' : 'border-transparent')}>
                    <Image src={allImages[index]} alt={`${phone.model} thumbnail ${index + 1}`} width={48} height={64} className="object-cover w-full h-full" data-ai-hint="mobile phone" />
                  </button>
                ))}
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
               {phone.youtubeVideoId && (
                <div>
                   <h2 className="text-2xl font-bold mb-4">Video Review</h2>
                   <div className="aspect-video">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${phone.youtubeVideoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                   </div>
                </div>
              )}
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
                              const value = (phone.specs[category] as any)?.[specKey];

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
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                             <div className="flex flex-col items-center">
                                <span className="text-5xl font-bold">4.6</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(4)].map((_,i) => <Star key={i} className="fill-current" />)}
                                    <Star />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{totalReviews} ratings</p>
                             </div>
                             <div className="w-full flex-1">
                                 {ratingDistribution.map((count, index) => (
                                     <div key={index} className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{5-index} star</span>
                                        <Progress value={(count/totalReviews) * 100} className="w-full h-2" />
                                        <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Separator className="my-4" />
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Showing 3 of {totalReviews} reviews</h3>
                            <Button variant="outline">Write a Review</Button>
                           </div>
                           {reviews.map((review, index) => (
                               <div key={index} className="flex gap-4">
                                   <Avatar>
                                     <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                   </Avatar>
                                   <div>
                                     <div className="flex items-center gap-2 mb-1">
                                       <h4 className="font-semibold">{review.name}</h4>
                                       <div className="flex text-yellow-400">
                                          {[...Array(review.rating)].map((_,i) => <Star key={i} size={16} className="fill-current" />)}
                                          {[...Array(5 - review.rating)].map((_,i) => <Star key={i} size={16} />)}
                                       </div>
                                     </div>
                                     <p className="text-sm text-muted-foreground">{review.date}</p>
                                     <p className="mt-2">{review.comment}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
    
