
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Megaphone } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full bg-[#FAD600] pt-12 md:pt-24 lg:pt-32 border-b group/hero">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#22304A]">
            Discover. Compare. Decide.
          </h1>
          <p className="max-w-[600px] text-[#22304A]/80 md:text-xl">
            AI-updated specs, comparisons & SEO-friendly landing pages.
          </p>
          <div className="mt-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-[#334DCF] text-[#334DCF] hover:bg-[#334DCF] hover:text-white"
              asChild
            >
              <Link href="/compare">Compare Mobiles</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mt-12 pb-12">
        <div className="relative flex items-center bg-[#334DCF] text-white rounded-lg p-2 text-sm overflow-hidden group/ticker">
          <Megaphone className="h-5 w-5 mr-2 flex-shrink-0" />
          <div className="flex-1 overflow-hidden">
            <div className="group-hover/ticker:[animation-play-state:paused] animate-ticker flex w-max">
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
  );
}
