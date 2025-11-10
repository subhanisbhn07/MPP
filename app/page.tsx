'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCardFeatured } from '@/components/phone-card-featured';
import { BrowseBySpecs } from '@/components/browse-by-specs';
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

  const trendingPhones = mockPhones.filter(p => p.trending).slice(0, 15);
  const latestPhones = mockPhones.filter(p => p.latestLaunch).slice(0, 15);
  const featuredPhones = mockPhones.filter(p => p.featured).slice(0, 15);
  const allPhones = mockPhones.slice(0, 15);

  const trendingColumns = chunkIntoColumns(trendingPhones, 3);
  const latestColumns = chunkIntoColumns(latestPhones, 3);
  const featuredColumns = chunkIntoColumns(featuredPhones, 3);
  const topOffersColumns = chunkIntoColumns(allPhones, 3);

  const PhoneSection = ({ title, variant, columns, onCompare }: {
    title: string;
    variant: 'yellow' | 'blue';
    columns: any[][];
    onCompare: (id: string) => void;
  }) => {
    const bgColor = variant === 'yellow' ? 'bg-[#FFD700]' : 'bg-[#4169E1]';
    const textColor = variant === 'yellow' ? 'text-gray-900' : 'text-white';

    return (
      <section className={`${bgColor} py-8`}>
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>{title}</h2>
            <button className={`text-sm ${textColor} hover:underline`}>View all →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map(phone => (
                  <PhoneCardFeatured
                    key={phone.id}
                    phone={phone}
                    onCompare={onCompare}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen">
      <section className="bg-[#FFD700] py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover. Compare. Decide.
          </h1>
          <p className="text-xl text-gray-800">
            Find your perfect smartphone with our comprehensive comparison tool
          </p>
        </div>
      </section>

      <section className="bg-[#4169E1] py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Input
                type="search"
                placeholder="Search for phones by brand, model, or specs..."
                className="flex-1 h-12 bg-white"
              />
              <Button size="lg" className="bg-[#FFD700] text-gray-900 hover:bg-[#FFD700]/90 px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PhoneSection
        title="Trending Phones"
        variant="yellow"
        columns={trendingColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Latest Launches"
        variant="blue"
        columns={latestColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Top Offers"
        variant="yellow"
        columns={topOffersColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Best of Today"
        variant="blue"
        columns={featuredColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Highest Battery Life"
        variant="yellow"
        columns={topOffersColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Best for Gaming"
        variant="blue"
        columns={trendingColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Top Camera Phones"
        variant="yellow"
        columns={featuredColumns}
        onCompare={handleAddToCompare}
      />

      <PhoneSection
        title="Budget Phones"
        variant="blue"
        columns={allPhones.slice(0, 12).reduce((acc, phone, i) => {
          const colIndex = i % 3;
          if (!acc[colIndex]) acc[colIndex] = [];
          acc[colIndex].push(phone);
          return acc;
        }, [] as any[][]), 3)}
        onCompare={handleAddToCompare}
      />

      <section className="bg-[#FFD700] py-10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Compare
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Select up to 4 phones to compare side by side
          </p>
          <Link href="/compare">
            <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90 px-8">
              Start Comparing
            </Button>
          </Link>
        </div>
      </section>

      <BrowseBySpecs />

      <section className="bg-[#FFD700] py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Buying Guides</h2>
            <button className="text-sm text-gray-900 hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-white">
                <div className="aspect-video relative bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Guide Image
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Best Phones Under $500</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Discover the top budget-friendly smartphones that offer great value for money.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#4169E1] py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Latest News</h2>
            <button className="text-sm text-white hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map(article => (
              <Card key={article.id} className="overflow-hidden bg-white">
                <div className="aspect-video relative bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    News Image
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-medium mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-base font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFD700] py-10">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Trusted Source for Phone Comparisons
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Join thousands of users who trust MobilePhonesPro for their smartphone research
          </p>
          <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90 px-8">
            Get Started
          </Button>
        </div>
      </section>

      {/* Comparison Bar */}
      <ComparisonBar
        phones={comparisonPhones}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
      />
    </main>
  );
}
