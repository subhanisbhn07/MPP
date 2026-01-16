'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SearchSection() {
  const router = useRouter();
  const [searchQuery, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy) params.set('sort', sortBy);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className="bg-primary text-primary-foreground rounded-lg">
      <section
        className="w-full py-8 md:py-12"
        aria-labelledby="search-heading"
      >
        <div className="container px-4 md:px-6">
          <h2 id="search-heading" className="sr-only">Search and filters</h2>
          <form className="flex flex-col gap-4" role="search" method="get" action="/search" onSubmit={onSubmitSearch}>
            <div className="relative flex-1">
              <label htmlFor="q" className="sr-only">Search by brand, model, or feature</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input
                id="q"
                name="q"
                type="search"
                placeholder="Search by brand, model, or feature..."
                className="w-full pl-10 h-12 text-base bg-background text-foreground border-input placeholder:text-muted-foreground focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-row">
              <Button
                type="button"
                variant="accent"
                size="lg"
                className="h-12 w-full text-foreground"
                aria-label="Open filters"
              >
                <Filter className="mr-2 h-5 w-5" aria-hidden="true" /> Filters
              </Button>

              <div className="w-full">
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy} name="sort">
                  <SelectTrigger id="sort" className="h-12 w-full bg-accent text-foreground border-accent-foreground/20 focus:ring-ring data-[placeholder]:text-foreground/80" aria-label="Sort By">
                    <ArrowUpDown className="mr-2 h-5 w-5" aria-hidden="true" />
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

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full col-span-2 text-foreground"
                variant="accent"
                aria-label="Search phones"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Card>
  );
}
