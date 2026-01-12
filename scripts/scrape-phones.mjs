import Firecrawl from '@mendable/firecrawl-js';

// Initialize Firecrawl with API key
const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// Phone URLs to scrape from GSMArena
const phoneUrls = [
  'https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php',
  'https://www.gsmarena.com/apple_iphone_15_pro_max-12548.php',
  'https://www.gsmarena.com/google_pixel_8_pro-12456.php'
];

async function scrapePhone(url) {
  try {
    console.log(`Scraping: ${url}`);
    // Use the correct method name
    const result = await app.scrapeUrl(url, {
      formats: ['markdown'],
    });
    return result;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    // Try alternative method
    try {
      const result = await app.scrape(url);
      return result;
    } catch (e) {
      console.error(`Alternative method also failed:`, e.message);
      return null;
    }
  }
}

async function main() {
  console.log('Starting phone scraping...\n');
  console.log('Available methods on app:', Object.keys(app));
  console.log('App prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(app)));
  
  for (const url of phoneUrls) {
    const result = await scrapePhone(url);
    if (result) {
      console.log('\n--- SCRAPED DATA ---');
      console.log('URL:', url);
      console.log('Result keys:', Object.keys(result));
      console.log('Title:', result.metadata?.title || result.title || 'N/A');
      console.log('Description:', result.metadata?.description || 'N/A');
      console.log('\nMarkdown Preview (first 3000 chars):');
      console.log(result.markdown?.substring(0, 3000) || result.content?.substring(0, 3000) || 'No content');
      console.log('\n' + '='.repeat(80) + '\n');
    }
  }
}

main().catch(console.error);
