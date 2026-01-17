import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { FeatureClient } from './components/feature-client';

interface FeaturePageProps {
  params: Promise<{
    feature: string;
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
    slug: '5000mah-battery',
    title: '5000mAh Battery',
    description: 'Phones with 5000mAh or larger batteries for all-day power',
    filter: (phone) => {
      const capacity = parseInt(phone.specs.battery.capacity_mah) || 0;
      return capacity >= 5000;
    },
    keywords: ['5000mah battery phones', 'long battery life phones', 'big battery phones'],
  },
  {
    slug: '6000mah-battery',
    title: '6000mAh Battery',
    description: 'Phones with massive 6000mAh or larger batteries for extreme endurance',
    filter: (phone) => {
      const capacity = parseInt(phone.specs.battery.capacity_mah) || 0;
      return capacity >= 6000;
    },
    keywords: ['6000mah battery phones', 'longest battery life phones', 'massive battery phones'],
  },
  {
    slug: '120hz-display',
    title: '120Hz Display',
    description: 'Phones with smooth 120Hz or higher refresh rate displays',
    filter: (phone) => {
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      return refreshRate >= 120;
    },
    keywords: ['120hz display phones', 'high refresh rate phones', 'smooth display phones'],
  },
  {
    slug: '144hz-display',
    title: '144Hz Display',
    description: 'Phones with ultra-smooth 144Hz or higher refresh rate displays for gaming',
    filter: (phone) => {
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      return refreshRate >= 144;
    },
    keywords: ['144hz display phones', 'gaming display phones', 'ultra smooth display'],
  },
  {
    slug: '108mp-camera',
    title: '108MP Camera',
    description: 'Phones with 108MP or higher resolution main cameras for detailed photos',
    filter: (phone) => {
      const resolution = phone.specs.main_camera.main_sensor_resolution || '';
      const mp = parseInt(resolution.replace(/[^\d]/g, '')) || 0;
      return mp >= 108;
    },
    keywords: ['108mp camera phones', 'high resolution camera phones', 'best camera phones'],
  },
  {
    slug: '200mp-camera',
    title: '200MP Camera',
    description: 'Phones with flagship 200MP cameras for professional-grade photography',
    filter: (phone) => {
      const resolution = phone.specs.main_camera.main_sensor_resolution || '';
      const mp = parseInt(resolution.replace(/[^\d]/g, '')) || 0;
      return mp >= 200;
    },
    keywords: ['200mp camera phones', 'best camera phones 2024', 'professional camera phones'],
  },
  {
    slug: '5g',
    title: '5G Connectivity',
    description: 'Phones with 5G network support for ultra-fast mobile internet',
    filter: (phone) => {
      const network = phone.specs.network.network_technology?.toLowerCase() || '';
      return network.includes('5g');
    },
    keywords: ['5g phones', '5g smartphones', 'phones with 5g'],
  },
  {
    slug: 'wireless-charging',
    title: 'Wireless Charging',
    description: 'Phones with wireless charging support for cable-free convenience',
    filter: (phone) => {
      const wireless = phone.specs.battery.wireless_charging_wattage?.toLowerCase() || '';
      return wireless.includes('yes') || wireless.includes('qi') || wireless.includes('w') || parseInt(wireless) > 0;
    },
    keywords: ['wireless charging phones', 'qi charging phones', 'cable free charging'],
  },
  {
    slug: 'fast-charging',
    title: 'Fast Charging (65W+)',
    description: 'Phones with 65W or faster charging for quick power-ups',
    filter: (phone) => {
      const charging = phone.specs.battery.wired_charging_wattage || '';
      const watts = parseInt(charging.replace(/[^\d]/g, '')) || 0;
      return watts >= 65;
    },
    keywords: ['fast charging phones', '65w charging phones', 'quick charge phones'],
  },
  {
    slug: 'super-fast-charging',
    title: 'Super Fast Charging (100W+)',
    description: 'Phones with 100W or faster charging for blazing-fast power-ups',
    filter: (phone) => {
      const charging = phone.specs.battery.wired_charging_wattage || '';
      const watts = parseInt(charging.replace(/[^\d]/g, '')) || 0;
      return watts >= 100;
    },
    keywords: ['100w charging phones', 'super fast charging', 'fastest charging phones'],
  },
  {
    slug: '12gb-ram',
    title: '12GB RAM',
    description: 'Phones with 12GB or more RAM for smooth multitasking',
    filter: (phone) => {
      const ram = phone.specs.memory.ram_capacities || '';
      const gbMatch = ram.match(/(\d+)\s*GB/i);
      const gb = gbMatch ? parseInt(gbMatch[1]) : 0;
      return gb >= 12;
    },
    keywords: ['12gb ram phones', 'high ram phones', 'multitasking phones'],
  },
  {
    slug: '16gb-ram',
    title: '16GB RAM',
    description: 'Phones with flagship 16GB or more RAM for ultimate performance',
    filter: (phone) => {
      const ram = phone.specs.memory.ram_capacities || '';
      const gbMatch = ram.match(/(\d+)\s*GB/i);
      const gb = gbMatch ? parseInt(gbMatch[1]) : 0;
      return gb >= 16;
    },
    keywords: ['16gb ram phones', 'gaming phones', 'flagship ram phones'],
  },
  {
    slug: '256gb-storage',
    title: '256GB Storage',
    description: 'Phones with 256GB or more storage for all your apps and media',
    filter: (phone) => {
      const storage = phone.specs.memory.storage_capacities || '';
      const gbMatch = storage.match(/(\d+)\s*GB/i);
      const gb = gbMatch ? parseInt(gbMatch[1]) : 0;
      return gb >= 256;
    },
    keywords: ['256gb storage phones', 'high storage phones', 'large storage phones'],
  },
  {
    slug: '512gb-storage',
    title: '512GB Storage',
    description: 'Phones with massive 512GB or more storage for power users',
    filter: (phone) => {
      const storage = phone.specs.memory.storage_capacities || '';
      const gbMatch = storage.match(/(\d+)\s*GB/i);
      const gb = gbMatch ? parseInt(gbMatch[1]) : 0;
      return gb >= 512;
    },
    keywords: ['512gb storage phones', 'massive storage phones', 'power user phones'],
  },
  {
    slug: 'amoled-display',
    title: 'AMOLED Display',
    description: 'Phones with vibrant AMOLED or OLED displays for stunning visuals',
    filter: (phone) => {
      const panel = phone.specs.display.panel_type?.toLowerCase() || '';
      return panel.includes('amoled') || panel.includes('oled');
    },
    keywords: ['amoled display phones', 'oled phones', 'best display phones'],
  },
  {
    slug: 'ip68-water-resistant',
    title: 'IP68 Water Resistant',
    description: 'Phones with IP68 water and dust resistance for durability',
    filter: (phone) => {
      const protection = phone.specs.body.ip_rating?.toLowerCase() || '';
      return protection.includes('ip68') || protection.includes('ip69');
    },
    keywords: ['ip68 phones', 'waterproof phones', 'water resistant phones'],
  },
  {
    slug: 'telephoto-camera',
    title: 'Telephoto Camera',
    description: 'Phones with dedicated telephoto lenses for optical zoom',
    filter: (phone) => {
      const telephoto = phone.specs.main_camera.telephoto_specs?.toLowerCase() || '';
      return telephoto.length > 0 && telephoto !== 'n/a' && telephoto !== 'none';
    },
    keywords: ['telephoto camera phones', 'optical zoom phones', 'zoom camera phones'],
  },
  {
    slug: 'ultrawide-camera',
    title: 'Ultrawide Camera',
    description: 'Phones with ultrawide cameras for expansive landscape shots',
    filter: (phone) => {
      const ultrawide = phone.specs.main_camera.ultrawide_camera_specs?.toLowerCase() || '';
      return ultrawide.length > 0 && ultrawide !== 'n/a' && ultrawide !== 'none';
    },
    keywords: ['ultrawide camera phones', 'wide angle camera phones', 'landscape photography phones'],
  },
  {
    slug: 'stereo-speakers',
    title: 'Stereo Speakers',
    description: 'Phones with stereo speakers for immersive audio experience',
    filter: (phone) => {
      const speakers = phone.specs.audio.loudspeakers?.toLowerCase() || '';
      return speakers.includes('stereo') || speakers.includes('dual');
    },
    keywords: ['stereo speaker phones', 'dual speaker phones', 'best audio phones'],
  },
  {
    slug: 'headphone-jack',
    title: 'Headphone Jack',
    description: 'Phones with 3.5mm headphone jack for wired audio',
    filter: (phone) => {
      const jack = phone.specs.audio['3.5mm_jack']?.toLowerCase() || '';
      return jack.includes('yes') || jack.includes('3.5');
    },
    keywords: ['phones with headphone jack', '3.5mm jack phones', 'wired headphone phones'],
  },
  {
    slug: 'expandable-storage',
    title: 'Expandable Storage',
    description: 'Phones with microSD card slot for expandable storage',
    filter: (phone) => {
      const expandable = phone.specs.memory.expandable_storage?.toLowerCase() || '';
      return expandable.includes('yes') || expandable.includes('microsd') || expandable.includes('sd');
    },
    keywords: ['expandable storage phones', 'microsd phones', 'sd card phones'],
  },
  {
    slug: 'dual-sim',
    title: 'Dual SIM',
    description: 'Phones with dual SIM support for two phone numbers',
    filter: (phone) => {
      const sim = phone.specs.network.sim_slots_and_type?.toLowerCase() || '';
      return sim.includes('dual');
    },
    keywords: ['dual sim phones', 'two sim phones', 'dual sim smartphones'],
  },
  {
    slug: 'nfc',
    title: 'NFC',
    description: 'Phones with NFC for contactless payments and data transfer',
    filter: (phone) => {
      const nfc = phone.specs.connectivity.nfc?.toLowerCase() || '';
      return nfc.includes('yes');
    },
    keywords: ['nfc phones', 'contactless payment phones', 'tap to pay phones'],
  },
  {
    slug: 'foldable',
    title: 'Foldable',
    description: 'Foldable phones with innovative form factors',
    filter: (phone) => {
      const formFactor = phone.specs.body.form_factor?.toLowerCase() || '';
      const model = phone.model.toLowerCase();
      return formFactor.includes('fold') || formFactor.includes('flip') || 
             model.includes('fold') || model.includes('flip') || model.includes('razr');
    },
    keywords: ['foldable phones', 'flip phones', 'folding smartphones'],
  },
];

function getFeatureConfig(slug: string): FeatureConfig | undefined {
  return FEATURE_CONFIGS.find(config => config.slug === slug);
}

function getPhonesWithFeature(config: FeatureConfig): Phone[] {
  return allPhones.filter(config.filter).sort((a, b) => b.price - a.price);
}

function generateFAQs(config: FeatureConfig, phones: Phone[]): { question: string; answer: string }[] {
  const currentYear = new Date().getFullYear();
  const cheapestPhone = phones.length > 0 ? phones.reduce((min, p) => p.price < min.price ? p : min, phones[0]) : null;
  const mostExpensive = phones.length > 0 ? phones.reduce((max, p) => p.price > max.price ? p : max, phones[0]) : null;

  return [
    {
      question: `What are the best phones with ${config.title.toLowerCase()} in ${currentYear}?`,
      answer: `We've found ${phones.length} phones with ${config.title.toLowerCase()}. ${mostExpensive ? `The ${mostExpensive.brand} ${mostExpensive.model} ($${mostExpensive.price}) is among the top options.` : ''} Browse our complete list to find the perfect phone for your needs.`,
    },
    {
      question: `How many phones have ${config.title.toLowerCase()}?`,
      answer: `Currently, there are ${phones.length} phones in our database with ${config.title.toLowerCase()}. This includes options from various brands and price ranges.`,
    },
    {
      question: `What is the cheapest phone with ${config.title.toLowerCase()}?`,
      answer: cheapestPhone 
        ? `The most affordable phone with ${config.title.toLowerCase()} is the ${cheapestPhone.brand} ${cheapestPhone.model} at $${cheapestPhone.price}.`
        : `Browse our selection to find budget-friendly options with ${config.title.toLowerCase()}.`,
    },
    {
      question: `Why should I choose a phone with ${config.title.toLowerCase()}?`,
      answer: config.description,
    },
  ];
}

export async function generateStaticParams() {
  return FEATURE_CONFIGS.map(config => ({
    feature: config.slug,
  }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { feature } = await params;
  const config = getFeatureConfig(feature);
  
  if (!config) {
    return {
      title: 'Feature Not Found | MobilePhonesPro',
    };
  }

  const phones = getPhonesWithFeature(config);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best Phones with ${config.title} (${currentYear}) | ${phones.length}+ Options | MobilePhonesPro`,
    description: `${config.description}. Compare ${phones.length}+ phones with ${config.title.toLowerCase()} - detailed specs, ratings, and prices to help you find the perfect phone.`,
    keywords: [
      ...config.keywords,
      `best ${config.title.toLowerCase()} phones ${currentYear}`,
      `phones with ${config.title.toLowerCase()}`,
      'smartphone comparison',
    ],
    openGraph: {
      title: `Best Phones with ${config.title} (${currentYear})`,
      description: `Compare ${phones.length}+ phones with ${config.title.toLowerCase()}. Find the perfect phone with detailed specifications and ratings.`,
      type: 'website',
      url: `https://mobilephonespro.com/phones-with-${config.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best Phones with ${config.title} (${currentYear})`,
      description: `Compare ${phones.length}+ phones with ${config.title.toLowerCase()}. Find the perfect phone with detailed specifications and ratings.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/phones-with-${config.slug}`,
    },
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { feature } = await params;
  const config = getFeatureConfig(feature);
  
  if (!config) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Feature Not Found</h1>
        <p className="text-muted-foreground">
          The feature you're looking for doesn't exist. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const phones = getPhonesWithFeature(config);
  const faqs = generateFAQs(config, phones);
  
  const relatedFeatures = FEATURE_CONFIGS
    .filter(f => f.slug !== config.slug)
    .slice(0, 6);

  return (
    <FeatureClient
      config={config}
      phones={phones}
      faqs={faqs}
      relatedFeatures={relatedFeatures}
      allFeatures={FEATURE_CONFIGS}
    />
  );
}
