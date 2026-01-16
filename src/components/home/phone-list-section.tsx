'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PhoneCard } from '@/components/phone-card';
import type { Phone } from '@/lib/types';

interface PhoneListSectionProps {
  id: string;
  title: string;
  phones: Phone[];
  phonesToShow: number;
  viewAllHref?: string;
  viewAllText?: string;
  onAddToCompare: (phone: Phone) => void;
}

export function PhoneListSection({
  id,
  title,
  phones,
  phonesToShow,
  viewAllHref = '#',
  viewAllText = 'View all',
  onAddToCompare,
}: PhoneListSectionProps) {
  return (
    <Card className="rounded-lg" aria-labelledby={`${id}-heading`}>
      <CardHeader className="p-6 flex items-center justify-between flex-row bg-primary text-primary-foreground rounded-t-lg">
        <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tighter sm:text-3xl">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors h-10 px-4 py-2 hover:underline"
        >
          {viewAllText} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <ul role="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {phones.slice(0, phonesToShow).map((phone) => (
            <li role="listitem" key={phone.id}>
              <article aria-label={`${phone.brand} ${phone.model}`}>
                <PhoneCard phone={phone} onAddToCompare={onAddToCompare} />
              </article>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
