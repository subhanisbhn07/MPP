import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { CombinedClient } from './components/combined-client';

interface CombinedPageProps {
  params: Promise<{
    feature: string;
    price: string;
  }>;
}

interface FeatureConfig {
  slug: string;
  title: string;
  description: string;
  filter: (phone: Phone) => boolean;
  keywords: string[];
}

const FEATURE_CONFIGS: FeatureConfig[] = [
  {
    slug: 'camera',
    title: 'Camera',
    description: 'Phones with exceptional camera systems for photography and video',
    filter: (phone) => {
      const mainRes = phone.specs.main_camera.main_sensor_resolution || '';
      const mp = parseInt(mainRes.replace(/[^\d]/g, '')) || 0;
      return mp >= 50;
    },
    keywords: ['best camera phone', 'phone for photography', 'camera phone'],
  },
  {
    slug: 'gaming',
    title: 'Gaming',
    description: 'High-performance phones optimized for mobile gaming',
    filter: (phone) => {
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      const chipset = phone.specs.platform.chipset?.toLowerCase() || '';
      const hasGoodChip = chipset.includes('snapdragon 8') || chipset.includes('snapdragon 7') || 
                          chipset.includes('dimensity 9') || chipset.includes('dimensity 8') ||
                          chipset.includes('a17') || chipset.includes('a16') || chipset.includes('a15');
      return refreshRate >= 90 || hasGoodChip;
    },
    keywords: ['best gaming phone', 'phone for gaming', 'gaming smartphone'],
  },
  {
    slug: 'battery',
    title: 'Battery',
    description: 'Phones with long-lasting batteries for all-day use',
    filter: (phone) => {
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return battery >= 4500;
    },
    keywords: ['best battery phone', 'long battery life phone', 'phone with big battery'],
  },
  {
    slug: '5g',
    title: '5G',
    description: 'Phones with 5G connectivity for faster mobile internet',
    filter: (phone) => {
      const network = phone.specs.network.network_technology?.toLowerCase() || '';
      return network.includes('5g');
    },
    keywords: ['best 5g phone', '5g smartphone', 'phone with 5g'],
  },
  {
    slug: 'display',
    title: 'Display',
    description: 'Phones with stunning displays for media and gaming',
    filter: (phone) => {
      const panelType = phone.specs.display.panel_type?.toLowerCase() || '';
      const hasAMOLED = panelType.includes('amoled') || panelType.includes('oled');
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      return hasAMOLED || refreshRate >= 90;
    },
    keywords: ['best display phone', 'phone with best screen', 'amoled phone'],
  },
  {
    slug: 'fast-charging',
    title: 'Fast Charging',
    description: 'Phones with rapid charging technology',
    filter: (phone) => {
      const charging = parseInt(phone.specs.battery.wired_charging_wattage?.replace(/[^\d]/g, '') || '0');
      return charging >= 33;
    },
    keywords: ['best fast charging phone', 'quick charge phone', 'rapid charging phone'],
  },
  {
    slug: 'storage',
    title: 'Storage',
    description: 'Phones with ample storage for apps, photos, and videos',
    filter: (phone) => {
      const storage = phone.specs.memory.storage_capacities?.toLowerCase() || '';
      return storage.includes('256') || storage.includes('512') || storage.includes('1tb');
    },
    keywords: ['best storage phone', 'phone with most storage', 'high storage phone'],
  },
  {
    slug: 'selfie',
    title: 'Selfie',
    description: 'Phones with excellent front cameras for selfies and video calls',
    filter: (phone) => {
      const frontRes = phone.specs.selfie_camera.front_camera_resolution || '';
      const mp = parseInt(frontRes.replace(/[^\d]/g, '')) || 0;
      return mp >= 12;
    },
    keywords: ['best selfie phone', 'phone for selfies', 'front camera phone'],
  },
  {
    slug: 'compact',
    title: 'Compact',
    description: 'Small phones that are easy to use one-handed',
    filter: (phone) => {
      const displaySize = parseFloat(phone.specs.display.size_inches) || 0;
      return displaySize <= 6.3 && displaySize >= 5.5;
    },
    keywords: ['best compact phone', 'small phone', 'mini phone'],
  },
  {
    slug: 'rugged',
    title: 'Rugged',
    description: 'Durable phones built to withstand tough conditions',
    filter: (phone) => {
      const ipRating = phone.specs.body.ip_rating?.toLowerCase() || '';
      return ipRating.includes('ip68') || ipRating.includes('ip67');
    },
    keywords: ['best rugged phone', 'durable phone', 'waterproof phone'],
  },
];

const VALID_PRICES = [300, 400, 500, 600, 700, 800, 1000, 1200, 1500];

function getFeatureConfig(slug: string): FeatureConfig | undefined {
  return FEATURE_CONFIGS.find(config => config.slug === slug);
}

function getPhonesForCombined(featureConfig: FeatureConfig, maxPrice: number): Phone[] {
  return allPhones
    .filter(phone => phone.price <= maxPrice && featureConfig.filter(phone))
    .sort((a, b) => b.price - a.price);
}

function generateFAQs(featureConfig: FeatureConfig, maxPrice: number, phones: Phone[]): { question: string; answer: string }[] {
  const currentYear = new Date().getFullYear();
  const topPhone = phones.length > 0 ? phones[0] : null;
  const budgetPhone = phones.length > 0 ? phones.reduce((min, p) => p.price < min.price ? p : min, phones[0]) : null;

  return [
    {
      question: `What is the best ${featureConfig.title.toLowerCase()} phone under $${maxPrice} in ${currentYear}?`,
      answer: topPhone 
        ? `Based on our analysis, the ${topPhone.brand} ${topPhone.model} ($${topPhone.price}) is one of the top ${featureConfig.title.toLowerCase()} phones under $${maxPrice}. ${featureConfig.description}`
        : `We recommend phones that ${featureConfig.description.toLowerCase()}. Browse our curated list to find the perfect match under $${maxPrice}.`,
    },
    {
      question: `How many ${featureConfig.title.toLowerCase()} phones are available under $${maxPrice}?`,
      answer: `We've identified ${phones.length} phones with excellent ${featureConfig.title.toLowerCase()} capabilities priced under $${maxPrice}.`,
    },
    {
      question: `What is the most affordable ${featureConfig.title.toLowerCase()} phone under $${maxPrice}?`,
      answer: budgetPhone 
        ? `The most budget-friendly ${featureConfig.title.toLowerCase()} phone under $${maxPrice} is the ${budgetPhone.brand} ${budgetPhone.model} at $${budgetPhone.price}.`
        : `Browse our selection to find affordable ${featureConfig.title.toLowerCase()} phones under $${maxPrice}.`,
    },
    {
      question: `What should I look for in a ${featureConfig.title.toLowerCase()} phone under $${maxPrice}?`,
      answer: `${featureConfig.description} At this price point, you can expect good ${featureConfig.title.toLowerCase()} performance without breaking the bank. Compare our top picks to find the best value.`,
    },
  ];
}

export async function generateStaticParams() {
  const params: { feature: string; price: string }[] = [];
  
  for (const feature of FEATURE_CONFIGS) {
    for (const price of VALID_PRICES) {
      params.push({
        feature: feature.slug,
        price: price.toString(),
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: CombinedPageProps): Promise<Metadata> {
  const { feature, price } = await params;
  const featureConfig = getFeatureConfig(feature);
  const maxPrice = parseInt(price);
  
  if (!featureConfig || !VALID_PRICES.includes(maxPrice)) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phones = getPhonesForCombined(featureConfig, maxPrice);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best ${featureConfig.title} Phone Under $${maxPrice} (${currentYear}) | ${phones.length}+ Options | MobilePhonesPro`,
    description: `${featureConfig.description} Compare ${phones.length}+ ${featureConfig.title.toLowerCase()} phones under $${maxPrice} with detailed specs, ratings, and prices.`,
    keywords: [
      ...featureConfig.keywords.map(k => `${k} under $${maxPrice}`),
      `best ${featureConfig.title.toLowerCase()} phone under ${maxPrice}`,
      `${featureConfig.title.toLowerCase()} phone ${currentYear}`,
      'smartphone comparison',
      'phone buying guide',
    ],
    openGraph: {
      title: `Best ${featureConfig.title} Phone Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ ${featureConfig.title.toLowerCase()} phones under $${maxPrice}. Find the ideal phone with our detailed specifications and expert recommendations.`,
      type: 'website',
      url: `https://mobilephonespro.com/best-${featureConfig.slug}-phone-under-${maxPrice}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best ${featureConfig.title} Phone Under $${maxPrice} (${currentYear})`,
      description: `Compare ${phones.length}+ ${featureConfig.title.toLowerCase()} phones under $${maxPrice}. Find the ideal phone with our detailed specifications and expert recommendations.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/best-${featureConfig.slug}-phone-under-${maxPrice}`,
    },
  };
}

export default async function CombinedPage({ params }: CombinedPageProps) {
  const { feature, price } = await params;
  const featureConfig = getFeatureConfig(feature);
  const maxPrice = parseInt(price);
  
  if (!featureConfig || !VALID_PRICES.includes(maxPrice)) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const phones = getPhonesForCombined(featureConfig, maxPrice);
  const faqs = generateFAQs(featureConfig, maxPrice, phones);
  
  const relatedPrices = VALID_PRICES.filter(p => p !== maxPrice).slice(0, 5);
  const relatedFeatures = FEATURE_CONFIGS.filter(f => f.slug !== featureConfig.slug).slice(0, 6);

  return (
    <CombinedClient
      featureConfig={featureConfig}
      maxPrice={maxPrice}
      phones={phones}
      faqs={faqs}
      relatedPrices={relatedPrices}
      relatedFeatures={relatedFeatures}
      allFeatures={FEATURE_CONFIGS}
      allPrices={VALID_PRICES}
    />
  );
}
