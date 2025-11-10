'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
        variant="primary"
        phones={trendingPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Latest Launches"
        variant="secondary"
        phones={latestPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Top Offers"
        variant="primary"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Best of Today"
        variant="secondary"
        phones={featuredPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Highest Battery Life"
        variant="primary"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Best for Gaming"
        variant="secondary"
        phones={trendingPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Top Camera Phones"
        variant="primary"
        phones={featuredPhones}
        onCompare={handleAddToCompare}
      />

      <PhoneListBlock
        title="Budget Phones"
        variant="secondary"
        phones={allPhones}
        onCompare={handleAddToCompare}
      />

      <QuickCompareBlock
        title="Quick Compare"
        description="Select up to 4 phones to compare side by side"
        ctaText="Start Comparing"
      />

      <BrowseBySpecs />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Buying Guides</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-[#4169E1] transition-colors group">
              View all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group overflow-hidden bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer">
                <div className="aspect-video relative bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Guide Image
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-[#4169E1] transition-colors">Best Phones Under $500</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    Discover the top budget-friendly smartphones that offer great value for money.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Latest News</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-[#4169E1] transition-colors group">
              View all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map(article => (
              <Card key={article.id} className="group overflow-hidden bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer">
                <div className="aspect-video relative bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    News Image
                  </div>
                </div>
                <div className="p-5">
                  <div className="inline-block px-2.5 py-1 bg-blue-50 text-[#4169E1] text-xs font-medium rounded-full mb-3">
                    {article.category}
                  </div>
                  <h3 className="text-base font-semibold mb-2 line-clamp-2 text-gray-900 group-hover:text-[#4169E1] transition-colors">{article.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Your Trusted Source for Phone Comparisons
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
            Join thousands of users who trust MobilePhonesPro for their smartphone research
          </p>
          <Button size="lg" className="bg-[#4169E1] hover:bg-[#3557c9] text-white px-10 h-12 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
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
