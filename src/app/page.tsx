
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
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useState, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [compareSlot, setCompareSlot] = useState<number | null>(null);
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);
  const [tickerPaused, setTickerPaused] = useState(false);

  const popularPhones = allPhones.slice(0, 5);
  const latestPhones = [...allPhones].sort((a, b) => new Date(b.specs.launch.announced_date).getTime() - new Date(a.specs.launch.announced_date).getTime()).slice(0, 5);
  const flagshipPhones = allPhones.filter(p => p.price > 900).slice(0, 5);
  const performancePhones = allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 5);
  const batteryPhones = [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 5);
  const cameraPhones = [...allPhones].sort((a,b) => parseInt(a.specs.main_camera.main_sensor_resolution) - parseInt(b.specs.main_camera.main_sensor_resolution)).slice(0, 5);
  const foldablePhones = allPhones.filter((p) => p.specs.body.form_factor.toLowerCase().includes('fold') || p.specs.body.form_factor.toLowerCase().includes('flip') || p.model.toLowerCase().includes('razr')).slice(0, 5);
  const ruggedPhones = allPhones.filter(p => p.specs.body.rugged_certifications.includes("MIL-STD-810H")).slice(0, 5);
  const uniquePhones = allPhones.filter(p => p.brand === "Nothing" || p.brand === "Asus" || p.brand === "Fairphone" || p.brand === "Sony").slice(0, 5);
  
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
               aria-label={`Remove ${phone.brand} ${phone.model} from compare`}
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
    <>
       {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      {/* Header / Hero */}
      <header role="banner" className="w-full bg-accent text-accent-foreground pt-12 md:pt-24 lg:pt-32 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
              Discover. Compare. Decide.
            </h1>
            <p className="max-w-[600px] md:text-xl text-black/70">
              AI-updated specs, comparisons & SEO-friendly landing pages.
            </p>
            <div className="mt-4">
              <Button asChild size="lg">
                <Link href="/compare">Compare Mobiles</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* News Ticker with live region + reduced motion support */}
        <div className="container mt-12 pb-12">
          <div className="relative flex items-center bg-primary text-primary-foreground rounded-lg p-2 text-sm overflow-hidden">
            <Megaphone className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1 overflow-hidden">
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  'flex w-max',
                  tickerPaused ? 'animate-none' : 'motion-safe:animate-[ticker_30s_linear_infinite] motion-reduce:animate-none'
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
            <Button
              variant="secondary"
              size="sm"
              className="ml-2"
              aria-pressed={!tickerPaused}
              onClick={() => setTickerPaused(p => !p)}
            >
              {tickerPaused ? 'Play' : 'Pause'}
            </Button>
          </div>
        </div>
      </header>
       <main id="main" role="main">
        {/* Search & Filter */}
        <section
          className="w-full py-8 md:py-12 bg-primary border-b"
          aria-labelledby="search-heading"
        >
          <div className="container px-4 md:px-6">
            <h2 id="search-heading" className="sr-only">Search and filters</h2>
            <form className="flex flex-col gap-4 md:flex-row" role="search" method="get" action="/search" onSubmit={onSubmitSearch}>
              <div className="relative flex-1">
                <label htmlFor="q" className="sr-only">Search by brand, model, or feature</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/70" aria-hidden="true" />
                <Input
                  id="q"
                  name="q"
                  type="search"
                  placeholder="Search by brand, model, or feature..."
                  className="w-full pl-10 h-12 text-base bg-background text-foreground border-input placeholder:text-muted-foreground focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="h-12 bg-white text-primary hover:bg-white/90"
                  aria-label="Open filters"
                >
                  <Filter className="mr-2 h-5 w-5" aria-hidden="true" /> Filters
                </Button>

                <div>
                  <label htmlFor="sort" className="sr-only">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy} name="sort">
                    <SelectTrigger id="sort" className="h-12 w-[180px] bg-white text-primary border-none focus:ring-primary-foreground data-[placeholder]:text-primary" aria-label="Sort By">
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
                  className="h-12 bg-white text-primary hover:bg-white/90"
                  variant="secondary"
                  aria-label="Search phones"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Trending Phones */}
        <section className="w-full py-12 md:py-16" aria-labelledby="trending-heading">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 id="trending-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Trending Phones
              </h2>
              <Link
                href="#"
                aria-disabled
                tabIndex={-1}
                className="text-sm font-medium text-primary hover:underline flex items-center aria-disabled:opacity-50"
              >
                See All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {popularPhones.map((phone) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Latest Launches */}
        <section className="w-full py-12 md:py-16 bg-primary/5" aria-labelledby="latest-heading">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 id="latest-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Latest Launches
              </h2>
              <Link
                href="#"
                aria-disabled
                tabIndex={-1}
                className="text-sm font-medium text-primary hover:underline flex items-center aria-disabled:opacity-50"
              >
                See All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {latestPhones.map((phone) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Flagship Phones */}
        <section className="w-full py-12 md:py-16" aria-labelledby="flagship-heading">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 id="flagship-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Flagship Phones
              </h2>
              <Link
                href="#"
                aria-disabled
                tabIndex={-1}
                className="text-sm font-medium text-primary hover:underline flex items-center aria-disabled:opacity-50"
              >
                See All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {flagshipPhones.map((phone) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Performance Phones */}
        <section className="w-full py-12 md:py-16 bg-primary/5" aria-labelledby="performance-heading">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 id="performance-heading" className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Performance Phones
              </h2>
              <Link
                href="#"
                aria-disabled
                tabIndex={-1}
                className="text-sm font-medium text-primary hover:underline flex items-center aria-disabled:opacity-50"
              >
                See All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {performancePhones.map((phone) => (
                <li role="listitem" key={phone.id}>
                  <article aria-label={`${phone.brand} ${phone.model}`}>
                    <PhoneCard phone={phone} onAddToCompare={handleAddToCompare} />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Power & Performance Tabs */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card" aria-labelledby="power-heading">
          <div className="container px-4 md:px-6">
            <h2 id="power-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
              Power & Performance
            </h2>
            <Tabs defaultValue="battery" className="w-full" aria-label="Power and performance categories">
              <TabsList className="mb-4 flex flex-wrap h-auto justify-center">
                <TabsTrigger value="battery" aria-controls="panel-battery">
                  <Battery className="mr-2" aria-hidden="true" />
                  Battery
                </TabsTrigger>
                <TabsTrigger value="gaming" aria-controls="panel-gaming">
                  <Gamepad2 className="mr-2" aria-hidden="true" />
                    Gaming
                </TabsTrigger>
                <TabsTrigger value="camera" aria-controls="panel-camera">
                  <Camera className="mr-2" aria-hidden="true" />
                  Camera
                </TabsTrigger>
              </TabsList>

              <TabsContent value="battery" id="panel-battery" role="tabpanel" aria-labelledby="battery">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {batteryPhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="gaming" id="panel-gaming" role="tabpanel" aria-labelledby="gaming">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {performancePhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="camera" id="panel-camera" role="tabpanel" aria-labelledby="camera">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {cameraPhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Specialty Phones Tabs */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5" aria-labelledby="specialty-heading">
          <div className="container px-4 md:px-6">
            <h2 id="specialty-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
              Specialty Phones
            </h2>
            <Tabs defaultValue="foldable" className="w-full" aria-label="Specialty categories">
              <TabsList className="mb-4 flex flex-wrap h-auto justify-center">
                <TabsTrigger value="foldable" aria-controls="panel-foldable">
                  <Smartphone className="mr-2" aria-hidden="true" />
                  Foldable
                </TabsTrigger>
                <TabsTrigger value="rugged" aria-controls="panel-rugged">
                  <Shield className="mr-2" aria-hidden="true" />
                  Rugged
                </TabsTrigger>
                <TabsTrigger value="unique" aria-controls="panel-unique">
                  <Sparkles className="mr-2" aria-hidden="true" />
                  Unique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="foldable" id="panel-foldable" role="tabpanel" aria-labelledby="foldable">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {foldablePhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="rugged" id="panel-rugged" role="tabpanel" aria-labelledby="rugged">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {ruggedPhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="unique" id="panel-unique" role="tabpanel" aria-labelledby="unique">
                <ul role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {uniquePhones.map((phone) => (
                    <li role="listitem" key={phone.id}>
                      <article aria-label={`${phone.brand} ${phone.model}`}>
                        <PhoneCard phone={phone} onAddToCompare={() => handleAddToCompare(phone)} />
                      </article>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Quick Compare */}
        <section className="w-full py-12 md:py-24" aria-labelledby="quick-compare-heading">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 id="quick-compare-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
                Quick Compare
              </h2>

              <div className="flex items-stretch gap-4 md:gap-8">
                <CompareSlot phone={phone1} onAdd={() => handleOpenDialog(1)} onRemove={() => setPhone1(null)} />
                <div className="flex flex-col items-center justify-center">
                  <Shuffle className="text-muted-foreground" aria-hidden="true" />
                  <p className="text-2xl font-bold my-2">VS</p>
                  {phone1 && phone2 ? (
                    <Button asChild>
                      <Link href={quickCompareUrl} aria-label={`Compare ${phone1.brand} ${phone1.model} and ${phone2.brand} ${phone2.model}`}>
                        Compare Now
                      </Link>
                    </Button>
                  ) : (
                    <Button aria-disabled className="opacity-60" title="Select two phones to compare">
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
                            className="block text-muted-foreground hover:text-primary text-center p-1.5 rounded-md hover:bg-muted border"
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
                            className="block text-muted-foreground hover:text-primary text-center p-1.5 rounded-md hover:bg-muted border"
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
          </div>
        </section>

        {/* Browse by Specs */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5" aria-labelledby="browse-heading">
          <div className="container px-4 md:px-6">
            <div className="space-y-3 mb-8 text-center">
              <h2 id="browse-heading" className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Browse by Specs
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Find the perfect phone tailored to your needs.
              </p>
            </div>
            <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {specCategories.map((cat) => (
                <li role="listitem" key={cat.label}>
                  <Link href={cat.href} aria-disabled tabIndex={-1}>
                    <Card className="p-4 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors h-full">
                      {cat.icon && <cat.icon className="h-8 w-8 text-primary" aria-hidden="true" />}
                      <span className="font-semibold text-sm">{cat.label}</span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Upcoming & Editorial */}
        <section className="w-full py-12 md:py-24" aria-labelledby="upcoming-editorial-heading">
          <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2">
            <h2 id="upcoming-editorial-heading" className="sr-only">Upcoming and editorial</h2>

            {/* Upcoming Calendar */}
            <section aria-labelledby="upcoming-heading">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 id="upcoming-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Upcoming Calendar
                  </h3>
                  <Link
                    href="/upcoming"
                    className="text-sm font-medium text-primary hover:underline flex items-center"
                  >
                    View All <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <article className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-center bg-primary/10 p-2 rounded-md" aria-hidden="true">
                      <p className="font-bold text-lg text-primary">28</p>
                      <p className="text-xs text-primary/80">AUG</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Galaxy S25 India Launch</h4>
                      <p className="text-sm text-muted-foreground">Expected to be announced online.</p>
                    </div>
                  </article>

                  <article className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-center bg-primary/10 p-2 rounded-md" aria-hidden="true">
                      <p className="font-bold text-lg text-primary">05</p>
                      <p className="text-xs text-primary/80">SEP</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Apple iPhone Event</h4>
                      <p className="text-sm text-muted-foreground">The official reveal of the new iPhone 17 series.</p>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* Editorial */}
            <section aria-labelledby="news-guides-heading">
              <div className="space-y-4">
                <h3 id="news-guides-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  News & Guides
                </h3>
                <div className="space-y-4">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                      <Badge>Deep Dive</Badge>
                      <h4 className="font-semibold mt-2">iPhone 16 Explained: Everything We Know</h4>
                    </Link>
                  </Card>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                      <Badge>Industry News</Badge>
                      <h4 className="font-semibold mt-2">Snapdragon 8 Gen 4: What to Expect</h4>
                    </Link>
                  </Card>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" aria-disabled tabIndex={-1} className="block p-4">
                      <Badge>Guides</Badge>
                      <h4 className="font-semibold mt-2">Top Phones to Buy in September</h4>
                    </Link>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Trust & Subscribe */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5" aria-labelledby="trust-heading">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 id="trust-heading" className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Your Trusted Source for Mobile Specs
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide accurate, up-to-date information you can rely on.
              </p>
            </div>

            <div className="mx-auto grid max-w-sm grid-cols-3 items-start justify-center gap-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Star className="h-8 w-8 text-primary" aria-hidden="true" />
                <p className="font-bold">128+ Specs</p>
                <p className="text-sm text-muted-foreground">Per Phone</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <Info className="h-8 w-8 text-primary" aria-hidden="true" />
                <p className="font-bold">Verified Sources</p>
                <p className="text-sm text-muted-foreground">Always Accurate</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <Calendar className="h-8 w-8 text-primary" aria-hidden="true" />
                <p className="font-bold">Daily Updates</p>
                <p className="text-sm text-muted-foreground">
                  Never Miss a Launch
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm space-y-2 mt-8">
              <form className="flex space-x-2">
                <label htmlFor="email" className="sr-only">Enter your email</label>
                <Input id="email" type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit" aria-label="Subscribe for weekly launch alerts">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Get weekly launch alerts and top news.
              </p>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="w-full py-12 md:py-24" aria-labelledby="blog-heading">
          <div className="container px-4 md:px-6">
            <h2 id="blog-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
              From the Blog
            </h2>
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Categories</h3>
                <nav aria-label="Blog categories">
                  <ul role="list" className="grid gap-2">
                    <li role="listitem"><Link href="#" aria-disabled tabIndex={-1} className="text-muted-foreground hover:text-primary">Buying Guides</Link></li>
                    <li role="listitem"><Link href="#" aria-disabled tabIndex={-1} className="text-muted-foreground hover:text-primary">Top 10 Phones</Link></li>
                    <li role="listitem"><Link href="#" aria-disabled tabIndex={-1} className="text-muted-foreground hover:text-primary">Tips & Tricks</Link></li>
                    <li role="listitem"><Link href="#" aria-disabled tabIndex={-1} className="text-muted-foreground hover:text-primary">Industry Insights</Link></li>
                  </ul>
                </nav>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <Image
                    src="https://picsum.photos/600/400"
                    width={600}
                    height={400}
                    alt="Illustrative blog cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="mobile technology"
                  />
                  <CardContent className="p-4">
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
                    src="https://picsum.photos/600/401"
                    width={600}
                    height={400}
                    alt="Illustrative phone camera tips cover"
                    className="rounded-t-lg object-cover aspect-video"
                    data-ai-hint="smartphone camera"
                  />
                  <CardContent className="p-4">
                    <Badge>Tips & Tricks</Badge>
                    <h3 className="text-lg font-bold mt-2">
                      Master Your Phone&apos;s Camera: Pro Tips
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Unlock the full potential of your smartphone&apos;s camera with these expert tips.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
}
