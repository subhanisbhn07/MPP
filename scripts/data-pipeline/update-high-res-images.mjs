import { createClient } from '@supabase/supabase-js';
import https from 'https';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Supabase credentials not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Brand folder mapping for GSMArena pics folder
const brandFolderMap = {
  'Samsung': 'samsung',
  'Apple': 'apple',
  'Google': 'google',
  'OnePlus': 'oneplus',
  'Xiaomi': 'xiaomi',
  'Nothing': 'nothing',
  'Motorola': 'motorola',
  'Oppo': 'oppo',
  'Vivo': 'vivo',
  'Asus': 'asus',
  'Sony': 'sony',
  'Huawei': 'huawei',
  'Realme': 'realme',
};

// Check if a URL returns 200
async function urlExists(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Convert phone slug to high-res image URL
function getHighResImageUrl(slug, brandName) {
  const brandFolder = brandFolderMap[brandName] || brandName.toLowerCase();
  // Pattern: https://fdn2.gsmarena.com/vv/pics/{brand}/{slug}-1.jpg
  return `https://fdn2.gsmarena.com/vv/pics/${brandFolder}/${slug}-1.jpg`;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Updating phones with HIGH-RESOLUTION images');
  console.log('='.repeat(60));
  
  // Fetch all phones with their brands
  const { data: phones, error } = await supabase
    .from('phones')
    .select('id, model, slug, image_url, brands(name)')
    .order('id');
  
  if (error) {
    console.error('Error fetching phones:', error);
    return;
  }
  
  console.log(`\nFound ${phones.length} phones to update\n`);
  
  let updated = 0;
  let failed = 0;
  
  for (const phone of phones) {
    const brandName = phone.brands?.name || 'Unknown';
    const currentUrl = phone.image_url || '';
    
    // Skip if already using high-res pics folder
    if (currentUrl.includes('/pics/')) {
      console.log(`[SKIP] ${brandName} ${phone.model} - already using high-res image`);
      continue;
    }
    
    // Generate high-res URL
    const highResUrl = getHighResImageUrl(phone.slug, brandName);
    
    // Verify the URL exists
    const exists = await urlExists(highResUrl);
    
    if (exists) {
      // Update the database
      const { error: updateError } = await supabase
        .from('phones')
        .update({ 
          image_url: highResUrl,
          images: [highResUrl]
        })
        .eq('id', phone.id);
      
      if (updateError) {
        console.log(`[ERROR] ${brandName} ${phone.model}: ${updateError.message}`);
        failed++;
      } else {
        console.log(`[OK] ${brandName} ${phone.model}`);
        console.log(`     ${highResUrl}`);
        updated++;
      }
    } else {
      console.log(`[FAIL] ${brandName} ${phone.model} - high-res image not found`);
      console.log(`       Tried: ${highResUrl}`);
      failed++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Updated: ${updated} phones`);
  console.log(`Failed: ${failed} phones`);
  console.log(`Total: ${phones.length} phones`);
}

main().catch(console.error);
