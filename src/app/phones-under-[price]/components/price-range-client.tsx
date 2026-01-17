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
  generateItemListSchema, 
  generateFAQSchema,
  generateCategorySchema 
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
  DollarSign, 
  Smartphone, 
  TrendingUp,
  ChevronRight,
  HelpCircle,
  Tag
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedPriceRange {
  price: number;
  count: number;
}

interface PriceRangeClientProps {
  maxPrice: number;
  phones: Phone[];
  faqs: FAQItem[];
  relatedPriceRanges: RelatedPriceRange[];
}

export function PriceRangeClient({ 
  maxPrice, 
  phones, 
  faqs, 
  relatedPriceRanges 
}: PriceRangeClientProps) {
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

  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(phones.map(p => p.brand))];
    return brands.sort();
  }, [phones]);

  const currentYear = new Date().getFullYear();

  const breadcrumbItems = [
    { label: 'Phones', href: '/search' },
    { label: `Under $${maxPrice}`, href: `/phones-under-${maxPrice}` },
  ];

  const categorySchema = generateCategorySchema(
    `Best Phones Under $${maxPrice}`,
    `Discover the best smartphones under $${maxPrice}. Compare ${phones.length}+ phones with detailed specs, ratings, and prices.`,
    phones.slice(0, 10),
    `/phones-under-${maxPrice}`
  );

  return (
    <>
      <JsonLd data={[categorySchema, generateFAQSchema(faqs)]} />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <DollarSign className="h-3 w-3 mr-1" />
              Budget Friendly
            </Badge>
            <Badge variant="outline" className="text-sm">
              {phones.length} Phones
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Best Phones Under ${maxPrice} ({currentYear})
          </h1>
          
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Discover {phones.length} smartphones under ${maxPrice} with detailed specifications, 
            ratings, and prices. Compare phones from {uniqueBrands.length} brands including{' '}
            {uniqueBrands.slice(0, 5).join(', ')}{uniqueBrands.length > 5 ? ' and more' : ''}.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Other Price Ranges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedPriceRanges.map((range) => (
                  <Link 
                    key={range.price} 
                    href={`/phones-under-${range.price}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">Under ${range.price}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>{range.count}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Brands in Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {uniqueBrands.slice(0, 10).map((brand) => (
                    <Link key={brand} href={`/${brand.toLowerCase()}/phones-under-${maxPrice}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        {brand}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
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
                <Link 
                  href="/category/best-gaming-phones"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Best Gaming Phones
                </Link>
                <Link 
                  href="/category/5g-phones"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  5G Phones
                </Link>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {sortedPhones.length} phones
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
                  No phones found under ${maxPrice}. Try a higher price range.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {relatedPriceRanges.slice(0, 3).map((range) => (
                    <Button key={range.price} variant="outline" asChild>
                      <Link href={`/phones-under-${range.price}`}>
                        Under ${range.price}
                      </Link>
                    </Button>
                  ))}
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
                About Phones Under ${maxPrice}
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  Finding the perfect smartphone under ${maxPrice} has never been easier. 
                  Our comprehensive database includes {phones.length} phones from {uniqueBrands.length} leading 
                  manufacturers, each carefully analyzed across over 200 specifications.
                </p>
                <p>
                  In the under ${maxPrice} segment, you'll find excellent options for every need. 
                  Whether you prioritize camera quality, battery life, gaming performance, or 
                  overall value, there's a phone that fits your requirements and budget.
                </p>
                <p>
                  Use our comparison tools to evaluate phones side-by-side and make an informed 
                  decision. Each phone listing includes detailed specifications, user ratings, 
                  and current pricing information to help you find the best deal.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
