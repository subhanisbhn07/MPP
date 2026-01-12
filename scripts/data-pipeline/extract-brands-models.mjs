import Firecrawl from '@mendable/firecrawl-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env file from project root
const __filename_temp = fileURLToPath(import.meta.url);
const __dirname_temp = path.dirname(__filename_temp);
const projectRoot = path.resolve(__dirname_temp, '../..');
dotenv.config({ path: path.join(projectRoot, '.env') });

// Initialize Firecrawl
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// ============================================================================
// EXTRACT BRANDS AND MODELS FROM 91MOBILES SITEMAP
// ============================================================================
// 
// This script parses the 91mobiles XML sitemap to extract:
// 1. List of all brands
// 2. List of all phone models per brand
// 3. Phone slugs for scraping
// 
// Sitemap URL: https://www.91mobiles.com/sitemap/mobilelist_forgoogle.xml
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Known brand patterns for extraction from slugs
const BRAND_PATTERNS = {
  'samsung': 'Samsung',
  'apple': 'Apple',
  'google': 'Google',
  'oneplus': 'OnePlus',
  'xiaomi': 'Xiaomi',
  'redmi': 'Xiaomi', // Redmi is a Xiaomi sub-brand
  'poco': 'Poco',
  'realme': 'Realme',
  'oppo': 'Oppo',
  'vivo': 'Vivo',
  'iqoo': 'iQOO',
  'motorola': 'Motorola',
  'moto': 'Motorola',
  'nokia': 'Nokia',
  'sony': 'Sony',
  'asus': 'Asus',
  'huawei': 'Huawei',
  'honor': 'Honor',
  'nothing': 'Nothing',
  'infinix': 'Infinix',
  'tecno': 'Tecno',
  'lava': 'Lava',
  'micromax': 'Micromax',
  'itel': 'Itel',
  'lg': 'LG',
  'htc': 'HTC',
  'lenovo': 'Lenovo',
  'meizu': 'Meizu',
  'zte': 'ZTE',
  'nubia': 'Nubia',
  'blackberry': 'BlackBerry',
  'cat': 'CAT',
  'fairphone': 'Fairphone',
  'tcl': 'TCL',
  'alcatel': 'Alcatel',
  'coolpad': 'Coolpad',
  'gionee': 'Gionee',
  'karbonn': 'Karbonn',
  'intex': 'Intex',
  'panasonic': 'Panasonic',
  'sharp': 'Sharp',
  'blu': 'BLU',
  'ulefone': 'Ulefone',
  'doogee': 'Doogee',
  'oukitel': 'Oukitel',
  'umidigi': 'UMIDIGI',
  'cubot': 'Cubot',
  'blackview': 'Blackview',
  'agm': 'AGM',
  'cat': 'CAT',
  'jio': 'Jio',
  'reliance': 'Reliance',
};

// Extract brand from phone slug
function extractBrand(slug) {
  const lowerSlug = slug.toLowerCase();
  
  for (const [pattern, brand] of Object.entries(BRAND_PATTERNS)) {
    if (lowerSlug.startsWith(pattern + '-') || lowerSlug.startsWith(pattern + '_')) {
      return brand;
    }
  }
  
  // Fallback: use first word as brand
  const firstWord = slug.split('-')[0];
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

// Extract model name from slug (remove brand prefix)
function extractModel(slug, brand) {
  const lowerSlug = slug.toLowerCase();
  const lowerBrand = brand.toLowerCase();
  
  // Remove brand prefix
  let model = slug;
  for (const pattern of Object.keys(BRAND_PATTERNS)) {
    if (lowerSlug.startsWith(pattern + '-')) {
      model = slug.substring(pattern.length + 1);
      break;
    }
  }
  
  // Convert slug to readable name
  return model
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Parse sitemap XML to extract phone URLs
function parseSitemapXml(xmlContent) {
  const phones = [];
  
  // Extract all <url> blocks first
  const urlBlocks = xmlContent.match(/<url>[\s\S]*?<\/url>/gi) || [];
  
  for (const block of urlBlocks) {
    // Extract individual elements from each block
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/i);
    const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/i);
    const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/i);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/i);
    
    if (!locMatch) continue;
    
    const url = locMatch[1];
    const priority = priorityMatch ? parseFloat(priorityMatch[1]) : 0.5;
    const changefreq = changefreqMatch ? changefreqMatch[1] : 'daily';
    const lastmod = lastmodMatch ? lastmodMatch[1] : null;
    
    // Extract slug from URL
    // Format: https://www.91mobiles.com/{slug}-price-in-india
    const slugMatch = url.match(/91mobiles\.com\/([^\/]+)-price-in-india/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const brand = extractBrand(slug);
      const model = extractModel(slug, brand);
      
      phones.push({
        url,
        slug,
        brand,
        model,
        priority,
        changefreq,
        lastmod,
      });
    }
  }
  
  return phones;
}

// Analyze and categorize phones
function analyzePhones(phones) {
  const brands = {};
  const segments = {
    flagship: [],
    'mid-range': [],
    budget: [],
  };
  
  for (const phone of phones) {
    // Group by brand
    if (!brands[phone.brand]) {
      brands[phone.brand] = [];
    }
    brands[phone.brand].push(phone);
    
    // Categorize by priority (rough segment estimation)
    if (phone.priority >= 0.9) {
      segments.flagship.push(phone);
    } else if (phone.priority >= 0.8) {
      segments['mid-range'].push(phone);
    } else {
      segments.budget.push(phone);
    }
  }
  
  return { brands, segments };
}

// Generate summary report
function generateReport(phones, brands, segments) {
  const report = [];
  
  report.push('='.repeat(70));
  report.push('91MOBILES SITEMAP ANALYSIS REPORT');
  report.push('='.repeat(70));
  report.push('');
  
  // Overall stats
  report.push('OVERALL STATISTICS');
  report.push('-'.repeat(40));
  report.push(`Total phones: ${phones.length}`);
  report.push(`Total brands: ${Object.keys(brands).length}`);
  report.push('');
  
  // Segment breakdown
  report.push('SEGMENT BREAKDOWN (by priority)');
  report.push('-'.repeat(40));
  report.push(`Flagship (90%+ priority): ${segments.flagship.length}`);
  report.push(`Mid-range (80-89% priority): ${segments['mid-range'].length}`);
  report.push(`Budget (<80% priority): ${segments.budget.length}`);
  report.push('');
  
  // Brand breakdown
  report.push('BRAND BREAKDOWN');
  report.push('-'.repeat(40));
  const sortedBrands = Object.entries(brands)
    .sort((a, b) => b[1].length - a[1].length);
  
  for (const [brand, brandPhones] of sortedBrands) {
    report.push(`${brand}: ${brandPhones.length} phones`);
  }
  report.push('');
  
  // Top 10 brands
  report.push('TOP 10 BRANDS');
  report.push('-'.repeat(40));
  for (let i = 0; i < Math.min(10, sortedBrands.length); i++) {
    const [brand, brandPhones] = sortedBrands[i];
    const percentage = ((brandPhones.length / phones.length) * 100).toFixed(1);
    report.push(`${i + 1}. ${brand}: ${brandPhones.length} phones (${percentage}%)`);
  }
  report.push('');
  
  // Sample phones per brand (top 5 brands, 3 phones each)
  report.push('SAMPLE PHONES PER BRAND');
  report.push('-'.repeat(40));
  for (let i = 0; i < Math.min(5, sortedBrands.length); i++) {
    const [brand, brandPhones] = sortedBrands[i];
    report.push(`\n${brand}:`);
    for (let j = 0; j < Math.min(3, brandPhones.length); j++) {
      const phone = brandPhones[j];
      report.push(`  - ${phone.model} (${phone.slug})`);
    }
  }
  
  return report.join('\n');
}

// Main function
async function main() {
  console.log('Fetching 91mobiles sitemap using Firecrawl...');
  console.log(`Firecrawl API Key: ${process.env.FIRECRAWL_API_KEY ? 'Configured' : 'MISSING'}`);
  
  try {
    // Fetch the sitemap using Firecrawl
    const result = await firecrawl.scrape('https://www.91mobiles.com/sitemap/mobilelist_forgoogle.xml', {
      formats: ['rawHtml'],
    });
    
    if (!result || !result.rawHtml) {
      throw new Error('Failed to fetch sitemap: No content returned');
    }
    
    const xmlContent = result.rawHtml;
    console.log(`Fetched sitemap: ${xmlContent.length} characters`);
    
    // Parse the sitemap
    const phones = parseSitemapXml(xmlContent);
    console.log(`Parsed ${phones.length} phones from sitemap`);
    
    // Analyze phones
    const { brands, segments } = analyzePhones(phones);
    
    // Generate report
    const report = generateReport(phones, brands, segments);
    console.log('\n' + report);
    
    // Save results
    const outputDir = path.join(process.cwd(), 'scripts', 'data-pipeline', 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save full phone list
    const phonesFile = path.join(outputDir, 'sitemap-phones.json');
    fs.writeFileSync(phonesFile, JSON.stringify(phones, null, 2));
    console.log(`\nSaved phone list to: ${phonesFile}`);
    
    // Save brands summary
    const brandsFile = path.join(outputDir, 'sitemap-brands.json');
    const brandsSummary = Object.entries(brands).map(([brand, brandPhones]) => ({
      brand,
      count: brandPhones.length,
      phones: brandPhones.map(p => ({ slug: p.slug, model: p.model, priority: p.priority })),
    })).sort((a, b) => b.count - a.count);
    fs.writeFileSync(brandsFile, JSON.stringify(brandsSummary, null, 2));
    console.log(`Saved brands summary to: ${brandsFile}`);
    
    // Save report
    const reportFile = path.join(outputDir, 'sitemap-report.txt');
    fs.writeFileSync(reportFile, report);
    console.log(`Saved report to: ${reportFile}`);
    
    return { phones, brands, segments };
    
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Run
main().catch(console.error);
