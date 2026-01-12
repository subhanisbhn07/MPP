import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Supabase credentials not set');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract phone name from URL
function extractNameFromUrl(url) {
  const urlMatch = url.match(/gsmarena\.com\/([^-]+(?:-[^-]+)*)-\d+\.php/);
  if (urlMatch) {
    const slug = urlMatch[1];
    return slug
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return null;
}

// Insert data into Supabase
async function insertToSupabase(phonesData) {
  console.log(`\nInserting ${phonesData.length} phones into Supabase...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const phone of phonesData) {
    // Get phone name from URL if not present
    const phoneName = phone.name || extractNameFromUrl(phone.source_url);
    if (!phoneName) {
      console.error(`  Skipping phone - no name found for ${phone.source_url}`);
      errorCount++;
      continue;
    }
    
    const slug = generateSlug(phoneName);
    const model = phoneName.replace(new RegExp(`^${phone.brand}\\s*`, 'i'), '').trim();
    
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
        errorCount++;
        continue;
      }
      
      // Get the primary image URL - prefer image_url field set by scraper, then first image
      let imageUrl = phone.image_url || (phone.images && phone.images.length > 0 ? phone.images[0] : null);
      
      // Insert phone - first check if it exists
      const phoneRecord = {
        brand_id: brandData.id,
        model: model,
        slug: slug,
        image_url: imageUrl,
        images: phone.images || [],
        announced_date: phone.announced || null,
        market_status: phone.status || 'Available',
      };
      
      // Check if phone already exists
      const { data: existingPhone, error: checkError } = await supabase
        .from('phones')
        .select('id')
        .eq('slug', slug)
        .single();
      
      let phoneData;
      let phoneError;
      
      if (existingPhone) {
        // Update existing phone
        const { data, error } = await supabase
          .from('phones')
          .update(phoneRecord)
          .eq('id', existingPhone.id)
          .select()
          .single();
        phoneData = data;
        phoneError = error;
      } else {
        // Insert new phone
        const { data, error } = await supabase
          .from('phones')
          .insert(phoneRecord)
          .select()
          .single();
        phoneData = data;
        phoneError = error;
      }
      
      if (phoneError) {
        console.error(`  Error upserting phone ${phoneName}:`, phoneError.message);
        errorCount++;
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
        wireless_positioning: {
          gps: phone.positioning,
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
      
      // Check if specs already exist for this phone
      const { data: existingSpecs } = await supabase
        .from('phone_specs')
        .select('id')
        .eq('phone_id', phoneData.id)
        .single();
      
      let specsError;
      if (existingSpecs) {
        // Update existing specs
        const { error } = await supabase
          .from('phone_specs')
          .update(specsRecord)
          .eq('id', existingSpecs.id);
        specsError = error;
      } else {
        // Insert new specs
        const { error } = await supabase
          .from('phone_specs')
          .insert(specsRecord);
        specsError = error;
      }
      
      if (specsError) {
        console.error(`  Error upserting specs for ${phoneName}:`, specsError.message);
        errorCount++;
      } else {
        const action = existingPhone ? 'Updated' : 'Inserted';
        console.log(`  ${action}: ${phoneName} (${phone.brand})`);
        successCount++;
      }
    } catch (error) {
      console.error(`  Error processing ${phoneName}:`, error.message);
      errorCount++;
    }
  }
  
  return { successCount, errorCount };
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('Supabase Data Insertion');
  console.log('='.repeat(60));
  
  // Read the scraped data
  const dataFile = path.join(process.cwd(), 'scripts', 'data-pipeline', 'output', 'phones-latest.json');
  
  if (!fs.existsSync(dataFile)) {
    console.error(`ERROR: Data file not found: ${dataFile}`);
    console.log('Please run the scraper first: node scripts/data-pipeline/scrape-gsmarena.mjs');
    process.exit(1);
  }
  
  const phonesData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  console.log(`\nLoaded ${phonesData.length} phones from ${dataFile}`);
  
  // Insert into Supabase
  const { successCount, errorCount } = await insertToSupabase(phonesData);
  
  console.log('\n' + '='.repeat(60));
  console.log('INSERTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nSuccessfully inserted: ${successCount} phones`);
  console.log(`Errors: ${errorCount}`);
  
  // Verify data in Supabase
  console.log('\nVerifying data in Supabase...');
  
  const { data: brands, error: brandsError } = await supabase
    .from('brands')
    .select('id, name, slug');
  
  if (brandsError) {
    console.error('Error fetching brands:', brandsError.message);
  } else {
    console.log(`\nBrands in database: ${brands.length}`);
    brands.forEach(b => console.log(`  - ${b.name} (${b.slug})`));
  }
  
  const { data: phones, error: phonesError } = await supabase
    .from('phones')
    .select('id, model, slug, image_url')
    .limit(10);
  
  if (phonesError) {
    console.error('Error fetching phones:', phonesError.message);
  } else {
    console.log(`\nSample phones in database (first 10):`);
    phones.forEach(p => console.log(`  - ${p.model} (${p.slug})`));
  }
}

main().catch(console.error);
