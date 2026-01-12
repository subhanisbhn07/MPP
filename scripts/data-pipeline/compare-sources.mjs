import Firecrawl from '@mendable/firecrawl-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env file from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(projectRoot, '.env') });

// Initialize Firecrawl
const firecrawlClient = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const firecrawl = firecrawlClient.v1;

// 24 phones with URLs for both GSMArena and 91mobiles
const PHONES = [
  // Samsung (5 phones)
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php',
    mobiles91: 'https://www.91mobiles.com/samsung-galaxy-s24-ultra-price-in-india' },
  { brand: 'Samsung', model: 'Galaxy S24', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/samsung_galaxy_s24-12773.php',
    mobiles91: 'https://www.91mobiles.com/samsung-galaxy-s24-price-in-india' },
  { brand: 'Samsung', model: 'Galaxy Z Fold6', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/samsung_galaxy_z_fold6-12862.php',
    mobiles91: 'https://www.91mobiles.com/samsung-galaxy-z-fold6-price-in-india' },
  { brand: 'Samsung', model: 'Galaxy A55', expectedChipset: 'Exynos 1480',
    gsmarena: 'https://www.gsmarena.com/samsung_galaxy_a55-12824.php',
    mobiles91: 'https://www.91mobiles.com/samsung-galaxy-a55-price-in-india' },
  { brand: 'Samsung', model: 'Galaxy S23 FE', expectedChipset: 'Exynos 2200',
    gsmarena: 'https://www.gsmarena.com/samsung_galaxy_s23_fe-12442.php',
    mobiles91: 'https://www.91mobiles.com/samsung-galaxy-s23-fe-price-in-india' },
  
  // Apple (4 phones)
  { brand: 'Apple', model: 'iPhone 16 Pro Max', expectedChipset: 'Apple A18 Pro',
    gsmarena: 'https://www.gsmarena.com/apple_iphone_16_pro_max-12912.php',
    mobiles91: 'https://www.91mobiles.com/apple-iphone-16-pro-max-price-in-india' },
  { brand: 'Apple', model: 'iPhone 15 Pro Max', expectedChipset: 'Apple A17 Pro',
    gsmarena: 'https://www.gsmarena.com/apple_iphone_15_pro_max-12548.php',
    mobiles91: 'https://www.91mobiles.com/apple-iphone-15-pro-max-price-in-india' },
  { brand: 'Apple', model: 'iPhone 15 Pro', expectedChipset: 'Apple A17 Pro',
    gsmarena: 'https://www.gsmarena.com/apple_iphone_15_pro-12557.php',
    mobiles91: 'https://www.91mobiles.com/apple-iphone-15-pro-price-in-india' },
  { brand: 'Apple', model: 'iPhone 15', expectedChipset: 'Apple A16',
    gsmarena: 'https://www.gsmarena.com/apple_iphone_15-12559.php',
    mobiles91: 'https://www.91mobiles.com/apple-iphone-15-price-in-india' },
  
  // Google (3 phones)
  { brand: 'Google', model: 'Pixel 9 Pro', expectedChipset: 'Tensor G4',
    gsmarena: 'https://www.gsmarena.com/google_pixel_9_pro-12871.php',
    mobiles91: 'https://www.91mobiles.com/google-pixel-9-pro-price-in-india' },
  { brand: 'Google', model: 'Pixel 8 Pro', expectedChipset: 'Tensor G3',
    gsmarena: 'https://www.gsmarena.com/google_pixel_8_pro-12456.php',
    mobiles91: 'https://www.91mobiles.com/google-pixel-8-pro-price-in-india' },
  { brand: 'Google', model: 'Pixel 8', expectedChipset: 'Tensor G3',
    gsmarena: 'https://www.gsmarena.com/google_pixel_8-12457.php',
    mobiles91: 'https://www.91mobiles.com/google-pixel-8-price-in-india' },
  
  // OnePlus (3 phones)
  { brand: 'OnePlus', model: '12', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/oneplus_12-12600.php',
    mobiles91: 'https://www.91mobiles.com/oneplus-12-price-in-india' },
  { brand: 'OnePlus', model: '12R', expectedChipset: 'Snapdragon 8 Gen 2',
    gsmarena: 'https://www.gsmarena.com/oneplus_12r-12795.php',
    mobiles91: 'https://www.91mobiles.com/oneplus-12r-price-in-india' },
  { brand: 'OnePlus', model: 'Nord 4', expectedChipset: 'Snapdragon 7+ Gen 3',
    gsmarena: 'https://www.gsmarena.com/oneplus_nord_4-12851.php',
    mobiles91: 'https://www.91mobiles.com/oneplus-nord-4-price-in-india' },
  
  // Xiaomi (3 phones)
  { brand: 'Xiaomi', model: '14 Ultra', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/xiaomi_14_ultra-12746.php',
    mobiles91: 'https://www.91mobiles.com/xiaomi-14-ultra-price-in-india' },
  { brand: 'Xiaomi', model: '14', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/xiaomi_14-12745.php',
    mobiles91: 'https://www.91mobiles.com/xiaomi-14-price-in-india' },
  { brand: 'Xiaomi', model: 'Redmi Note 13 Pro+', expectedChipset: 'Dimensity 7200',
    gsmarena: 'https://www.gsmarena.com/xiaomi_redmi_note_13_pro+-12626.php',
    mobiles91: 'https://www.91mobiles.com/xiaomi-redmi-note-13-pro-plus-price-in-india' },
  
  // Others (6 phones)
  { brand: 'Nothing', model: 'Phone 2', expectedChipset: 'Snapdragon 8+ Gen 1',
    gsmarena: 'https://www.gsmarena.com/nothing_phone_(2)-12270.php',
    mobiles91: 'https://www.91mobiles.com/nothing-phone-2-price-in-india' },
  { brand: 'Motorola', model: 'Edge 50 Ultra', expectedChipset: 'Snapdragon 8s Gen 3',
    gsmarena: 'https://www.gsmarena.com/motorola_edge_50_ultra-12828.php',
    mobiles91: 'https://www.91mobiles.com/motorola-edge-50-ultra-price-in-india' },
  { brand: 'Oppo', model: 'Find X7 Ultra', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/oppo_find_x7_ultra-12575.php',
    mobiles91: 'https://www.91mobiles.com/oppo-find-x7-ultra-price-in-india' },
  { brand: 'Vivo', model: 'X100 Pro', expectedChipset: 'Dimensity 9300',
    gsmarena: 'https://www.gsmarena.com/vivo_x100_pro-12552.php',
    mobiles91: 'https://www.91mobiles.com/vivo-x100-pro-price-in-india' },
  { brand: 'Asus', model: 'ROG Phone 8 Pro', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/asus_rog_phone_8_pro-12610.php',
    mobiles91: 'https://www.91mobiles.com/asus-rog-phone-8-pro-price-in-india' },
  { brand: 'Sony', model: 'Xperia 1 VI', expectedChipset: 'Snapdragon 8 Gen 3',
    gsmarena: 'https://www.gsmarena.com/sony_xperia_1_vi-12761.php',
    mobiles91: 'https://www.91mobiles.com/sony-xperia-1-vi-price-in-india' },
];

// Comprehensive schema with 25+ fields
const COMPREHENSIVE_SCHEMA = {
  type: 'object',
  properties: {
    // Basic info
    phoneName: { type: 'string', description: 'Exact phone model name' },
    announced: { type: 'string', description: 'Announcement date' },
    status: { type: 'string', description: 'Availability status' },
    
    // Body
    dimensions: { type: 'string', description: 'Phone dimensions' },
    weight: { type: 'string', description: 'Phone weight' },
    build: { type: 'string', description: 'Build materials' },
    sim: { type: 'string', description: 'SIM type' },
    
    // Display
    displayType: { type: 'string', description: 'Display technology' },
    displaySize: { type: 'string', description: 'Screen size' },
    displayResolution: { type: 'string', description: 'Screen resolution' },
    displayProtection: { type: 'string', description: 'Screen protection' },
    displayRefreshRate: { type: 'string', description: 'Refresh rate' },
    
    // Platform
    os: { type: 'string', description: 'Operating system' },
    chipset: { type: 'string', description: 'Processor/SoC' },
    cpu: { type: 'string', description: 'CPU details' },
    gpu: { type: 'string', description: 'GPU details' },
    
    // Memory
    ram: { type: 'string', description: 'RAM options' },
    storage: { type: 'string', description: 'Storage options' },
    cardSlot: { type: 'string', description: 'Memory card slot' },
    
    // Camera
    mainCamera: { type: 'string', description: 'Main camera specs' },
    selfieCamera: { type: 'string', description: 'Front camera specs' },
    videoCapability: { type: 'string', description: 'Video recording' },
    
    // Battery
    batteryCapacity: { type: 'string', description: 'Battery capacity' },
    batteryCharging: { type: 'string', description: 'Charging speed' },
    
    // Connectivity
    network5G: { type: 'string', description: '5G bands' },
    wlan: { type: 'string', description: 'WiFi standards' },
    bluetooth: { type: 'string', description: 'Bluetooth version' },
    nfc: { type: 'string', description: 'NFC support' },
    usb: { type: 'string', description: 'USB type' },
    
    // Features
    sensors: { type: 'string', description: 'Sensors list' },
    
    // Misc
    colors: { type: 'string', description: 'Color options' },
    price: { type: 'string', description: 'Price' },
  },
  required: ['phoneName', 'chipset', 'displaySize', 'batteryCapacity']
};

// Validation rules
const CHIPSET_VALIDATION = {
  'Apple': { mustContain: ['Apple', 'A1', 'A2', 'Bionic'], mustNotContain: ['Snapdragon', 'Exynos', 'Dimensity', 'Tensor', 'Helio', 'Kirin'] },
  'Samsung': { mustContain: ['Snapdragon', 'Exynos'], mustNotContain: ['Apple', 'Tensor', 'Kirin', 'Helio'] },
  'Google': { mustContain: ['Tensor'], mustNotContain: ['Snapdragon', 'Apple', 'Exynos', 'Dimensity', 'Helio', 'Kirin'] },
  'OnePlus': { mustContain: ['Snapdragon', 'Dimensity'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin'] },
  'Xiaomi': { mustContain: ['Snapdragon', 'Dimensity'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin'] },
  'Nothing': { mustContain: ['Snapdragon'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio'] },
  'Motorola': { mustContain: ['Snapdragon', 'Dimensity'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin'] },
  'Oppo': { mustContain: ['Snapdragon', 'Dimensity'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin'] },
  'Vivo': { mustContain: ['Snapdragon', 'Dimensity'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin'] },
  'Asus': { mustContain: ['Snapdragon'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio'] },
  'Sony': { mustContain: ['Snapdragon'], mustNotContain: ['Apple', 'Tensor', 'Exynos', 'Kirin', 'Helio'] },
};

function validateChipset(brand, chipset) {
  const rules = CHIPSET_VALIDATION[brand];
  if (!rules || !chipset) return { valid: false, reason: 'No chipset or rules' };
  
  const chipsetLower = chipset.toLowerCase();
  const hasValid = rules.mustContain.some(k => chipsetLower.includes(k.toLowerCase()));
  const hasInvalid = rules.mustNotContain.some(k => chipsetLower.includes(k.toLowerCase()));
  
  if (hasInvalid) return { valid: false, reason: `Contains invalid keyword for ${brand}` };
  if (!hasValid) return { valid: false, reason: `Missing expected chipset pattern for ${brand}` };
  return { valid: true };
}

function countNonEmptySpecs(data) {
  if (!data) return 0;
  return Object.values(data).filter(v => v && v !== 'N/A' && v !== 'Not available' && v !== 'Not found').length;
}

async function scrapePhone(url, brand, source) {
  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['json'],
      jsonOptions: {
        schema: COMPREHENSIVE_SCHEMA,
        prompt: `Extract ALL phone specifications from this ${source} page. Only extract data for the main phone shown on the page.`
      },
    });
    
    return { success: true, data: result?.json || {} };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('COMPREHENSIVE SOURCE COMPARISON: GSMArena vs 91mobiles');
  console.log('Testing 24 phones on both sources');
  console.log('='.repeat(70));
  
  const results = {
    gsmarena: { valid: 0, invalid: 0, errors: 0, totalSpecs: 0, phones: [] },
    mobiles91: { valid: 0, invalid: 0, errors: 0, totalSpecs: 0, phones: [] },
  };
  
  for (let i = 0; i < PHONES.length; i++) {
    const phone = PHONES[i];
    console.log(`\n[${i + 1}/${PHONES.length}] ${phone.brand} ${phone.model}`);
    console.log('-'.repeat(50));
    
    // Rate limiting
    if (i > 0) {
      console.log('  Waiting 6 seconds...');
      await new Promise(r => setTimeout(r, 6000));
    }
    
    // Scrape GSMArena
    console.log('  GSMArena:');
    const gsmarenaResult = await scrapePhone(phone.gsmarena, phone.brand, 'GSMArena');
    
    if (gsmarenaResult.success) {
      const validation = validateChipset(phone.brand, gsmarenaResult.data?.chipset);
      const specsCount = countNonEmptySpecs(gsmarenaResult.data);
      
      console.log(`    Name: ${gsmarenaResult.data?.phoneName || 'N/A'}`);
      console.log(`    Chipset: ${gsmarenaResult.data?.chipset || 'N/A'}`);
      console.log(`    Specs count: ${specsCount}/31`);
      console.log(`    Valid: ${validation.valid ? 'YES' : 'NO - ' + validation.reason}`);
      
      if (validation.valid) results.gsmarena.valid++;
      else results.gsmarena.invalid++;
      results.gsmarena.totalSpecs += specsCount;
      results.gsmarena.phones.push({
        phone: `${phone.brand} ${phone.model}`,
        name: gsmarenaResult.data?.phoneName,
        chipset: gsmarenaResult.data?.chipset,
        specsCount,
        valid: validation.valid,
      });
    } else {
      console.log(`    Error: ${gsmarenaResult.error}`);
      results.gsmarena.errors++;
      results.gsmarena.phones.push({
        phone: `${phone.brand} ${phone.model}`,
        error: gsmarenaResult.error,
        valid: false,
      });
    }
    
    // Wait before 91mobiles
    await new Promise(r => setTimeout(r, 3000));
    
    // Scrape 91mobiles
    console.log('  91mobiles:');
    const mobiles91Result = await scrapePhone(phone.mobiles91, phone.brand, '91mobiles');
    
    if (mobiles91Result.success) {
      const validation = validateChipset(phone.brand, mobiles91Result.data?.chipset);
      const specsCount = countNonEmptySpecs(mobiles91Result.data);
      
      console.log(`    Name: ${mobiles91Result.data?.phoneName || 'N/A'}`);
      console.log(`    Chipset: ${mobiles91Result.data?.chipset || 'N/A'}`);
      console.log(`    Specs count: ${specsCount}/31`);
      console.log(`    Valid: ${validation.valid ? 'YES' : 'NO - ' + validation.reason}`);
      
      if (validation.valid) results.mobiles91.valid++;
      else results.mobiles91.invalid++;
      results.mobiles91.totalSpecs += specsCount;
      results.mobiles91.phones.push({
        phone: `${phone.brand} ${phone.model}`,
        name: mobiles91Result.data?.phoneName,
        chipset: mobiles91Result.data?.chipset,
        specsCount,
        valid: validation.valid,
      });
    } else {
      console.log(`    Error: ${mobiles91Result.error}`);
      results.mobiles91.errors++;
      results.mobiles91.phones.push({
        phone: `${phone.brand} ${phone.model}`,
        error: mobiles91Result.error,
        valid: false,
      });
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('COMPARISON SUMMARY');
  console.log('='.repeat(70));
  
  const gsmarenaTotal = results.gsmarena.valid + results.gsmarena.invalid + results.gsmarena.errors;
  const mobiles91Total = results.mobiles91.valid + results.mobiles91.invalid + results.mobiles91.errors;
  
  console.log('\n| Metric | GSMArena | 91mobiles | Winner |');
  console.log('|--------|----------|-----------|--------|');
  console.log(`| Valid phones | ${results.gsmarena.valid}/${gsmarenaTotal} | ${results.mobiles91.valid}/${mobiles91Total} | ${results.gsmarena.valid > results.mobiles91.valid ? 'GSMArena' : results.mobiles91.valid > results.gsmarena.valid ? '91mobiles' : 'Tie'} |`);
  console.log(`| Success rate | ${Math.round(results.gsmarena.valid/gsmarenaTotal*100)}% | ${Math.round(results.mobiles91.valid/mobiles91Total*100)}% | ${results.gsmarena.valid/gsmarenaTotal > results.mobiles91.valid/mobiles91Total ? 'GSMArena' : '91mobiles'} |`);
  console.log(`| Avg specs/phone | ${(results.gsmarena.totalSpecs/gsmarenaTotal).toFixed(1)} | ${(results.mobiles91.totalSpecs/mobiles91Total).toFixed(1)} | ${results.gsmarena.totalSpecs > results.mobiles91.totalSpecs ? 'GSMArena' : '91mobiles'} |`);
  console.log(`| Errors | ${results.gsmarena.errors} | ${results.mobiles91.errors} | ${results.gsmarena.errors < results.mobiles91.errors ? 'GSMArena' : results.mobiles91.errors < results.gsmarena.errors ? '91mobiles' : 'Tie'} |`);
  
  console.log('\n' + '='.repeat(70));
  console.log('DETAILED RESULTS BY PHONE');
  console.log('='.repeat(70));
  
  console.log('\n| Phone | GSMArena | 91mobiles |');
  console.log('|-------|----------|-----------|');
  
  for (let i = 0; i < PHONES.length; i++) {
    const gsm = results.gsmarena.phones[i];
    const m91 = results.mobiles91.phones[i];
    
    const gsmStatus = gsm.error ? 'Error' : (gsm.valid ? `✓ ${gsm.specsCount} specs` : `✗ Wrong: ${gsm.chipset?.substring(0, 20) || 'N/A'}`);
    const m91Status = m91.error ? 'Error' : (m91.valid ? `✓ ${m91.specsCount} specs` : `✗ Wrong: ${m91.chipset?.substring(0, 20) || 'N/A'}`);
    
    console.log(`| ${gsm.phone} | ${gsmStatus} | ${m91Status} |`);
  }
  
  // Save results to file
  const outputDir = path.join(process.cwd(), 'scripts', 'data-pipeline', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const reportPath = path.join(outputDir, 'source-comparison-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nFull report saved to: ${reportPath}`);
}

main().catch(console.error);
