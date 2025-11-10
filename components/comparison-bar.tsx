'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ComparisonBarProps {
  phones: string[];
  onRemove: (phoneId: string) => void;
  onClear: () => void;
}

export function ComparisonBar({ phones, onRemove, onClear }: ComparisonBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(phones.length > 0);
  }, [phones]);

  if (!isVisible) return null;

  const comparisonSlug = phones.join('-vs-');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium">
                Compare ({phones.length}/4):
              </span>
              <div className="flex gap-2 flex-1 overflow-x-auto">
                {phones.map((phoneId) => (
                  <div
                    key={phoneId}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-md text-sm whitespace-nowrap"
                  >
                    <span>{phoneId}</span>
                    <button
                      onClick={() => onRemove(phoneId)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClear}>
                Clear All
              </Button>
              <Link href={`/compare/${comparisonSlug}`}>
                <Button size="sm" disabled={phones.length < 2}>
                  Compare Now
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
