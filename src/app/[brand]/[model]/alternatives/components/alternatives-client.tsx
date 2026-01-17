'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  generateItemListSchema,
  generateProductSchema
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
  ArrowRight,
  Cpu,
  Camera,
  Battery,
  MemoryStick,
  RefreshCw,
  Layers
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AlternativesClientProps {
  phone: Phone;
  alternatives: Phone[];
  sameBrandAlternatives: Phone[];
  otherBrandAlternatives: Phone[];
  faqs: FAQItem[];
}

export function AlternativesClient({ 
  phone,
  alternatives,
  sameBrandAlternatives,
  otherBrandAlternatives,
  faqs
}: AlternativesClientProps) {
  const { handleAddToCompare } = useCompare();
  const [sortBy, setSortBy] = useState<string>('relevance');

  const sortedAlternatives = useMemo(() => {
    const sorted = [...alternatives];
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
  }, [alternatives, sortBy]);

  const phoneName = `${phone.brand} ${phone.model}`;
  const phoneUrl = `/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;
  const currentYear = new Date().getFullYear();

  const breadcrumbItems = [
    { label: 'Phones', href: '/search' },
    { label: phone.brand, href: `/search?q=${phone.brand}` },
    { label: phone.model, href: phoneUrl },
    { label: 'Alternatives', href: `${phoneUrl}/alternatives` },
  ];

  const itemListSchema = generateItemListSchema(
    alternatives,
    `${phoneName} Alternatives`,
    `Best alternatives to the ${phoneName}. Compare similar smartphones with detailed specs and prices.`
  );

  const productSchema = generateProductSchema(phone);

  return (
    <>
      <JsonLd data={[productSchema, itemListSchema, generateFAQSchema(faqs)]} />
      
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <header className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              <Layers className="h-3 w-3 mr-1" />
              Alternatives
            </Badge>
            <Badge variant="outline" className="text-sm">
              {alternatives.length} Similar Phones
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {phoneName} Alternatives ({currentYear})
          </h1>
          
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Looking for alternatives to the {phoneName}? We've found {alternatives.length} similar 
            smartphones in the same price range with comparable features and performance.
          </p>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-24 h-32 flex-shrink-0">
                  <Image
                    src={phone.image}
                    alt={phoneName}
                    fill
                    className="object-contain"
                    data-ai-hint="mobile phone"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold">{phoneName}</h2>
                  <p className="text-2xl font-bold text-primary">${phone.price}</p>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    <Badge variant="secondary">
                      <Smartphone className="h-3 w-3 mr-1" />
                      {phone.specs.display.size_inches}"
                    </Badge>
                    <Badge variant="secondary">
                      <Camera className="h-3 w-3 mr-1" />
                      {phone.specs.main_camera.main_sensor_resolution}
                    </Badge>
                    <Badge variant="secondary">
                      <Battery className="h-3 w-3 mr-1" />
                      {phone.specs.battery.capacity_mah}mAh
                    </Badge>
                    <Badge variant="secondary">
                      <MemoryStick className="h-3 w-3 mr-1" />
                      {phone.specs.memory.ram_capacities}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={phoneUrl}>
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => handleAddToCompare(phone)}>
                    Add to Compare
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            {sameBrandAlternatives.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Other {phone.brand} Phones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sameBrandAlternatives.slice(0, 5).map((alt) => (
                    <Link 
                      key={alt.id} 
                      href={`/${alt.brand.toLowerCase()}/${alt.model.toLowerCase().replace(/ /g, '-')}`}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="font-medium text-sm truncate">{alt.model}</span>
                      <span className="text-sm text-muted-foreground">${alt.price}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link 
                  href={`/phones-under-${Math.ceil(phone.price / 100) * 100}`}
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Phones Under ${Math.ceil(phone.price / 100) * 100}
                </Link>
                <Link 
                  href={`/search?q=${phone.brand}`}
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  All {phone.brand} Phones
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
                <Link 
                  href="/compare"
                  className="block p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Compare Phones
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Key Specs to Compare
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Processor</p>
                  <p className="text-muted-foreground truncate">{phone.specs.platform.chipset}</p>
                </div>
                <div>
                  <p className="font-medium">Display</p>
                  <p className="text-muted-foreground">{phone.specs.display.size_inches}" {phone.specs.display.panel_type.split(',')[0]}</p>
                </div>
                <div>
                  <p className="font-medium">Refresh Rate</p>
                  <p className="text-muted-foreground">{phone.specs.display.refresh_rate_hz}Hz</p>
                </div>
                <div>
                  <p className="font-medium">Storage</p>
                  <p className="text-muted-foreground">{phone.specs.memory.storage_capacities}</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {sortedAlternatives.length} alternatives
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {sortedAlternatives.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedAlternatives.map((alt) => (
                  <PhoneCard 
                    key={alt.id} 
                    phone={alt} 
                    onAddToCompare={handleAddToCompare} 
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No alternatives found for the {phoneName}. Try browsing our full catalog.
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
                Why Consider {phoneName} Alternatives?
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                <p>
                  The {phoneName} is an excellent smartphone, but exploring alternatives can help 
                  you find a device that better matches your specific needs and preferences. 
                  Different brands offer unique features, software experiences, and value propositions.
                </p>
                <p>
                  We've selected {alternatives.length} alternatives that are similar in price 
                  (around ${phone.price}) and offer comparable specifications. This includes 
                  {sameBrandAlternatives.length > 0 ? ` ${sameBrandAlternatives.length} other ${phone.brand} phones and` : ''} 
                  {otherBrandAlternatives.length} phones from other leading manufacturers.
                </p>
                <p>
                  Use our comparison tools to evaluate these alternatives side-by-side with the 
                  {phoneName}. Compare cameras, displays, processors, battery life, and more to 
                  make an informed decision.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
