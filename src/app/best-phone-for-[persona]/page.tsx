import { Metadata } from 'next';
import { allPhones } from '@/lib/data';
import type { Phone } from '@/lib/types';
import { PersonaClient } from './components/persona-client';

interface PersonaPageProps {
  params: Promise<{
    persona: string;
  }>;
}

interface PersonaConfig {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  filter: (phone: Phone) => boolean;
  sort: (a: Phone, b: Phone) => number;
  keywords: string[];
  prioritySpecs: string[];
}

const PERSONA_CONFIGS: PersonaConfig[] = [
  {
    slug: 'gaming',
    title: 'Gaming',
    description: 'High-performance phones optimized for mobile gaming with fast processors and high refresh rate displays',
    longDescription: 'Mobile gaming demands powerful hardware. The best gaming phones feature flagship processors like Snapdragon 8 Gen 3 or Apple A17 Pro, high refresh rate displays (120Hz+), large batteries for extended sessions, and advanced cooling systems to prevent thermal throttling.',
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
    keywords: ['best gaming phone', 'mobile gaming phone', 'phone for gaming', 'high fps phone', 'gaming smartphone'],
    prioritySpecs: ['refresh_rate_hz', 'chipset', 'capacity_mah', 'ram_capacities'],
  },
  {
    slug: 'vloggers',
    title: 'Vloggers & Content Creators',
    description: 'Phones with exceptional video recording capabilities, stabilization, and front-facing cameras for content creation',
    longDescription: 'Content creators need phones that excel at video capture. Look for 4K60fps recording, optical image stabilization (OIS), high-quality front cameras for vlogs, and good audio recording with multiple microphones.',
    filter: (phone) => {
      const videoSpecs = phone.specs.main_camera.video_resolutions_and_framerates?.toLowerCase() || '';
      const has4K = videoSpecs.includes('4k') || videoSpecs.includes('2160p');
      const hasOIS = phone.specs.main_camera.ois_type?.toLowerCase().includes('yes') || phone.specs.main_camera.ois_type?.toLowerCase().includes('ois');
      return has4K && hasOIS;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best phone for vlogging', 'content creator phone', 'phone for youtube', 'video recording phone', 'vlogger smartphone'],
    prioritySpecs: ['video_resolutions_and_framerates', 'ois_type', 'front_camera_resolution', 'stabilization_modes'],
  },
  {
    slug: 'photography',
    title: 'Photography Enthusiasts',
    description: 'Phones with professional-grade camera systems, large sensors, and advanced computational photography',
    longDescription: 'Photography enthusiasts need phones with large camera sensors, versatile lens options (ultrawide, telephoto), RAW capture support, and advanced night mode capabilities. The best camera phones rival dedicated cameras in image quality.',
    filter: (phone) => {
      const mainRes = phone.specs.main_camera.main_sensor_resolution || '';
      const mp = parseInt(mainRes.replace(/[^\d]/g, '')) || 0;
      const hasMultipleLenses = parseInt(phone.specs.main_camera.rear_camera_count) >= 3;
      return mp >= 50 && hasMultipleLenses;
    },
    sort: (a, b) => {
      const mpA = parseInt(a.specs.main_camera.main_sensor_resolution?.replace(/[^\d]/g, '') || '0');
      const mpB = parseInt(b.specs.main_camera.main_sensor_resolution?.replace(/[^\d]/g, '') || '0');
      return mpB - mpA;
    },
    keywords: ['best camera phone', 'phone for photography', 'photographer phone', 'best phone camera', 'mobile photography'],
    prioritySpecs: ['main_sensor_resolution', 'telephoto_specs', 'ultrawide_camera_specs', 'night_mode_computational_features'],
  },
  {
    slug: 'seniors',
    title: 'Seniors & Elderly Users',
    description: 'Easy-to-use phones with large displays, simple interfaces, and long battery life for older adults',
    longDescription: 'Seniors benefit from phones with large, bright displays for easy reading, simple user interfaces, loud speakers for calls, and long battery life. Durability and ease of use are more important than cutting-edge specs.',
    filter: (phone) => {
      const displaySize = parseFloat(phone.specs.display.size_inches) || 0;
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return displaySize >= 6.5 && battery >= 4500 && phone.price <= 800;
    },
    sort: (a, b) => {
      const sizeA = parseFloat(a.specs.display.size_inches) || 0;
      const sizeB = parseFloat(b.specs.display.size_inches) || 0;
      return sizeB - sizeA;
    },
    keywords: ['best phone for seniors', 'easy phone for elderly', 'simple smartphone', 'phone for older adults', 'senior friendly phone'],
    prioritySpecs: ['size_inches', 'capacity_mah', 'peak_brightness_nits', 'loudspeakers'],
  },
  {
    slug: 'students',
    title: 'Students',
    description: 'Affordable phones with good performance, long battery life, and features useful for studying',
    longDescription: 'Students need phones that balance performance with affordability. Key features include good battery life for all-day use, sufficient storage for apps and notes, and a capable camera for scanning documents.',
    filter: (phone) => {
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return phone.price <= 600 && battery >= 4500;
    },
    sort: (a, b) => {
      const valueA = (parseInt(a.specs.battery.capacity_mah) || 0) / a.price;
      const valueB = (parseInt(b.specs.battery.capacity_mah) || 0) / b.price;
      return valueB - valueA;
    },
    keywords: ['best phone for students', 'student smartphone', 'affordable phone for college', 'budget phone for school'],
    prioritySpecs: ['capacity_mah', 'storage_capacities', 'ram_capacities', 'main_sensor_resolution'],
  },
  {
    slug: 'business-professionals',
    title: 'Business Professionals',
    description: 'Premium phones with excellent security, productivity features, and professional appearance',
    longDescription: 'Business professionals need reliable phones with strong security features, excellent email and productivity app performance, long battery life for travel, and a professional aesthetic.',
    filter: (phone) => {
      const hasNFC = phone.specs.connectivity.nfc?.toLowerCase().includes('yes');
      return phone.price >= 800 && hasNFC;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best business phone', 'professional smartphone', 'phone for executives', 'enterprise phone', 'work phone'],
    prioritySpecs: ['nfc', 'capacity_mah', 'ip_rating', 'chipset'],
  },
  {
    slug: 'travelers',
    title: 'Travelers',
    description: 'Phones with excellent GPS, long battery life, dual SIM support, and durable build for travel',
    longDescription: 'Travelers need phones that work globally with dual SIM or eSIM support, have accurate GPS for navigation, long battery life, and water resistance for unpredictable conditions.',
    filter: (phone) => {
      const hasESIM = phone.specs.network.esim_support?.toLowerCase().includes('yes');
      const hasDualSIM = phone.specs.network.sim_slots_and_type?.toLowerCase().includes('dual');
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return (hasESIM || hasDualSIM) && battery >= 4500;
    },
    sort: (a, b) => {
      const batteryA = parseInt(a.specs.battery.capacity_mah) || 0;
      const batteryB = parseInt(b.specs.battery.capacity_mah) || 0;
      return batteryB - batteryA;
    },
    keywords: ['best phone for travel', 'travel smartphone', 'phone for international travel', 'dual sim phone for travelers'],
    prioritySpecs: ['esim_support', 'sim_slots_and_type', 'capacity_mah', 'gps_systems'],
  },
  {
    slug: 'privacy-focused',
    title: 'Privacy-Focused Users',
    description: 'Phones with strong security features, regular updates, and privacy-respecting software',
    longDescription: 'Privacy-conscious users should look for phones with regular security updates, hardware security features, and transparent privacy policies. Google Pixel and iPhone lead in timely security patches.',
    filter: (phone) => {
      const brand = phone.brand.toLowerCase();
      const hasSecurityFeatures = brand === 'google' || brand === 'apple' || brand === 'samsung';
      return hasSecurityFeatures;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best privacy phone', 'secure smartphone', 'phone for privacy', 'most secure phone', 'privacy focused phone'],
    prioritySpecs: ['update_policy', 'biometric_class', 'secure_enclave_tee_version', 'firmware_integrity_verified_boot'],
  },
  {
    slug: 'outdoor-enthusiasts',
    title: 'Outdoor Enthusiasts',
    description: 'Rugged phones with water resistance, long battery life, and durability for outdoor activities',
    longDescription: 'Outdoor enthusiasts need phones that can withstand the elements. Look for IP68 water resistance, rugged certifications (MIL-STD-810H), large batteries, and bright displays visible in sunlight.',
    filter: (phone) => {
      const ipRating = phone.specs.body.ip_rating?.toLowerCase() || '';
      const hasIP68 = ipRating.includes('ip68') || ipRating.includes('ip69');
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return hasIP68 && battery >= 5000;
    },
    sort: (a, b) => {
      const batteryA = parseInt(a.specs.battery.capacity_mah) || 0;
      const batteryB = parseInt(b.specs.battery.capacity_mah) || 0;
      return batteryB - batteryA;
    },
    keywords: ['best rugged phone', 'outdoor smartphone', 'waterproof phone', 'phone for hiking', 'durable phone'],
    prioritySpecs: ['ip_rating', 'rugged_certifications', 'capacity_mah', 'peak_brightness_nits'],
  },
  {
    slug: 'music-lovers',
    title: 'Music Lovers',
    description: 'Phones with excellent audio quality, stereo speakers, and headphone jack support',
    longDescription: 'Audiophiles need phones with high-quality DACs, stereo speakers, Hi-Res audio support, and ideally a 3.5mm headphone jack. Spatial audio and Dolby Atmos support enhance the listening experience.',
    filter: (phone) => {
      const speakers = phone.specs.audio.loudspeakers?.toLowerCase() || '';
      const hasStereo = speakers.includes('stereo') || speakers.includes('dual');
      const hasHiRes = phone.specs.audio.hi_res_audio_support?.toLowerCase().includes('yes');
      return hasStereo || hasHiRes;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best phone for music', 'audiophile phone', 'phone with good speakers', 'hi-res audio phone'],
    prioritySpecs: ['loudspeakers', 'hi_res_audio_support', '3.5mm_jack', 'spatial_audio_dolby_atmos'],
  },
  {
    slug: 'minimalists',
    title: 'Minimalists',
    description: 'Clean, simple phones with essential features and distraction-free experiences',
    longDescription: 'Minimalists prefer phones that focus on essentials without bloatware. Stock Android or clean iOS experiences, compact sizes, and reliable performance matter more than flashy features.',
    filter: (phone) => {
      const brand = phone.brand.toLowerCase();
      const isCleanOS = brand === 'google' || brand === 'apple' || brand === 'nothing' || brand === 'motorola';
      return isCleanOS && phone.price <= 1000;
    },
    sort: (a, b) => a.price - b.price,
    keywords: ['minimalist phone', 'simple smartphone', 'clean android phone', 'no bloatware phone'],
    prioritySpecs: ['os_version_at_ship', 'skin_launcher', 'dimensions_mm', 'weight_g'],
  },
  {
    slug: 'heavy-users',
    title: 'Heavy Users',
    description: 'Phones with massive batteries, fast charging, and powerful performance for all-day intensive use',
    longDescription: 'Power users who are constantly on their phones need massive batteries (5000mAh+), fast charging (65W+), plenty of RAM for multitasking, and flagship processors that won\'t slow down.',
    filter: (phone) => {
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      const charging = parseInt(phone.specs.battery.wired_charging_wattage?.replace(/[^\d]/g, '') || '0');
      const ram = parseInt(phone.specs.memory.ram_capacities?.replace(/[^\d]/g, '') || '0');
      return battery >= 5000 && charging >= 65 && ram >= 8;
    },
    sort: (a, b) => {
      const batteryA = parseInt(a.specs.battery.capacity_mah) || 0;
      const batteryB = parseInt(b.specs.battery.capacity_mah) || 0;
      return batteryB - batteryA;
    },
    keywords: ['best phone for heavy users', 'long battery phone', 'fast charging phone', 'power user phone'],
    prioritySpecs: ['capacity_mah', 'wired_charging_wattage', 'ram_capacities', 'chipset'],
  },
  {
    slug: 'one-handed-use',
    title: 'One-Handed Use',
    description: 'Compact phones that are easy to use with one hand without sacrificing performance',
    longDescription: 'Not everyone wants a massive phone. Compact phones under 6.2 inches are easier to use one-handed, fit in pockets better, and can still pack flagship features.',
    filter: (phone) => {
      const displaySize = parseFloat(phone.specs.display.size_inches) || 0;
      return displaySize <= 6.2 && displaySize >= 5.5;
    },
    sort: (a, b) => {
      const sizeA = parseFloat(a.specs.display.size_inches) || 0;
      const sizeB = parseFloat(b.specs.display.size_inches) || 0;
      return sizeA - sizeB;
    },
    keywords: ['compact phone', 'small smartphone', 'one handed phone', 'phone for small hands'],
    prioritySpecs: ['size_inches', 'dimensions_mm', 'weight_g', 'screen_to_body_ratio_pct'],
  },
  {
    slug: 'nurses',
    title: 'Nurses & Healthcare Workers',
    description: 'Durable, easy-to-clean phones with long battery life for demanding healthcare shifts',
    longDescription: 'Healthcare workers need phones that can survive long shifts, are easy to sanitize, have loud ringtones for alerts, and offer reliable performance. Water resistance and durability are essential.',
    filter: (phone) => {
      const ipRating = phone.specs.body.ip_rating?.toLowerCase() || '';
      const hasIP = ipRating.includes('ip67') || ipRating.includes('ip68');
      const battery = parseInt(phone.specs.battery.capacity_mah) || 0;
      return hasIP && battery >= 4500;
    },
    sort: (a, b) => {
      const batteryA = parseInt(a.specs.battery.capacity_mah) || 0;
      const batteryB = parseInt(b.specs.battery.capacity_mah) || 0;
      return batteryB - batteryA;
    },
    keywords: ['best phone for nurses', 'healthcare worker phone', 'phone for medical professionals', 'hospital phone'],
    prioritySpecs: ['ip_rating', 'capacity_mah', 'loudspeakers', 'glass_protection'],
  },
  {
    slug: 'night-owls',
    title: 'Night Owls & Low-Light Users',
    description: 'Phones with eye-friendly displays and excellent low-light camera performance',
    longDescription: 'For users who frequently use their phones at night, look for displays with DC dimming or high PWM frequencies to reduce eye strain, plus excellent night mode cameras for low-light photography.',
    filter: (phone) => {
      const hasNightMode = phone.specs.main_camera.night_mode_computational_features?.toLowerCase().includes('night') || 
                          phone.specs.imaging_features.night_mode_gen_algorithms?.length > 0;
      const hasAOD = phone.specs.display.always_on_display?.toLowerCase().includes('yes');
      return hasNightMode || hasAOD;
    },
    sort: (a, b) => b.price - a.price,
    keywords: ['best phone for night photography', 'eye friendly phone', 'low light camera phone', 'night mode phone'],
    prioritySpecs: ['night_mode_computational_features', 'always_on_display', 'pwm_dimming_hz', 'peak_brightness_nits'],
  },
  {
    slug: 'multitaskers',
    title: 'Multitaskers',
    description: 'Phones with large displays, plenty of RAM, and split-screen capabilities for productivity',
    longDescription: 'Multitaskers need phones with large displays for split-screen apps, at least 12GB RAM for smooth app switching, and powerful processors to handle multiple tasks simultaneously.',
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
    keywords: ['best phone for multitasking', 'productivity phone', 'phone for work', 'split screen phone'],
    prioritySpecs: ['ram_capacities', 'size_inches', 'chipset', 'storage_capacities'],
  },
];

function getPersonaConfig(slug: string): PersonaConfig | undefined {
  return PERSONA_CONFIGS.find(config => config.slug === slug);
}

function getPhonesForPersona(config: PersonaConfig): Phone[] {
  return allPhones.filter(config.filter).sort(config.sort);
}

function generateFAQs(config: PersonaConfig, phones: Phone[]): { question: string; answer: string }[] {
  const currentYear = new Date().getFullYear();
  const topPhone = phones.length > 0 ? phones[0] : null;
  const budgetPhone = phones.length > 0 ? phones.reduce((min, p) => p.price < min.price ? p : min, phones[0]) : null;

  return [
    {
      question: `What is the best phone for ${config.title.toLowerCase()} in ${currentYear}?`,
      answer: topPhone 
        ? `Based on our analysis, the ${topPhone.brand} ${topPhone.model} ($${topPhone.price}) is one of the top choices for ${config.title.toLowerCase()}. ${config.description}`
        : `We recommend phones that ${config.description.toLowerCase()}. Browse our curated list to find the perfect match.`,
    },
    {
      question: `How many phones are good for ${config.title.toLowerCase()}?`,
      answer: `We've identified ${phones.length} phones that meet our criteria for ${config.title.toLowerCase()}. These phones excel in the specific features that matter most for this use case.`,
    },
    {
      question: `What is the most affordable phone for ${config.title.toLowerCase()}?`,
      answer: budgetPhone 
        ? `The most budget-friendly option for ${config.title.toLowerCase()} is the ${budgetPhone.brand} ${budgetPhone.model} at $${budgetPhone.price}.`
        : `Browse our selection to find affordable options for ${config.title.toLowerCase()}.`,
    },
    {
      question: `What features should I look for in a phone for ${config.title.toLowerCase()}?`,
      answer: config.longDescription,
    },
  ];
}

export async function generateStaticParams() {
  return PERSONA_CONFIGS.map(config => ({
    persona: config.slug,
  }));
}

export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  const { persona } = await params;
  const config = getPersonaConfig(persona);
  
  if (!config) {
    return {
      title: 'Page Not Found | MobilePhonesPro',
    };
  }

  const phones = getPhonesForPersona(config);
  const currentYear = new Date().getFullYear();

  return {
    title: `Best Phone for ${config.title} (${currentYear}) | ${phones.length}+ Options | MobilePhonesPro`,
    description: `${config.description}. Compare ${phones.length}+ phones perfect for ${config.title.toLowerCase()} with detailed specs, ratings, and prices.`,
    keywords: [
      ...config.keywords,
      `best phone for ${config.title.toLowerCase()} ${currentYear}`,
      'smartphone recommendation',
      'phone buying guide',
    ],
    openGraph: {
      title: `Best Phone for ${config.title} (${currentYear})`,
      description: `Compare ${phones.length}+ phones perfect for ${config.title.toLowerCase()}. Find the ideal phone with our detailed specifications and expert recommendations.`,
      type: 'website',
      url: `https://mobilephonespro.com/best-phone-for-${config.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best Phone for ${config.title} (${currentYear})`,
      description: `Compare ${phones.length}+ phones perfect for ${config.title.toLowerCase()}. Find the ideal phone with our detailed specifications and expert recommendations.`,
    },
    alternates: {
      canonical: `https://mobilephonespro.com/best-phone-for-${config.slug}`,
    },
  };
}

export default async function PersonaPage({ params }: PersonaPageProps) {
  const { persona } = await params;
  const config = getPersonaConfig(persona);
  
  if (!config) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground">
          The persona you're looking for doesn't exist. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const phones = getPhonesForPersona(config);
  const faqs = generateFAQs(config, phones);
  
  const relatedPersonas = PERSONA_CONFIGS
    .filter(p => p.slug !== config.slug)
    .slice(0, 6);

  return (
    <PersonaClient
      config={config}
      phones={phones}
      faqs={faqs}
      relatedPersonas={relatedPersonas}
      allPersonas={PERSONA_CONFIGS}
    />
  );
}
