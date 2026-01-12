import Firecrawl from '@mendable/firecrawl-js';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

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
  
  // Common spec patterns to extract
  const specPatterns = {
    // Network
    'network_technology': /Technology\s*\|\s*(.+?)(?:\n|$)/i,
    'network_2g_bands': /2G bands\s*\|\s*(.+?)(?:\n|$)/i,
    'network_3g_bands': /3G bands\s*\|\s*(.+?)(?:\n|$)/i,
    'network_4g_bands': /4G bands\s*\|\s*(.+?)(?:\n|$)/i,
    'network_5g_bands': /5G bands\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Launch
    'announced': /Announced\s*\|\s*(.+?)(?:\n|$)/i,
    'status': /Status\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Body
    'dimensions': /Dimensions\s*\|\s*(.+?)(?:\n|$)/i,
    'weight': /Weight\s*\|\s*(.+?)(?:\n|$)/i,
    'build': /Build\s*\|\s*(.+?)(?:\n|$)/i,
    'sim': /SIM\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Display
    'display_type': /Type\s*\|\s*(.+?)(?:\n|$)/i,
    'display_size': /Size\s*\|\s*(.+?)(?:\n|$)/i,
    'display_resolution': /Resolution\s*\|\s*(.+?)(?:\n|$)/i,
    'display_protection': /Protection\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Platform
    'os': /OS\s*\|\s*(.+?)(?:\n|$)/i,
    'chipset': /Chipset\s*\|\s*(.+?)(?:\n|$)/i,
    'cpu': /CPU\s*\|\s*(.+?)(?:\n|$)/i,
    'gpu': /GPU\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Memory
    'card_slot': /Card slot\s*\|\s*(.+?)(?:\n|$)/i,
    'internal_storage': /Internal\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Main Camera
    'main_camera': /(?:Main Camera|Rear Camera|Camera)\s*(?:Single|Dual|Triple|Quad)?\s*\|\s*(.+?)(?:\n|$)/i,
    'camera_features': /Features\s*\|\s*(.+?)(?:\n|$)/i,
    'camera_video': /Video\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Selfie Camera
    'selfie_camera': /Selfie camera\s*(?:Single|Dual)?\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Sound
    'loudspeaker': /Loudspeaker\s*\|\s*(.+?)(?:\n|$)/i,
    'audio_jack': /3\.5mm jack\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Connectivity
    'wlan': /WLAN\s*\|\s*(.+?)(?:\n|$)/i,
    'bluetooth': /Bluetooth\s*\|\s*(.+?)(?:\n|$)/i,
    'positioning': /Positioning\s*\|\s*(.+?)(?:\n|$)/i,
    'nfc': /NFC\s*\|\s*(.+?)(?:\n|$)/i,
    'usb': /USB\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Features
    'sensors': /Sensors\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Battery
    'battery_type': /(?:Battery\s*)?Type\s*\|\s*(.+?mAh.+?)(?:\n|$)/i,
    'battery_charging': /Charging\s*\|\s*(.+?)(?:\n|$)/i,
    
    // Misc
    'colors': /Colors\s*\|\s*(.+?)(?:\n|$)/i,
    'price': /Price\s*\|\s*(.+?)(?:\n|$)/i,
  };
  
  for (const [key, pattern] of Object.entries(specPatterns)) {
    const match = markdown.match(pattern);
    if (match) {
      specs[key] = match[1].trim();
    }
  }
  
  // Extract the main phone image from GSMArena
  // GSMArena main phone images are in format: https://fdn2.gsmarena.com/vv/bigpic/phone-name.jpg
  // The FIRST bigpic image on the page is always the main phone image
  // Later bigpic images are from "related phones" section and should be ignored
  const allImageMatches = [...markdown.matchAll(/!\[.*?\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|webp)[^\s)]*)\)/gi)];
  const allImages = allImageMatches.map(m => m[1]);
  
  // Find the FIRST bigpic image - this is always the main phone image on GSMArena
  const bigpicImages = allImages.filter(img => img.includes('/bigpic/'));
  
  // The first bigpic image is the main phone image
  // Only use the first one to avoid getting "related phones" images
  if (bigpicImages.length > 0) {
    specs.image_url = bigpicImages[0];
    specs.images = [bigpicImages[0]];
  } else {
    // Fallback to first image if no bigpic found
    specs.image_url = allImages[0] || null;
    specs.images = allImages.slice(0, 1);
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

// Scrape a single phone
async function scrapePhone(phoneInfo, index) {
  const { url, brand } = phoneInfo;
  console.log(`\n[${index + 1}/${PHONE_URLS.length}] Scraping: ${url}`);
  
  try {
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
    
    console.log(`  Scraped: ${specs.name || 'Unknown'}`);
    console.log(`  - Display: ${specs.display_size || 'N/A'}`);
    console.log(`  - Chipset: ${specs.chipset || 'N/A'}`);
    console.log(`  - Battery: ${specs.battery_type || 'N/A'}`);
    console.log(`  - Images: ${specs.images?.length || 0} found`);
    
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
      
      // Insert phone
      const phoneRecord = {
        brand_id: brandData.id,
        model: phone.name.replace(phone.brand, '').trim(),
        slug: phone.slug,
        image_url: phone.images?.[0] || null,
        images: phone.images || [],
        announced_date: phone.announced || null,
        market_status: phone.status || 'Available',
      };
      
      const { data: phoneData, error: phoneError } = await supabase
        .from('phones')
        .upsert(phoneRecord, { onConflict: 'slug' })
        .select()
        .single();
      
      if (phoneError) {
        console.error(`  Error upserting phone ${phone.name}:`, phoneError.message);
        continue;
      }
      
      // Insert phone specs
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
        sound: {
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
        features: {
          sensors: phone.sensors,
        },
        battery: {
          type: phone.battery_type,
          charging: phone.battery_charging,
        },
        misc: {
          colors: phone.colors,
          price: phone.price,
        },
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
