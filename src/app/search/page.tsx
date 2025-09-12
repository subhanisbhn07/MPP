
'use client';

import { allPhones } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown, X, ChevronDown, ChevronUp } from "lucide-react";
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


const brandsData = [
    'Acer', 'alcatel', 'Allview', 'Amazon', 'Amoi', 'Apple', 'Archos', 'Asus', 'AT&T', 'Benefon', 'BenQ', 'BenQ-Siemens', 'Bird', 'BlackBerry', 'Blackview', 'BLU', 'Bosch', 'BQ', 'Casio', 'Cat', 'Celkon', 'Chea', 'Coolpad', 'Cubot', 'Dell', 'Doogee', 'Emporia', 'Energizer', 'Ericsson', 'Eten', 'Fairphone', 'Fujitsu Siemens', 'Garmin-Asus', 'Gigabyte', 'Gionee', 'Google', 'Haier', 'HMD', 'Honor', 'HP', 'HTC', 'Huawei', 'i-mate', 'i-mobile', 'Icemobile', 'Infinix', 'Innostream', 'iNQ', 'Intex', 'itel', 'Jolla', 'Karbonn', 'Kyocera', 'Lava', 'LeEco', 'Lenovo', 'LG', 'Maxon', 'Maxwest', 'Meizu', 'Micromax', 'Microsoft', 'Mitac', 'Mitsubishi', 'Modu', 'Motorola', 'MWg', 'NEC', 'Neonode', 'NIU', 'Nokia', 'Nothing', 'Nvidia', 'O2', 'OnePlus', 'Oppo', 'Orange', 'Oscal', 'Oukitel', 'Palm', 'Panasonic', 'Pantech', 'Parla', 'Philips', 'Plum', 'Posh', 'Prestigio', 'QMobile', 'Qtek', 'Razer', 'Realme', 'Sagem', 'Samsung', 'Sendo', 'Sewon', 'Sharp', 'Siemens', 'Sonim', 'Sony', 'Sony Ericsson', 'Spice', 'T-Mobile', 'TCL', 'Tecno', 'Tel.Me.', 'Telit', 'Thuraya', 'Toshiba', 'Ulefone', 'Umidigi', 'Unnecto', 'Vertu', 'verykool', 'vivo', 'VK Mobile', 'Vodafone', 'Wiko', 'WND', 'XCute', 'Xiaomi', 'XOLO', 'Yezz', 'Yota', 'YU', 'ZTE'
].sort();

type Filters = {
  priceRange: [number, number];
  brands: string[];
  marketStatus: string[];
  launchDate: number; // months
  ram: number[]; // GB
  storage: number[]; // GB
  storageType: string[];
  expandableStorage: boolean;
  screenSizes: number[]; // inches
  refreshRate: number[]; // Hz
  resolution: string[];
  processorBrand: string[];
  mainCamera: number[]; // MP
  frontCamera: number[]; // MP
  battery: number[]; // mAh
  quickCharging: boolean;
  wirelessCharging: boolean;
  network5g: boolean;
  hasNfc: boolean;
  isWaterResistant: boolean;
};

const initialFilters: Filters = {
  priceRange: [0, 2000],
  brands: [],
  marketStatus: [],
  launchDate: 0,
  ram: [],
  storage: [],
  storageType: [],
  expandableStorage: false,
  screenSizes: [],
  refreshRate: [],
  resolution: [],
  processorBrand: [],
  mainCamera: [],
  frontCamera: [],
  battery: [],
  quickCharging: false,
  wirelessCharging: false,
  network5g: false,
  hasNfc: false,
  isWaterResistant: false,
};


export default function SearchPage() {
  const { compareList, handleAddToCompare, handleRemoveFromCompare, handleClearCompare } = useCompare();
  
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>('relevance');

  useEffect(() => {
    const brandQuery = searchParams.get('q');
    if (brandQuery) {
        if (brandsData.map(b => b.toLowerCase()).includes(brandQuery.toLowerCase())) {
            const matchingBrand = brandsData.find(b => b.toLowerCase() === brandQuery.toLowerCase());
            if(matchingBrand) {
                setFilters(prev => ({...prev, brands: [matchingBrand]}));
            }
            setQuery('');
        } else {
            setQuery(brandQuery);
        }
    }
  }, [searchParams]);

 const handleCheckboxChange = useCallback((category: keyof Filters, value: string | number | boolean) => {
    setFilters(prev => {
        if (typeof prev[category] === 'boolean') {
             return { ...prev, [category]: !prev[category] };
        }
        
        const currentValues = prev[category] as (string | number)[];
        if (!Array.isArray(currentValues)) return prev;

        const isChecked = currentValues.includes(value as string | number);
        const newValues = isChecked
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        return { ...prev, [category]: newValues };
    });
 }, []);
  
  const handlePriceChange = (newRange: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [newRange[0], newRange[1]] as [number, number] }));
  };
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
        handlePriceChange([value, filters.priceRange[1]]);
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
     if (!isNaN(value)) {
        handlePriceChange([filters.priceRange[0], value]);
    }
  }


  const resetFilters = () => {
    setFilters(initialFilters);
    setQuery('');
  };

  const filteredPhones = useMemo(() => {
    let sortedPhones = [...allPhones];

    // Sorting logic
    if (sortBy && sortBy !== 'relevance') {
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
      
      const matchesProcessor = filters.processorBrand.length === 0 || filters.processorBrand.some(brand => {
        return phone.specs.platform.chipset.toLowerCase().includes(brand.toLowerCase());
      });

      const matchesIpRating = phone.specs.body.ip_rating.toLowerCase();
      const matchesWaterResistance = !filters.isWaterResistant || (matchesIpRating.includes('ip67') || matchesIpRating.includes('ip68'));

      const matches5g = !filters.network5g || phone.specs.network.network_technology.includes('5G');
      const matchesQuickCharging = !filters.quickCharging || parseInt(phone.specs.battery.wired_charging_wattage) >= 25;
      const matchesNFC = !filters.hasNfc || phone.specs.connectivity.nfc.toLowerCase() === 'yes';


      return matchesQuery && matchesBrand && matchesPrice && matchesRam && matchesStorage && matchesBattery && matchesCamera && matchesRefreshRate && matchesProcessor && matchesWaterResistance && matches5g && matchesQuickCharging && matchesNFC;
    });
  }, [query, filters, sortBy]);
  
  const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
     <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
            <h4 className="font-semibold">{title}</h4>
            <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:-rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
            {children}
        </CollapsibleContent>
     </Collapsible>
  )

  const FilterCheckbox = ({ category, value, label }: { category: keyof Filters, value: string | number, label?: string }) => (
     <div className="flex items-center space-x-2">
        <Checkbox 
          id={`${category}-${value}`}
          checked={(filters[category] as (string|number)[]).includes(value)}
          onCheckedChange={() => handleCheckboxChange(category, value)}
        />
        <Label htmlFor={`${category}-${value}`} className="font-normal">{label || value}</Label>
      </div>
  );
  
  const FilterToggle = ({ category, label }: { category: keyof Filters, label: string }) => (
     <div className="flex items-center space-x-2">
        <Checkbox 
          id={`filter-${category}`}
          checked={filters[category] as boolean}
          onCheckedChange={() => handleCheckboxChange(category, true)}
        />
        <Label htmlFor={`filter-${category}`} className="font-normal">{label}</Label>
      </div>
  );

  return (
    <>
    <div className="container mx-auto py-8 px-4 md:px-6">
       <div className="space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Search Phones
            </h1>
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
                     <Button variant="outline" className="h-11 w-full md:w-auto" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                        <SlidersHorizontal className="mr-2" />
                        Filters
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-11 w-full md:w-auto flex-grow md:flex-grow-0">
                            <ArrowUpDown className="mr-2" />
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             {isFiltersOpen && (
                 <Card className="p-4">
                    <CardHeader className="p-2 flex-row items-center justify-between">
                        <CardTitle className="text-lg">Filters</CardTitle>
                        <Button variant="ghost" size="sm" onClick={resetFilters}>
                            <X className="mr-2 h-4 w-4" /> Reset All
                        </Button>
                    </CardHeader>
                    <CardContent className="p-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
                         <div className="col-span-1 md:col-span-4 lg:col-span-5">
                             <FilterSection title="Price">
                                <Slider
                                    value={filters.priceRange}
                                    onValueChange={handlePriceChange}
                                    min={0}
                                    max={2000}
                                    step={50}
                                    className="mb-2"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>${filters.priceRange[0]}</span>
                                    <span>${filters.priceRange[1]}</span>
                                </div>
                             </FilterSection>
                         </div>
                         <div className="max-h-60 overflow-y-auto">
                              <FilterSection title="Brand">
                                {brandsData.map(brand => (
                                     <FilterCheckbox key={brand} category="brands" value={brand} />
                                ))}
                              </FilterSection>
                         </div>
                         <div>
                            <FilterSection title="RAM">
                                <FilterCheckbox category="ram" value={8} label="8GB & above" />
                                <FilterCheckbox category="ram" value={12} label="12GB & above" />
                                <FilterCheckbox category="ram" value={16} label="16GB & above" />
                            </FilterSection>
                            <FilterSection title="Storage">
                                <FilterCheckbox category="storage" value={256} label="256GB & above" />
                                <FilterCheckbox category="storage" value={512} label="512GB & above" />
                                <FilterCheckbox category="storage" value={1024} label="1TB & above" />
                            </FilterSection>
                         </div>
                          <div>
                            <FilterSection title="Battery">
                                <FilterCheckbox category="battery" value={4000} label="4000mAh & above" />
                                <FilterCheckbox category="battery" value={5000} label="5000mAh & above" />
                                <FilterCheckbox category="battery" value={6000} label="6000mAh & above" />
                            </FilterSection>
                             <FilterSection title="Main Camera">
                                <FilterCheckbox category="mainCamera" value={48} label="48MP & above" />
                                <FilterCheckbox category="mainCamera" value={64} label="64MP & above" />
                                <FilterCheckbox category="mainCamera" value={108} label="108MP & above" />
                            </FilterSection>
                         </div>
                         <div>
                            <FilterSection title="Display">
                                <FilterCheckbox category="refreshRate" value={90} label="90Hz & above" />
                                <FilterCheckbox category="refreshRate" value={120} label="120Hz & above" />
                                <FilterCheckbox category="refreshRate" value={144} label="144Hz & above" />
                            </FilterSection>
                            <FilterSection title="Processor">
                                <FilterCheckbox category="processorBrand" value="snapdragon" label="Snapdragon" />
                                <FilterCheckbox category="processorBrand" value="mediatek" label="MediaTek" />
                                <FilterCheckbox category="processorBrand" value="google" label="Google Tensor" />
                                <FilterCheckbox category="processorBrand" value="apple" label="Apple Bionic" />
                            </FilterSection>
                         </div>
                         <div>
                             <FilterSection title="Features">
                                <FilterToggle category="network5g" label="5G Connectivity" />
                                <FilterToggle category="quickCharging" label="Quick Charging" />
                                <FilterToggle category="hasNfc" label="NFC" />
                                <FilterToggle category="isWaterResistant" label="Water Resistant" />
                             </FilterSection>
                         </div>
                     </CardContent>
                 </Card>
             )}
       </div>

      <div className="grid grid-cols-1 gap-8">
        <main>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Showing {filteredPhones.length} results</h2>
          </div>
          
          {filteredPhones.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPhones.map(phone => (
                  <PhoneCard key={phone.id} phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                ))}
              </div>
          ) : (
             <div className="text-center py-16 border-2 border-dashed rounded-lg">
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
