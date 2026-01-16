'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  return (
    <div className="text-center py-16 bg-accent rounded-lg p-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
          {title}
        </h1>
        <p className="max-w-[600px] md:text-xl text-foreground/80">
          {subtitle}
        </p>
        <div className="mt-4">
          <Button asChild size="lg" variant="default">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
