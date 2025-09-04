

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCard } from '@/components/phone-card';
import { allPhones } from '@/lib/data';
import {
  Search,
  Sparkles,
  ArrowRight,
  Megaphone,
  Battery,
  Gamepad2,
  Camera,
  Smartphone,
  Layers,
  Star,
  Info,
  Mail,
  Calendar,
  Shield,
  Zap,
  PlusCircle,
  Filter,
  ArrowUpDown,
  X,
  Shuffle,
  Newspaper,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComparisonBar } from '@/components/comparison-bar';
import { useCompare } from '@/contexts/compare-context';
import { generateCompareUrl } from '@/lib/utils';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Phone } from '@/lib/types';
import { AddPhoneDialog } from '@/app/compare/components/add-phone-dialog';
import { Separator } from '@/components/ui/separator';

const specCategories = [
  { icon: Camera, label: 'Best Camera', href: '#' },
  { icon: Battery, label: 'Battery Phones', href: '#' },
  { icon: Zap, label: 'Fast Charging', href: '#' },
  { icon: Gamepad2, label: 'Gaming Phones', href: '#' },
  { icon: null, label: 'Under ₹20K', href: '#' },
  { icon: Megaphone, label: '5G Phones', href: '#' },
  { icon: Star, label: 'Flagships', href: '#' },
  { icon: Smartphone, label: 'Compact Phones', href: '#' },
  { icon: Layers, label: 'Expandable Storage', href: '#' },
  { icon: null, label: 'Satellite Phones', href: '#' },
];

export default function Home() {
  const { compareList, handleAddToCompare, handleRemoveFromCompare, handleClearCompare } = useCompare();
  const router = useRouter();
  const [searchQuery, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [tickerPaused, setTickerPaused] = useState(false);

  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [compareSlot, setCompareSlot] = useState<number | null>(null);
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);

  const popularPhones = allPhones.slice(0, 6);
  const latestPhones = [...allPhones].sort((a, b) => new Date(b.specs.launch.announced_date).getTime() - new Date(a.specs.launch.announced_date).getTime()).slice(0, 6);
  const flagshipPhones = allPhones.filter(p => p.price > 900).slice(0, 6);
  const performancePhones = allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 6);
  const batteryPhones = [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 6);
  const cameraPhones = [...allPhones].sort((a,b) => parseInt(a.specs.main_camera.main_sensor_resolution) - parseInt(b.specs.main_camera.main_sensor_resolution)).slice(0, 6);
  const foldablePhones = allPhones.filter((p) => p.specs.body.form_factor.toLowerCase().includes('fold') || p.specs.body.form_factor.toLowerCase().includes('flip') || p.model.toLowerCase().includes('razr')).slice(0, 6);
  const ruggedPhones = allPhones.filter(p => p.specs.body.rugged_certifications.includes("MIL-STD-810H")).slice(0, 6);
  const uniquePhones = allPhones.filter(p => p.brand === "Nothing" || p.brand === "Asus" || p.brand === "Fairphone" || p.brand === "Sony").slice(0, 6);
  
  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy) params.set('sort', sortBy);
    router.push(`/search?${params.toString()}`);
  };

  const handleOpenDialog = (slot: number) => {
    setCompareSlot(slot);
    setIsCompareDialogOpen(true);
  };

  const handleSelectPhone = (phone: Phone) => {
    if (compareSlot === 1) {
      setPhone1(phone);
    } else {
      setPhone2(phone);
    }
    setIsCompareDialogOpen(false);
  };
  
  const quickCompareUrl = useMemo(() => {
    if (phone1 && phone2) {
      return generateCompareUrl([phone1, phone2]);
    }
    return '#';
  }, [phone1, phone2]);
  
  const popularComparisons = [
    ["iPhone 15 Pro Max", "Galaxy S24 Ultra"],
    ["Pixel 8 Pro", "iPhone 15 Pro"],
    ["OnePlus 12", "Xiaomi 14 Ultra"],
    ["Galaxy Z Fold 5", "Pixel Fold"],
    ["Galaxy S24", "Pixel 8 Pro"],
    ["Nothing Phone (2a)", "Motorola Razr+ 2023"],
  ];
  
  const trendingComparisons = [
      ["Galaxy S24 Ultra", "Xiaomi 14 Ultra"],
      ["iPhone 15 Pro Max", "OnePlus 12"],
      ["Pixel 8 Pro", "Galaxy S24"],
      ["Galaxy Z Flip 5", "Motorola Razr 40 Ultra"],
      ["Asus ROG Phone 8 Pro", "OnePlus 12"],
      ["Sony Xperia 1 VI", "iPhone 15 Pro Max"],
      ["Google Pixel 8 Pro", "Samsung Galaxy S24 Ultra"],
      ["OnePlus 12", "Samsung Galaxy S24"],
      ["Xiaomi 14 Ultra", "iPhone 15 Pro Max"],
  ];

  const getPhoneByName = (name: string) => allPhones.find(p => p.model === name);
  
  const CompareSlot = ({ phone, onAdd, onRemove }: { phone: Phone | null, onAdd: () => void, onRemove: () => void }) => {
    if (!phone) {
      return (
        <Card className="flex-1">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg h-full">
            <Button
              variant="ghost"
              className="flex flex-col h-auto p-4 w-full h-full"
              onClick={onAdd}
               aria-label="Add phone to compare"
            >
              <PlusCircle className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground mt-2 text-sm font-semibold">
                Add Phone
              </span>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="flex-1 relative group/compare-card">
        <CardContent className="p-4 text-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 bg-muted rounded-full opacity-0 group-hover/compare-card:opacity-100 transition-opacity z-10"
              onClick={onRemove}
               aria-label={`Remove ${phone.brand} ${phone.model}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          <div className="relative w-full h-40 mb-4">
            <Image 
              src={phone.image} 
              alt={`${phone.brand} ${phone.model}`} 
              fill 
              className="object-contain" 
              data-ai-hint="mobile phone"
            />
          </div>
          <p className="font-bold text-lg truncate">{phone.brand}</p>
          <p className="text-muted-foreground truncate">{phone.model}</p>
          <div className="text-left mt-4 space-y-1 text-sm">
            <div className="flex items-center gap-2"><Smartphone size={14} aria-hidden="true" /> <span>{phone.specs.display.size_inches}" {phone.specs.display.panel_type.split(',')[0]}</span></div>
            <div className="flex items-center gap-2"><Camera size={14} aria-hidden="true" /> <span>{phone.specs.main_camera.main_sensor_resolution} Main</span></div>
            <div className="flex items-center gap-2"><Battery size={14} aria-hidden="true" /> <span>{phone.specs.battery.capacity_mah} mAh</span></div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4 pb-4 px-4">
       {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      {/* Header / Hero */}
      <header role="banner" className="w-full bg-accent text-accent-foreground rounded-2xl">
        <div className="text-center py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Discover. Compare. Decide.
            </h1>
            <p className="max-w-[600px] md:text-xl">
              AI-updated specs, comparisons & SEO-friendly landing pages.
            </p>
            <div className="mt-4">
              <Button asChild size="lg" variant="default">
                <Link href="/compare">Compare Mobiles</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* News Ticker with live region + reduced motion support */}
        <div className="pb-4 px-4 md:px-6">
          <div className="relative flex items-center bg-primary text-primary-foreground rounded-lg p-2 text-sm overflow-hidden">
            <Megaphone className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
            <div
              className="flex-1 overflow-hidden"
              onMouseEnter={() => setTickerPaused(true)}
              onMouseLeave={() => setTickerPaused(false)}
            >
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  "flex w-max motion-safe:animate-ticker",
                  tickerPaused && "motion-safe:[animation-play-state:paused]"
                )}
              >
                <p className="whitespace-nowrap pr-12">Pixel 9a announced with new Tensor G4 chip.</p>
                <p className="whitespace-nowrap pr-12">iPhone 16 Pro leaks suggest a larger display.</p>
                <p className="whitespace-nowrap pr-12">Samsung Galaxy S25 to feature satellite connectivity.</p>
                <p className="whitespace-nowrap pr-12">Pixel 9a announced with new Tensor G4 chip.</p>
                <p className="whitespace-nowrap pr-12">iPhone 16 Pro leaks suggest a larger display.</p>
                <p className="whitespace-nowrap pr-12">Samsung Galaxy S25 to feature satellite connectivity.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main id="main" role="main" className="space-y-4">
        {/* Search & Filter */}
        <Card className="bg-primary text-primary-foreground rounded-2xl">
          <section
            className="w-full py-8 md:py-12"
            aria-labelledby="search-heading"
          >
            <div className="container px-4 md:px-6">
              <h2 id="search-heading" className="sr-only">Search and filters</h2>
              <form className="flex flex-col gap-4" role="search" method="get" action="/search" onSubmit={onSubmitSearch}>
                <div className="relative flex-1">
                  <label htmlFor="q" className="sr-only">Search by brand, model, or feature</label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="q"
                    name="q"
                    type="search"
                    placeholder="Search by brand, model, or feature..."
                    className="w-full pl-10 h-12 text-base bg-background text-foreground border-input placeholder:text-muted-foreground focus-visible:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 md:flex md:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="h-12 w-full"
                    aria-label="Open filters"
                  >
                    <Filter className="mr-2 h-5 w-5" aria-hidden="true" /> Filters
                  </Button>

                  <div className="w-full">
                    <label htmlFor="sort" className="sr-only">Sort by</label>
                    <Select value={sortBy} onValueChange={setSortBy} name="sort">
                      <SelectTrigger id="sort" className="h-12 w-full bg-background text-foreground border-input focus:ring-ring data-[placeholder]:text-muted-foreground" aria-label="Sort By">
                        <ArrowUpDown className="mr-2 h-5 w-5" aria-hidden="true" />
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Popularity</SelectItem>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full col-span-2"
                    variant="secondary"
                    aria-label="Search phones"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </Card>


        {/* Trending Phones */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="trending-heading">
          <CardHeader>
            <CardTitle id="trending-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Trending Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {popularPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Latest Launches */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="latest-heading">
          <CardHeader>
            <CardTitle id="latest-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Latest Launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {latestPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Flagship Phones */}
         <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="flagship-heading">
           <CardHeader>
            <CardTitle id="flagship-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Flagship Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {flagshipPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                   <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Battery Phones */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="battery-heading">
          <CardHeader>
            <CardTitle id="battery-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Longest Battery Life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {batteryPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Gaming Phones */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="gaming-heading">
          <CardHeader>
            <CardTitle id="gaming-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Best for Gaming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {performancePhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Camera Phones */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="camera-heading">
          <CardHeader>
            <CardTitle id="camera-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Top Camera Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {cameraPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Foldable Phones */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="foldable-heading">
          <CardHeader>
            <CardTitle id="foldable-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Foldable Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {foldablePhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Rugged Phones */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="rugged-heading">
          <CardHeader>
            <CardTitle id="rugged-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Rugged Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {ruggedPhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Unique Phones */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="unique-heading">
          <CardHeader>
            <CardTitle id="unique-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Unique Phones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {uniquePhones.map((phone, index) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Compare */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="quick-compare-heading">
          <CardHeader>
            <h2 id="quick-compare-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
              Quick Compare
            </h2>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8">
                <CompareSlot phone={phone1} onAdd={() => handleOpenDialog(1)} onRemove={() => setPhone1(null)} />
                <div className="flex flex-col items-center justify-center my-4 md:my-0">
                  <Shuffle className="hidden md:block" aria-hidden="true" />
                  <p className="text-2xl font-bold my-2">VS</p>
                  {phone1 && phone2 ? (
                    <Button asChild>
                      <Link href={quickCompareUrl} aria-label={`Compare ${phone1.brand} ${phone1.model} and ${phone2.brand} ${phone2.model}`}>
                        Compare Now
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled aria-disabled className="opacity-60" title="Select two phones to compare">
                      Compare Now
                    </Button>
                  )}
                </div>
                <CompareSlot phone={phone2} onAdd={() => handleOpenDialog(2)} onRemove={() => setPhone2(null)} />
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-center md:text-left">Popular Comparisons</h3>
                  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {popularComparisons.map(([p1, p2]) => {
                      const phone1 = getPhoneByName(p1);
                      const phone2 = getPhoneByName(p2);
                      if (!phone1 || !phone2) return null;
                      const url = generateCompareUrl([phone1, phone2]);
                      return (
                        <li role="listitem" key={url}>
                          <Link
                            href={url}
                            className="block hover:text-primary-foreground/80 text-center p-1.5 rounded-md hover:bg-white/10 border border-primary-foreground/20"
                            aria-label={`Compare ${p1} and ${p2}`}
                          >
                            {p1} vs {p2}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-center md:text-left">Trending Comparisons</h3>
                  <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {trendingComparisons.map(([p1, p2]) => {
                      const phone1 = getPhoneByName(p1);
                      const phone2 = getPhoneByName(p2);
                      if (!phone1 || !phone2) return null;
                      const url = generateCompareUrl([phone1, phone2]);
                      return (
                        <li role="listitem" key={url}>
                          <Link
                            href={url}
                            className="block hover:text-primary-foreground/80 text-center p-1.5 rounded-md hover:bg-white/10 border border-primary-foreground/20"
                            aria-label={`Compare ${p1} and ${p2}`}
                          >
                            {p1} vs {p2}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        

        {/* Browse by Specs */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="browse-heading">
          <CardHeader>
            <div className="space-y-3 text-center">
              <h2 id="browse-heading" className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Browse by Specs
              </h2>
              <p className="mx-auto max-w-[600px] md:text-xl/relaxed">
                Find the perfect phone tailored to your needs.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {specCategories.map((cat) => (
                <li role="listitem" key={cat.label}>
                  <Link href={cat.href} aria-disabled tabIndex={-1}>
                    <Card className="p-4 flex flex-col items-center justify-center text-center text-accent-foreground bg-accent hover:bg-background/20 transition-colors h-full">
                      {cat.icon && <cat.icon className="h-8 w-8" aria-hidden="true" />}
                      <span className="font-semibold text-sm">{cat.label}</span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="grid gap-4 lg:grid-cols-2">
            {/* Upcoming Calendar */}
            <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="upcoming-heading">
              <CardHeader>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-7 w-7" />
                    <h3 id="upcoming-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                      Upcoming Calendar
                    </h3>
                  </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                      <article className="flex items-center gap-4 p-4 border border-primary-foreground/20 rounded-lg bg-background/10">
                        <div className="text-center bg-background/20 p-2 rounded-md" aria-hidden="true">
                          <p className="font-bold text-lg">28</p>
                          <p className="text-xs opacity-80">AUG</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Galaxy S25 India Launch</h4>
                          <p className="text-sm opacity-80">Expected to be announced online.</p>
                        </div>
                      </article>
                      <article className="flex items-center gap-4 p-4 border border-primary-foreground/20 rounded-lg bg-background/10">
                        <div className="text-center bg-background/20 p-2 rounded-md" aria-hidden="true">
                          <p className="font-bold text-lg">05</p>
                          <p className="text-xs opacity-80">SEP</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Apple iPhone 17 Event</h4>
                          <p className="text-sm opacity-80">The official reveal of the new iPhone series.</p>
                        </div>
                      </article>
                      <article className="flex items-center gap-4 p-4 border border-primary-foreground/20 rounded-lg bg-background/10">
                        <div className="text-center bg-background/20 p-2 rounded-md" aria-hidden="true">
                          <p className="font-bold text-lg">15</p>
                          <p className="text-xs opacity-80">SEP</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">OnePlus 13 Series</h4>
                          <p className="text-sm opacity-80">Global launch event for the next flagship killer.</p>
                        </div>
                      </article>
                      <article className="flex items-center gap-4 p-4 border border-primary-foreground/20 rounded-lg bg-background/10">
                        <div className="text-center bg-background/20 p-2 rounded-md" aria-hidden="true">
                          <p className="font-bold text-lg">04</p>
                          <p className="text-xs opacity-80">OCT</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Google Pixel 9 Event</h4>
                          <p className="text-sm opacity-80">Launch of Pixel 9, Pixel 9 Pro, and Pixel Watch 3.</p>
                        </div>
                      </article>
                      <article className="flex items-center gap-4 p-4 border border-primary-foreground/20 rounded-lg bg-background/10">
                        <div className="text-center bg-background/20 p-2 rounded-md" aria-hidden="true">
                          <p className="font-bold text-lg">28</p>
                          <p className="text-xs opacity-80">OCT</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Xiaomi 15 Series China Launch</h4>
                          <p className="text-sm opacity-80">First look at the Snapdragon 8 Gen 4 phones.</p>
                        </div>
                      </article>
                  </div>
              </CardContent>
            </Card>

             {/* Guides */}
            <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="guides-heading">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-7 w-7" />
                    <h3 id="guides-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                      Guides
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                      <Card className="hover:bg-background/20 transition-colors bg-background/10 text-primary-foreground">
                        <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                          <Badge variant="secondary">Deep Dive</Badge>
                          <h4 className="font-semibold mt-2">iPhone 16 Explained: Everything We Know</h4>
                        </Link>
                      </Card>
                      <Card className="hover:bg-background/20 transition-colors bg-background/10 text-primary-foreground">
                        <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                          <Badge variant="secondary">Industry News</Badge>
                          <h4 className="font-semibold mt-2">Snapdragon 8 Gen 4: What to Expect</h4>
                        </Link>
                      </Card>
                      <Card className="hover:bg-background/20 transition-colors bg-background/10 text-primary-foreground">
                        <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                          <Badge variant="secondary">Guides</Badge>
                          <h4 className="font-semibold mt-2">Top Phones to Buy in September</h4>
                        </Link>
                      </Card>
                       <Card className="hover:bg-background/20 transition-colors bg-background/10 text-primary-foreground">
                        <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                          <Badge variant="secondary">Guides</Badge>
                          <h4 className="font-semibold mt-2">How to Maximize Your Phone's Battery Life</h4>
                        </Link>
                      </Card>
                       <Card className="hover:bg-background/20 transition-colors bg-background/10 text-primary-foreground">
                        <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                          <Badge variant="secondary">Tips & Tricks</Badge>
                          <h4 className="font-semibold mt-2">Mastering ProRAW on Your iPhone</h4>
                        </Link>
                      </Card>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Blog */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="blog-heading">
          <CardHeader>
             <h2 id="blog-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
              From the Blog
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=1"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="mobile technology"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Buying Guides</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      How to Choose the Right Phone for You
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      A comprehensive guide to navigating the complex world of smartphones.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=2"
                    width={600}
                    height={400}
                    alt="Illustrative phone camera tips cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="smartphone camera"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Tips & Tricks</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      Master Your Phone&apos;s Camera: Pro Tips
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Unlock the full potential of your smartphone&apos;s camera with these expert tips.
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=3"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="smartphone battery"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Tips & Tricks</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      Maximize Your Phone's Battery Life
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Simple but effective tricks to extend your phone's daily endurance.
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=4"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="mobile gaming"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Gaming</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      The Rise of Mobile Esports
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      How competitive gaming on smartphones is taking over the world.
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=5"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="foldable phone"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Industry Insights</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      Are Foldable Phones the Future?
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      An in-depth look at the pros and cons of the latest form factor.
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <Image
                    src="https://picsum.photos/600/400?v=6"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="data privacy"
                  />
                  <CardContent className="p-4 bg-background text-foreground">
                    <Badge>Security</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      Protecting Your Digital Privacy
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Key steps to secure your personal data on your smartphone.
                    </p>
                  </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
        
        {/* News Section */}
        <Card className="bg-primary text-primary-foreground rounded-2xl" aria-labelledby="news-heading">
          <CardHeader>
            <h2 id="news-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
              Latest News
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
              
              <Card className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-lg">
                <Link href="#" className="block h-full w-full">
                  <Image src="https://picsum.photos/800/800?v=n1" alt="Featured news" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="mobile technology" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-4 md:p-6 text-white">
                    <Badge variant="destructive">BREAKING</Badge>
                    <h3 className="text-lg md:text-2xl font-bold mt-2 leading-tight">Pixel 9 Pro Leaks Reveal Complete Redesign and Tensor G4 Specs</h3>
                  </div>
                </Link>
              </Card>

              <Card className="lg:col-span-2 group relative overflow-hidden rounded-lg">
                <Link href="#" className="block h-full w-full">
                  <Image src="https://picsum.photos/800/400?v=n2" alt="News item" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="smartphone chipset" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <Badge>Industry News</Badge>
                    <h3 className="text-md font-bold mt-1">Snapdragon 8 Gen 4 to Ditch Efficiency Cores for All-Out Performance</h3>
                  </div>
                </Link>
              </Card>

              <Card className="group relative overflow-hidden rounded-lg">
                 <Link href="#" className="block h-full w-full">
                    <Image src="https://picsum.photos/400/400?v=n3" alt="News item" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="smartphone event" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <Badge>Events</Badge>
                      <h3 className="text-sm font-bold mt-1">Apple Confirms September 10th for iPhone 16 Reveal</h3>
                    </div>
                 </Link>
              </Card>
              
               <Card className="group relative overflow-hidden rounded-lg">
                 <Link href="#" className="block h-full w-full">
                    <Image src="https://picsum.photos/400/400?v=n4" alt="News item" fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="foldable phone" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <Badge>Rumors</Badge>
                      <h3 className="text-sm font-bold mt-1">Samsung Galaxy Z Fold 6 to be Thinner and Lighter</h3>
                    </div>
                 </Link>
              </Card>
              
              <Card className="bg-background text-foreground">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <Badge>Software</Badge>
                    <h3 className="font-bold mt-2">Android 15 Beta 3 Adds New Privacy Features</h3>
                  </div>
                  <Button variant="link" className="p-0 h-auto self-start mt-2">Read More <ArrowRight className="ml-1" /></Button>
                </CardContent>
              </Card>
               <Card className="bg-background text-foreground">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <Badge>Analysis</Badge>
                    <h3 className="font-bold mt-2">Is the AI Phone Trend a Gimmick or the Future?</h3>
                  </div>
                  <Button variant="link" className="p-0 h-auto self-start mt-2">Read More <ArrowRight className="ml-1" /></Button>
                </CardContent>
              </Card>
               <Card className="bg-background text-foreground">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <Badge>Gaming</Badge>
                    <h3 className="font-bold mt-2">New Controller Support Coming to Mobile Games</h3>
                  </div>
                  <Button variant="link" className="p-0 h-auto self-start mt-2">Read More <ArrowRight className="ml-1" /></Button>
                </CardContent>
              </Card>
               <Card className="bg-background text-foreground">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <Badge>Deals</Badge>
                    <h3 className="font-bold mt-2">Best Back-to-School Smartphone Deals for 2024</h3>
                  </div>
                  <Button variant="link" className="p-0 h-auto self-start mt-2">Read More <ArrowRight className="ml-1" /></Button>
                </CardContent>
              </Card>

            </div>
          </CardContent>
        </Card>

        {/* Trust & Subscribe */}
        <Card className="bg-accent text-accent-foreground rounded-2xl" aria-labelledby="trust-heading">
            <CardContent className="p-6">
                <div className="grid items-center justify-center gap-4 text-center">
                    <div className="space-y-3">
                      <h2 id="trust-heading" className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                        Your Trusted Source for Mobile Specs
                      </h2>
                      <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We provide accurate, up-to-date information you can rely on.
                      </p>
                    </div>

                    <div className="mx-auto grid max-w-sm grid-cols-3 items-start justify-center gap-8 lg:max-w-none lg:grid-cols-3">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Star className="h-8 w-8 text-current" aria-hidden="true" />
                        <p className="font-bold">128+ Specs</p>
                        <p className="text-sm">Per Phone</p>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Info className="h-8 w-8 text-current" aria-hidden="true" />
                        <p className="font-bold">Verified Sources</p>
                        <p className="text-sm">Always Accurate</p>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Calendar className="h-8 w-8 text-current" aria-hidden="true" />
                        <p className="font-bold">Daily Updates</p>
                        <p className="text-sm">
                          Never Miss a Launch
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto w-full max-w-sm space-y-2 mt-8">
                      <form className="flex space-x-2">
                        <label htmlFor="email" className="sr-only">Enter your email</label>
                        <Input id="email" type="email" placeholder="Enter your email" className="max-w-lg flex-1 bg-background text-foreground" />
                        <Button type="submit" variant="secondary" aria-label="Subscribe for weekly launch alerts">Subscribe</Button>
                      </form>
                      <p className="text-xs">
                        Get weekly launch alerts and top news.
                      </p>
                    </div>
                  </div>
            </CardContent>
        </Card>
      </main>

      {/* Compare bar and dialog */}
      <ComparisonBar
        phones={compareList}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
      />

      <AddPhoneDialog
        isOpen={isCompareDialogOpen}
        onOpenChange={setIsCompareDialogOpen}
        onSelectPhone={handleSelectPhone}
        allPhones={allPhones}
        currentPhones={[phone1, phone2].filter(Boolean) as Phone[]}
      />
    </div>
  );
}


    






    









