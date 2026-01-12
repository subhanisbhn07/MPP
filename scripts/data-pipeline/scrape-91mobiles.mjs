import Firecrawl from '@mendable/firecrawl-js';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env file from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(projectRoot, '.env') });

// Initialize Firecrawl with API key
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// ============================================================================
// 91MOBILES SITEMAP-BASED SCRAPER
// ============================================================================
// 
// Data Source: 91mobiles.com
// Strategy: Parse XML sitemap to get all phone URLs, then scrape specs pages
// URL Pattern: /{phone-slug}-price-in-india?ty=specs
// 
// Key Learnings from Research:
// 1. Sitemap at /sitemap/mobilelist_forgoogle.xml contains all phone URLs
// 2. URL parameter ?ty=specs gives direct access to specs tab
// 3. 107 spec fields available per phone (not 500 as initially estimated)
// 4. Priority 90% = popular phones, 80% = standard phones
// 5. Firecrawl supports 2 concurrent browsers for faster scraping
// ============================================================================

// 35 sample phones for testing - extracted from 91mobiles sitemap (priority 0.9)
// Selected with brand diversity: Samsung, Apple, Realme, Xiaomi, OnePlus, Vivo, Oppo, Motorola, Poco, iQOO, Google, Nothing
const SAMPLE_PHONES = [
  // Samsung (3)
  { slug: 'samsung-galaxy-f07', brand: 'Samsung', segment: 'budget' },
  { slug: 'samsung-galaxy-m07-4g', brand: 'Samsung', segment: 'budget' },
  { slug: 'samsung-galaxy-f36', brand: 'Samsung', segment: 'mid-range' },
  
  // Apple (3)
  { slug: 'apple-iphone-17-pro', brand: 'Apple', segment: 'flagship' },
  { slug: 'apple-iphone-17-pro-max', brand: 'Apple', segment: 'flagship' },
  { slug: 'apple-iphone-16-pro-max', brand: 'Apple', segment: 'flagship' },
  
  // Realme (3)
  { slug: 'realme-narzo-90', brand: 'Realme', segment: 'mid-range' },
  { slug: 'realme-16-pro-plus', brand: 'Realme', segment: 'flagship' },
  { slug: 'realme-16-pro', brand: 'Realme', segment: 'flagship' },
  
  // Xiaomi (3)
  { slug: 'xiaomi-redmi-note-14-se', brand: 'Xiaomi', segment: 'mid-range' },
  { slug: 'xiaomi-redmi-a5', brand: 'Xiaomi', segment: 'budget' },
  { slug: 'xiaomi-redmi-a4', brand: 'Xiaomi', segment: 'budget' },
  
  // OnePlus (3)
  { slug: 'oneplus-15', brand: 'OnePlus', segment: 'flagship' },
  { slug: 'oneplus-13s', brand: 'OnePlus', segment: 'flagship' },
  { slug: 'oneplus-open', brand: 'OnePlus', segment: 'flagship' },
  
  // Vivo (3)
  { slug: 'vivo-y31-pro', brand: 'Vivo', segment: 'mid-range' },
  { slug: 'vivo-x300-pro', brand: 'Vivo', segment: 'flagship' },
  { slug: 'vivo-v60', brand: 'Vivo', segment: 'mid-range' },
  
  // Oppo (3)
  { slug: 'oppo-reno15', brand: 'Oppo', segment: 'mid-range' },
  { slug: 'oppo-a6-pro', brand: 'Oppo', segment: 'mid-range' },
  { slug: 'oppo-f31-pro', brand: 'Oppo', segment: 'mid-range' },
  
  // Motorola (3)
  { slug: 'moto-g06-power', brand: 'Motorola', segment: 'budget' },
  { slug: 'moto-g96-5g', brand: 'Motorola', segment: 'mid-range' },
  { slug: 'moto-g86-power', brand: 'Motorola', segment: 'mid-range' },
  
  // Poco (3)
  { slug: 'poco-m7-plus', brand: 'Poco', segment: 'mid-range' },
  { slug: 'poco-c71', brand: 'Poco', segment: 'budget' },
  { slug: 'poco-m7-pro', brand: 'Poco', segment: 'mid-range' },
  
  // iQOO (3)
  { slug: 'iqoo-z10r', brand: 'iQOO', segment: 'mid-range' },
  { slug: 'iqoo-neo-10r', brand: 'iQOO', segment: 'mid-range' },
  { slug: 'iqoo-neo-10', brand: 'iQOO', segment: 'flagship' },
  
  // Google (3)
  { slug: 'google-pixel-10-pro-fold', brand: 'Google', segment: 'flagship' },
  { slug: 'google-pixel-10-pro-xl', brand: 'Google', segment: 'flagship' },
  { slug: 'google-pixel-10', brand: 'Google', segment: 'flagship' },
  
  // Nothing (2)
  { slug: 'nothing-phone-3a-pro', brand: 'Nothing', segment: 'mid-range' },
  { slug: 'nothing-phone-2a', brand: 'Nothing', segment: 'mid-range' },
];

// Comprehensive spec schema based on 91mobiles page structure (107 fields)
const SPEC_CATEGORIES = {
  key_specs: [
    'display', 'front_camera', 'battery', 'processor', 'ram', 'rear_camera'
  ],
  general: [
    'brand', 'model', 'launch_date', 'operating_system', 'custom_ui',
    'sim_slots', 'sim_size', 'network', 'fingerprint_sensor', 'quick_charging'
  ],
  performance: [
    'chipset', 'processor', 'architecture', 'graphics', 'ram',
    'antutu_score', 'geekbench_single', 'geekbench_multi'
  ],
  display: [
    'screen_size', 'screen_resolution', 'display_type', 'pixel_density',
    'aspect_ratio', 'screen_protection', 'screen_to_body_ratio',
    'touch_screen', 'bezelless_display', 'refresh_rate', 'peak_brightness'
  ],
  design: [
    'height', 'width', 'thickness', 'weight', 'build_material', 'colours',
    'waterproof', 'ip_rating'
  ],
  rear_camera: [
    'camera_setup', 'resolution', 'sensor', 'autofocus', 'optical_image_stabilisation',
    'flash', 'image_resolution', 'camera_features', 'shooting_modes',
    'video_recording', 'physical_aperture'
  ],
  front_camera: [
    'resolution', 'sensor', 'autofocus', 'flash', 'video_recording',
    'physical_aperture', 'camera_features'
  ],
  battery: [
    'capacity', 'type', 'user_replaceable', 'quick_charging', 'wireless_charging',
    'charging_speed', 'usb_type_c', 'reverse_charging'
  ],
  storage: [
    'internal_memory', 'expandable_memory', 'usb_otg_support', 'user_available_storage'
  ],
  network_connectivity: [
    'network_support', 'sim_1', 'sim_2', 'volte', 'wifi', 'wifi_features',
    'bluetooth', 'gps', 'nfc', 'usb_connectivity', 'infrared', 'sar_value'
  ],
  multimedia: [
    'loudspeaker', 'audio_jack', 'fm_radio', 'audio_features'
  ],
  sensors: [
    'fingerprint_sensor', 'fingerprint_sensor_position', 'face_unlock',
    'other_sensors'
  ],
  special_features: [
    'ai_features', 'gaming_mode', 'always_on_display', 'stylus_support'
  ]
};

// Helper function to clean text
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
    .replace(/https?:\/\/[^\s|]+/g, '') // Remove URLs
    .replace(/\s*\|\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse 91mobiles price to numeric value (INR)
function parsePrice(priceStr) {
  if (!priceStr) return null;
  const match = priceStr.match(/₹?\s*([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }
  return null;
}

// Parse release date from 91mobiles format
function parseReleaseDate(dateStr) {
  if (!dateStr) return null;
  
  const months = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
    'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  };
  
  // Format: "12 Jan, 2026" or "January 2026"
  const match = dateStr.match(/(\d{1,2})?\s*(\w+),?\s*(\d{4})/i);
  if (match) {
    const day = match[1] ? match[1].padStart(2, '0') : '15';
    const monthName = match[2].toLowerCase().substring(0, 3);
    const month = months[monthName] || '01';
    const year = match[3];
    return `${year}-${month}-${day}`;
  }
  return null;
}

// Generate slug from phone name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse 91mobiles markdown to extract specs
function parse91mobilesSpecs(markdown, slug, brand) {
  const specs = {
    source: '91mobiles',
    source_url: `https://www.91mobiles.com/${slug}-price-in-india?ty=specs`,
    scraped_at: new Date().toISOString(),
    brand: brand,
    slug: slug,
  };
  
  // Extract phone name from markdown title
  const titleMatch = markdown.match(/^#\s*(.+?)(?:\s*Specifications|\s*Specs|\s*-|\s*Price|\n)/im);
  if (titleMatch) {
    // Clean the name - remove "# " prefix and "Specifications" suffix
    specs.name = cleanText(titleMatch[1])
      .replace(/^#\s*/, '')
      .replace(/\s*Specifications\s*$/i, '')
      .trim();
  } else {
    // Fallback: generate name from slug
    specs.name = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Extract model (name without brand)
  if (specs.name && brand) {
    specs.model = specs.name.replace(new RegExp(`^${brand}\\s*`, 'i'), '').trim();
  }
  
  // Extract price
  const priceMatch = markdown.match(/₹\s*([\d,]+)/);
  if (priceMatch) {
    specs.price_inr = parsePrice(priceMatch[0]);
    specs.price = priceMatch[0];
  }
  
  // Extract rating
  const ratingMatch = markdown.match(/(\d{1,2})%\s*(?:Score|Rating)/i);
  if (ratingMatch) {
    specs.rating_91mobiles = parseInt(ratingMatch[1], 10);
  }
  
  // Extract release date
  const releaseDateMatch = markdown.match(/(?:Release Date|Launched|Released)[:\s]*([^|\n]+)/i);
  if (releaseDateMatch) {
    specs.release_date = parseReleaseDate(releaseDateMatch[1]);
  }
  
  // Extract images
  const imageMatches = [...markdown.matchAll(/!\[.*?\]\((https:\/\/www\.91-img\.com\/[^)]+\.(?:jpg|png|webp))\)/gi)];
  if (imageMatches.length > 0) {
    specs.image_url = imageMatches[0][1];
    specs.images = imageMatches.slice(0, 5).map(m => m[1]);
  }
  
  // Spec extraction patterns for 91mobiles markdown table format
  const specPatterns = {
    // Key Specs
    'display_size': /\|\s*(?:Display|Screen Size)\s*\|\s*([^|\n]+)/i,
    'processor': /\|\s*(?:Processor|Chipset)\s*\|\s*([^|\n]+)/i,
    'ram': /\|\s*RAM\s*\|\s*([^|\n]+)/i,
    'rear_camera': /\|\s*(?:Rear Camera|Main Camera)\s*\|\s*([^|\n]+)/i,
    'front_camera': /\|\s*(?:Front Camera|Selfie Camera)\s*\|\s*([^|\n]+)/i,
    'battery': /\|\s*Battery\s*\|\s*([^|\n]+)/i,
    
    // General
    'operating_system': /\|\s*(?:Operating System|OS)\s*\|\s*([^|\n]+)/i,
    'custom_ui': /\|\s*(?:Custom UI|Skin)\s*\|\s*([^|\n]+)/i,
    'sim_slots': /\|\s*(?:SIM Slots?|SIM Type)\s*\|\s*([^|\n]+)/i,
    'sim_size': /\|\s*SIM Size\s*\|\s*([^|\n]+)/i,
    'network': /\|\s*(?:Network|Network Support)\s*\|\s*([^|\n]+)/i,
    'launch_date': /\|\s*(?:Launch Date|Announced)\s*\|\s*([^|\n]+)/i,
    
    // Performance
    'chipset': /\|\s*Chipset\s*\|\s*([^|\n]+)/i,
    'architecture': /\|\s*Architecture\s*\|\s*([^|\n]+)/i,
    'graphics': /\|\s*(?:Graphics|GPU)\s*\|\s*([^|\n]+)/i,
    'antutu_score': /\|\s*(?:AnTuTu|AnTuTu Score)\s*\|\s*([^|\n]+)/i,
    'geekbench_single': /\|\s*(?:Geekbench Single|Single Core)\s*\|\s*([^|\n]+)/i,
    'geekbench_multi': /\|\s*(?:Geekbench Multi|Multi Core)\s*\|\s*([^|\n]+)/i,
    
    // Display
    'screen_resolution': /\|\s*(?:Screen Resolution|Resolution)\s*\|\s*([^|\n]+)/i,
    'display_type': /\|\s*(?:Display Type|Type)\s*\|\s*([^|\n]+)/i,
    'pixel_density': /\|\s*(?:Pixel Density|PPI)\s*\|\s*([^|\n]+)/i,
    'aspect_ratio': /\|\s*Aspect Ratio\s*\|\s*([^|\n]+)/i,
    'screen_protection': /\|\s*(?:Screen Protection|Protection)\s*\|\s*([^|\n]+)/i,
    'screen_to_body_ratio': /\|\s*Screen to Body Ratio\s*\|\s*([^|\n]+)/i,
    'refresh_rate': /\|\s*Refresh Rate\s*\|\s*([^|\n]+)/i,
    'peak_brightness': /\|\s*(?:Peak Brightness|Brightness)\s*\|\s*([^|\n]+)/i,
    'touch_screen': /\|\s*Touch Screen\s*\|\s*([^|\n]+)/i,
    'bezelless_display': /\|\s*Bezel-?less Display\s*\|\s*([^|\n]+)/i,
    
    // Design
    'height': /\|\s*Height\s*\|\s*([^|\n]+)/i,
    'width': /\|\s*Width\s*\|\s*([^|\n]+)/i,
    'thickness': /\|\s*Thickness\s*\|\s*([^|\n]+)/i,
    'weight': /\|\s*Weight\s*\|\s*([^|\n]+)/i,
    'build_material': /\|\s*(?:Build Material|Build)\s*\|\s*([^|\n]+)/i,
    'colours': /\|\s*(?:Colours?|Colors?)\s*\|\s*([^|\n]+)/i,
    'waterproof': /\|\s*(?:Waterproof|Water Resistant)\s*\|\s*([^|\n]+)/i,
    'ip_rating': /\|\s*IP Rating\s*\|\s*([^|\n]+)/i,
    
    // Camera
    'camera_setup': /\|\s*Camera Setup\s*\|\s*([^|\n]+)/i,
    'sensor': /\|\s*Sensor\s*\|\s*([^|\n]+)/i,
    'autofocus': /\|\s*Autofocus\s*\|\s*([^|\n]+)/i,
    'optical_image_stabilisation': /\|\s*(?:OIS|Optical Image Stabilisation)\s*\|\s*([^|\n]+)/i,
    'flash': /\|\s*Flash\s*\|\s*([^|\n]+)/i,
    'camera_features': /\|\s*Camera Features\s*\|\s*([^|\n]+)/i,
    'shooting_modes': /\|\s*Shooting Modes\s*\|\s*([^|\n]+)/i,
    'video_recording': /\|\s*Video Recording\s*\|\s*([^|\n]+)/i,
    'physical_aperture': /\|\s*(?:Aperture|Physical Aperture)\s*\|\s*([^|\n]+)/i,
    
    // Battery
    'battery_capacity': /\|\s*(?:Battery Capacity|Capacity)\s*\|\s*([^|\n]*mAh[^|\n]*)/i,
    'battery_type': /\|\s*(?:Battery Type|Type)\s*\|\s*([^|\n]+)/i,
    'quick_charging': /\|\s*(?:Quick Charging|Fast Charging)\s*\|\s*([^|\n]+)/i,
    'wireless_charging': /\|\s*Wireless Charging\s*\|\s*([^|\n]+)/i,
    'charging_speed': /\|\s*Charging Speed\s*\|\s*([^|\n]+)/i,
    'reverse_charging': /\|\s*Reverse Charging\s*\|\s*([^|\n]+)/i,
    
    // Storage
    'internal_memory': /\|\s*(?:Internal Memory|Internal Storage)\s*\|\s*([^|\n]+)/i,
    'expandable_memory': /\|\s*(?:Expandable Memory|Expandable Storage)\s*\|\s*([^|\n]+)/i,
    'usb_otg_support': /\|\s*USB OTG\s*\|\s*([^|\n]+)/i,
    
    // Network & Connectivity
    'network_support': /\|\s*Network Support\s*\|\s*([^|\n]+)/i,
    'volte': /\|\s*VoLTE\s*\|\s*([^|\n]+)/i,
    'wifi': /\|\s*(?:Wi-?Fi|WLAN)\s*\|\s*([^|\n]+)/i,
    'wifi_features': /\|\s*Wi-?Fi Features\s*\|\s*([^|\n]+)/i,
    'bluetooth': /\|\s*Bluetooth\s*\|\s*([^|\n]+)/i,
    'gps': /\|\s*(?:GPS|Positioning)\s*\|\s*([^|\n]+)/i,
    'nfc': /\|\s*NFC\s*\|\s*([^|\n]+)/i,
    'usb_connectivity': /\|\s*(?:USB|USB Connectivity)\s*\|\s*([^|\n]+)/i,
    'infrared': /\|\s*(?:Infrared|IR Blaster)\s*\|\s*([^|\n]+)/i,
    'sar_value': /\|\s*SAR Value\s*\|\s*([^|\n]+)/i,
    
    // Multimedia
    'loudspeaker': /\|\s*Loudspeaker\s*\|\s*([^|\n]+)/i,
    'audio_jack': /\|\s*(?:Audio Jack|3\.5mm Jack)\s*\|\s*([^|\n]+)/i,
    'fm_radio': /\|\s*FM Radio\s*\|\s*([^|\n]+)/i,
    
    // Sensors
    'fingerprint_sensor': /\|\s*Fingerprint Sensor\s*\|\s*([^|\n]+)/i,
    'fingerprint_sensor_position': /\|\s*Fingerprint Sensor Position\s*\|\s*([^|\n]+)/i,
    'face_unlock': /\|\s*Face Unlock\s*\|\s*([^|\n]+)/i,
    'other_sensors': /\|\s*(?:Other Sensors|Sensors)\s*\|\s*([^|\n]+)/i,
  };
  
  // Extract all specs
  for (const [key, pattern] of Object.entries(specPatterns)) {
    const match = markdown.match(pattern);
    if (match) {
      specs[key] = cleanText(match[1]);
    }
  }
  
  // Extract variants (RAM/Storage combinations)
  const variantMatches = [...markdown.matchAll(/(\d+)\s*GB\s*(?:\+|RAM)\s*(\d+)\s*GB/gi)];
  if (variantMatches.length > 0) {
    specs.variants = variantMatches.map(m => ({
      ram: `${m[1]} GB`,
      storage: `${m[2]} GB`
    }));
  }
  
  return specs;
}

// Scrape a single phone from 91mobiles
async function scrapePhone(phoneInfo, index, total) {
  const { slug, brand, segment } = phoneInfo;
  const url = `https://www.91mobiles.com/${slug}-price-in-india?ty=specs`;
  
  console.log(`\n[${index + 1}/${total}] Scraping: ${slug}`);
  console.log(`  URL: ${url}`);
  console.log(`  Brand: ${brand}, Segment: ${segment}`);
  
  try {
    const result = await firecrawl.scrape(url, {
      formats: ['markdown'],
    });
    
    if (!result || !result.markdown) {
      console.error(`  FAILED: No content returned`);
      return { slug, brand, segment, success: false, error: 'No content' };
    }
    
    const specs = parse91mobilesSpecs(result.markdown, slug, brand);
    specs.segment = segment;
    
    // Validation checks
    const validationErrors = [];
    
    // Check if we got the correct phone
    if (specs.name && !specs.name.toLowerCase().includes(brand.toLowerCase())) {
      validationErrors.push(`Brand mismatch: expected ${brand}, got ${specs.name}`);
    }
    
    // Check for essential specs
    if (!specs.display_size && !specs.processor && !specs.battery) {
      validationErrors.push('Missing essential specs (display, processor, or battery)');
    }
    
    if (validationErrors.length > 0) {
      console.log(`  WARNING: ${validationErrors.join('; ')}`);
      specs.validation_warnings = validationErrors;
    }
    
    // Count extracted specs
    const specCount = Object.keys(specs).filter(k => 
      !['source', 'source_url', 'scraped_at', 'brand', 'slug', 'segment', 'validation_warnings'].includes(k) &&
      specs[k] !== null && specs[k] !== undefined && specs[k] !== ''
    ).length;
    
    console.log(`  SUCCESS: ${specs.name || slug}`);
    console.log(`  - Specs extracted: ${specCount}`);
    console.log(`  - Price: ${specs.price || 'N/A'}`);
    console.log(`  - Display: ${specs.display_size || 'N/A'}`);
    console.log(`  - Processor: ${specs.processor || specs.chipset || 'N/A'}`);
    console.log(`  - Battery: ${specs.battery || specs.battery_capacity || 'N/A'}`);
    
    return { ...specs, success: true, spec_count: specCount };
    
  } catch (error) {
    console.error(`  ERROR: ${error.message}`);
    return { slug, brand, segment, success: false, error: error.message };
  }
}

// Save data to JSON file
function saveToJson(data, filename) {
  const outputDir = path.join(process.cwd(), 'scripts', 'data-pipeline', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`\nSaved to: ${filepath}`);
  return filepath;
}

// Insert data into Supabase
async function insertToSupabase(phonesData) {
  if (!supabase) {
    console.log('\nSupabase not configured, skipping database insert');
    return;
  }
  
  console.log(`\nInserting ${phonesData.length} phones into Supabase...`);
  
  for (const phone of phonesData) {
    if (!phone.success) continue;
    
    try {
      // Prepare phone data for Supabase
      const phoneRecord = {
        name: phone.name,
        slug: phone.slug,
        brand: phone.brand,
        model: phone.model,
        image_url: phone.image_url,
        price: phone.price_inr,
        release_date: phone.release_date,
        // Store all specs in JSONB columns
        display: {
          size: phone.display_size,
          resolution: phone.screen_resolution,
          type: phone.display_type,
          pixel_density: phone.pixel_density,
          refresh_rate: phone.refresh_rate,
          protection: phone.screen_protection,
          aspect_ratio: phone.aspect_ratio,
          brightness: phone.peak_brightness,
        },
        performance: {
          chipset: phone.chipset || phone.processor,
          cpu: phone.processor,
          gpu: phone.graphics,
          ram: phone.ram,
          antutu: phone.antutu_score,
          geekbench_single: phone.geekbench_single,
          geekbench_multi: phone.geekbench_multi,
        },
        camera: {
          main: phone.rear_camera,
          selfie: phone.front_camera,
          features: phone.camera_features,
          video: phone.video_recording,
          ois: phone.optical_image_stabilisation,
        },
        battery: {
          capacity: phone.battery || phone.battery_capacity,
          type: phone.battery_type,
          charging: phone.quick_charging,
          wireless: phone.wireless_charging,
        },
        storage: {
          internal: phone.internal_memory,
          expandable: phone.expandable_memory,
        },
        connectivity: {
          network: phone.network_support,
          wifi: phone.wifi,
          bluetooth: phone.bluetooth,
          nfc: phone.nfc,
          usb: phone.usb_connectivity,
          gps: phone.gps,
        },
        design: {
          dimensions: `${phone.height || ''} x ${phone.width || ''} x ${phone.thickness || ''}`.trim(),
          weight: phone.weight,
          build: phone.build_material,
          colors: phone.colours,
          ip_rating: phone.ip_rating,
        },
        os: phone.operating_system,
        sensors: phone.other_sensors,
      };
      
      // Upsert to phone_specs table
      const { error } = await supabase
        .from('phone_specs')
        .upsert(phoneRecord, { onConflict: 'slug' });
      
      if (error) {
        console.error(`  Failed to insert ${phone.slug}: ${error.message}`);
      } else {
        console.log(`  Inserted: ${phone.name}`);
      }
    } catch (err) {
      console.error(`  Error inserting ${phone.slug}: ${err.message}`);
    }
  }
}

// Main function
async function main() {
  console.log('='.repeat(70));
  console.log('91MOBILES SCRAPER - Sample 35 Phones');
  console.log('='.repeat(70));
  console.log(`\nStarting scrape at: ${new Date().toISOString()}`);
  console.log(`Total phones to scrape: ${SAMPLE_PHONES.length}`);
  console.log(`Firecrawl API Key: ${process.env.FIRECRAWL_API_KEY ? 'Configured' : 'MISSING'}`);
  console.log(`Supabase: ${supabase ? 'Configured' : 'Not configured'}`);
  
  const results = [];
  const startTime = Date.now();
  
  // Scrape phones sequentially (to avoid rate limiting)
  for (let i = 0; i < SAMPLE_PHONES.length; i++) {
    const phone = SAMPLE_PHONES[i];
    const result = await scrapePhone(phone, i, SAMPLE_PHONES.length);
    results.push(result);
    
    // Rate limiting: wait 3 seconds between requests
    if (i < SAMPLE_PHONES.length - 1) {
      console.log('  Waiting 3s before next request...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('SCRAPING SUMMARY');
  console.log('='.repeat(70));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\nTotal phones: ${results.length}`);
  console.log(`Successful: ${successful.length} (${((successful.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed.length}`);
  console.log(`Duration: ${duration} minutes`);
  
  // Breakdown by segment
  console.log('\nBy Segment:');
  for (const segment of ['flagship', 'mid-range', 'budget']) {
    const segmentResults = results.filter(r => r.segment === segment);
    const segmentSuccess = segmentResults.filter(r => r.success);
    console.log(`  ${segment}: ${segmentSuccess.length}/${segmentResults.length} successful`);
  }
  
  // Breakdown by brand
  console.log('\nBy Brand:');
  const brands = [...new Set(results.map(r => r.brand))];
  for (const brand of brands.sort()) {
    const brandResults = results.filter(r => r.brand === brand);
    const brandSuccess = brandResults.filter(r => r.success);
    console.log(`  ${brand}: ${brandSuccess.length}/${brandResults.length} successful`);
  }
  
  // Average spec count
  if (successful.length > 0) {
    const avgSpecs = (successful.reduce((sum, r) => sum + (r.spec_count || 0), 0) / successful.length).toFixed(1);
    console.log(`\nAverage specs extracted: ${avgSpecs} per phone`);
  }
  
  // Failed phones
  if (failed.length > 0) {
    console.log('\nFailed phones:');
    for (const f of failed) {
      console.log(`  - ${f.slug}: ${f.error}`);
    }
  }
  
  // Save results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `91mobiles-scrape-${timestamp}.json`;
  saveToJson(results, filename);
  
  // Also save successful results separately
  if (successful.length > 0) {
    saveToJson(successful, `91mobiles-successful-${timestamp}.json`);
  }
  
  // Insert to Supabase if configured
  if (supabase && successful.length > 0) {
    await insertToSupabase(successful);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(70));
  
  return results;
}

// Run the scraper
main().catch(console.error);
