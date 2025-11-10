'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBarBlock() {
  return (
    <section className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by brand, model, or feature..."
                className="h-12 pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#4169E1] transition-colors"
              />
            </div>
            <Button 
              size="lg" 
              className="bg-[#4169E1] hover:bg-[#3557c9] text-white px-8 h-12 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
