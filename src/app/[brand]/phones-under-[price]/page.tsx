import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { BrandPriceClient } from './components/brand-price-client';

interface BrandPricePageProps {
  params: Promise<{
    brand: string;
    price: string;
  }>;
}

const VALID_PRICE_POINTS = [200, 300, 400, 500, 600, 700, 800, 1000, 1200, 1500, 2000];

const VALID_BRANDS = [
  'apple', 'samsung', 'google', 'oneplus', 'xiaomi', 'oppo', 'vivo', 
  'motorola', 'sony', 'asus', 'nothing', 'realme', 'huawei', 'honor',
  'nokia', 'lg', 'htc', 'blackberry', 'lenovo', 'zte', 'tcl', 'infinix',
  'tecno', 'poco', 'iqoo', 'redmi', 'fairphone', 'cat', 'ulefone'
];

function getBrandDisplayName(slug: string): string {
  const brandMap: Record<string, string> = {
    'apple': 'Apple',
    'samsung': 'Samsung',
    'google': 'Google',
    'oneplus': 'OnePlus',
    'xiaomi': 'Xiaomi',
    'oppo': 'Oppo',
    'vivo': 'Vivo',
    'motorola': 'Motorola',
    'sony': 'Sony',
    'asus': 'Asus',
    'nothing': 'Nothing',
    'realme': 'Realme',
    'huawei': 'Huawei',
    'honor': 'Honor',
    'nokia': 'Nokia',
    'lg': 'LG',
    'htc': 'HTC',
    'blackberry': 'BlackBerry',
    'lenovo': 'Lenovo',
    'zte': 'ZTE',
    'tcl': 'TCL',
    'infinix': 'Infinix',
    'tecno': 'Tecno',
    'poco': 'Poco',
    'iqoo': 'iQOO',
    'redmi': 'Redmi',
    'fairphone': 'Fairphone',
    'cat': 'Cat',
    'ulefone': 'Ulefone',
  };
  return brandMap[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function getPriceFromSlug(slug: string): number | null {
  const price = parseInt(slug, 10);
  if (isNaN(price) || !VALID_PRICE_POINTS.includes(price)) {
    return null;
  }
  return price;
}

function getBrandPhonesUnderPrice(brand: string, maxPrice: number): Phone[] {
  return allPhones
    .filter(phone => 
      phone.brand.toLowerCase() === brand.toLowerCase() &&
      phone.price > 0 && 
      phone.price <= maxPrice
    )
    .sort((a, b) => b.price - a.price);
}

function generateFAQs(brandName: string, maxPrice: number, phoneCount: number) {
  return [
    {
      question: `What are the best ${brandName} phones under $${maxPrice}?`,
      answer: `We have ${phoneCount} ${brandName} phones under $${maxPrice} in our database. ${brandName} offers excellent options in this price range with their signature features and build quality.`,
    },
    {
      question: `Are ${brandName} phones under $${maxPrice} worth buying?`,
      answer: `${brandName} phones under $${maxPrice} offer great value with the brand's signature features, software experience, and build quality. They're excellent choices for users who want the ${brandName} ecosystem without paying flagship prices.`,
    },
    {
      question: `What features do ${brandName} phones under $${maxPrice} offer?`,
      answer: `${brandName} phones in this price range typically include quality displays, capable cameras, reliable performance, and the brand's signature software experience. Specific features vary by model.`,
    },
    {
      question: `How do ${brandName} phones compare to other brands under $${maxPrice}?`,
      answer: `${brandName} phones compete well in the under $${maxPrice} segment. They're known for their software optimization, build quality, and brand reliability. Compare specific models to find the best fit for your needs.`,
    },
  ];
}

export async function generateMetadata({ params }: BrandPricePageProps): Promise<Metadata> {
  const { brand, price } = await params;
  const maxPrice = getPriceFromSlug(price);
  const brandName = getBrandDisplayName(brand);
  
  if (!maxPrice) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phones = getBrandPhonesUnderPrice(brand, maxPrice);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best ${brandName} Phones Under $${maxPrice} (${currentYear}) | Compare ${phones.length}+ Options | MobilePhonesPro`,
    description: `Discover the best ${brandName} smartphones under $${maxPrice} in ${currentYear}. Compare ${phones.length}+ ${brandName} phones with detailed specs, ratings, and prices.`,
    keywords: [
      `${brandName} phones under $${maxPrice}`,
      `best ${brandName} phones under ${maxPrice}`,
      `${brandName} smartphones under $${maxPrice}`,
      `cheap ${brandName} phones`,
      `affordable ${brandName} smartphones`,
      `${brandName} budget phones ${currentYear}`,
    ],
    openGraph: {
      title: `Best ${brandName} Phones Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ ${brandName} smartphones under $${maxPrice}. Find the perfect ${brandName} phone with our detailed specifications and ratings.`,
      type: 'website',
      url: `https://mobilephonespro.com/${brand.toLowerCase()}/phones-under-${maxPrice}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best ${brandName} Phones Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ ${brandName} smartphones under $${maxPrice}. Find the perfect ${brandName} phone.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/${brand.toLowerCase()}/phones-under-${maxPrice}`,
    },
  };
}

export async function generateStaticParams() {
  const params: { brand: string; price: string }[] = [];
  
  for (const brand of VALID_BRANDS) {
    for (const price of VALID_PRICE_POINTS) {
      params.push({
        brand,
        price: price.toString(),
      });
    }
  }
  
  return params;
}

export default async function BrandPricePage({ params }: BrandPricePageProps) {
  const { brand, price } = await params;
  const maxPrice = getPriceFromSlug(price);
  const brandSlug = brand.toLowerCase();

  if (!maxPrice || !VALID_BRANDS.includes(brandSlug)) {
    notFound();
  }

  const brandName = getBrandDisplayName(brandSlug);
  const phones = getBrandPhonesUnderPrice(brandSlug, maxPrice);
  const faqs = generateFAQs(brandName, maxPrice, phones.length);

  const relatedPriceRanges = VALID_PRICE_POINTS
    .filter(p => p !== maxPrice)
    .slice(0, 5)
    .map(p => ({
      price: p,
      count: getBrandPhonesUnderPrice(brandSlug, p).length,
    }));

  const otherBrands = VALID_BRANDS
    .filter(b => b !== brandSlug)
    .slice(0, 8)
    .map(b => ({
      slug: b,
      name: getBrandDisplayName(b),
      count: getBrandPhonesUnderPrice(b, maxPrice).length,
    }));

  return (
    <BrandPriceClient 
      brandSlug={brandSlug}
      brandName={brandName}
      maxPrice={maxPrice} 
      phones={phones} 
      faqs={faqs}
      relatedPriceRanges={relatedPriceRanges}
      otherBrands={otherBrands}
    />
  );
}
