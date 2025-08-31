
'use client';

import { allPhones } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState, useEffect, useMemo } from "react";
import { ComparisonBar } from "@/components/comparison-bar";
import { useCompare } from "@/contexts/compare-context";
import { useSearchParams, useRouter } from "next/navigation";
import type { Phone } from "@/lib/types";

export default function SearchPage() {
  const brands = [...new Set(allPhones.map(p => p.brand))];
  const { compareList, handleAddToCompare, handleRemoveFromCompare, handleClearCompare } = useCompare();
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => 
      checked ? [...prev, brand] : prev.filter(b => b !== brand)
    );
  };
  
  const filteredPhones = useMemo(() => {
    return allPhones.filter(phone => {
      const queryLower = query.toLowerCase();
      const matchesQuery = queryLower === '' ||
        phone.brand.toLowerCase().includes(queryLower) ||
        phone.model.toLowerCase().includes(queryLower);

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(phone.brand);
      
      const matchesPrice = phone.price >= priceRange[0] && phone.price <= priceRange[1];

      return matchesQuery && matchesBrand && matchesPrice;
    });
  }, [query, selectedBrands, priceRange]);


  return (
    <>
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Search Phones
        </h1>
        <div className="w-full max-w-2xl space-y-2">
            <div className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search by name, brand, or feature..."
                className="max-w-lg flex-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="default">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={['brand', 'price']} className="w-full">
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-base font-semibold">Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={brand} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                          />
                          <Label htmlFor={brand} className="font-normal">{brand}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <Slider 
                        value={priceRange} 
                        onValueChange={setPriceRange} 
                        max={2000} 
                        step={50} 
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="camera">
                  <AccordionTrigger className="text-base font-semibold">Camera</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cam-200" />
                        <Label htmlFor="cam-200" className="font-normal">200MP or more</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="cam-108" />
                        <Label htmlFor="cam-108" className="font-normal">108MP or more</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cam-50" />
                        <Label htmlFor="cam-50" className="font-normal">50MP or more</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Showing {filteredPhones.length} results</h2>
          {filteredPhones.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhones.map(phone => (
                  <PhoneCard key={phone.id} phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                ))}
              </div>
          ) : (
             <div className="text-center py-16">
                <p className="text-muted-foreground">No phones match your criteria.</p>
             </div>
          )}
        </main>
      </div>
    </div>
    <ComparisonBar
      phones={compareList}
      onRemove={handleRemoveFromCompare}
      onClear={handleClearCompare}
    />
    </>
  );
}
