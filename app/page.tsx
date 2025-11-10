'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneListCard } from '@/components/phone-list-card';
import { Section } from '@/components/section';
import { ComparisonBar } from '@/components/comparison-bar';
import { mockPhones, mockNews } from '@/lib/mock-data';
import { chunkIntoColumns } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [comparisonPhones, setComparisonPhones] = useState<string[]>([]);

  const handleAddToCompare = (phoneId: string) => {
    if (comparisonPhones.includes(phoneId)) {
      setComparisonPhones(comparisonPhones.filter(id => id !== phoneId));
    } else if (comparisonPhones.length < 4) {
      setComparisonPhones([...comparisonPhones, phoneId]);
    }
  };

  const handleRemoveFromCompare = (phoneId: string) => {
    setComparisonPhones(comparisonPhones.filter(id => id !== phoneId));
  };

  const handleClearCompare = () => {
    setComparisonPhones([]);
  };

  const trendingPhones = mockPhones.filter(p => p.trending);
  const latestPhones = mockPhones.filter(p => p.latestLaunch);
  const featuredPhones = mockPhones.filter(p => p.featured);

  const trendingColumns = chunkIntoColumns(trendingPhones, 3);
  const latestColumns = chunkIntoColumns(latestPhones, 3);
  const featuredColumns = chunkIntoColumns(featuredPhones, 3);

  return (
    <main className="min-h-screen">
      <section className="bg-[#FFD700] py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover. Compare. Decide.
          </h1>
          <p className="text-xl text-gray-800 mb-8">
            Find your perfect smartphone with our comprehensive comparison tool
          </p>
        </div>
      </section>

      <section className="bg-[#4169E1] py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search for phones by brand, model, or specs..."
                className="flex-1 h-12 bg-white"
              />
              <Button size="lg" className="bg-[#FFD700] text-gray-900 hover:bg-[#FFD700]/90">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section variant="yellow" title="Trending Phones">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.map(phone => (
                <PhoneListCard
                  key={phone.id}
                  phone={phone}
                  onCompare={handleAddToCompare}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section variant="blue" title="Latest Launches">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.map(phone => (
                <PhoneListCard
                  key={phone.id}
                  phone={phone}
                  onCompare={handleAddToCompare}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section variant="yellow" title="Featured Phones">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {column.map(phone => (
                <PhoneListCard
                  key={phone.id}
                  phone={phone}
                  onCompare={handleAddToCompare}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section variant="blue" title="Latest News">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map(article => (
            <Card key={article.id} className="overflow-hidden bg-white">
              <div className="aspect-video relative bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  News Image
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {article.category}
                </div>
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                <Link href={`/news/${article.slug}`}>
                  <Button variant="outline" size="sm">Read More</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="yellow" title="Quick Compare">
        <div className="text-center">
          <p className="text-lg text-gray-800 mb-6">
            Select up to 4 phones to compare side by side
          </p>
          <Link href="/compare">
            <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90">
              Start Comparing
            </Button>
          </Link>
        </div>
      </Section>

      {/* Comparison Bar */}
      <ComparisonBar
        phones={comparisonPhones}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
      />
    </main>
  );
}
