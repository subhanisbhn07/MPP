import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface QuickCompareBlockProps {
  title: string;
  description: string;
  ctaText: string;
}

export function QuickCompareBlock({ title, description, ctaText }: QuickCompareBlockProps) {
  return (
    <section className="bg-[#FFD700] py-8 sm:py-10">
      <div className="container text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6">
          {description}
        </p>
        <Link href="/compare">
          <Button size="lg" className="bg-[#4169E1] text-white hover:bg-[#4169E1]/90 px-6 sm:px-8 text-sm sm:text-base">
            {ctaText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
