'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCard } from '@/components/phone-card';
import { ComparisonBar } from '@/components/comparison-bar';
import { mockPhones, mockNews } from '@/lib/mock-data';
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

  return (
    <main className="min-h-screen">
      {/* Hero Section - Yellow */}
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

      {/* Search Section - Blue */}
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

      {/* Trending Phones Section - Yellow Background */}
      <section className="bg-[#FFD700] py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Phones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPhones.filter(p => p.trending).map(phone => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Launches Section - Blue Background */}
      <section className="bg-[#4169E1] py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-white mb-8">Latest Launches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPhones.filter(p => p.latestLaunch).map(phone => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Phones Section - Yellow Background */}
      <section className="bg-[#FFD700] py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Phones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPhones.filter(p => p.featured).map(phone => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section - Blue Background */}
      <section className="bg-[#4169E1] py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-white mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockNews.map(article => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video relative bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    News Image
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link href={`/news/${article.slug}`}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Compare Section - Yellow Background */}
      <section className="bg-[#FFD700] py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Compare
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Select up to 4 phones to compare side by side
          </p>
          <Link href="/compare">
            <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90">
              Start Comparing
            </Button>
          </Link>
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
