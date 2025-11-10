'use client';

import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockPhones } from '@/lib/mock-data';

export default function PhoneDetailsPage() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const phone = mockPhones[0];

  if (!phone) {
    return (
      <div className="container py-12">
        <p className="text-center text-gray-500">Phone not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-2">
            {phone.brand} {phone.model}
          </h1>
          <p className="text-white/80">Released: {phone.releaseDate}</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="aspect-square bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-400">Phone Image</span>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Tabs defaultValue="specs">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                  <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="mt-6">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="display">
                      <AccordionTrigger>Display</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Size</p>
                            <p className="font-medium">{phone.displaySize}&quot;</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Resolution</p>
                            <p className="font-medium">{phone.displayResolution}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Type</p>
                            <p className="font-medium">{phone.displayType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Refresh Rate</p>
                            <p className="font-medium">{phone.displayRefreshRate}Hz</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Protection</p>
                            <p className="font-medium">{phone.displayProtection}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">PPI</p>
                            <p className="font-medium">{phone.displayPPI}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="performance">
                      <AccordionTrigger>Performance</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Chipset</p>
                            <p className="font-medium">{phone.chipset}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">CPU</p>
                            <p className="font-medium">{phone.cpu}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">GPU</p>
                            <p className="font-medium">{phone.gpu}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">RAM</p>
                            <p className="font-medium">{phone.ram.join('GB, ')}GB</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Storage</p>
                            <p className="font-medium">{phone.storage.join('GB, ')}GB</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="camera">
                      <AccordionTrigger>Camera</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Main Camera</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Megapixels</p>
                                <p className="font-medium">{phone.mainCameraMP}MP</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Aperture</p>
                                <p className="font-medium">{phone.mainCameraAperture}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Sensor Size</p>
                                <p className="font-medium">{phone.mainCameraSensorSize.replace(/"/g, '&quot;')}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">OIS</p>
                                <p className="font-medium">{phone.mainCameraOIS ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Ultrawide Camera</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Megapixels</p>
                                <p className="font-medium">{phone.ultrawideCameraMP}MP</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Field of View</p>
                                <p className="font-medium">{phone.ultrawideFOV}°</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Front Camera</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Megapixels</p>
                                <p className="font-medium">{phone.frontCameraMP}MP</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Video</p>
                                <p className="font-medium">{phone.frontCameraVideo}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="battery">
                      <AccordionTrigger>Battery</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Capacity</p>
                            <p className="font-medium">{phone.batteryCapacity}mAh</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Fast Charging</p>
                            <p className="font-medium">{phone.fastCharging}W</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Wireless Charging</p>
                            <p className="font-medium">{phone.wirelessCharging}W</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Battery Life</p>
                            <p className="font-medium">{phone.batteryLife}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="connectivity">
                      <AccordionTrigger>Connectivity</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">5G</p>
                            <p className="font-medium">{phone.network5G ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Wi-Fi</p>
                            <p className="font-medium">{phone.wifiStandards.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bluetooth</p>
                            <p className="font-medium">{phone.bluetooth}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">NFC</p>
                            <p className="font-medium">{phone.nfc ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">USB</p>
                            <p className="font-medium">{phone.usbType} ({phone.usbVersion})</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="build">
                      <AccordionTrigger>Build & Design</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Dimensions</p>
                            <p className="font-medium">
                              {phone.dimensions.height} x {phone.dimensions.width} x {phone.dimensions.thickness} mm
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Weight</p>
                            <p className="font-medium">{phone.weight}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">IP Rating</p>
                            <p className="font-medium">{phone.ipRating}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Colors</p>
                            <p className="font-medium">{phone.colors.join(', ')}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="software">
                      <AccordionTrigger>Software</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">OS</p>
                            <p className="font-medium">{phone.os} {phone.osVersion}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">UI</p>
                            <p className="font-medium">{phone.ui}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Update Policy</p>
                            <p className="font-medium">{phone.updatePolicy}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <p className="text-gray-500 text-center py-8">No reviews yet</p>
                </TabsContent>

                <TabsContent value="videos" className="mt-6">
                  <p className="text-gray-500 text-center py-8">No videos yet</p>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="text-2xl font-bold mb-4">
                ${phone.price}
              </h3>
              <p className="text-sm text-gray-500 mb-6">{phone.availability}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <span className="font-medium">{phone.rating}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Reviews</span>
                  <span className="font-medium">{phone.reviewCount}</span>
                </div>
              </div>

              <Button className="w-full mb-3 bg-[#4169E1] hover:bg-[#4169E1]/90">
                Buy Now
              </Button>
              <Button variant="outline" className="w-full">
                Compare with Others
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
