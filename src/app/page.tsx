

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

  const popularPhones = allPhones.slice(0, 5);
  const latestPhones = [...allPhones].sort((a, b) => new Date(b.specs.launch.announced_date).getTime() - new Date(a.specs.launch.announced_date).getTime()).slice(0, 5);
  const flagshipPhones = allPhones.filter(p => p.price > 900).slice(0, 5);
  const performancePhones = allPhones.filter(p => p.specs.platform.chipset.includes('Snapdragon 8 Gen 3') || p.specs.platform.chipset.includes('Apple A17 Pro') || p.specs.platform.chipset.includes('Snapdragon 8 Gen 2')).slice(0, 5);
  const batteryPhones = [...allPhones].sort((a,b) => parseInt(b.specs.battery.capacity_mah) - parseInt(a.specs.battery.capacity_mah)).slice(0, 5);
  const cameraPhones = [...allPhones].sort((a,b) => parseInt(a.specs.main_camera.main_sensor_resolution) - parseInt(b.specs.main_camera.main_sensor_resolution)).slice(0, 5);
  const foldablePhones = allPhones.filter((p) => p.specs.body.form_factor.toLowerCase().includes('fold') || p.specs.body.form_factor.toLowerCase().includes('flip') || p.model.toLowerCase().includes('razr')).slice(0, 5);
  const ruggedPhones = allPhones.filter(p => p.specs.body.rugged_certifications.includes("MIL-STD-810H")).slice(0, 5);
  const uniquePhones = allPhones.filter(p => p.brand === "Nothing" || p.brand === "Asus" || p.brand === "Fairphone" || p.brand === "Sony").slice(0, 5);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (sortBy) {
      params.set('sort', sortBy);
    }
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
            >
              <PlusCircle className="h-8 w-8 text-muted-foreground" />
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
            >
              <X className="h-4 w-4" />
            </Button>
          <div className="relative w-full h-40 mb-4">
            <Image src={phone.image} alt={phone.model} fill className="object-contain" data-ai-hint="mobile phone" />
          </div>
          <p className="font-bold text-lg truncate">{phone.brand}</p>
          <p className="text-muted-foreground truncate">{phone.model}</p>
          <div className="text-left mt-4 space-y-1 text-sm">
            <div className="flex items-center gap-2"><Smartphone size={14} /> <span>{phone.specs.display.size_inches}" {phone.specs.display.panel_type.split(',')[0]}</span></div>
            <div className="flex items-center gap-2"><Camera size={14} /> <span>{phone.specs.main_camera.main_sensor_resolution} Main</span></div>
            <div className="flex items-center gap-2"><Battery size={14} /> <span>{phone.specs.battery.capacity_mah} mAh</span></div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col">
       <section className="w-full bg-secondary/30 pt-12 md:pt-24 lg:pt-32 border-b group/hero">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
              Discover. Compare. Decide.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              AI-updated specs, comparisons & SEO-friendly landing pages.
            </p>
            <div className="mt-4">
              <Button
                size="lg"
                asChild
              >
                <Link href="/compare">Compare Mobiles</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="container mt-12 pb-12">
          <div className="relative flex items-center bg-primary text-primary-foreground rounded-lg p-2 text-sm overflow-hidden hover:[animation-play-state:paused]">
            <Megaphone className="h-5 w-5 mr-2 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <div className="animate-ticker flex w-max">
                <p className="whitespace-nowrap pr-12">
                  Pixel 9a announced with new Tensor G4 chip.
                </p>
                <p className="whitespace-nowrap pr-12">
                  iPhone 16 Pro leaks suggest a larger display.
                </p>
                <p className="whitespace-nowrap pr-12">
                  Samsung Galaxy S25 to feature satellite connectivity.
                </p>
                <p className="whitespace-nowrap pr-12">
                  Pixel 9a announced with new Tensor G4 chip.
                </p>
                <p className="whitespace-nowrap pr-12">
                  iPhone 16 Pro leaks suggest a larger display.
                </p>
                <p className="whitespace-nowrap pr-12">
                  Samsung Galaxy S25 to feature satellite connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="w-full py-8 md:py-12 bg-primary/10 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70" />
              <Input
                type="search"
                placeholder="Search by brand, model, or feature..."
                className="w-full pl-10 h-12 text-base bg-background border-primary/20 placeholder:text-muted-foreground focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                className="h-12"
              >
                <Filter className="mr-2 h-5 w-5" /> Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 w-[180px] bg-background border-primary/20 focus:ring-primary">
                  <ArrowUpDown className="mr-2 h-5 w-5" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularity</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="lg"
                className="h-12"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("w-full py-12 md:py-16")}>
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Trending Phones
            </h2>
            <Link
              href={"#"}
              className="text-sm font-medium text-primary hover:underline flex items-center"
            >
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {popularPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onAddToCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={cn("w-full py-12 md:py-16", "bg-secondary/50")}>
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Latest Launches
            </h2>
            <Link
              href={"#"}
              className="text-sm font-medium text-primary hover:underline flex items-center"
            >
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {latestPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onAddToCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className={cn("w-full py-12 md:py-16")}>
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Flagship Phones
            </h2>
            <Link
              href={"#"}
              className="text-sm font-medium text-primary hover:underline flex items-center"
            >
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {flagshipPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onAddToCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={cn("w-full py-12 md:py-16", "bg-secondary/50")}>
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Performance Phones
            </h2>
            <Link
              href={"#"}
              className="text-sm font-medium text-primary hover:underline flex items-center"
            >
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {performancePhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onAddToCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Power & Performance Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
            Power & Performance
          </h2>
          <Tabs defaultValue="battery" className="w-full">
            <TabsList className="mb-4 flex flex-wrap h-auto justify-center">
              <TabsTrigger value="battery">
                <Battery className="mr-2" />
                Battery
              </TabsTrigger>
              <TabsTrigger value="gaming">
                <Gamepad2 className="mr-2" />
                Gaming
              </TabsTrigger>
              <TabsTrigger value="camera">
                <Camera className="mr-2" />
                Camera
              </TabsTrigger>
            </TabsList>
            <TabsContent value="battery">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {batteryPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onAddToCompare={() => handleAddToCompare(phone)}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="gaming">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {performancePhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onAddToCompare={() => handleAddToCompare(phone)}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="camera">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {cameraPhones.map((phone) => (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    onAddToCompare={() => handleAddToCompare(phone)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Specialty Phones Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
            Specialty Phones
          </h2>
          <Tabs defaultValue="foldable" className="w-full">
            <TabsList className="mb-4 flex flex-wrap h-auto justify-center">
              <TabsTrigger value="foldable">
                <Smartphone className="mr-2" />
                Foldable
              </TabsTrigger>
              <TabsTrigger value="rugged">
                <Shield className="mr-2" />
                Rugged
              </TabsTrigger>
              <TabsTrigger value="unique">
                <Sparkles className="mr-2" />
                Unique
              </TabsTrigger>
            </TabsList>
            <TabsContent value="foldable">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {foldablePhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onAddToCompare={() => handleAddToCompare(phone)}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="rugged">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {ruggedPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onAddToCompare={() => handleAddToCompare(phone)}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="unique">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                {uniquePhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onAddToCompare={() => handleAddToCompare(phone)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Compare */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
              Quick Compare
            </h2>
            <div className="flex items-stretch gap-4 md:gap-8">
                <CompareSlot phone={phone1} onAdd={() => handleOpenDialog(1)} onRemove={() => setPhone1(null)} />
                <div className="flex flex-col items-center justify-center">
                    <Shuffle className="text-muted-foreground" />
                    <p className="text-2xl font-bold my-2">VS</p>
                    <Button asChild disabled={!phone1 || !phone2}>
                       <Link href={quickCompareUrl}>Compare Now</Link>
                    </Button>
                </div>
                <CompareSlot phone={phone2} onAdd={() => handleOpenDialog(2)} onRemove={() => setPhone2(null)} />
            </div>

            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <div>
                    <h3 className="font-semibold mb-3 text-center md:text-left">Popular Comparisons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {popularComparisons.map(([p1, p2]) => {
                          const phone1 = getPhoneByName(p1);
                          const phone2 = getPhoneByName(p2);
                          if (!phone1 || !phone2) return null;
                          const url = generateCompareUrl([phone1, phone2]);
                          return <Link key={url} href={url} className="text-muted-foreground hover:text-primary text-center p-1.5 rounded-md hover:bg-muted border">{p1} vs {p2}</Link>
                      })}
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-3 text-center md:text-left">Trending Comparisons</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {trendingComparisons.map(([p1, p2]) => {
                          const phone1 = getPhoneByName(p1);
                          const phone2 = getPhoneByName(p2);
                          if (!phone1 || !phone2) return null;
                          const url = generateCompareUrl([phone1, phone2]);
                          return <Link key={url} href={url} className="text-muted-foreground hover:text-primary text-center p-1.5 rounded-md hover:bg-muted border">{p1} vs {p2}</Link>
                      })}
                    </div>
                </div>
            </div>
            
          </div>
        </div>
      </section>


      {/* Browse by Specs */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="space-y-3 mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Browse by Specs
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Find the perfect phone tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {specCategories.map((cat) => (
              <Link key={cat.label} href={cat.href}>
                <Card className="p-4 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors h-full">
                  {cat.icon && <cat.icon className="h-8 w-8 text-primary" />}
                  <span className="font-semibold text-sm">{cat.label}</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming & Editorial */}
      <section className="w-full py-12 md:py-24">
        <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2">
          {/* Upcoming Calendar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Upcoming Calendar
              </h2>
              <Link
                href="/upcoming"
                className="text-sm font-medium text-primary hover:underline flex items-center"
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-center bg-primary/10 p-2 rounded-md">
                  <p className="font-bold text-lg text-primary">28</p>
                  <p className="text-xs text-primary/80">AUG</p>
                </div>
                <div>
                  <h3 className="font-semibold">Galaxy S25 India Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    Expected to be announced online.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-center bg-primary/10 p-2 rounded-md">
                  <p className="font-bold text-lg text-primary">05</p>
                  <p className="text-xs text-primary/80">SEP</p>
                </div>
                <div>
                  <h3 className="font-semibold">Apple iPhone Event</h3>
                  <p className="text-sm text-muted-foreground">
                    The official reveal of the new iPhone 17 series.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Editorial */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              News & Guides
            </h2>
            <div className="space-y-4">
              <Card className="hover:bg-muted/50 transition-colors">
                <Link href="#" className="block p-4">
                  <Badge>Deep Dive</Badge>
                  <h3 className="font-semibold mt-2">
                    iPhone 16 Explained: Everything We Know
                  </h3>
                </Link>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors">
                <Link href="#" className="block p-4">
                  <Badge>Industry News</Badge>
                  <h3 className="font-semibold mt-2">
                    Snapdragon 8 Gen 4: What to Expect
                  </h3>
                </Link>
              </Card>
              <Card className="hover:bg-muted/50 transition-colors">
                <Link href="#" className="block p-4">
                  <Badge>Guides</Badge>
                  <h3 className="font-semibold mt-2">
                    Top Phones to Buy in September
                  </h3>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Subscribe Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Your Trusted Source for Mobile Specs
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide accurate, up-to-date information you can rely on.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm grid-cols-3 items-start justify-center gap-8 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Star className="h-8 w-8 text-primary" />
              <p className="font-bold">128+ Specs</p>
              <p className="text-sm text-muted-foreground">Per Phone</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Info className="h-8 w-8 text-primary" />
              <p className="font-bold">Verified Sources</p>
              <p className="text-sm text-muted-foreground">Always Accurate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-8 w-8 text-primary" />
              <p className="font-bold">Daily Updates</p>
              <p className="text-sm text-muted-foreground">
                Never Miss a Launch
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2 mt-8">
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              Get weekly launch alerts and top news.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">
            From the Blog
          </h2>
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Categories</h3>
              <div className="grid gap-2">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Buying Guides
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Top 10 Phones
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Tips & Tricks
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Industry Insights
                </Link>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <Image
                  src="https://picsum.photos/600/400"
                  width={600}
                  height={400}
                  alt="Blog post"
                  className="rounded-t-lg object-cover aspect-video"
                  data-ai-hint="mobile technology"
                />
                <CardContent className="p-4">
                  <Badge>Buying Guides</Badge>
                  <h3 className="text-lg font-bold mt-2">
                    How to Choose the Right Phone for You
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    A comprehensive guide to navigating the complex world of
                    smartphones.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <Image
                  src="https://picsum.photos/600/401"
                  width={600}
                  height={400}
                  alt="Blog post"
                  className="rounded-t-lg object-cover aspect-video"
                  data-ai-hint="smartphone camera"
                />
                <CardContent className="p-4">
                  <Badge>Tips & Tricks</Badge>
                  <h3 className="text-lg font-bold mt-2">
                    Master Your Phone's Camera: Pro Tips
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Unlock the full potential of your smartphone's camera with
                    these expert tips.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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

    



