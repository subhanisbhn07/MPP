import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { OutcomeClient } from './components/outcome-client';

interface OutcomePageProps {
  params: Promise<{
    outcome: string;
  }>;
}

interface OutcomeConfig {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  filter: (phone: Phone) => boolean;
  sort: (a: Phone, b: Phone) => number;
  keywords: string[];
}

const OUTCOME_CONFIGS: OutcomeConfig[] = [
  {
    slug: 'battery-life',
    title: 'Battery Life',
    description: 'Phones that last all day and beyond with massive batteries and efficient processors',
    longDescription: 'The best battery life phones combine large capacity batteries (5000mAh+) with efficient processors and optimized software. These phones can easily last 1-2 days on a single charge with moderate use, making them perfect for travelers, heavy users, and anyone who hates carrying a charger.',
    filter: (phone) => {
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return battery >= 5000;
    },
    sort: (a, b) => {
      const batteryA = parseInt(a.specs.battery.capacity_mah) || 0;
      const batteryB = parseInt(b.specs.battery.capacity_mah) || 0;
      return batteryB - batteryA;
    },
    keywords: ['best battery life phone', 'long lasting phone', 'phone that lasts all day', 'best phone battery'],
  },
  {
    slug: 'camera-quality',
    title: 'Camera Quality',
    description: 'Phones with exceptional camera systems that rival professional cameras',
    longDescription: 'The best camera phones feature large sensors, advanced computational photography, versatile lens options (ultrawide, telephoto), and excellent low-light performance. These phones can capture stunning photos and videos in any condition, from bright daylight to challenging night scenes.',
    filter: (phone) => {
      const mainRes = phone.specs.main_camera.main_sensor_resolution || '';
      const mp = parseInt(mainRes.replace(/[^\d]/g, '')) || 0;
      const hasOIS = phone.specs.main_camera.ois_type?.toLowerCase().includes('yes') || phone.specs.main_camera.ois_type?.toLowerCase().includes('ois');
      return mp >= 50 && hasOIS;
    },
    sort: (a, b) => {
      const mpA = parseInt(a.specs.main_camera.main_sensor_resolution?.replace(/[^\d]/g, '') || '0');
      const mpB = parseInt(b.specs.main_camera.main_sensor_resolution?.replace(/[^\d]/g, '') || '0');
      return mpB - mpA;
    },
    keywords: ['best camera phone', 'best phone for photos', 'phone with best camera', 'camera quality phone'],
  },
  {
    slug: 'gaming-performance',
    title: 'Gaming Performance',
    description: 'High-performance phones optimized for smooth mobile gaming at 60fps and beyond',
    longDescription: 'The best gaming phones feature flagship processors (Snapdragon 8 Gen 3, Apple A17 Pro), high refresh rate displays (120Hz+), advanced cooling systems, and large batteries. These phones deliver smooth 60fps+ gameplay in demanding titles with minimal thermal throttling.',
    filter: (phone) => {
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      const chipset = phone.specs.platform.chipset?.toLowerCase() || '';
      const hasGamingChip = chipset.includes('snapdragon 8') || chipset.includes('dimensity 9') || chipset.includes('a17') || chipset.includes('a16');
      return refreshRate >= 120 && hasGamingChip;
    },
    sort: (a, b) => {
      const refreshA = parseInt(a.specs.display.refresh_rate_hz) || 60;
      const refreshB = parseInt(b.specs.display.refresh_rate_hz) || 60;
      return refreshB - refreshA;
    },
    keywords: ['best gaming phone', 'phone for 60fps gaming', 'mobile gaming phone', 'high performance phone'],
  },
  {
    slug: 'display-quality',
    title: 'Display Quality',
    description: 'Phones with stunning displays featuring high resolution, brightness, and color accuracy',
    longDescription: 'The best display phones feature AMOLED or LTPO panels with high resolution (QHD+), excellent peak brightness (1500+ nits), wide color gamut, and high refresh rates. These displays deliver an immersive viewing experience for media consumption, gaming, and everyday use.',
    filter: (phone) => {
      const panelType = phone.specs.display.panel_type?.toLowerCase() || '';
      const hasAMOLED = panelType.includes('amoled') || panelType.includes('oled') || panelType.includes('ltpo');
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      return hasAMOLED && refreshRate >= 120;
    },
    sort: (a, b) => {
      const brightnessA = parseInt(a.specs.display.peak_brightness_nits?.replace(/[^\d]/g, '') || '0');
      const brightnessB = parseInt(b.specs.display.peak_brightness_nits?.replace(/[^\d]/g, '') || '0');
      return brightnessB - brightnessA;
    },
    keywords: ['best display phone', 'best screen phone', 'phone with best display', 'high resolution phone'],
  },
  {
    slug: 'fast-charging',
    title: 'Fast Charging',
    description: 'Phones that charge from 0 to 100% in record time with ultra-fast charging technology',
    longDescription: 'The best fast charging phones support 65W+ wired charging, allowing you to go from 0 to 50% in just 15-20 minutes. Some phones even support 100W+ charging for even faster top-ups. These phones are perfect for busy users who need quick power boosts.',
    filter: (phone) => {
      const charging = parseInt(phone.specs.battery.wired_charging_wattage?.replace(/[^\d]/g, '') || '0');
      return charging >= 65;
    },
    sort: (a, b) => {
      const chargingA = parseInt(a.specs.battery.wired_charging_wattage?.replace(/[^\d]/g, '') || '0');
      const chargingB = parseInt(b.specs.battery.wired_charging_wattage?.replace(/[^\d]/g, '') || '0');
      return chargingB - chargingA;
    },
    keywords: ['best fast charging phone', 'quick charge phone', 'fastest charging phone', 'rapid charging phone'],
  },
  {
    slug: 'low-light-photography',
    title: 'Low Light Photography',
    description: 'Phones that excel at capturing stunning photos in challenging low-light conditions',
    longDescription: 'The best low-light photography phones feature large camera sensors, wide apertures, advanced night mode algorithms, and optical image stabilization. These phones can capture bright, detailed photos even in near-darkness, making them perfect for night photography enthusiasts.',
    filter: (phone) => {
      const hasNightMode = phone.specs.main_camera.night_mode_computational_features?.toLowerCase().includes('night') || 
                          phone.specs.imaging_features.night_mode_gen_algorithms?.length > 0;
      const hasOIS = phone.specs.main_camera.ois_type?.toLowerCase().includes('yes') || phone.specs.main_camera.ois_type?.toLowerCase().includes('ois');
      return hasNightMode && hasOIS;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best night photography phone', 'low light camera phone', 'phone for night photos', 'dark photography phone'],
  },
  {
    slug: 'video-recording',
    title: 'Video Recording',
    description: 'Phones with professional-grade video capabilities including 4K, 8K, and cinematic modes',
    longDescription: 'The best video recording phones support 4K60fps or even 8K recording, feature advanced stabilization (OIS + EIS), offer cinematic video modes, and have excellent audio capture with multiple microphones. These phones are perfect for content creators and videographers.',
    filter: (phone) => {
      const videoSpecs = phone.specs.main_camera.video_resolutions_and_framerates?.toLowerCase() || '';
      const has4K60 = videoSpecs.includes('4k') && (videoSpecs.includes('60fps') || videoSpecs.includes('60p'));
      const hasOIS = phone.specs.main_camera.ois_type?.toLowerCase().includes('yes') || phone.specs.main_camera.ois_type?.toLowerCase().includes('ois');
      return has4K60 && hasOIS;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best video phone', 'phone for video recording', '4k video phone', 'cinematic video phone'],
  },
  {
    slug: 'durability',
    title: 'Durability',
    description: 'Rugged phones built to withstand drops, water, dust, and extreme conditions',
    longDescription: 'The most durable phones feature IP68 water and dust resistance, military-grade certifications (MIL-STD-810H), Gorilla Glass Victus protection, and reinforced frames. These phones can survive drops, submersion, and harsh environments without damage.',
    filter: (phone) => {
      const ipRating = phone.specs.body.ip_rating?.toLowerCase() || '';
      const hasIP68 = ipRating.includes('ip68') || ipRating.includes('ip69');
      const hasGlass = phone.specs.display.glass_protection?.toLowerCase().includes('gorilla') || 
                       phone.specs.display.glass_protection?.toLowerCase().includes('victus');
      return hasIP68 && hasGlass;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['most durable phone', 'rugged phone', 'waterproof phone', 'drop resistant phone'],
  },
  {
    slug: 'value-for-money',
    title: 'Value for Money',
    description: 'Phones that offer the best features and performance for their price point',
    longDescription: 'The best value phones deliver flagship-level features at mid-range prices. Look for phones with good processors, capable cameras, large batteries, and quality displays without the premium price tag. These phones offer 80% of flagship performance at 50% of the cost.',
    filter: (phone) => {
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      const refreshRate = parseInt(phone.specs.display.refresh_rate_hz) || 60;
      return phone.price <= 600 && battery >= 4500 && refreshRate >= 90;
    },
    sort: (a, b) => {
      const valueA = (parseInt(a.specs.battery.capacity_mah) || 0) / a.price;
      const valueB = (parseInt(b.specs.battery.capacity_mah) || 0) / b.price;
      return valueB - valueA;
    },
    keywords: ['best value phone', 'best phone for the money', 'budget flagship phone', 'affordable phone'],
  },
  {
    slug: 'audio-quality',
    title: 'Audio Quality',
    description: 'Phones with exceptional speakers, DACs, and audio features for music lovers',
    longDescription: 'The best audio phones feature stereo speakers with Dolby Atmos support, high-quality DACs, Hi-Res audio certification, and spatial audio capabilities. Some even retain the 3.5mm headphone jack for audiophiles who prefer wired listening.',
    filter: (phone) => {
      const speakers = phone.specs.audio.loudspeakers?.toLowerCase() || '';
      const hasStereo = speakers.includes('stereo') || speakers.includes('dual');
      const hasHiRes = phone.specs.audio.hi_res_audio_support?.toLowerCase().includes('yes');
      return hasStereo || hasHiRes;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best audio phone', 'phone for music', 'best speakers phone', 'audiophile phone'],
  },
  {
    slug: 'productivity',
    title: 'Productivity',
    description: 'Phones optimized for work with large displays, multitasking features, and stylus support',
    longDescription: 'The best productivity phones feature large displays (6.5"+) for comfortable document editing, powerful processors for smooth multitasking, plenty of RAM (12GB+), and features like split-screen and desktop mode. Some even support stylus input for note-taking.',
    filter: (phone) => {
      const displaySize = parseFloat(phone.specs.display.size_inches) || 0;
      const ram = parseInt(phone.specs.memory.ram_capacities?.replace(/[^\d]/g, '') || '0');
      return displaySize >= 6.5 && ram >= 12;
    },
    sort: (a, b) => {
      const ramA = parseInt(a.specs.memory.ram_capacities?.replace(/[^\d]/g, '') || '0');
      const ramB = parseInt(b.specs.memory.ram_capacities?.replace(/[^\d]/g, '') || '0');
      return ramB - ramA;
    },
    keywords: ['best productivity phone', 'phone for work', 'business phone', 'multitasking phone'],
  },
  {
    slug: 'selfies',
    title: 'Selfies',
    description: 'Phones with exceptional front cameras for stunning selfies and video calls',
    longDescription: 'The best selfie phones feature high-resolution front cameras (12MP+), wide-angle lenses for group shots, autofocus for sharp images, and advanced beauty modes. These phones are perfect for social media enthusiasts and video callers.',
    filter: (phone) => {
      const frontRes = phone.specs.selfie_camera.front_camera_resolution || '';
      const mp = parseInt(frontRes.replace(/[^\d]/g, '')) || 0;
      return mp >= 12;
    },
    sort: (a, b) => {
      const mpA = parseInt(a.specs.selfie_camera.front_camera_resolution?.replace(/[^\d]/g, '') || '0');
      const mpB = parseInt(b.specs.selfie_camera.front_camera_resolution?.replace(/[^\d]/g, '') || '0');
      return mpB - mpA;
    },
    keywords: ['best selfie phone', 'phone for selfies', 'front camera phone', 'selfie camera phone'],
  },
  {
    slug: 'compact-size',
    title: 'Compact Size',
    description: 'Small phones that are easy to use one-handed without sacrificing features',
    longDescription: 'The best compact phones feature displays under 6.2 inches while still packing flagship features. These phones are easier to use one-handed, fit comfortably in pockets, and are lighter to carry. Perfect for users who find modern phones too large.',
    filter: (phone) => {
      const displaySize = parseFloat(phone.specs.display.size_inches) || 0;
      return displaySize <= 6.2 && displaySize >= 5.5;
    },
    sort: (a, b) => {
      const sizeA = parseFloat(a.specs.display.size_inches) || 0;
      const sizeB = parseFloat(b.specs.display.size_inches) || 0;
      return sizeA - sizeB;
    },
    keywords: ['best small phone', 'compact smartphone', 'mini phone', 'one handed phone'],
  },
  {
    slug: 'storage-capacity',
    title: 'Storage Capacity',
    description: 'Phones with massive storage for apps, photos, videos, and games',
    longDescription: 'The best storage phones offer 512GB or even 1TB of internal storage, perfect for users who store lots of photos, videos, games, and apps. Some also support expandable storage via microSD cards for even more space.',
    filter: (phone) => {
      const storage = phone.specs.memory.storage_capacities?.toLowerCase() || '';
      return storage.includes('512') || storage.includes('1tb') || storage.includes('1024');
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best storage phone', 'phone with most storage', '1tb phone', 'high storage phone'],
  },
  {
    slug: 'eye-comfort',
    title: 'Eye Comfort',
    description: 'Phones with eye-friendly displays featuring DC dimming and high PWM frequencies',
    longDescription: 'The best eye comfort phones feature displays with DC dimming or high PWM frequencies (1920Hz+) to reduce eye strain during extended use. They also offer features like blue light filters, reading modes, and adaptive brightness for comfortable viewing.',
    filter: (phone) => {
      const pwm = phone.specs.display.pwm_dimming_hz || '';
      const hasDC = pwm.toLowerCase().includes('dc') || parseInt(pwm.replace(/[^\d]/g, '')) >= 1920;
      const hasAOD = phone.specs.display.always_on_display?.toLowerCase().includes('yes');
      return hasDC || hasAOD;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best eye friendly phone', 'phone for eye strain', 'high pwm phone', 'eye comfort phone'],
  },
];

function getOutcomeConfig(slug: string): OutcomeConfig | undefined {
  return OUTCOME_CONFIGS.find(config => config.slug === slug);
}

function getPhonesForOutcome(config: OutcomeConfig): Phone[] {
  return allPhones.filter(config.filter).sort(config.sort);
}

function generateFAQs(config: OutcomeConfig, phones: Phone[]): { question: string; answer: string }[] {
  const currentYear = new Date().getFullYear();
  const topPhone = phones.length > 0 ? phones[0] : null;
  const budgetPhone = phones.length > 0 ? phones.reduce((min, p) => p.price < min.price ? p : min, phones[0]) : null;

  return [
    {
      question: `What is the best ${config.title.toLowerCase()} phone in ${currentYear}?`,
      answer: topPhone 
        ? `Based on our analysis, the ${topPhone.brand} ${topPhone.model} ($${topPhone.price}) ranks as one of the top phones for ${config.title.toLowerCase()}. ${config.description}`
        : `We recommend phones that ${config.description.toLowerCase()}. Browse our curated list to find the perfect match.`,
    },
    {
      question: `How many phones have excellent ${config.title.toLowerCase()}?`,
      answer: `We've identified ${phones.length} phones that excel in ${config.title.toLowerCase()}. These phones meet our strict criteria for this specific outcome.`,
    },
    {
      question: `What is the most affordable phone with great ${config.title.toLowerCase()}?`,
      answer: budgetPhone 
        ? `The most budget-friendly option for ${config.title.toLowerCase()} is the ${budgetPhone.brand} ${budgetPhone.model} at $${budgetPhone.price}.`
        : `Browse our selection to find affordable options with great ${config.title.toLowerCase()}.`,
    },
    {
      question: `What should I look for in a phone with good ${config.title.toLowerCase()}?`,
      answer: config.longDescription,
    },
  ];
}

export async function generateStaticParams() {
  return OUTCOME_CONFIGS.map(config => ({
    outcome: config.slug,
  }));
}

export async function generateMetadata({ params }: OutcomePageProps): Promise<Metadata> {
  const { outcome } = await params;
  const config = getOutcomeConfig(outcome);
  
  if (!config) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phones = getPhonesForOutcome(config);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best ${config.title} Phone (${currentYear}) | ${phones.length}+ Options | MobilePhonesPro`,
    description: `${config.description}. Compare ${phones.length}+ phones with the best ${config.title.toLowerCase()} - detailed specs, ratings, and prices.`,
    keywords: [
      ...config.keywords,
      `best ${config.title.toLowerCase()} phone ${currentYear}`,
      'smartphone comparison',
      'phone buying guide',
    ],
    openGraph: {
      title: `Best ${config.title} Phone (${currentYear})`,
      description: `Compare ${phones.length}+ phones with the best ${config.title.toLowerCase()}. Find the ideal phone with our detailed specifications and expert recommendations.`,
      type: 'website',
      url: `https://mobilephonespro.com/best-${config.slug}-phone`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best ${config.title} Phone (${currentYear})`,
      description: `Compare ${phones.length}+ phones with the best ${config.title.toLowerCase()}. Find the ideal phone with our detailed specifications and expert recommendations.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/best-${config.slug}-phone`,
    },
  };
}

export default async function OutcomePage({ params }: OutcomePageProps) {
  const { outcome } = await params;
  const config = getOutcomeConfig(outcome);
  
  if (!config) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground">
          The outcome you're looking for doesn't exist. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const phones = getPhonesForOutcome(config);
  const faqs = generateFAQs(config, phones);
  
  const relatedOutcomes = OUTCOME_CONFIGS
    .filter(o => o.slug !== config.slug)
    .slice(0, 6);

  return (
    <OutcomeClient
      config={config}
      phones={phones}
      faqs={faqs}
      relatedOutcomes={relatedOutcomes}
      allOutcomes={OUTCOME_CONFIGS}
    />
  );
}
