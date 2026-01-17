import { Metadata } from 'next';
import { getPhonesFromSlug } from "@/lib/utils";
import { CompareClient } from "../components/compare-client";
import type { Phone } from "@/lib/types";

interface CompareSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function generateComparisonTitle(phones: Phone[]): string {
  if (phones.length === 0) return 'Compare Phones | MobilePhonesPro';
  const names = phones.map(p => `${p.brand} ${p.model}`);
  if (names.length === 2) {
    return `${names[0]} vs ${names[1]} - Full Comparison | MobilePhonesPro`;
  }
  return `${names.join(' vs ')} - Comparison | MobilePhonesPro`;
}

function generateComparisonDescription(phones: Phone[]): string {
  if (phones.length === 0) {
    return 'Compare mobile phones side-by-side with detailed specifications, ratings, and prices.';
  }
  const names = phones.map(p => `${p.brand} ${p.model}`);
  const currentYear = new Date().getFullYear();
  
  if (phones.length === 2) {
    return `${names[0]} vs ${names[1]} comparison (${currentYear}). Compare specs, camera, battery, display, performance, and price. Find out which phone is better for you.`;
  }
  return `Compare ${names.join(', ')} side-by-side. Detailed specifications, camera comparison, battery life, display quality, and pricing to help you choose the best phone.`;
}

function generateComparisonKeywords(phones: Phone[]): string[] {
  if (phones.length === 0) return ['compare phones', 'phone comparison', 'smartphone comparison'];
  
  const keywords: string[] = [];
  const names = phones.map(p => `${p.brand} ${p.model}`);
  
  if (phones.length === 2) {
    keywords.push(`${names[0]} vs ${names[1]}`);
    keywords.push(`${names[1]} vs ${names[0]}`);
    keywords.push(`${names[0]} comparison`);
    keywords.push(`${names[1]} comparison`);
    keywords.push(`${phones[0].brand} vs ${phones[1].brand}`);
  }
  
  phones.forEach(p => {
    keywords.push(`${p.brand} ${p.model} specs`);
    keywords.push(`${p.brand} ${p.model} review`);
  });
  
  keywords.push('phone comparison', 'smartphone comparison', 'which phone is better');
  
  return keywords;
}

export async function generateMetadata({ params }: CompareSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const phones = slug ? getPhonesFromSlug(decodeURIComponent(slug)) : [];
  
  const title = generateComparisonTitle(phones);
  const description = generateComparisonDescription(phones);
  const keywords = generateComparisonKeywords(phones);
  
  const canonicalSlug = phones.map(p => p.model.toLowerCase().replace(/ /g, '-')).join('-vs-');
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title: title.replace(' | MobilePhonesPro', ''),
      description,
      type: 'website',
      url: `https://mobilephonespro.com/compare/${canonicalSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title.replace(' | MobilePhonesPro', ''),
      description,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/compare/${canonicalSlug}`,
    },
  };
}

// This is the server-rendered page for a shared comparison URL.
// It fetches the initial phones from the slug on the server.
export default async function CompareSlugPage({ params }: CompareSlugPageProps) {
  const { slug } = await params;
  let initialPhones: Phone[] = [];

  if (slug) {
    initialPhones = getPhonesFromSlug(decodeURIComponent(slug));
  }

  // The CompareClient component receives the server-fetched initial phones.
  return <CompareClient initialPhones={initialPhones} />;
}
