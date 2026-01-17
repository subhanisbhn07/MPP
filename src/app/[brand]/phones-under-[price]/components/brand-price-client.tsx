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
  Tag,
  Building2
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedPriceRange {
  price: number;
  count: number;
}

interface OtherBrand {
  slug: string;
  name: string;
  count: number;
}

interface BrandPriceClientProps {
  brandSlug: string;
  brandName: string;
  maxPrice: number;
  phones: Phone[];
  faqs: FAQItem[];
  relatedPriceRanges: RelatedPriceRange[];
  otherBrands: OtherBrand[];
}

export function BrandPriceClient({ 
  brandSlug,
  brandName,
  maxPrice, 
  phones, 
  faqs, 
  relatedPriceRanges,
  otherBrands
}: BrandPriceClientProps) {
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
    { label: 'Brands', href: '/brands' },
    { label: brandName, href: `/search?q=${brandName}` },
    { label: `Under $${maxPrice}`, href: `/${brandSlug}/phones-under-${maxPrice}` },
  ];

  const categorySchema = generateCategorySchema(
    `Best ${brandName} Phones Under $${maxPrice}`,
    `Discover the best ${brandName} smartphones under $${maxPrice}. Compare ${phones.length}+ phones with detailed specs, ratings, and prices.`,
    phones.slice(0, 10),
    `/${brandSlug}/phones-under-${maxPrice}`
  );

  return (
    <>
      <JsonLd data={[categorySchema, generateFAQSchema(faqs)]} />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              <Building2 className="h-3 w-3 mr-1" />
              {brandName}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <DollarSign className="h-3 w-3 mr-1" />
              Under ${maxPrice}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {phones.length} Phones
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Best {brandName} Phones Under ${maxPrice} ({currentYear})
          </h1>
          
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Discover {phones.length} {brandName} smartphones under ${maxPrice} with detailed 
            specifications, ratings, and prices. Find the perfect {brandName} phone for your budget.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {brandName} Price Ranges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedPriceRanges.map((range) => (
                  <Link 
                    key={range.price} 
                    href={`/${brandSlug}/phones-under-${range.price}`}
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
                  Other Brands Under ${maxPrice}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherBrands.filter(b => b.count > 0).map((brand) => (
                  <Link 
                    key={brand.slug} 
                    href={`/${brand.slug}/phones-under-${maxPrice}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{brand.name}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>{brand.count}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
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
                  href={`/phones-under-${maxPrice}`}
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  All Phones Under ${maxPrice}
                </Link>
                <Link 
                  href={`/search?q=${brandName}`}
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  All {brandName} Phones
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
                Showing {sortedPhones.length} {brandName} phones
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
                  No {brandName} phones found under ${maxPrice}. Try a higher price range or explore other brands.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {relatedPriceRanges.slice(0, 3).map((range) => (
                    <Button key={range.price} variant="outline" asChild>
                      <Link href={`/${brandSlug}/phones-under-${range.price}`}>
                        Under ${range.price}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="default" asChild>
                    <Link href={`/phones-under-${maxPrice}`}>
                      View All Brands Under ${maxPrice}
                    </Link>
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
                About {brandName} Phones Under ${maxPrice}
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  {brandName} offers excellent smartphones in the under ${maxPrice} price segment. 
                  These devices combine the brand's signature features with accessible pricing, 
                  making premium experiences available to more users.
                </p>
                <p>
                  In this price range, {brandName} phones typically feature quality displays, 
                  capable processors, and the brand's renowned software experience. Whether you're 
                  looking for a reliable daily driver or a feature-packed device, there's likely 
                  a {brandName} phone that fits your needs.
                </p>
                <p>
                  Use our comparison tools to evaluate {brandName} phones side-by-side with 
                  competitors. Each listing includes detailed specifications, user ratings, 
                  and current pricing to help you make an informed decision.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
