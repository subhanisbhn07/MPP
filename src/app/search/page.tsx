
'use client';

import { allPhones } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp, X } from "lucide-react";
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
  priceRange: [number, number];
  brands: string[];
  ram: number[];
  storage: number[];
  battery: number[];
  mainCamera: number[];
  refreshRate: number[];
  displayPanel: string[];
  chipsetBrand: string[];
  ipRating: string[];
  marketStatus: string[];
  has5g: boolean;
  hasQuickCharging: boolean;
  hasDualSim: boolean;
};

const initialFilters: Filters = {
  priceRange: [0, 2000],
  brands: [],
  ram: [],
  storage: [],
  battery: [],
  mainCamera: [],
  refreshRate: [],
  displayPanel: [],
  chipsetBrand: [],
  ipRating: [],
  marketStatus: [],
  has5g: false,
  hasQuickCharging: false,
  hasDualSim: false,
};


export default function SearchPage() {
    const brandsData = [
        'Acer','alcatel','Allview','Amazon','Amoi','Apple','Archos','Asus','AT&T','Benefon','BenQ','BenQ-Siemens','Bird','BlackBerry','Blackview','BLU','Bosch','BQ','Casio','Cat','Celkon','Chea','Coolpad','Cubot','Dell','Doogee','Emporia','Energizer','Ericsson','Eten','Fairphone','Fujitsu Siemens','Garmin-Asus','Gigabyte','Gionee','Google','Haier','HMD','Honor','HP','HTC','Huawei','i-mate','i-mobile','Icemobile','Infinix','Innostream','iNQ','Intex','itel','Jolla','Karbonn','Kyocera','Lava','LeEco','Lenovo','LG','Maxon','Maxwest','Meizu','Micromax','Microsoft','Mitac','Mitsubishi','Modu','Motorola','MWg','NEC','Neonode','NIU','Nokia','Nothing','Nvidia','O2','OnePlus','Oppo','Orange','Oscal','Oukitel','Palm','Panasonic','Pantech','Parla','Philips','Plum','Posh','Prestigio','QMobile','Qtek','Razer','Realme','Sagem','Samsung','Sendo','Sewon','Sharp','Siemens','Sonim','Sony','Sony Ericsson','Spice','T-Mobile','TCL','Tecno','Tel.Me.','Telit','Thuraya','Toshiba','Ulefone','Umidigi','Unnecto','Vertu','verykool','vivo','VK Mobile','Vodafone','Wiko','WND','XCute','Xiaomi','XOLO','Yezz','Yota','YU','ZTE'
    ].sort();

  const { compareList, handleAddToCompare, handleRemoveFromCompare, handleClearCompare } = useCompare();
  
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    const brandQuery = searchParams.get('q');
    if (brandQuery && brandsData.includes(brandQuery)) {
        setFilters(prev => ({...prev, brands: [brandQuery]}));
        setQuery('');
    } else {
        setQuery(brandQuery || '');
    }
  }, [searchParams, brandsData]);

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
    setFilters(prev => ({ ...prev, priceRange: [newRange[0], newRange[1]] }));
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

      const matches5g = !filters.has5g || phone.specs.network.network_technology.includes('5G');
      const matchesQuickCharging = !filters.hasQuickCharging || parseInt(phone.specs.battery.wired_charging_wattage) >= 25;
      const matchesDualSim = !filters.hasDualSim || phone.specs.network.sim_slots_and_type.toLowerCase().includes('dual');


      return matchesQuery && matchesBrand && matchesPrice && matchesRam && matchesStorage && matchesBattery && matchesCamera && matchesRefreshRate && matchesPanel && matchesChipset && matchesIpRating && matches5g && matchesQuickCharging && matchesDualSim;
    });
  }, [query, filters, sortBy]);

  const FilterCheckbox = ({ id, category, value, label }: { id: string, category: keyof Filters, value: string | number, label?: string }) => (
     <div className="flex items-center space-x-2">
        <Checkbox 
          id={id}
          checked={(filters[category] as (string|number)[]).includes(value)}
          onCheckedChange={() => handleCheckboxChange(category, value)}
        />
        <Label htmlFor={id} className="font-normal">{label || value}</Label>
      </div>
  );
  
  const FilterToggle = ({ id, category, label }: { id: string, category: keyof Filters, label: string }) => (
     <div className="flex items-center space-x-2">
        <Checkbox 
          id={id}
          checked={filters[category] as boolean}
          onCheckedChange={() => handleCheckboxChange(category, '')}
        />
        <Label htmlFor={id} className="font-normal">{label}</Label>
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
                        <SelectTrigger className="h-11 w-full md:w-[180px]">
                            <ArrowUpDown className="mr-2" />
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Relevance</SelectItem>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {isFiltersOpen && (
            <aside className="lg:col-span-1">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle>Filters</CardTitle>
                        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset All</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Collapsible defaultOpen>
                            <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold">
                                Price
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pt-4 space-y-4">
                                <Slider
                                  value={filters.priceRange}
                                  onValueChange={handlePriceChange}
                                  min={0}
                                  max={2000}
                                  step={50}
                                />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>${filters.priceRange[0]}</span>
                                    <span>${filters.priceRange[1]}</span>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Separator/>
                        <Collapsible>
                            <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold">
                                Featured
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                             <CollapsibleContent className="pt-4 space-y-2">
                                <FilterToggle id="filter-5g" category="has5g" label="5G Connectivity" />
                                <FilterToggle id="filter-quick-charging" category="hasQuickCharging" label="Quick Charging" />
                                <FilterToggle id="filter-dual-sim" category="hasDualSim" label="Dual SIM" />
                             </CollapsibleContent>
                        </Collapsible>
                        <Separator/>
                         <Collapsible>
                            <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold">
                                Brands
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                             <CollapsibleContent className="pt-4 space-y-2 max-h-60 overflow-y-auto">
                               {brandsData.map(brand => (
                                    <FilterCheckbox key={brand} id={`brand-${brand}`} category="brands" value={brand} />
                               ))}
                             </CollapsibleContent>
                        </Collapsible>
                        <Separator/>
                         <Collapsible>
                            <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold">
                                RAM
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                             <CollapsibleContent className="pt-4 space-y-2">
                                <FilterCheckbox id="ram-8" category="ram" value={8} label="8GB & above" />
                                <FilterCheckbox id="ram-12" category="ram" value={12} label="12GB & above" />
                                <FilterCheckbox id="ram-16" category="ram" value={16} label="16GB & above" />
                             </CollapsibleContent>
                        </Collapsible>
                         <Separator/>
                         <Collapsible>
                            <CollapsibleTrigger className="flex justify-between items-center w-full font-semibold">
                                Storage
                                <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                             <CollapsibleContent className="pt-4 space-y-2">
                                <FilterCheckbox id="storage-256" category="storage" value={256} label="256GB & above" />
                                <FilterCheckbox id="storage-512" category="storage" value={512} label="512GB & above" />
                                <FilterCheckbox id="storage-1024" category="storage" value={1024} label="1TB & above" />
                             </CollapsibleContent>
                        </Collapsible>
                    </CardContent>
                </Card>
            </aside>
        )}
        
        <main className={isFiltersOpen ? "lg:col-span-3" : "lg:col-span-4"}>
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
