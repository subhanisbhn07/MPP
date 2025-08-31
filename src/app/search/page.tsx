
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
import { useState, useEffect, useMemo, useCallback } from "react";
import { ComparisonBar } from "@/components/comparison-bar";
import { useCompare } from "@/contexts/compare-context";
import { useSearchParams } from "next/navigation";
import type { Phone } from "@/lib/types";


type Filters = {
  brands: string[];
  priceRange: [number, number];
  ram: number[];
  storage: number[];
  battery: number[];
  mainCamera: number[];
  refreshRate: number[];
  displayPanel: string[];
  chipsetBrand: string[];
  ipRating: string[];
};

const initialFilters: Filters = {
  brands: [],
  priceRange: [0, 2000],
  ram: [],
  storage: [],
  battery: [],
  mainCamera: [],
  refreshRate: [],
  displayPanel: [],
  chipsetBrand: [],
  ipRating: [],
};


export default function SearchPage() {
  const uniqueBrands = [...new Set(allPhones.map(p => p.brand))].sort();
  const { compareList, handleAddToCompare, handleRemoveFromCompare, handleClearCompare } = useCompare();
  
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

 const handleFilterChange = useCallback((category: keyof Filters, value: string | number, isChecked: boolean) => {
    setFilters(prev => {
      const currentValues = prev[category] as (string | number)[];
      // Type guard to ensure we're working with an array
      if (!Array.isArray(currentValues)) return prev;

      const newValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);

      return { ...prev, [category]: newValues };
    });
  }, []);
  
  const handlePriceChange = (newRange: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: newRange }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredPhones = useMemo(() => {
    return allPhones.filter(phone => {
      const queryLower = query.toLowerCase();
      const matchesQuery = queryLower === '' ||
        phone.brand.toLowerCase().includes(queryLower) ||
        phone.model.toLowerCase().includes(queryLower);

      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(phone.brand);
      
      const matchesPrice = phone.price >= filters.priceRange[0] && phone.price <= filters.priceRange[1];

      const matchesRam = filters.ram.length === 0 || filters.ram.some(ram => {
        const phoneRam = parseInt(phone.specs.memory.ram_capacities);
        return phoneRam >= ram;
      });

      const matchesStorage = filters.storage.length === 0 || filters.storage.some(storage => {
        const phoneStorage = Math.max(...phone.specs.memory.storage_capacities.split('/').map(s => parseInt(s)));
        return phoneStorage >= storage;
      });
      
      const matchesBattery = filters.battery.length === 0 || filters.battery.some(bat => {
        const phoneBattery = parseInt(phone.specs.battery.capacity_mah);
        return phoneBattery >= bat;
      });

      const matchesCamera = filters.mainCamera.length === 0 || filters.mainCamera.some(cam => {
        const phoneCamera = parseInt(phone.specs.main_camera.main_sensor_resolution);
        return phoneCamera >= cam;
      });
      
      const matchesRefreshRate = filters.refreshRate.length === 0 || filters.refreshRate.some(rate => {
        const phoneRate = parseInt(phone.specs.display.refresh_rate_hz);
        return phoneRate >= rate;
      });
      
      const matchesPanel = filters.displayPanel.length === 0 || filters.displayPanel.some(panel => {
        return phone.specs.display.panel_type.toLowerCase().includes(panel.toLowerCase());
      });
      
      const matchesChipset = filters.chipsetBrand.length === 0 || filters.chipsetBrand.some(brand => {
        return phone.specs.platform.chipset.toLowerCase().includes(brand.toLowerCase());
      });

      const matchesIpRating = filters.ipRating.length === 0 || filters.ipRating.some(rating => {
        return phone.specs.body.ip_rating.toLowerCase().includes(rating.toLowerCase());
      });

      return matchesQuery && matchesBrand && matchesPrice && matchesRam && matchesStorage && matchesBattery && matchesCamera && matchesRefreshRate && matchesPanel && matchesChipset && matchesIpRating;
    });
  }, [query, filters]);

  const FilterCheckbox = ({ category, value, label }: { category: keyof Filters, value: string | number, label: string }) => (
     <div className="flex items-center space-x-2">
        <Checkbox 
          id={`${String(category)}-${value}`}
          checked={(filters[category] as (string|number)[]).includes(value)}
          onCheckedChange={(checked) => handleFilterChange(category, value, !!checked)}
        />
        <Label htmlFor={`${String(category)}-${value}`} className="font-normal">{label}</Label>
      </div>
  );


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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetFilters}>Reset All</Button>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={['brand', 'price', 'memory', 'display', 'platform', 'camera', 'battery', 'build']} className="w-full">
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-base font-semibold">Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2 max-h-60 overflow-y-auto">
                      {uniqueBrands.map(brand => (
                        <FilterCheckbox key={brand} category="brands" value={brand} label={brand} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      <Slider 
                        value={filters.priceRange} 
                        onValueChange={(val) => handlePriceChange(val as [number, number])}
                        max={2000} 
                        step={50} 
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="memory">
                  <AccordionTrigger className="text-base font-semibold">Memory & Storage</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                        <div>
                            <h4 className="font-medium text-sm mb-2">RAM</h4>
                            <FilterCheckbox category="ram" value={8} label="8GB & above" />
                            <FilterCheckbox category="ram" value={12} label="12GB & above" />
                            <FilterCheckbox category="ram" value={16} label="16GB & above" />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm mb-2">Internal Storage</h4>
                            <FilterCheckbox category="storage" value={256} label="256GB & above" />
                            <FilterCheckbox category="storage" value={512} label="512GB & above" />
                            <FilterCheckbox category="storage" value={1024} label="1TB & above" />
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="display">
                  <AccordionTrigger className="text-base font-semibold">Display</AccordionTrigger>
                  <AccordionContent>
                     <div className="space-y-4 pt-2">
                        <div>
                            <h4 className="font-medium text-sm mb-2">Refresh Rate</h4>
                            <FilterCheckbox category="refreshRate" value={90} label="90Hz & above" />
                            <FilterCheckbox category="refreshRate" value={120} label="120Hz & above" />
                            <FilterCheckbox category="refreshRate" value={144} label="144Hz & above" />
                        </div>
                         <div>
                            <h4 className="font-medium text-sm mb-2">Panel Type</h4>
                            <FilterCheckbox category="displayPanel" value="AMOLED" label="AMOLED" />
                            <FilterCheckbox category="displayPanel" value="OLED" label="OLED" />
                            <FilterCheckbox category="displayPanel" value="LCD" label="LCD" />
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="platform">
                  <AccordionTrigger className="text-base font-semibold">Processor</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <h4 className="font-medium text-sm mb-2">Chipset Brand</h4>
                      <FilterCheckbox category="chipsetBrand" value="snapdragon" label="Snapdragon" />
                      <FilterCheckbox category="chipsetBrand" value="mediatek" label="MediaTek" />
                      <FilterCheckbox category="chipsetBrand" value="exynos" label="Exynos" />
                      <FilterCheckbox category="chipsetBrand" value="apple" label="Apple A-series" />
                      <FilterCheckbox category="chipsetBrand" value="google" label="Google Tensor" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="camera">
                  <AccordionTrigger className="text-base font-semibold">Camera</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                       <h4 className="font-medium text-sm mb-2">Main Camera</h4>
                       <FilterCheckbox category="mainCamera" value={48} label="48MP & above" />
                       <FilterCheckbox category="mainCamera" value={64} label="64MP & above" />
                       <FilterCheckbox category="mainCamera" value={108} label="108MP & above" />
                       <FilterCheckbox category="mainCamera" value={200} label="200MP & above" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="battery">
                  <AccordionTrigger className="text-base font-semibold">Battery</AccordionTrigger>
                  <AccordionContent>
                     <div className="space-y-2 pt-2">
                        <h4 className="font-medium text-sm mb-2">Capacity</h4>
                        <FilterCheckbox category="battery" value={4000} label="4000mAh & above" />
                        <FilterCheckbox category="battery" value={5000} label="5000mAh & above" />
                        <FilterCheckbox category="battery" value={6000} label="6000mAh & above" />
                      </div>
                  </AccordionContent>
                </AccordionItem>
                
                 <AccordionItem value="build">
                  <AccordionTrigger className="text-base font-semibold">Build & Durability</AccordionTrigger>
                  <AccordionContent>
                     <div className="space-y-2 pt-2">
                        <h4 className="font-medium text-sm mb-2">Water Resistance</h4>
                        <FilterCheckbox category="ipRating" value="ip54" label="IP54 (Splash Proof)" />
                        <FilterCheckbox category="ipRating" value="ip67" label="IP67" />
                        <FilterCheckbox category="ipRating" value="ip68" label="IP68" />
                      </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Showing {filteredPhones.length} results</h2>
          </div>
          
          {filteredPhones.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhones.map(phone => (
                  <PhoneCard key={phone.id} phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                ))}
              </div>
          ) : (
             <div className="text-center py-16">
                <p className="text-muted-foreground">No phones match your criteria.</p>
                <Button variant="link" onClick={resetFilters}>Clear filters and try again</Button>
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
