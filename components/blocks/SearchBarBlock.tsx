'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBarBlock() {
  return (
    <section className="bg-[#4169E1] py-4 sm:py-6">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Input
              type="search"
              placeholder="Search phones..."
              className="flex-1 h-10 sm:h-12 bg-white text-sm sm:text-base"
            />
            <Button size="lg" className="bg-[#FFD700] text-gray-900 hover:bg-[#FFD700]/90 px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
