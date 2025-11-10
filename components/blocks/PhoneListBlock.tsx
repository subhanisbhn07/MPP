'use client';

import { PhoneSpec } from '@/lib/types';
import { PhoneCard } from '@/components/phone/PhoneCard';
import { ColorVariant, sectionVariants } from '@/lib/tokens/colors';
import { ChevronRight } from 'lucide-react';

interface PhoneListBlockProps {
  title: string;
  variant: ColorVariant;
  phones: PhoneSpec[];
  onCompare?: (phoneId: string) => void;
}

export function PhoneListBlock({
  title,
  variant,
  phones,
  onCompare,
}: PhoneListBlockProps) {
  const { bg, text } = sectionVariants[variant];
  const displayPhones = phones.slice(0, 12);

  return (
    <section className={`${bg} py-12 sm:py-16`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold ${text} tracking-tight`}>{title}</h2>
          <button className={`flex items-center gap-1 text-sm font-medium ${text} hover:text-[#4169E1] transition-colors group`}>
            View all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayPhones.map(phone => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              onCompare={onCompare}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
