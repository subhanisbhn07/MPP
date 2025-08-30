
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCard } from '@/components/phone-card';
import { allPhones, latestPhones, popularPhones } from '@/lib/data';
import { Search, Sparkles, ChevronRight, Rss, Battery, Gamepad2, Camera, Smartphone, ArrowRight, Layers, Star, Info, Mail, Calendar, Tv, Shield, Zap, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';


const specCategories = [
  { icon: Camera, label: 'Best Camera', href: '#' },
  { icon: Battery, label: 'Battery Phones', href: '#' },
  { icon: Zap, label: 'Fast Charging', href: '#' },
  { icon: Gamepad2, label: 'Gaming Phones', href: '#' },
  { icon: null, label: 'Under ₹20K', href: '#' },
  { icon: Rss, label: '5G Phones', href: '#' },
  { icon: Star, label: 'Flagships', href: '#' },
  { icon: Smartphone, label: 'Compact Phones', href: '#' },
  { icon: Layers, label: 'Expandable Storage', href: '#' },
  { icon: null, label: 'Satellite Phones', href: '#' },
];

const brandLogos = [
    { name: 'Apple', logo: 'https://picsum.photos/100/40' },
    { name: 'Samsung', logo: 'https://picsum.photos/100/40' },
    { name: 'Google', logo: 'https://picsum.photos/100/40' },
    { name: 'OnePlus', logo: 'https://picsum.photos/100/40' },
    { name: 'Xiaomi', logo: 'https://picsum.photos/100/40' },
    { name: 'Vivo', logo: 'https://picsum.photos/100/40' },
];


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-card py-12 md:py-24 lg:py-32 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Discover. Compare. Decide.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              AI-updated specs, comparisons & SEO-friendly landing pages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild><Link href="#">Latest Phones</Link></Button>
              <Button size="lg" variant="secondary" asChild><Link href="#">Upcoming</Link></Button>
              <Button size="lg" variant="outline" asChild><Link href="/compare">Compare Mobiles</Link></Button>
            </div>
          </div>
        </div>
        <div className="container mt-8 overflow-hidden">
            <div className="relative flex items-center bg-secondary text-secondary-foreground rounded-lg p-2 text-sm">
                <Rss className="h-5 w-5 mr-2 flex-shrink-0"/>
                <div className="animate-ticker flex w-max">
                    <p className="whitespace-nowrap pr-12">Pixel 9a announced with new Tensor G4 chip.</p>
                    <p className="whitespace-nowrap pr-12">iPhone 16 Pro leaks suggest a larger display.</p>
                    <p className="whitespace-nowrap pr-12">Samsung Galaxy S25 to feature satellite connectivity.</p>
                     <p className="whitespace-nowrap pr-12">Pixel 9a announced with new Tensor G4 chip.</p>
                    <p className="whitespace-nowrap pr-12">iPhone 16 Pro leaks suggest a larger display.</p>
                    <p className="whitespace-nowrap pr-12">Samsung Galaxy S25 to feature satellite connectivity.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Trending Phones */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Trending Phones</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {popularPhones.slice(0, 6).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
          </div>
        </div>
      </section>

      {/* Latest Launches */}
      <section className="w-full py-12 md:py-16 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Latest Launches</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {latestPhones.slice(0, 6).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
          </div>
        </div>
      </section>

      {/* Flagship Phones */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Flagship Phones</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {allPhones.filter(p => p.price > 900).slice(0, 6).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
          </div>
        </div>
      </section>
      
      {/* Performance Phones */}
      <section className="w-full py-12 md:py-16 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Performance Phones</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
              See All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {popularPhones.slice(0,6).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
          </div>
        </div>
      </section>
      
       {/* Power & Performance Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">Power & Performance</h2>
          <Tabs defaultValue="battery" className="w-full">
            <TabsList className="mb-4 justify-center">
              <TabsTrigger value="battery"><Battery className="mr-2"/>Battery</TabsTrigger>
              <TabsTrigger value="gaming"><Gamepad2 className="mr-2"/>Gaming</TabsTrigger>
              <TabsTrigger value="camera"><Camera className="mr-2"/>Camera</TabsTrigger>
            </TabsList>
            <TabsContent value="battery">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {popularPhones.slice().reverse().map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
            <TabsContent value="gaming">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {allPhones.filter(p => p.price > 600).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
            <TabsContent value="camera">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {latestPhones.map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Specialty Phones Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center">Specialty Phones</h2>
          <Tabs defaultValue="foldable" className="w-full">
            <TabsList className="mb-4 justify-center">
              <TabsTrigger value="foldable"><Smartphone className="mr-2"/>Foldable</TabsTrigger>
              <TabsTrigger value="rugged"><Shield className="mr-2"/>Rugged</TabsTrigger>
              <TabsTrigger value="unique"><Sparkles className="mr-2"/>Unique</TabsTrigger>
            </TabsList>
            <TabsContent value="foldable">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {latestPhones.filter(p => p.model.includes('Fold')).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
             <TabsContent value="rugged">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {popularPhones.slice(0,2).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
             <TabsContent value="unique">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {latestPhones.slice(2,5).map((phone) => <PhoneCard key={phone.id} phone={phone} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Quick Compare & Brand Explorer */}
      <section className="w-full py-12 md:py-24">
        <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2">
          {/* Quick Compare */}
          <div className="space-y-4">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Quick Compare</h2>
             <div className="flex gap-4">
                <Card className="flex-1">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg h-32">
                        <Button variant="ghost" className="flex flex-col h-auto p-4">
                          <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Add Phone</span>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="flex-1">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg h-32">
                        <Button variant="ghost" className="flex flex-col h-auto p-4">
                          <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Add Phone</span>
                        </Button>
                    </CardContent>
                </Card>
             </div>
             <Button className="w-full">Compare</Button>
             <p className="text-sm text-muted-foreground text-center">Popular: iPhone 16 vs Pixel 9a</p>
          </div>
          {/* Brand Explorer */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Brand Explorer</h2>
              <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
                See All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {brandLogos.map(brand => (
                    <Link key={brand.name} href="#">
                        <Card className="flex items-center justify-center p-4 hover:bg-muted/50 transition-colors h-full">
                            <Image src={brand.logo} alt={brand.name} width={100} height={40} data-ai-hint="brand logo" className="object-contain" />
                        </Card>
                    </Link>
                ))}
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
                  {cat.icon && <cat.icon className="h-8 w-8 mb-2 text-primary" />}
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
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Upcoming Calendar</h2>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
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
                        <p className="text-sm text-muted-foreground">Expected to be announced online.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-center bg-primary/10 p-2 rounded-md">
                        <p className="font-bold text-lg text-primary">05</p>
                        <p className="text-xs text-primary/80">SEP</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Apple iPhone Event</h3>
                        <p className="text-sm text-muted-foreground">The official reveal of the new iPhone 17 series.</p>
                    </div>
                  </div>
               </div>
            </div>
            {/* Editorial */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">News & Guides</h2>
              <div className="space-y-4">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" className="block p-4">
                      <Badge>Deep Dive</Badge>
                      <h3 className="font-semibold mt-2">iPhone 16 Explained: Everything We Know</h3>
                    </Link>
                  </Card>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" className="block p-4">
                      <Badge>Industry News</Badge>
                      <h3 className="font-semibold mt-2">Snapdragon 8 Gen 4: What to Expect</h3>
                    </Link>
                  </Card>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <Link href="#" className="block p-4">
                      <Badge>Guides</Badge>
                      <h3 className="font-semibold mt-2">Top Phones to Buy in September</h3>
                    </Link>
                  </Card>
              </div>
            </div>
         </div>
      </section>
      
      {/* Trust & Subscribe */}
       <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
         <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2 items-center">
             <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trust & Transparency</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Star className="text-primary"/>
                        <span className="font-medium">128+ specs per phone</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Info className="text-primary"/>
                        <span className="font-medium">Verified sources</span>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Calendar className="text-primary"/>
                        <span className="font-medium">Daily updates</span>
                    </div>
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Get weekly launch alerts.</h3>
                <form className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1"
                  />
                  <Button type="submit">
                    Subscribe
                  </Button>
                </form>
             </div>
         </div>
      </section>

    </div>
  );
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
