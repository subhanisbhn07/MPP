'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { SearchBarBlock } from '@/components/blocks/SearchBarBlock';
import { PhoneListBlock } from '@/components/blocks/PhoneListBlock';
import { QuickCompareBlock } from '@/components/blocks/QuickCompareBlock';
import { BrowseBySpecs } from '@/components/browse-by-specs';
import { ComparisonBar } from '@/components/comparison-bar';
import { mockPhones, mockNews } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const allPhones = mockPhones;

  return (
    <main className="min-h-screen">
      <HeroBlock 
        title="Discover. Compare. Decide."
        subtitle="Find your perfect smartphone with our comprehensive comparison tool"
      />

      <SearchBarBlock />

      <PhoneListBlock
        title="Trending Phones"
        variant="yellow"
        phones={trendingPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Latest Launches"
        variant="blue"
        phones={latestPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Top Offers"
        variant="yellow"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Best of Today"
        variant="blue"
        phones={featuredPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Highest Battery Life"
        variant="yellow"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Best for Gaming"
        variant="blue"
        phones={trendingPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Top Camera Phones"
        variant="yellow"
        phones={featuredPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Budget Phones"
        variant="blue"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <QuickCompareBlock
        title="Quick Compare"
        description="Select up to 4 phones to compare side by side"
        ctaText="Start Comparing"
      />

      <BrowseBySpecs />

      <section className="bg-[#FFD700] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Buying Guides</h2>
            <button className="text-xs sm:text-sm text-gray-900 hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      <section className="bg-[#4169E1] py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Latest News</h2>
            <button className="text-xs sm:text-sm text-white hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      <section className="bg-[#FFD700] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your Trusted Source for Phone Comparisons
          </h2>
          <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6">
            Join thousands of users who trust MobilePhonesPro for their smartphone research
          </p>
          <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90 px-6 sm:px-8 text-sm sm:text-base">
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
