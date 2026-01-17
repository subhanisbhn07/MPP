import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { AlternativesClient } from './components/alternatives-client';

interface AlternativesPageProps {
  params: Promise<{
    brand: string;
    model: string;
  }>;
}

function findPhone(brand: string, model: string): Phone | undefined {
  return allPhones.find(
    (p) =>
      p.brand.toLowerCase() === decodeURIComponent(brand).toLowerCase() &&
      p.model.toLowerCase().replace(/ /g, '-') === decodeURIComponent(model).toLowerCase()
  );
}

function findAlternatives(phone: Phone): Phone[] {
  const priceRange = 0.3;
  const minPrice = phone.price * (1 - priceRange);
  const maxPrice = phone.price * (1 + priceRange);

  return allPhones
    .filter((p) => {
      if (p.id === phone.id) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.brand === phone.brand) scoreA += 2;
      if (b.brand === phone.brand) scoreB += 2;

      const priceDiffA = Math.abs(a.price - phone.price);
      const priceDiffB = Math.abs(b.price - phone.price);
      scoreA += (1 - priceDiffA / phone.price) * 3;
      scoreB += (1 - priceDiffB / phone.price) * 3;

      const ramA = parseInt(a.specs.memory.ram_capacities) || 0;
      const ramB = parseInt(b.specs.memory.ram_capacities) || 0;
      const ramPhone = parseInt(phone.specs.memory.ram_capacities) || 0;
      if (Math.abs(ramA - ramPhone) <= 4) scoreA += 1;
      if (Math.abs(ramB - ramPhone) <= 4) scoreB += 1;

      return scoreB - scoreA;
    })
    .slice(0, 12);
}

function generateFAQs(phone: Phone, alternativesCount: number) {
  const phoneName = `${phone.brand} ${phone.model}`;
  return [
    {
      question: `What are the best alternatives to ${phoneName}?`,
      answer: `We've found ${alternativesCount} excellent alternatives to the ${phoneName}. These phones offer similar features, performance, and value in the same price range. Compare them side-by-side to find the best option for your needs.`,
    },
    {
      question: `Why should I consider alternatives to ${phoneName}?`,
      answer: `While the ${phoneName} is a great phone, alternatives might offer better value, different features, or a preferred brand experience. Comparing alternatives helps you make an informed decision based on your specific priorities.`,
    },
    {
      question: `How do ${phoneName} alternatives compare in price?`,
      answer: `The alternatives we've selected are within a similar price range to the ${phoneName} ($${phone.price}). This ensures you're comparing phones that offer comparable value and features at a similar investment.`,
    },
    {
      question: `Which ${phoneName} alternative has the best camera?`,
      answer: `Camera quality varies among alternatives. We recommend comparing the camera specifications and sample photos for each phone. Look at sensor size, megapixels, and computational photography features to find the best camera for your needs.`,
    },
  ];
}

export async function generateMetadata({ params }: AlternativesPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const phone = findPhone(brand, model);
  
  if (!phone) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phoneName = `${phone.brand} ${phone.model}`;
  const alternatives = findAlternatives(phone);
  const currentYear = new Date().getFullYear();

  return {
    title: `${phoneName} Alternatives (${currentYear}) | Compare ${alternatives.length}+ Similar Phones | MobilePhonesPro`,
    description: `Looking for ${phoneName} alternatives? Compare ${alternatives.length}+ similar smartphones with detailed specs, ratings, and prices. Find the perfect alternative to the ${phoneName}.`,
    keywords: [
      `${phoneName} alternatives`,
      `phones like ${phoneName}`,
      `${phoneName} competitors`,
      `similar to ${phoneName}`,
      `${phone.brand} alternatives`,
      `phones similar to ${phone.model}`,
    ],
    openGraph: {
      title: `${phoneName} Alternatives (${currentYear})`,
      description: `Compare ${alternatives.length}+ alternatives to the ${phoneName}. Find similar phones with our detailed specifications and ratings.`,
      type: 'website',
      url: `https://mobilephonespro.com/${brand.toLowerCase()}/${model.toLowerCase()}/alternatives`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${phoneName} Alternatives (${currentYear})`,
      description: `Compare ${alternatives.length}+ alternatives to the ${phoneName}. Find similar phones with detailed specs.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/${brand.toLowerCase()}/${model.toLowerCase()}/alternatives`,
    },
  };
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { brand, model } = await params;
  const phone = findPhone(brand, model);

  if (!phone) {
    notFound();
  }

  const alternatives = findAlternatives(phone);
  const faqs = generateFAQs(phone, alternatives.length);

  const sameBrandAlternatives = alternatives.filter(p => p.brand === phone.brand);
  const otherBrandAlternatives = alternatives.filter(p => p.brand !== phone.brand);

  return (
    <AlternativesClient 
      phone={phone}
      alternatives={alternatives}
      sameBrandAlternatives={sameBrandAlternatives}
      otherBrandAlternatives={otherBrandAlternatives}
      faqs={faqs}
    />
  );
}
