import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { PriceRangeClient } from './components/price-range-client';

interface PriceRangePageProps {
  params: Promise<{
    price: string;
  }>;
}

const VALID_PRICE_POINTS = [200, 300, 400, 500, 600, 700, 800, 1000, 1200, 1500, 2000];

function getPriceFromSlug(slug: string): number | null {
  const price = parseInt(slug, 10);
  if (isNaN(price) || !VALID_PRICE_POINTS.includes(price)) {
    return null;
  }
  return price;
}

function getPhonesUnderPrice(maxPrice: number): Phone[] {
  return allPhones
    .filter(phone => phone.price > 0 && phone.price <= maxPrice)
    .sort((a, b) => b.price - a.price);
}

function generateFAQs(maxPrice: number, phoneCount: number) {
  return [
    {
      question: `What are the best phones under $${maxPrice}?`,
      answer: `We have ${phoneCount} phones under $${maxPrice} in our database. The best options include flagship killers with premium features at affordable prices, mid-range champions with excellent value, and budget-friendly options that don't compromise on essentials.`,
    },
    {
      question: `Are phones under $${maxPrice} worth buying?`,
      answer: `Absolutely! Phones under $${maxPrice} offer excellent value for money. Many devices in this price range feature capable processors, good cameras, long-lasting batteries, and modern designs. The key is to prioritize features that matter most to you.`,
    },
    {
      question: `What features should I look for in phones under $${maxPrice}?`,
      answer: `When shopping for phones under $${maxPrice}, focus on: processor performance for smooth daily use, camera quality for your photography needs, battery capacity for all-day usage, display quality for media consumption, and software support for long-term updates.`,
    },
    {
      question: `Which brands offer the best phones under $${maxPrice}?`,
      answer: `Several brands excel in the under $${maxPrice} segment. Samsung, Xiaomi, OnePlus, Google, and Motorola consistently deliver excellent value. Each brand has its strengths - Samsung for displays, Google for cameras, OnePlus for performance, and Xiaomi for features per dollar.`,
    },
  ];
}

export async function generateMetadata({ params }: PriceRangePageProps): Promise<Metadata> {
  const { price } = await params;
  const maxPrice = getPriceFromSlug(price);
  
  if (!maxPrice) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phones = getPhonesUnderPrice(maxPrice);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best Phones Under $${maxPrice} (${currentYear}) | Compare ${phones.length}+ Options | MobilePhonesPro`,
    description: `Discover the best smartphones under $${maxPrice} in ${currentYear}. Compare ${phones.length}+ phones with detailed specs, ratings, and prices. Find your perfect budget-friendly phone today.`,
    keywords: [
      `phones under $${maxPrice}`,
      `best phones under ${maxPrice}`,
      `smartphones under $${maxPrice}`,
      `budget phones ${currentYear}`,
      `affordable smartphones`,
      `cheap phones with good specs`,
    ],
    openGraph: {
      title: `Best Phones Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ smartphones under $${maxPrice}. Find the perfect phone with our detailed specifications and ratings.`,
      type: 'website',
      url: `https://mobilephonespro.com/phones-under-${maxPrice}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best Phones Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ smartphones under $${maxPrice}. Find the perfect phone with our detailed specifications and ratings.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/phones-under-${maxPrice}`,
    },
  };
}

export async function generateStaticParams() {
  return VALID_PRICE_POINTS.map((price) => ({
    price: price.toString(),
  }));
}

export default async function PriceRangePage({ params }: PriceRangePageProps) {
  const { price } = await params;
  const maxPrice = getPriceFromSlug(price);

  if (!maxPrice) {
    notFound();
  }

  const phones = getPhonesUnderPrice(maxPrice);
  const faqs = generateFAQs(maxPrice, phones.length);

  const relatedPriceRanges = VALID_PRICE_POINTS
    .filter(p => p !== maxPrice)
    .slice(0, 5)
    .map(p => ({
      price: p,
      count: getPhonesUnderPrice(p).length,
    }));

  return (
    <PriceRangeClient 
      maxPrice={maxPrice} 
      phones={phones} 
      faqs={faqs}
      relatedPriceRanges={relatedPriceRanges}
    />
  );
}
