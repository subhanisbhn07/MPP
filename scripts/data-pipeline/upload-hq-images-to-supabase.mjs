import { createClient } from '@supabase/supabase-js';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Initialize Supabase client with service role key for storage access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Supabase credentials not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Storage bucket name
const BUCKET_NAME = 'phone-images';

// Download image from URL and return as buffer
async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        downloadImage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Upload image to Supabase Storage
async function uploadToSupabase(buffer, filename) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, buffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    throw error;
  }
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);
  
  return urlData.publicUrl;
}

// Create storage bucket if it doesn't exist
async function ensureBucketExists() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`Creating storage bucket: ${BUCKET_NAME}`);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880 // 5MB
    });
    if (error && !error.message.includes('already exists')) {
      throw error;
    }
  }
  console.log(`Storage bucket ready: ${BUCKET_NAME}`);
}

// High-res image URL patterns for each phone
// Pattern: https://fdn2.gsmarena.com/vv/pics/{brand}/{slug}-1.jpg
const phoneImageMappings = [
  { slug: 'oppo-find-x7-ultra', brand: 'oppo', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x7-ultra-1.jpg' },
  { slug: 'xiaomi-14', brand: 'xiaomi', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg' },
  { slug: 'samsung-galaxy-a55', brand: 'samsung', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-1.jpg' },
  { slug: 'apple-iphone-15', brand: 'apple', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg' },
  { slug: 'xiaomi-14-ultra', brand: 'xiaomi', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg' },
  { slug: 'samsung-galaxy-z-fold6', brand: 'samsung', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-z-fold6-1.jpg' },
  { slug: 'nothing-phone-2', brand: 'nothing', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2a-1.jpg' }, // Note: uses 2a pattern
  { slug: 'vivo-x100-pro', brand: 'vivo', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x100-pro-1.jpg' },
  { slug: 'samsung-galaxy-s24-ultra', brand: 'samsung', hqUrl: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg' }, // No HQ available
  { slug: 'oneplus-nord-4', brand: 'oneplus', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-nord4-1.jpg' }, // Note: no hyphen
  { slug: 'xiaomi-redmi-note-13-pro', brand: 'xiaomi', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-1.jpg' },
  { slug: 'oneplus-12', brand: 'oneplus', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg' },
  { slug: 'apple-iphone-16-pro-max', brand: 'apple', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg' },
  { slug: 'google-pixel-8-pro', brand: 'google', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg' },
  { slug: 'asus-rog-phone-8-pro', brand: 'asus', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-1.jpg' },
  { slug: 'google-pixel-9-pro', brand: 'google', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-1.jpg' },
  { slug: 'sony-xperia-1-vi', brand: 'sony', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-vi-1.jpg' },
  { slug: 'apple-iphone-15-pro', brand: 'apple', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg' },
  { slug: 'samsung-galaxy-s24', brand: 'samsung', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-5g-sm-s921-1.jpg' },
  { slug: 'oneplus-12r', brand: 'oneplus', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12r-1.jpg' },
  { slug: 'motorola-edge-50-ultra', brand: 'motorola', hqUrl: 'https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-ultra.jpg' }, // No HQ available
  { slug: 'samsung-galaxy-s23-fe', brand: 'samsung', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-fe-1.jpg' },
  { slug: 'apple-iphone-15-pro-max', brand: 'apple', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg' },
  { slug: 'google-pixel-8', brand: 'google', hqUrl: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg' },
];

async function main() {
  console.log('='.repeat(60));
  console.log('Upload HQ Phone Images to Supabase Storage');
  console.log('='.repeat(60));
  
  // Ensure bucket exists
  await ensureBucketExists();
  
  let success = 0;
  let failed = 0;
  
  for (const phone of phoneImageMappings) {
    console.log(`\n[${success + failed + 1}/${phoneImageMappings.length}] Processing: ${phone.slug}`);
    
    try {
      // Download image
      console.log(`  Downloading from: ${phone.hqUrl}`);
      const imageBuffer = await downloadImage(phone.hqUrl);
      console.log(`  Downloaded: ${imageBuffer.length} bytes`);
      
      // Upload to Supabase Storage
      const filename = `${phone.slug}.jpg`;
      console.log(`  Uploading to Supabase: ${filename}`);
      const publicUrl = await uploadToSupabase(imageBuffer, filename);
      console.log(`  Public URL: ${publicUrl}`);
      
      // Update database with new URL
      const { error: updateError } = await supabase
        .from('phones')
        .update({ image_url: publicUrl, images: [publicUrl] })
        .eq('slug', phone.slug);
      
      if (updateError) {
        console.log(`  [WARN] Database update failed: ${updateError.message}`);
      } else {
        console.log(`  [OK] Database updated`);
      }
      
      success++;
    } catch (error) {
      console.log(`  [ERROR] ${error.message}`);
      failed++;
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${phoneImageMappings.length}`);
}

main().catch(console.error);
