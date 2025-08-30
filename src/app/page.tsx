import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneCard } from '@/components/phone-card';
import { latestPhones, popularPhones } from '@/lib/data';
import { Search, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-card py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find Your Next Phone
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  The ultimate platform to compare mobile phone specifications and make informed decisions.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    type="search"
                    placeholder="Search for a phone..."
                    className="max-w-lg flex-1"
                  />
                  <Button type="submit" variant="default">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  e.g., "Galaxy S24" or "iPhone 15 Pro"
                </p>
              </div>
            </div>
            <Image
              src="https://picsum.photos/600/400"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="mobile phones"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              Latest Phones
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Fresh Off the Press
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out the newest additions to the mobile world. Cutting-edge technology at your fingertips.
            </p>
          </div>
          <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {latestPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-card py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              Popular Comparisons
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Crowd Favorites
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what phones are trending and how they stack up against the competition.
            </p>
          </div>
          <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {popularPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              AI-Powered Specifications
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              For admins: Our AI can generate detailed phone specifications instantly. Save time and ensure accuracy.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <Button size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Try AI Spec Generator
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
