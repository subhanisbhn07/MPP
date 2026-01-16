'use client';

import { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsTickerProps {
  items: string[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <div className="pb-4 mt-8">
      <div
        className="relative flex items-center bg-primary text-primary-foreground rounded-lg p-2 text-sm overflow-hidden"
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <Megaphone className="h-5 w-5 mr-2 flex-shrink-0 text-accent" aria-hidden="true" />
        <div className="flex-1 overflow-hidden">
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "flex w-max motion-safe:animate-ticker",
              tickerPaused && "motion-safe:[animation-play-state:paused]"
            )}
          >
            {items.map((item, index) => (
              <p key={index} className="whitespace-nowrap pr-12">
                {item}
              </p>
            ))}
            {items.map((item, index) => (
              <p key={`duplicate-${index}`} className="whitespace-nowrap pr-12">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
