

'use client';

import { allPhones } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect, useMemo, useCallback } from "react";
import { ComparisonBar } from "@/components/comparison-bar";
import { useCompare } from "@/contexts/compare-context";
import { useSearchParams } from "next/navigation";
import type { Phone } from "@/lib/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";


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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>('');


  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

 const handleFilterChange = useCallback((category: keyof Filters, value: string | number, isChecked: boolean) => {
    setFilters(prev => {
      const currentValues = prev[category] as (string | number)[];
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
    let sortedPhones = [...allPhones];

    // Sorting logic
    if (sortBy) {
        sortedPhones.sort((a, b) => {
            switch(sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'latest':
                    return new Date(b.specs.launch.announced_date).getTime() - new Date(a.specs.launch.announced_date).getTime();
                default:
                    return 0;
            }
        });
    }

    return sortedPhones.filter(phone => {
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
  }, [query, filters, sortBy]);

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
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative w-full flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name, brand, or feature..."
                        className="w-full pl-10 h-11"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" className="h-11 w-full md:w-auto">
                            <SlidersHorizontal className="mr-2" />
                            Filters
                        </Button>
                    </CollapsibleTrigger>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-11 w-full md:w-[180px]">
                            <ArrowUpDown className="mr-2" />
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Popularity</SelectItem>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <CollapsibleContent className="mt-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Filters</CardTitle>
                        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset All</Button>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-2">Brand</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                {uniqueBrands.map(brand => (
                                <FilterCheckbox key={brand} category="brands" value={brand} label={brand} />
                                ))}
                            </div>
                          </div>
                          <Separator />
                           <div>
                            <h3 className="font-semibold mb-2">Price Range</h3>
                            <div className="space-y-4 max-w-md">
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
                           </div>
                           <Separator />
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
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
                            <div className="space-y-4">
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
                             <div className="space-y-4">
                                 <div>
                                    <h4 className="font-medium text-sm mb-2">Water Resistance</h4>
                                    <FilterCheckbox category="ipRating" value="ip54" label="IP54 (Splash Proof)" />
                                    <FilterCheckbox category="ipRating" value="ip67" label="IP67" />
                                    <FilterCheckbox category="ipRating" value="ip68" label="IP68" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2">Chipset Brand</h4>
                                    <FilterCheckbox category="chipsetBrand" value="snapdragon" label="Snapdragon" />
                                    <FilterCheckbox category="chipsetBrand" value="mediatek" label="MediaTek" />
                                    <FilterCheckbox category="chipsetBrand" value="exynos" label="Exynos" />
                                    <FilterCheckbox category="chipsetBrand" value="apple" label="Apple A-series" />
                                    <FilterCheckbox category="chipsetBrand" value="google" label="Google Tensor" />
                                </div>
                            </div>
                           </div>
                       </div>
                    </CardContent>
                 </Card>
            </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="grid grid-cols-1">
        <main>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Showing {filteredPhones.length} results</h2>
          </div>
          
          {filteredPhones.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
