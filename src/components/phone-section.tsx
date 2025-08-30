
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Phone } from '@/lib/types';
import { PhoneCard } from '@/components/phone-card';
import { cn } from '@/lib/utils';

interface PhoneSectionProps {
  title: string;
  phones: Phone[];
  onAddToCompare: (phone: Phone) => void;
  className?: string;
  seeAllLink?: string;
}

export function PhoneSection({ 
  title, 
  phones, 
  onAddToCompare,
  className,
  seeAllLink = "#" 
}: PhoneSectionProps) {
  return (
    <section className={cn("w-full py-12 md:py-16", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            {title}
          </h2>
          <Link
            href={seeAllLink}
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            See All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {phones.map((phone) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              onAddToCompare={onAddToCompare}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

    