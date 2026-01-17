'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ArrowRight, Users, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PhoneCard } from '@/components/phone-card';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { JsonLd, generateItemListSchema, generateFAQSchema } from '@/components/seo';
import { useCompare } from '@/contexts/compare-context';
import { calculatePhoneRating } from '@/lib/rating';
import type { Phone } from '@/lib/types';

interface PersonaConfig {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  keywords: string[];
  prioritySpecs: string[];
}

interface PersonaClientProps {
  config: PersonaConfig;
  phones: Phone[];
  faqs: { question: string; answer: string }[];
  relatedPersonas: PersonaConfig[];
  allPersonas: PersonaConfig[];
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'latest' | 'rating';

export function PersonaClient({ config, phones, faqs, relatedPersonas, allPersonas }: PersonaClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [showAllPhones, setShowAllPhones] = useState(false);
  const { handleAddToCompare } = useCompare();

  const sortedPhones = useMemo(() => {
    const sorted = [...phones];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'latest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.specs.launch.announced_date || '2000-01-01').getTime();
          const dateB = new Date(b.specs.launch.announced_date || '2000-01-01').getTime();
          return dateB - dateA;
        });
      case 'rating':
        return sorted.sort((a, b) => calculatePhoneRating(b).overall - calculatePhoneRating(a).overall);
      default:
        return sorted;
    }
  }, [phones, sortBy]);

  const displayedPhones = showAllPhones ? sortedPhones : sortedPhones.slice(0, 12);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Best Phones', href: '/categories' },
    { label: `Best Phone for ${config.title}`, href: `/best-phone-for-${config.slug}` },
  ];

  const priceRanges = useMemo(() => {
    if (phones.length === 0) return { min: 0, max: 0, avg: 0 };
    const prices = phones.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    };
  }, [phones]);

  const topBrands = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    phones.forEach(phone => {
      brandCounts[phone.brand] = (brandCounts[phone.brand] || 0) + 1;
    });
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([brand, count]) => ({ brand, count }));
  }, [phones]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <JsonLd
        data={generateItemListSchema(
          phones.slice(0, 10),
          `Best Phone for ${config.title}`,
          `Top phones for ${config.title.toLowerCase()} - ${config.description}`
        )}
      />
      <JsonLd data={generateFAQSchema(faqs)} />

      <div className="container mx-auto py-8 px-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Best Phone for {config.title} ({currentYear})
              </h1>
              <p className="text-muted-foreground mt-1">
                {phones.length} phones curated for {config.title.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <p className="text-lg leading-relaxed">{config.longDescription}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{phones.length}</p>
                <p className="text-sm text-muted-foreground">Phones Found</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">${priceRanges.min}</p>
                <p className="text-sm text-muted-foreground">Starting From</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">${priceRanges.avg}</p>
                <p className="text-sm text-muted-foreground">Average Price</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">{topBrands[0]?.brand || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">Top Brand</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">
                Top Picks for {config.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border rounded-md px-3 py-1.5 text-sm bg-background"
                >
                  <option value="relevance">Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="latest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {phones.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No phones found matching the criteria for {config.title.toLowerCase()}.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedPhones.map((phone, index) => (
                    <div key={phone.id} className="relative">
                      {index < 3 && (
                        <Badge className="absolute -top-2 -left-2 z-10 bg-primary">
                          #{index + 1} Pick
                        </Badge>
                      )}
                      <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                    </div>
                  ))}
                </div>

                {sortedPhones.length > 12 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllPhones(!showAllPhones)}
                    >
                      {showAllPhones
                        ? 'Show Less'
                        : `Show All ${sortedPhones.length} Phones`}
                    </Button>
                  </div>
                )}
              </>
            )}

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <CardTitle className="text-base font-medium flex items-center justify-between">
                        {faq.question}
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    {expandedFAQ === index && (
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Brands for {config.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topBrands.map(({ brand, count }) => (
                  <Link
                    key={brand}
                    href={`/${brand.toLowerCase()}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{brand}</span>
                    <Badge variant="secondary">{count} phones</Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Ranges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[300, 500, 800, 1000, 1500].map(price => (
                  <Link
                    key={price}
                    href={`/phones-under-${price}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span>Under ${price}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Explore Other Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedPersonas.map(persona => (
                  <Link
                    key={persona.slug}
                    href={`/best-phone-for-${persona.slug}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="text-sm">{persona.title}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allPersonas.map(persona => (
                    <Link key={persona.slug} href={`/best-phone-for-${persona.slug}`}>
                      <Badge
                        variant={persona.slug === config.slug ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {persona.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/compare"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <span>Compare Phones</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/phones-with-5g"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <span>5G Phones</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/phones-with-wireless-charging"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <span>Wireless Charging</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <span>All Categories</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
