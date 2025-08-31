
'use client';

import type { Phone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { generateCompareUrl } from '@/lib/utils';

interface ComparisonBarProps {
  phones: Phone[];
  onRemove: (phoneId: number) => void;
  onClear: () => void;
}

export function ComparisonBar({ phones, onRemove, onClear }: ComparisonBarProps) {
  if (phones.length === 0) {
    return null;
  }
  
  const compareUrl = generateCompareUrl(phones);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm">
      <Card className="container mx-auto shadow-2xl">
        <CardContent className="p-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <h3 className="text-lg font-semibold hidden sm:block">Compare ({phones.length}/4)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              {phones.map((phone) => (
                <div key={phone.id} className="relative text-center">
                  <div className="aspect-square w-full max-w-[80px] mx-auto relative">
                     <Image
                      src={phone.image}
                      alt={phone.model}
                      fill
                      className="rounded-md object-cover"
                      data-ai-hint="mobile phone"
                    />
                  </div>
                  <p className="text-xs mt-1 font-semibold truncate">{phone.model}</p>
                  <button
                    onClick={() => onRemove(phone.id)}
                    className="absolute -top-1 -right-1 bg-muted rounded-full p-0.5 border"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {[...Array(4 - phones.length)].map((_, i) => (
                <div key={`placeholder-${i}`} className="w-full max-w-[80px] aspect-square mx-auto rounded-md bg-muted/50 border-2 border-dashed flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button asChild disabled={phones.length < 2}>
                <Link href={compareUrl}>Compare Now</Link>
            </Button>
            <Button variant="ghost" onClick={onClear}>Clear all</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
