'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Phone } from '@/lib/types';
import { PhoneCard } from '@/components/phone-card';
import { useCompare } from '@/contexts/compare-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Breadcrumb, 
  JsonLd, 
  generateFAQSchema,
  generateItemListSchema
} from '@/components/seo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  ArrowUpDown, 
  Smartphone, 
  TrendingUp,
  HelpCircle,
  Zap,
  Filter,
  ChevronRight
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

interface FeatureClientProps {
  config: FeatureConfig;
  phones: Phone[];
  faqs: FAQItem[];
  relatedFeatures: FeatureConfig[];
  allFeatures: FeatureConfig[];
}

export function FeatureClient({ 
  config,
  phones,
  faqs,
  relatedFeatures,
  allFeatures
}: FeatureClientProps) {
  const { handleAddToCompare } = useCompare();
  const [sortBy, setSortBy] = useState<string>('price-desc');

  const sortedPhones = useMemo(() => {
    const sorted = [...phones];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'latest':
        return sorted.sort((a, b) => 
          new Date(b.specs.launch.announced_date).getTime() - 
          new Date(a.specs.launch.announced_date).getTime()
        );
      case 'rating':
        return sorted.sort((a, b) => 
          parseFloat(b.specs.value_ratings.overall_spec_score || '0') - 
          parseFloat(a.specs.value_ratings.overall_spec_score || '0')
        );
      default:
        return sorted;
    }
  }, [phones, sortBy]);

  const currentYear = new Date().getFullYear();

  const breadcrumbItems = [
    { label: 'Phones', href: '/search' },
    { label: `Phones with ${config.title}`, href: `/phones-with-${config.slug}` },
  ];

  const itemListSchema = generateItemListSchema(
    phones,
    `Phones with ${config.title}`,
    config.description
  );

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    phones.forEach(phone => {
      counts[phone.brand] = (counts[phone.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [phones]);

  const priceRanges = useMemo(() => {
    const ranges = [
      { label: 'Under $300', min: 0, max: 300, count: 0 },
      { label: '$300 - $500', min: 300, max: 500, count: 0 },
      { label: '$500 - $800', min: 500, max: 800, count: 0 },
      { label: '$800 - $1000', min: 800, max: 1000, count: 0 },
      { label: 'Over $1000', min: 1000, max: Infinity, count: 0 },
    ];
    phones.forEach(phone => {
      const range = ranges.find(r => phone.price >= r.min && phone.price < r.max);
      if (range) range.count++;
    });
    return ranges.filter(r => r.count > 0);
  }, [phones]);

  return (
    <>
      <JsonLd data={[itemListSchema, generateFAQSchema(faqs)]} />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <header className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              <Zap className="h-3 w-3 mr-1" />
              Feature
            </Badge>
            <Badge variant="outline" className="text-sm">
              {phones.length} Phones
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Best Phones with {config.title} ({currentYear})
          </h1>
          
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            {config.description}. Compare {phones.length} phones with {config.title.toLowerCase()} - 
            find the perfect device with detailed specifications, ratings, and prices.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Browse by Feature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 max-h-64 overflow-y-auto">
                {allFeatures.map((feature) => (
                  <Link 
                    key={feature.slug} 
                    href={`/phones-with-${feature.slug}`}
                    className={`flex items-center justify-between p-2 rounded-md transition-colors text-sm ${
                      feature.slug === config.slug 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="truncate">{feature.title}</span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {brandCounts.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Top Brands
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {brandCounts.map(([brand, count]) => (
                    <Link 
                      key={brand} 
                      href={`/search?q=${brand}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="font-medium text-sm">{brand}</span>
                      <Badge variant="secondary" className="text-xs">{count}</Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {priceRanges.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Price Ranges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {priceRanges.map((range) => (
                    <div 
                      key={range.label} 
                      className="flex items-center justify-between p-2 text-sm"
                    >
                      <span>{range.label}</span>
                      <Badge variant="outline">{range.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link 
                  href="/search"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  All Phones
                </Link>
                <Link 
                  href="/compare"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Compare Phones
                </Link>
                <Link 
                  href="/category/best-camera-phones"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Best Camera Phones
                </Link>
                <Link 
                  href="/category/best-battery-phones"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Best Battery Life
                </Link>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {sortedPhones.length} phones with {config.title.toLowerCase()}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {sortedPhones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedPhones.map((phone) => (
                  <PhoneCard 
                    key={phone.id} 
                    phone={phone} 
                    onAddToCompare={handleAddToCompare} 
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No phones found with {config.title.toLowerCase()}. Try browsing other features.
                </p>
                <div className="mt-4">
                  <Button asChild>
                    <Link href="/search">Browse All Phones</Link>
                  </Button>
                </div>
              </Card>
            )}

            <section className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Phones with {config.title}?
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  {config.description}. In {currentYear}, having {config.title.toLowerCase()} in your 
                  smartphone can significantly enhance your daily experience.
                </p>
                <p>
                  We've curated {phones.length} phones with {config.title.toLowerCase()} from various 
                  brands and price ranges. Whether you're looking for a budget-friendly option or a 
                  flagship device, our comprehensive comparison tools help you find the perfect match.
                </p>
                <p>
                  Use our filters to narrow down by brand, price range, or other specifications. 
                  Compare up to 4 phones side-by-side to make an informed decision.
                </p>
              </div>
            </section>

            {relatedFeatures.length > 0 && (
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Explore Other Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {relatedFeatures.map((feature) => (
                    <Link 
                      key={feature.slug}
                      href={`/phones-with-${feature.slug}`}
                      className="p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <h3 className="font-medium text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {feature.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
