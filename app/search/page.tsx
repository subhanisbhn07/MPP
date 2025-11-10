'use client';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneCard } from '@/components/phone-card';
import { ComparisonBar } from '@/components/comparison-bar';
import { mockPhones } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonPhones, setComparisonPhones] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    ram: '',
    storage: '',
    battery: '',
  });

  const handleAddToCompare = (phoneId: string) => {
    if (comparisonPhones.includes(phoneId)) {
      setComparisonPhones(comparisonPhones.filter(id => id !== phoneId));
    } else if (comparisonPhones.length < 4) {
      setComparisonPhones([...comparisonPhones, phoneId]);
    }
  };

  const filteredPhones = mockPhones.filter(phone => {
    const matchesSearch = phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         phone.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !filters.brand || phone.brand === filters.brand;
    const matchesPrice = (!filters.minPrice || phone.price >= parseInt(filters.minPrice)) &&
                        (!filters.maxPrice || phone.price <= parseInt(filters.maxPrice));
    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#4169E1] py-8">
        <div className="container">
          <h1 className="text-4xl font-bold text-white mb-6">Search Phones</h1>
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search by brand, model, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 bg-white"
            />
            <Button size="lg" className="bg-[#FFD700] text-gray-900 hover:bg-[#FFD700]/90">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Brand</label>
                  <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Brands</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="OnePlus">OnePlus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">RAM</label>
                  <Select value={filters.ram} onValueChange={(value) => setFilters({...filters, ram: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="4">4GB+</SelectItem>
                      <SelectItem value="6">6GB+</SelectItem>
                      <SelectItem value="8">8GB+</SelectItem>
                      <SelectItem value="12">12GB+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Storage</label>
                  <Select value={filters.storage} onValueChange={(value) => setFilters({...filters, storage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="64">64GB+</SelectItem>
                      <SelectItem value="128">128GB+</SelectItem>
                      <SelectItem value="256">256GB+</SelectItem>
                      <SelectItem value="512">512GB+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Battery</label>
                  <Select value={filters.battery} onValueChange={(value) => setFilters({...filters, battery: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="3000">3000mAh+</SelectItem>
                      <SelectItem value="4000">4000mAh+</SelectItem>
                      <SelectItem value="5000">5000mAh+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({
                    brand: '',
                    minPrice: '',
                    maxPrice: '',
                    ram: '',
                    storage: '',
                    battery: '',
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Found {filteredPhones.length} phone{filteredPhones.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPhones.map(phone => (
                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  onCompare={handleAddToCompare}
                />
              ))}
            </div>

            {filteredPhones.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No phones found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComparisonBar
        phones={comparisonPhones}
        onRemove={(phoneId) => setComparisonPhones(comparisonPhones.filter(id => id !== phoneId))}
        onClear={() => setComparisonPhones([])}
      />
    </div>
  );
}
