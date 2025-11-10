'use client';

import { PhoneSpec } from '@/lib/types';
import { PhoneCard } from '@/components/phone/PhoneCard';
import { chunkIntoColumns } from '@/lib/utils';
import { ColorVariant, sectionVariants } from '@/lib/tokens/colors';

interface PhoneListBlockProps {
  title: string;
  variant: ColorVariant;
  phones: PhoneSpec[];
  columns?: number;
  rowsPerCol?: number;
  onCompare?: (phoneId: string) => void;
}

export function PhoneListBlock({
  title,
  variant,
  phones,
  columns = 3,
  rowsPerCol = 5,
  onCompare,
}: PhoneListBlockProps) {
  const { bg, text } = sectionVariants[variant];
  const displayPhones = phones.slice(0, columns * rowsPerCol);
  const phoneColumns = chunkIntoColumns(displayPhones, columns);

  return (
    <section className={`${bg} py-6 sm:py-8`}>
      <div className="container">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className={`text-xl sm:text-2xl font-bold ${text}`}>{title}</h2>
          <button className={`text-xs sm:text-sm ${text} hover:underline`}>
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {phoneColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 sm:gap-4">
              {column.map(phone => (
                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  onCompare={onCompare}
                  variant="featured"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
