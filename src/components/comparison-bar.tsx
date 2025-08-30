
'use client';

import type { Phone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ComparisonBarProps {
  phones: Phone[];
  onRemove: (phoneId: number) => void;
}

export function ComparisonBar({ phones, onRemove }: ComparisonBarProps) {
  if (phones.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="container mx-auto shadow-2xl">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Compare ({phones.length}/4)</h3>
            <div className="flex items-center gap-3">
              {phones.map((phone) => (
                <div key={phone.id} className="relative">
                  <Image
                    src={phone.image}
                    alt={phone.model}
                    width={60}
                    height={45}
                    className="rounded-md object-cover"
                    data-ai-hint="mobile phone"
                  />
                  <button
                    onClick={() => onRemove(phone.id)}
                    className="absolute -top-2 -right-2 bg-muted rounded-full p-0.5 border"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {[...Array(4 - phones.length)].map((_, i) => (
                <div key={`placeholder-${i}`} className="w-[60px] h-[45px] rounded-md bg-muted/50 border-2 border-dashed flex items-center justify-center">
                    <PlusCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
                <Link href="/compare">Compare Now</Link>
            </Button>
            <Button variant="ghost" onClick={() => onRemove(phones[0].id)}>Clear all</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
