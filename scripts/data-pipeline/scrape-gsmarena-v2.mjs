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
// Use v1 API which has the scrapeUrl method
const firecrawlClient = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const firecrawl = firecrawlClient.v1;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// 24 phones to scrape for testing (mix of brands and categories)
const PHONE_URLS = [
  // Samsung (5 phones)
  { url: 'https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php', brand: 'Samsung', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_s24-12773.php', brand: 'Samsung', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_z_fold6-12862.php', brand: 'Samsung', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_a55-12824.php', brand: 'Samsung', expectedChipset: 'Exynos 1480' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_s23_fe-12442.php', brand: 'Samsung', expectedChipset: 'Exynos 2200' },
  
  // Apple (4 phones)
  { url: 'https://www.gsmarena.com/apple_iphone_15_pro_max-12548.php', brand: 'Apple', expectedChipset: 'Apple A17 Pro' },
  { url: 'https://www.gsmarena.com/apple_iphone_15_pro-12557.php', brand: 'Apple', expectedChipset: 'Apple A17 Pro' },
  { url: 'https://www.gsmarena.com/apple_iphone_15-12559.php', brand: 'Apple', expectedChipset: 'Apple A16' },
  { url: 'https://www.gsmarena.com/apple_iphone_16_pro_max-12912.php', brand: 'Apple', expectedChipset: 'Apple A18 Pro' },
  
  // Google (3 phones)
  { url: 'https://www.gsmarena.com/google_pixel_8_pro-12456.php', brand: 'Google', expectedChipset: 'Tensor G3' },
  { url: 'https://www.gsmarena.com/google_pixel_8-12457.php', brand: 'Google', expectedChipset: 'Tensor G3' },
  { url: 'https://www.gsmarena.com/google_pixel_9_pro-12871.php', brand: 'Google', expectedChipset: 'Tensor G4' },
  
  // OnePlus (3 phones)
  { url: 'https://www.gsmarena.com/oneplus_12-12600.php', brand: 'OnePlus', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/oneplus_12r-12795.php', brand: 'OnePlus', expectedChipset: 'Snapdragon 8 Gen 2' },
  { url: 'https://www.gsmarena.com/oneplus_nord_4-12851.php', brand: 'OnePlus', expectedChipset: 'Snapdragon 7+ Gen 3' },
  
  // Xiaomi (3 phones)
  { url: 'https://www.gsmarena.com/xiaomi_14_ultra-12746.php', brand: 'Xiaomi', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/xiaomi_14-12745.php', brand: 'Xiaomi', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/xiaomi_redmi_note_13_pro+-12626.php', brand: 'Xiaomi', expectedChipset: 'Dimensity 7200' },
  
  // Others (6 phones - various brands)
  { url: 'https://www.gsmarena.com/nothing_phone_(2)-12270.php', brand: 'Nothing', expectedChipset: 'Snapdragon 8+ Gen 1' },
  { url: 'https://www.gsmarena.com/motorola_edge_50_ultra-12828.php', brand: 'Motorola', expectedChipset: 'Snapdragon 8s Gen 3' },
  { url: 'https://www.gsmarena.com/oppo_find_x7_ultra-12575.php', brand: 'Oppo', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/vivo_x100_pro-12552.php', brand: 'Vivo', expectedChipset: 'Dimensity 9300' },
  { url: 'https://www.gsmarena.com/asus_rog_phone_8_pro-12610.php', brand: 'Asus', expectedChipset: 'Snapdragon 8 Gen 3' },
  { url: 'https://www.gsmarena.com/sony_xperia_1_vi-12761.php', brand: 'Sony', expectedChipset: 'Snapdragon 8 Gen 3' },
];

// JSON Schema for structured extraction
const PHONE_SCHEMA = {
  type: "object",
  properties: {
    phoneName: { 
      type: "string", 
      description: "The exact phone model name from the page title (e.g., 'Samsung Galaxy S24 Ultra')" 
    },
    announced: { 
      type: "string", 
      description: "When the phone was announced (e.g., '2024, January 17')" 
    },
    status: { 
      type: "string", 
      description: "Availability status (e.g., 'Available. Released 2024, January 24')" 
    },
    dimensions: { 
      type: "string", 
      description: "Phone dimensions in mm" 
    },
    weight: { 
      type: "string", 
      description: "Phone weight in grams" 
    },
    displayType: { 
      type: "string", 
      description: "Display technology (e.g., 'Dynamic AMOLED 2X, 120Hz')" 
    },
    displaySize: { 
      type: "string", 
      description: "Screen size in inches with screen-to-body ratio" 
    },
    displayResolution: { 
      type: "string", 
      description: "Screen resolution in pixels" 
    },
    os: { 
      type: "string", 
      description: "Operating system version" 
    },
    chipset: { 
      type: "string", 
      description: "Main processor/SoC (e.g., 'Qualcomm Snapdragon 8 Gen 3'). This MUST be the chipset for the phone in the page title, not any related phones shown on the page." 
    },
    cpu: { 
      type: "string", 
      description: "CPU cores and clock speeds" 
    },
    gpu: { 
      type: "string", 
      description: "Graphics processor" 
    },
    ram: { 
      type: "string", 
      description: "RAM options (e.g., '8GB, 12GB')" 
    },
    storage: { 
      type: "string", 
      description: "Internal storage options" 
    },
    mainCamera: { 
      type: "string", 
      description: "Main camera specs (megapixels, aperture, features)" 
    },
    selfieCamera: { 
      type: "string", 
      description: "Front camera specs" 
    },
    batteryCapacity: { 
      type: "string", 
      description: "Battery capacity in mAh" 
    },
    batteryCharging: { 
      type: "string", 
      description: "Charging speeds and technologies" 
    },
    price: { 
      type: "string", 
      description: "Price in various currencies" 
    },
    colors: { 
      type: "string", 
      description: "Available color options" 
    },
    network5G: { 
      type: "string", 
      description: "5G bands supported" 
    },
    wlan: { 
      type: "string", 
      description: "WiFi standards supported" 
    },
    bluetooth: { 
      type: "string", 
      description: "Bluetooth version" 
    },
    nfc: { 
      type: "string", 
      description: "NFC support (Yes/No)" 
    },
    usb: { 
      type: "string", 
      description: "USB type and version" 
    },
    sensors: { 
      type: "string", 
      description: "List of sensors" 
    },
  },
  required: ["phoneName", "chipset", "displaySize", "batteryCapacity"]
};

// Validation rules for chipset/brand consistency
const CHIPSET_VALIDATION = {
  'Apple': {
    mustContain: ['Apple', 'A1', 'A2', 'Bionic'],
    mustNotContain: ['Snapdragon', 'Exynos', 'Dimensity', 'Tensor', 'Helio', 'Kirin', 'Unisoc']
  },
  'Samsung': {
    mustContain: ['Snapdragon', 'Exynos'],
    mustNotContain: ['Apple', 'Tensor', 'Kirin', 'Helio', 'Unisoc', 'MT']
  },
  'Google': {
    mustContain: ['Tensor'],
    mustNotContain: ['Snapdragon', 'Apple', 'Exynos', 'Dimensity', 'Helio', 'Kirin']
  },
  'OnePlus': {
    mustContain: ['Snapdragon', 'Dimensity'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio', 'Unisoc']
  },
  'Xiaomi': {
    mustContain: ['Snapdragon', 'Dimensity'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin']
  },
  'Motorola': {
    mustContain: ['Snapdragon', 'Dimensity'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin']
  },
  'Oppo': {
    mustContain: ['Snapdragon', 'Dimensity'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin']
  },
  'Vivo': {
    mustContain: ['Snapdragon', 'Dimensity'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin']
  },
  'Asus': {
    mustContain: ['Snapdragon'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio']
  },
  'Sony': {
    mustContain: ['Snapdragon'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio']
  },
  'Nothing': {
    mustContain: ['Snapdragon'],
    mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio']
  },
};

// Validate scraped data for chipset/brand consistency
function validateChipset(brand, chipset, expectedChipset) {
  const validation = CHIPSET_VALIDATION[brand];
  if (!validation || !chipset) {
    return { valid: false, reason: 'No validation rules or chipset missing' };
  }
  
  const chipsetLower = chipset.toLowerCase();
  
  // Check mustContain - at least one must be present
  const hasValidChipset = validation.mustContain.some(keyword => 
    chipsetLower.includes(keyword.toLowerCase())
  );
  
  // Check mustNotContain - none should be present
  const hasInvalidChipset = validation.mustNotContain.some(keyword => 
    chipsetLower.includes(keyword.toLowerCase())
  );
  
  // Check if expected chipset keywords are present
  const expectedKeywords = expectedChipset.toLowerCase().split(' ');
  const matchesExpected = expectedKeywords.some(keyword => 
    keyword.length > 2 && chipsetLower.includes(keyword)
  );
  
  if (hasInvalidChipset) {
    return { 
      valid: false, 
      reason: `Chipset "${chipset}" contains invalid keyword for ${brand}` 
    };
  }
  
  if (!hasValidChipset) {
    return { 
      valid: false, 
      reason: `Chipset "${chipset}" doesn't match expected patterns for ${brand}` 
    };
  }
  
  return { valid: true, matchesExpected };
}

// Validate display size is reasonable for a phone
function validateDisplaySize(displaySize) {
  if (!displaySize) return { valid: false, reason: 'No display size' };
  
  const sizeMatch = displaySize.match(/(\d+\.?\d*)\s*inch/i);
  if (!sizeMatch) return { valid: false, reason: 'Cannot parse display size' };
  
  const size = parseFloat(sizeMatch[1]);
  
  // Phones typically have 4-8 inch displays
  if (size < 4 || size > 8.5) {
    return { valid: false, reason: `Display size ${size}" is outside phone range (4-8.5")` };
  }
  
  return { valid: true, size };
}

// Validate battery capacity is reasonable for a phone
function validateBattery(batteryCapacity) {
  if (!batteryCapacity) return { valid: false, reason: 'No battery capacity' };
  
  const capacityMatch = batteryCapacity.match(/(\d+)\s*mAh/i);
  if (!capacityMatch) return { valid: false, reason: 'Cannot parse battery capacity' };
  
  const capacity = parseInt(capacityMatch[1]);
  
  // Phones typically have 2000-7000 mAh batteries
  if (capacity < 2000 || capacity > 7500) {
    return { valid: false, reason: `Battery ${capacity}mAh is outside phone range (2000-7500mAh)` };
  }
  
  return { valid: true, capacity };
}

// Parse GSMArena announced/status date to ISO date format
function parseAnnouncedDate(announced, status) {
  if (!announced && !status) return null;
  
  const months = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  };
  
  // Try to extract date from status first (usually has release date)
  const statusMatch = status?.match(/released\s+(\d{4}),?\s*(\w+)\s*(\d{1,2})?/i);
  if (statusMatch) {
    const year = statusMatch[1];
    const month = months[statusMatch[2].toLowerCase()] || '01';
    const day = statusMatch[3] ? statusMatch[3].padStart(2, '0') : '15';
    return `${year}-${month}-${day}`;
  }
  
  // Try to extract from announced field
  const announcedMatch = announced?.match(/(\d{4}),?\s*(\w+)\s*(\d{1,2})?/i);
  if (announcedMatch) {
    const year = announcedMatch[1];
    const month = months[announcedMatch[2].toLowerCase()] || '01';
    const day = announcedMatch[3] ? announcedMatch[3].padStart(2, '0') : '15';
    return `${year}-${month}-${day}`;
  }
  
  return null;
}

// Parse price to USD
function parsePriceToUSD(priceStr) {
  if (!priceStr) return null;
  
  const conversionRates = {
    'USD': 1, '$': 1,
    'EUR': 1.08, '€': 1.08,
    'GBP': 1.27, '£': 1.27,
    'INR': 0.012, '₹': 0.012,
  };
  
  // Try to find USD price first
  const usdMatch = priceStr.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
  if (usdMatch) {
    return parseFloat(usdMatch[1].replace(/,/g, ''));
  }
  
  // Try EUR
  const eurMatch = priceStr.match(/€\s*([\d,]+(?:\.\d{2})?)|(\d[\d,]*)\s*EUR/i);
  if (eurMatch) {
    const value = parseFloat((eurMatch[1] || eurMatch[2]).replace(/,/g, ''));
    return Math.round(value * conversionRates['EUR']);
  }
  
  // Try GBP
  const gbpMatch = priceStr.match(/£\s*([\d,]+(?:\.\d{2})?)|(\d[\d,]*)\s*GBP/i);
  if (gbpMatch) {
    const value = parseFloat((gbpMatch[1] || gbpMatch[2]).replace(/,/g, ''));
    return Math.round(value * conversionRates['GBP']);
  }
  
  // Try INR
  const inrMatch = priceStr.match(/₹\s*([\d,]+)|(\d[\d,]*)\s*INR/i);
  if (inrMatch) {
    const value = parseFloat((inrMatch[1] || inrMatch[2]).replace(/,/g, ''));
    return Math.round(value * conversionRates['INR']);
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

// Scrape a single phone using JSON Schema extraction
async function scrapePhoneWithSchema(phoneInfo, index) {
  const { url, brand, expectedChipset } = phoneInfo;
  console.log(`\n[${index + 1}/${PHONE_URLS.length}] Scraping: ${url}`);
  console.log(`  Brand: ${brand}, Expected chipset: ${expectedChipset}`);
  
  try {
    // Use Firecrawl's v1 scrapeUrl method with JSON format
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['json'],
      jsonOptions: {
        schema: PHONE_SCHEMA,
        prompt: `Extract phone specifications from this GSMArena page.
IMPORTANT: Only extract data for the MAIN phone shown on the page (the one in the title).
Do NOT extract data from "Related phones", "Compare", or advertisement sections.
The chipset MUST match the phone in the page title - ${brand} phones use specific chipsets.
If you see multiple phones on the page, only extract data for the one matching the page title.`
      },
    });
    
    // Handle response structure
    if (!result?.json) {
      console.error(`  Failed to extract data from ${url}`);
      console.error(`  Response keys: ${result ? Object.keys(result).join(', ') : 'null'}`);
      return { success: false, error: 'No JSON data extracted', phoneInfo };
    }
    
    const extracted = result.json;
    console.log(`  Extracted data keys: ${Object.keys(extracted).join(', ')}`);
    console.log(`  Extracted: ${extracted.phoneName || 'Unknown'}`);
    console.log(`  Chipset: ${extracted.chipset || 'N/A'}`);
    
    // Validate the extracted data
    const chipsetValidation = validateChipset(brand, extracted.chipset, expectedChipset);
    const displayValidation = validateDisplaySize(extracted.displaySize);
    const batteryValidation = validateBattery(extracted.batteryCapacity);
    
    const validationResults = {
      chipset: chipsetValidation,
      display: displayValidation,
      battery: batteryValidation,
    };
    
    const isValid = chipsetValidation.valid && displayValidation.valid && batteryValidation.valid;
    
    if (!isValid) {
      console.log(`  VALIDATION FAILED:`);
      if (!chipsetValidation.valid) console.log(`    - Chipset: ${chipsetValidation.reason}`);
      if (!displayValidation.valid) console.log(`    - Display: ${displayValidation.reason}`);
      if (!batteryValidation.valid) console.log(`    - Battery: ${batteryValidation.reason}`);
    } else {
      console.log(`  VALIDATION PASSED`);
    }
    
    // Extract phone slug from URL
    const urlMatch = url.match(/gsmarena\.com\/([^-]+(?:_[^-]+)*)-\d+\.php/);
    const phoneSlug = urlMatch ? urlMatch[1].replace(/_/g, '-') : generateSlug(extracted.phoneName || '');
    
    // Construct image URL
    const brandFolder = brand.toLowerCase();
    const imageUrl = `https://fdn2.gsmarena.com/vv/pics/${brandFolder}/${phoneSlug}-1.jpg`;
    
    // Build the phone record
    const phoneRecord = {
      source_url: url,
      scraped_at: new Date().toISOString(),
      name: extracted.phoneName || `${brand} Unknown`,
      model: (extracted.phoneName || '').replace(new RegExp(`^${brand}\\s*`, 'i'), '').trim(),
      brand: brand,
      slug: phoneSlug,
      
      // Launch
      announced: extracted.announced,
      status: extracted.status,
      
      // Body
      dimensions: extracted.dimensions,
      weight: extracted.weight,
      
      // Display
      display_type: extracted.displayType,
      display_size: extracted.displaySize,
      display_resolution: extracted.displayResolution,
      
      // Platform
      os: extracted.os,
      chipset: extracted.chipset,
      cpu: extracted.cpu,
      gpu: extracted.gpu,
      
      // Memory
      internal_storage: extracted.storage,
      ram: extracted.ram,
      
      // Camera
      main_camera: extracted.mainCamera,
      selfie_camera: extracted.selfieCamera,
      
      // Battery
      battery_type: extracted.batteryCapacity,
      battery_charging: extracted.batteryCharging,
      
      // Connectivity
      network_5g_bands: extracted.network5G,
      wlan: extracted.wlan,
      bluetooth: extracted.bluetooth,
      nfc: extracted.nfc,
      usb: extracted.usb,
      
      // Features
      sensors: extracted.sensors,
      
      // Misc
      colors: extracted.colors,
      price: extracted.price,
      
      // Image
      image_url: imageUrl,
      images: [imageUrl],
      
      // Validation
      validation: validationResults,
      is_valid: isValid,
      expected_chipset: expectedChipset,
    };
    
    return { 
      success: true, 
      data: phoneRecord, 
      isValid,
      validationResults 
    };
    
  } catch (error) {
    console.error(`  Error scraping ${url}:`, error.message);
    return { success: false, error: error.message, phoneInfo };
  }
}

// Save scraped data to JSON file
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

// Insert validated data into Supabase
async function insertToSupabase(phonesData) {
  if (!supabase) {
    console.log('\nSupabase not configured - skipping database insert');
    return;
  }
  
  console.log('\nInserting VALIDATED data into Supabase...');
  
  let insertedCount = 0;
  let skippedCount = 0;
  
  for (const phone of phonesData) {
    if (!phone || !phone.name) continue;
    
    // Only insert validated data
    if (!phone.is_valid) {
      console.log(`  SKIPPED (invalid): ${phone.name}`);
      skippedCount++;
      continue;
    }
    
    try {
      // First, ensure brand exists
      const { data: brandData, error: brandError } = await supabase
        .from('brands')
        .upsert({ 
          name: phone.brand,
          slug: generateSlug(phone.brand),
        }, { onConflict: 'slug' })
        .select()
        .single();
      
      if (brandError) {
        console.error(`  Error upserting brand ${phone.brand}:`, brandError.message);
        continue;
      }
      
      // Parse release date and price
      const releaseDate = parseAnnouncedDate(phone.announced, phone.status);
      const priceUSD = parsePriceToUSD(phone.price);
      
      const phoneRecord = {
        brand_id: brandData.id,
        model: phone.model,
        slug: phone.slug,
        image_url: phone.image_url,
        images: phone.images || [],
        release_date: releaseDate,
        price_usd: priceUSD,
        market_status: phone.status || 'Available',
      };
      
      // Check if phone already exists
      const { data: existingPhone } = await supabase
        .from('phones')
        .select('id')
        .eq('slug', phone.slug)
        .single();
      
      let phoneData;
      let phoneError;
      
      if (existingPhone) {
        const result = await supabase
          .from('phones')
          .update(phoneRecord)
          .eq('id', existingPhone.id)
          .select()
          .single();
        phoneData = result.data;
        phoneError = result.error;
      } else {
        const result = await supabase
          .from('phones')
          .insert(phoneRecord)
          .select()
          .single();
        phoneData = result.data;
        phoneError = result.error;
      }
      
      if (phoneError) {
        console.error(`  Error saving phone ${phone.name}:`, phoneError.message);
        continue;
      }
      
      // Insert phone specs
      const specsRecord = {
        phone_id: phoneData.id,
        launch: {
          announced: phone.announced,
          status: phone.status,
        },
        body: {
          dimensions: phone.dimensions,
          weight: phone.weight,
        },
        display: {
          type: phone.display_type,
          size: phone.display_size,
          resolution: phone.display_resolution,
        },
        platform: {
          os: phone.os,
          chipset: phone.chipset,
          cpu: phone.cpu,
          gpu: phone.gpu,
        },
        memory: {
          internal: phone.internal_storage,
          ram: phone.ram,
        },
        main_camera: {
          specs: phone.main_camera,
        },
        selfie_camera: {
          specs: phone.selfie_camera,
        },
        connectivity: {
          wlan: phone.wlan,
          bluetooth: phone.bluetooth,
          nfc: phone.nfc,
          usb: phone.usb,
        },
        network: {
          '5g_bands': phone.network_5g_bands,
        },
        sensors: {
          list: phone.sensors,
        },
        battery: {
          type: phone.battery_type,
          charging: phone.battery_charging,
        },
        pricing_retail: {
          colors: phone.colors,
          price: phone.price,
        },
        data_sources: [{
          source: 'gsmarena',
          url: phone.source_url,
          scraped_at: phone.scraped_at,
          validation: phone.validation,
        }],
      };
      
      const { error: specsError } = await supabase
        .from('phone_specs')
        .upsert(specsRecord, { onConflict: 'phone_id' });
      
      if (specsError) {
        console.error(`  Error upserting specs for ${phone.name}:`, specsError.message);
      } else {
        console.log(`  INSERTED: ${phone.name}`);
        insertedCount++;
      }
    } catch (error) {
      console.error(`  Error processing ${phone.name}:`, error.message);
    }
  }
  
  console.log(`\nDatabase Summary: ${insertedCount} inserted, ${skippedCount} skipped (invalid)`);
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('GSMArena Phone Scraper v2 - With Validation');
  console.log('='.repeat(60));
  console.log(`\nScraping ${PHONE_URLS.length} phones with JSON Schema extraction...\n`);
  
  if (!process.env.FIRECRAWL_API_KEY) {
    console.error('ERROR: FIRECRAWL_API_KEY environment variable is not set');
    process.exit(1);
  }
  
  const results = [];
  const validResults = [];
  const invalidResults = [];
  const errors = [];
  
  for (let i = 0; i < PHONE_URLS.length; i++) {
    const phone = PHONE_URLS[i];
    
    // Add delay between requests to avoid rate limiting
    if (i > 0) {
      console.log('  Waiting 6 seconds to avoid rate limiting...');
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
    
    const result = await scrapePhoneWithSchema(phone, i);
    
    if (result.success) {
      results.push(result.data);
      if (result.isValid) {
        validResults.push(result.data);
      } else {
        invalidResults.push(result.data);
      }
    } else {
      errors.push({ url: phone.url, error: result.error });
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nTotal scraped: ${results.length}/${PHONE_URLS.length}`);
  console.log(`Valid (will be stored): ${validResults.length}`);
  console.log(`Invalid (needs review): ${invalidResults.length}`);
  console.log(`Errors: ${errors.length}`);
  
  // Save all results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  saveToJson(results, `phones-v2-${timestamp}.json`);
  saveToJson(results, 'phones-v2-latest.json');
  
  // Save validation report
  const validationReport = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      valid: validResults.length,
      invalid: invalidResults.length,
      errors: errors.length,
    },
    validPhones: validResults.map(p => ({ name: p.name, chipset: p.chipset })),
    invalidPhones: invalidResults.map(p => ({ 
      name: p.name, 
      chipset: p.chipset, 
      expected: p.expected_chipset,
      validation: p.validation 
    })),
    errors: errors,
  };
  saveToJson(validationReport, 'validation-report.json');
  
  // Insert only validated data into Supabase
  await insertToSupabase(results);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  
  if (validResults.length > 0) {
    console.log('\nVALID PHONES (stored in database):');
    validResults.forEach(p => console.log(`  ✓ ${p.name} - ${p.chipset}`));
  }
  
  if (invalidResults.length > 0) {
    console.log('\nINVALID PHONES (need manual review):');
    invalidResults.forEach(p => {
      console.log(`  ✗ ${p.name}`);
      console.log(`    Got: ${p.chipset}`);
      console.log(`    Expected: ${p.expected_chipset}`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\nERRORS:');
    errors.forEach(e => console.log(`  - ${e.url}: ${e.error}`));
  }
}

main().catch(console.error);
