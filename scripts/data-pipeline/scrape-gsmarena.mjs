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

// 24 phones to scrape for testing (mix of brands and categories)
const PHONE_URLS = [
  // Samsung (5 phones)
  { url: 'https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php', brand: 'Samsung' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_s24-12773.php', brand: 'Samsung' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_z_fold6-12862.php', brand: 'Samsung' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_a55-12824.php', brand: 'Samsung' },
  { url: 'https://www.gsmarena.com/samsung_galaxy_s23_fe-12442.php', brand: 'Samsung' },
  
  // Apple (4 phones)
  { url: 'https://www.gsmarena.com/apple_iphone_15_pro_max-12548.php', brand: 'Apple' },
  { url: 'https://www.gsmarena.com/apple_iphone_15_pro-12557.php', brand: 'Apple' },
  { url: 'https://www.gsmarena.com/apple_iphone_15-12559.php', brand: 'Apple' },
  { url: 'https://www.gsmarena.com/apple_iphone_16_pro_max-12912.php', brand: 'Apple' },
  
  // Google (3 phones)
  { url: 'https://www.gsmarena.com/google_pixel_8_pro-12456.php', brand: 'Google' },
  { url: 'https://www.gsmarena.com/google_pixel_8-12457.php', brand: 'Google' },
  { url: 'https://www.gsmarena.com/google_pixel_9_pro-12871.php', brand: 'Google' },
  
  // OnePlus (3 phones)
  { url: 'https://www.gsmarena.com/oneplus_12-12600.php', brand: 'OnePlus' },
  { url: 'https://www.gsmarena.com/oneplus_12r-12795.php', brand: 'OnePlus' },
  { url: 'https://www.gsmarena.com/oneplus_nord_4-12851.php', brand: 'OnePlus' },
  
  // Xiaomi (3 phones)
  { url: 'https://www.gsmarena.com/xiaomi_14_ultra-12746.php', brand: 'Xiaomi' },
  { url: 'https://www.gsmarena.com/xiaomi_14-12745.php', brand: 'Xiaomi' },
  { url: 'https://www.gsmarena.com/xiaomi_redmi_note_13_pro+-12626.php', brand: 'Xiaomi' },
  
  // Others (6 phones - various brands)
  { url: 'https://www.gsmarena.com/nothing_phone_(2)-12270.php', brand: 'Nothing' },
  { url: 'https://www.gsmarena.com/motorola_edge_50_ultra-12828.php', brand: 'Motorola' },
  { url: 'https://www.gsmarena.com/oppo_find_x7_ultra-12575.php', brand: 'Oppo' },
  { url: 'https://www.gsmarena.com/vivo_x100_pro-12552.php', brand: 'Vivo' },
  { url: 'https://www.gsmarena.com/asus_rog_phone_8_pro-12610.php', brand: 'Asus' },
  { url: 'https://www.gsmarena.com/sony_xperia_1_vi-12761.php', brand: 'Sony' },
];

// Helper function to strip markdown links and clean text
function cleanMarkdownText(text) {
  if (!text) return '';
  return text
    // Remove markdown links: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove standalone URLs
    .replace(/https?:\/\/[^\s|]+/g, '')
    // Clean up extra whitespace and pipes
    .replace(/\s*\|\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse GSMArena announced/status date to ISO date format
// Handles formats like: "2024, January 17", "2023, June", "Available. Released 2024, January 24"
function parseAnnouncedDate(announced, status) {
  if (!announced && !status) return null;
  
  // Month name to number mapping
  const months = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  };
  
  // Try to extract date from status first (usually has release date)
  // Format: "Available. Released 2024, January 24"
  const statusMatch = status?.match(/released\s+(\d{4}),?\s*(\w+)\s*(\d{1,2})?/i);
  if (statusMatch) {
    const year = statusMatch[1];
    const month = months[statusMatch[2].toLowerCase()] || '01';
    const day = statusMatch[3] ? statusMatch[3].padStart(2, '0') : '15'; // Default to 15th if no day
    return `${year}-${month}-${day}`;
  }
  
  // Try to extract from announced field
  // Format: "2024, January 17" or "2023, June"
  const announcedMatch = announced?.match(/(\d{4}),?\s*(\w+)\s*(\d{1,2})?/i);
  if (announcedMatch) {
    const year = announcedMatch[1];
    const month = months[announcedMatch[2].toLowerCase()] || '01';
    const day = announcedMatch[3] ? announcedMatch[3].padStart(2, '0') : '15'; // Default to 15th if no day
    return `${year}-${month}-${day}`;
  }
  
  return null;
}

// Parse GSMArena price to USD numeric value
// Handles formats like: "$ 1199.99 / € 1099", "About 1200 EUR", "₹ 79,999"
function parsePriceToUSD(priceStr) {
  if (!priceStr) return null;
  
  // Currency conversion rates (approximate)
  const conversionRates = {
    'USD': 1,
    '$': 1,
    'EUR': 1.08,
    '€': 1.08,
    'GBP': 1.27,
    '£': 1.27,
    'INR': 0.012,
    '₹': 0.012,
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
  
  // Try to extract any number as fallback (assume USD)
  const numMatch = priceStr.match(/(\d[\d,]*(?:\.\d{2})?)/);
  if (numMatch) {
    const value = parseFloat(numMatch[1].replace(/,/g, ''));
    // Only use if it's a reasonable phone price (100-3000 USD)
    if (value >= 100 && value <= 3000) {
      return value;
    }
  }
  
  return null;
}

// Parse GSMArena markdown content to extract specs
function parseGSMArenaSpecs(markdown, url, brand) {
  const specs = {
    source_url: url,
    scraped_at: new Date().toISOString(),
  };
  
  // Extract phone name from URL (most reliable method)
  const urlMatch = url.match(/gsmarena\.com\/([^-]+(?:-[^-]+)*)-\d+\.php/);
  if (urlMatch) {
    // Convert URL slug to proper name: samsung_galaxy_s24_ultra -> Samsung Galaxy S24 Ultra
    const slug = urlMatch[1];
    specs.name = slug
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Try to extract from markdown title as fallback
  if (!specs.name) {
    const titleMatch = markdown.match(/^#\s*(.+?)(?:\s*-\s*Full|\s*specifications|\n)/im);
    if (titleMatch) {
      specs.name = titleMatch[1].trim();
    }
  }
  
  // Extract model name (phone name without brand)
  if (specs.name && brand) {
    specs.model = specs.name.replace(new RegExp(`^${brand}\\s*`, 'i'), '').trim();
  }
  
  // GSMArena markdown table format:
  // | SectionName | [FieldName](link) | Value |
  // | [FieldName](link) | Value |
  // We need patterns that match both formats and extract the value
  
  // Common spec patterns to extract - updated for GSMArena's markdown table format
  const specPatterns = {
    // Network - format: | Network | [Technology](link) | Value | or | [Technology](link) | Value |
    'network_technology': /\|\s*(?:Network\s*\|)?\s*\[?Technology\]?[^|]*\|\s*([^|\n]+)/i,
    'network_2g_bands': /\|\s*\[?2G bands?\]?[^|]*\|\s*([^|\n]+)/i,
    'network_3g_bands': /\|\s*\[?3G bands?\]?[^|]*\|\s*([^|\n]+)/i,
    'network_4g_bands': /\|\s*\[?4G bands?\]?[^|]*\|\s*([^|\n]+)/i,
    'network_5g_bands': /\|\s*\[?5G bands?\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Launch
    'announced': /\|\s*\[?Announced\]?[^|]*\|\s*([^|\n]+)/i,
    'status': /\|\s*\[?Status\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Body
    'dimensions': /\|\s*\[?Dimensions\]?[^|]*\|\s*([^|\n]+)/i,
    'weight': /\|\s*\[?Weight\]?[^|]*\|\s*([^|\n]+)/i,
    'build': /\|\s*\[?Build\]?[^|]*\|\s*([^|\n]+)/i,
    'sim': /\|\s*\[?SIM\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Display
    'display_type': /\|\s*(?:Display\s*\|)?\s*\[?Type\]?[^|]*\|\s*([^|\n]+)/i,
    'display_size': /\|\s*\[?Size\]?[^|]*\|\s*([^|\n]+)/i,
    'display_resolution': /\|\s*\[?Resolution\]?[^|]*\|\s*([^|\n]+)/i,
    'display_protection': /\|\s*\[?Protection\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Platform
    'os': /\|\s*(?:Platform\s*\|)?\s*\[?OS\]?[^|]*\|\s*([^|\n]+)/i,
    'chipset': /\|\s*\[?Chipset\]?[^|]*\|\s*([^|\n]+)/i,
    'cpu': /\|\s*\[?CPU\]?[^|]*\|\s*([^|\n]+)/i,
    'gpu': /\|\s*\[?GPU\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Memory
    'card_slot': /\|\s*\[?Card slot\]?[^|]*\|\s*([^|\n]+)/i,
    'internal_storage': /\|\s*\[?Internal\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Main Camera - look for camera specs with MP values
    'main_camera': /\|\s*(?:Main Camera\s*\|)?\s*\[?(?:Single|Dual|Triple|Quad)\]?[^|]*\|\s*([^|\n]+)/i,
    'camera_features': /\|\s*\[?Features\]?[^|]*\|\s*([^|\n]+)/i,
    'camera_video': /\|\s*\[?Video\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Selfie Camera
    'selfie_camera': /\|\s*(?:Selfie camera\s*\|)?\s*\[?(?:Single|Dual)\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Sound
    'loudspeaker': /\|\s*\[?Loudspeaker\]?[^|]*\|\s*([^|\n]+)/i,
    'audio_jack': /\|\s*\[?3\.5mm jack\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Connectivity
    'wlan': /\|\s*\[?WLAN\]?[^|]*\|\s*([^|\n]+)/i,
    'bluetooth': /\|\s*\[?Bluetooth\]?[^|]*\|\s*([^|\n]+)/i,
    'positioning': /\|\s*\[?(?:Positioning|GPS)\]?[^|]*\|\s*([^|\n]+)/i,
    'nfc': /\|\s*\[?NFC\]?[^|]*\|\s*([^|\n]+)/i,
    'usb': /\|\s*\[?USB\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Features
    'sensors': /\|\s*\[?Sensors\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Battery - look for mAh in the value
    'battery_type': /\|\s*(?:Battery\s*\|)?\s*\[?Type\]?[^|]*\|\s*([^|\n]*mAh[^|\n]*)/i,
    'battery_charging': /\|\s*\[?Charging\]?[^|]*\|\s*([^|\n]+)/i,
    
    // Misc
    'colors': /\|\s*\[?Colors\]?[^|]*\|\s*([^|\n]+)/i,
    'price': /\|\s*\[?Price\]?[^|]*\|\s*([^|\n]+)/i,
  };
  
  for (const [key, pattern] of Object.entries(specPatterns)) {
    const match = markdown.match(pattern);
    if (match) {
      // Clean the extracted value (remove markdown links, extra whitespace)
      specs[key] = cleanMarkdownText(match[1]);
    }
  }
  
  // Extract the main phone image from GSMArena
  // Use HIGH-RESOLUTION images from the /pics/ folder instead of /bigpic/
  // bigpic = 160x212 pixels (8KB) - LOW RESOLUTION
  // pics = 453x620 pixels (22KB) - HIGH RESOLUTION (almost 3x better)
  
  // Extract phone identifier from URL
  // URL format: gsmarena.com/samsung_galaxy_s24_ultra-12771.php
  const imageUrlMatch = url.match(/gsmarena\.com\/([^-]+(?:_[^-]+)*)-\d+\.php/);
  const phoneSlugFromUrl = imageUrlMatch ? imageUrlMatch[1] : '';
  
  // Convert URL slug to image filename format (underscores to hyphens)
  const imageSlug = phoneSlugFromUrl.toLowerCase().replace(/_/g, '-');
  
  // Extract all images from markdown to find high-res pics
  const allImageMatches = [...markdown.matchAll(/!\[.*?\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|webp)[^\s)]*)\)/gi)];
  const allImages = allImageMatches.map(m => m[1]);
  
  // Prioritize /pics/ folder images (high resolution) over /bigpic/ (low resolution)
  const picsImages = allImages.filter(img => img.includes('/pics/'));
  const bigpicImages = allImages.filter(img => img.includes('/bigpic/'));
  
  // Get the phone keywords for matching
  const phoneKeywords = imageSlug.split('-').filter(w => w.length > 1);
  const brandKeyword = phoneKeywords[0]; // e.g., "samsung", "apple", "google"
  
  // Brand name mapping for pics folder (some brands have different folder names)
  const brandFolderMap = {
    'samsung': 'samsung',
    'apple': 'apple',
    'google': 'google',
    'oneplus': 'oneplus',
    'xiaomi': 'xiaomi',
    'nothing': 'nothing',
    'motorola': 'motorola',
    'oppo': 'oppo',
    'vivo': 'vivo',
    'asus': 'asus',
    'sony': 'sony',
    'huawei': 'huawei',
    'realme': 'realme',
    'poco': 'xiaomi', // Poco is under Xiaomi
    'redmi': 'xiaomi', // Redmi is under Xiaomi
  };
  
  function findBestHighResImage() {
    // First, try to find a matching image in the /pics/ folder (high resolution)
    for (const img of picsImages) {
      const filename = img.split('/').pop().toLowerCase().replace('.jpg', '').replace('.png', '');
      
      // Check if filename contains the brand and model keywords
      let matchCount = 0;
      for (const keyword of phoneKeywords) {
        if (filename.includes(keyword)) {
          matchCount++;
        }
      }
      // If at least 60% of keywords match, it's likely the correct image
      if (matchCount >= Math.ceil(phoneKeywords.length * 0.6)) {
        return img;
      }
    }
    
    // Fallback: try bigpic images
    for (const img of bigpicImages) {
      const filename = img.split('/').pop().toLowerCase().replace('.jpg', '').replace('.png', '');
      
      if (filename.startsWith(brandKeyword)) {
        let matchCount = 0;
        for (const keyword of phoneKeywords) {
          if (filename.includes(keyword)) {
            matchCount++;
          }
        }
        if (matchCount >= Math.ceil(phoneKeywords.length * 0.7)) {
          return img;
        }
      }
    }
    return null;
  }
  
  const matchedImage = findBestHighResImage();
  
  // Construct high-res URL from pics folder as fallback
  // Pattern: https://fdn2.gsmarena.com/vv/pics/{brand}/{brand}-{model}-1.jpg
  const brandFolder = brandFolderMap[brandKeyword] || brandKeyword;
  const constructedHighResUrl = `https://fdn2.gsmarena.com/vv/pics/${brandFolder}/${imageSlug}-1.jpg`;
  const constructedLowResUrl = `https://fdn2.gsmarena.com/vv/bigpic/${imageSlug}.jpg`;
  
  if (matchedImage && matchedImage.includes('/pics/')) {
    // Found a high-res image in the scraped content
    specs.image_url = matchedImage;
    specs.images = [matchedImage];
    console.log(`  Image: Found HIGH-RES pics image for ${imageSlug}`);
  } else if (matchedImage) {
    // Found a bigpic image (low-res fallback)
    specs.image_url = matchedImage;
    specs.images = [matchedImage];
    console.log(`  Image: Found bigpic image for ${imageSlug} (low-res)`);
  } else {
    // Use constructed high-res URL - will verify it exists
    specs.image_url = constructedHighResUrl;
    specs.images = [constructedHighResUrl];
    specs.fallback_image_url = constructedLowResUrl;
    console.log(`  Image: Using constructed HIGH-RES URL for ${imageSlug}`);
  }
  
  // Try to extract price from various formats
  if (!specs.price) {
    const priceMatch = markdown.match(/(?:€|£|\$|₹|USD|EUR|GBP|INR)\s*[\d,]+(?:\.\d{2})?/i) ||
                       markdown.match(/[\d,]+(?:\.\d{2})?\s*(?:€|£|\$|₹|USD|EUR|GBP|INR)/i);
    if (priceMatch) {
      specs.price = priceMatch[0].trim();
    }
  }
  
  return specs;
}

// Generate slug from phone name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Scrape a single phone (specs page + pictures page for high-res images)
async function scrapePhone(phoneInfo, index) {
  const { url, brand } = phoneInfo;
  console.log(`\n[${index + 1}/${PHONE_URLS.length}] Scraping: ${url}`);
  
  try {
    // First, scrape the main specs page
    const result = await firecrawl.scrape(url, {
      formats: ['markdown'],
    });
    
    if (!result || !result.markdown) {
      console.error(`  Failed to get content from ${url}`);
      return null;
    }
    
    const specs = parseGSMArenaSpecs(result.markdown, url, brand);
    specs.brand = brand;
    
    // Generate slug if we have a name
    if (specs.name) {
      specs.slug = generateSlug(specs.name);
    }
    
    // Also scrape the pictures page for high-resolution images
    // URL pattern: samsung_galaxy_s24_ultra-12771.php -> samsung_galaxy_s24_ultra-pictures-12771.php
    const picturesUrl = url.replace(/(-\d+\.php)$/, '-pictures$1');
    console.log(`  Fetching high-res images from: ${picturesUrl}`);
    
    try {
      // Wait a bit before the second request to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const picturesResult = await firecrawl.scrape(picturesUrl, {
        formats: ['markdown'],
      });
      
      if (picturesResult && picturesResult.markdown) {
        // Extract high-res images from pictures page
        // Pattern: https://fdn2.gsmarena.com/vv/pics/{brand}/{phone}-{n}.jpg
        const picsMatches = [...picturesResult.markdown.matchAll(/!\[.*?\]\((https:\/\/fdn2\.gsmarena\.com\/vv\/pics\/[^)]+\.jpg)\)/gi)];
        const highResImages = picsMatches.map(m => m[1]).filter(img => !img.includes('reviewsimg'));
        
        if (highResImages.length > 0) {
          // Use the first high-res image as the main image
          specs.image_url = highResImages[0];
          specs.images = highResImages.slice(0, 5); // Store up to 5 images
          console.log(`  Found ${highResImages.length} HIGH-RES images from pictures page`);
        }
      }
    } catch (picturesError) {
      console.log(`  Could not fetch pictures page: ${picturesError.message}`);
      // Continue with whatever image we have from the specs page
    }
    
    console.log(`  Scraped: ${specs.name || 'Unknown'}`);
    console.log(`  - Display: ${specs.display_size || 'N/A'}`);
    console.log(`  - Chipset: ${specs.chipset || 'N/A'}`);
    console.log(`  - Battery: ${specs.battery_type || 'N/A'}`);
    console.log(`  - Image URL: ${specs.image_url || 'N/A'}`);
    
    return specs;
  } catch (error) {
    console.error(`  Error scraping ${url}:`, error.message);
    return null;
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

// Insert data into Supabase
async function insertToSupabase(phonesData) {
  if (!supabase) {
    console.log('\nSupabase not configured - skipping database insert');
    return;
  }
  
  console.log('\nInserting data into Supabase...');
  
  for (const phone of phonesData) {
    if (!phone || !phone.name) continue;
    
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
      
      // Check if phone already exists by slug
      const { data: existingPhone } = await supabase
        .from('phones')
        .select('id')
        .eq('slug', phone.slug)
        .single();
      
      // Parse release date from announced/status fields
      const releaseDate = parseAnnouncedDate(phone.announced, phone.status);
      
      // Parse price to USD
      const priceUSD = parsePriceToUSD(phone.price);
      
      console.log(`  Parsed: release_date=${releaseDate}, price_usd=${priceUSD}`);
      
      const phoneRecord = {
        brand_id: brandData.id,
        model: phone.name.replace(phone.brand, '').trim(),
        slug: phone.slug,
        image_url: phone.images?.[0] || null,
        images: phone.images || [],
        release_date: releaseDate,
        price_usd: priceUSD,
        market_status: phone.status || 'Available',
      };
      
      let phoneData;
      let phoneError;
      
      if (existingPhone) {
        // Update existing phone
        const result = await supabase
          .from('phones')
          .update(phoneRecord)
          .eq('id', existingPhone.id)
          .select()
          .single();
        phoneData = result.data;
        phoneError = result.error;
      } else {
        // Insert new phone
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
      
      // Insert phone specs - matching actual database schema
      const specsRecord = {
        phone_id: phoneData.id,
        network: {
          technology: phone.network_technology,
          '2g_bands': phone.network_2g_bands,
          '3g_bands': phone.network_3g_bands,
          '4g_bands': phone.network_4g_bands,
          '5g_bands': phone.network_5g_bands,
        },
        launch: {
          announced: phone.announced,
          status: phone.status,
        },
        body: {
          dimensions: phone.dimensions,
          weight: phone.weight,
          build: phone.build,
          sim: phone.sim,
        },
        display: {
          type: phone.display_type,
          size: phone.display_size,
          resolution: phone.display_resolution,
          protection: phone.display_protection,
        },
        platform: {
          os: phone.os,
          chipset: phone.chipset,
          cpu: phone.cpu,
          gpu: phone.gpu,
        },
        memory: {
          card_slot: phone.card_slot,
          internal: phone.internal_storage,
        },
        main_camera: {
          specs: phone.main_camera,
          features: phone.camera_features,
          video: phone.camera_video,
        },
        selfie_camera: {
          specs: phone.selfie_camera,
        },
        audio: {
          loudspeaker: phone.loudspeaker,
          audio_jack: phone.audio_jack,
        },
        connectivity: {
          wlan: phone.wlan,
          bluetooth: phone.bluetooth,
          positioning: phone.positioning,
          nfc: phone.nfc,
          usb: phone.usb,
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
          scraped_at: new Date().toISOString(),
        }],
      };
      
      const { error: specsError } = await supabase
        .from('phone_specs')
        .upsert(specsRecord, { onConflict: 'phone_id' });
      
      if (specsError) {
        console.error(`  Error upserting specs for ${phone.name}:`, specsError.message);
      } else {
        console.log(`  Inserted: ${phone.name}`);
      }
    } catch (error) {
      console.error(`  Error processing ${phone.name}:`, error.message);
    }
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('GSMArena Phone Scraper');
  console.log('='.repeat(60));
  console.log(`\nScraping ${PHONE_URLS.length} phones...\n`);
  
  if (!process.env.FIRECRAWL_API_KEY) {
    console.error('ERROR: FIRECRAWL_API_KEY environment variable is not set');
    console.log('Please set it in your .env file');
    process.exit(1);
  }
  
  const results = [];
  const errors = [];
  
  for (let i = 0; i < PHONE_URLS.length; i++) {
    const phone = PHONE_URLS[i];
    
    // Add delay between requests to avoid rate limiting (6 seconds to stay under 10 req/min)
    if (i > 0) {
      console.log('  Waiting 6 seconds to avoid rate limiting...');
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
    
    const specs = await scrapePhone(phone, i);
    if (specs) {
      results.push(specs);
    } else {
      errors.push(phone.url);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nSuccessfully scraped: ${results.length}/${PHONE_URLS.length} phones`);
  
  if (errors.length > 0) {
    console.log(`\nFailed URLs (${errors.length}):`);
    errors.forEach(url => console.log(`  - ${url}`));
  }
  
  // Save results to JSON
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonFile = saveToJson(results, `phones-${timestamp}.json`);
  
  // Also save a latest.json for easy access
  saveToJson(results, 'phones-latest.json');
  
  // Insert into Supabase if configured
  await insertToSupabase(results);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  
  const brandCounts = {};
  results.forEach(phone => {
    brandCounts[phone.brand] = (brandCounts[phone.brand] || 0) + 1;
  });
  
  console.log('\nPhones by brand:');
  Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([brand, count]) => {
      console.log(`  ${brand}: ${count}`);
    });
  
  console.log(`\nTotal: ${results.length} phones scraped`);
  console.log(`Output: ${jsonFile}`);
}

main().catch(console.error);
