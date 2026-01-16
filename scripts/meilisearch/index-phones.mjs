#!/usr/bin/env node

/**
 * Script to index phone data from Supabase into Meilisearch
 * 
 * Usage:
 *   node scripts/meilisearch/index-phones.mjs
 * 
 * Environment variables required:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *   - NEXT_PUBLIC_MEILISEARCH_HOST (default: http://localhost:7700)
 *   - MEILISEARCH_API_KEY (master key for indexing)
 */

import { createClient } from '@supabase/supabase-js';
import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

const PHONES_INDEX = 'phones';

async function main() {
  console.log('Starting phone indexing to Meilisearch...');
  
  // Validate environment
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: Missing Supabase credentials');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }
  
  // Initialize clients
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const meilisearch = new MeiliSearch({
    host: MEILISEARCH_HOST,
    apiKey: MEILISEARCH_API_KEY,
  });
  
  // Check Meilisearch health
  try {
    const health = await meilisearch.health();
    console.log(`Meilisearch status: ${health.status}`);
  } catch (error) {
    console.error('Error: Cannot connect to Meilisearch');
    console.error(`Make sure Meilisearch is running at ${MEILISEARCH_HOST}`);
    console.error('Run: docker-compose -f docker/meilisearch/docker-compose.yml up -d');
    process.exit(1);
  }
  
  // Fetch phones from Supabase
  console.log('Fetching phones from Supabase...');
  const { data: phones, error } = await supabase
    .from('phone_specs')
    .select('*');
  
  if (error) {
    console.error('Error fetching phones from Supabase:', error.message);
    process.exit(1);
  }
  
  if (!phones || phones.length === 0) {
    console.log('No phones found in Supabase');
    process.exit(0);
  }
  
  console.log(`Found ${phones.length} phones in Supabase`);
  
  // Transform phones for Meilisearch
  const meilisearchPhones = phones.map(phone => {
    // Extract key specs from the specs JSON
    const specs = phone.specs || {};
    const display = specs.display || {};
    const camera = specs.main_camera || {};
    const battery = specs.battery || {};
    const memory = specs.memory || {};
    const platform = specs.platform || {};
    
    return {
      id: phone.id,
      brand: phone.brand || '',
      model: phone.model || '',
      price: phone.price || 0,
      image: phone.image_url || '',
      rating: phone.rating_score || 0,
      ratingLabel: getRatingLabel(phone.rating_score || 0),
      displaySize: display.size || '',
      cameraMP: camera.main_sensor || '',
      batteryMAh: parseInt(battery.capacity) || 0,
      ram: memory.ram || '',
      storageType: memory.storage_type || '',
      refreshRate: display.refresh_rate || '',
      chipset: platform.chipset || '',
      releaseDate: phone.release_date || '',
      // Searchable text combining multiple fields
      searchText: [
        phone.brand,
        phone.model,
        platform.chipset,
        display.panel_type,
        camera.main_sensor,
      ].filter(Boolean).join(' '),
    };
  });
  
  // Initialize index settings
  console.log('Configuring Meilisearch index...');
  const index = meilisearch.index(PHONES_INDEX);
  
  await index.updateSettings({
    searchableAttributes: [
      'brand',
      'model',
      'chipset',
      'searchText',
    ],
    filterableAttributes: [
      'brand',
      'price',
      'rating',
      'batteryMAh',
      'refreshRate',
    ],
    sortableAttributes: [
      'price',
      'rating',
      'releaseDate',
    ],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
    ],
  });
  
  // Index phones
  console.log('Indexing phones...');
  const task = await index.addDocuments(meilisearchPhones);
  console.log(`Indexing task created: ${task.taskUid}`);
  
  // Wait for indexing to complete
  console.log('Waiting for indexing to complete...');
  await meilisearch.waitForTask(task.taskUid);
  
  // Verify indexing
  const stats = await index.getStats();
  console.log(`Indexing complete! ${stats.numberOfDocuments} phones indexed.`);
  
  // Test search
  console.log('\nTesting search...');
  const testResults = await index.search('iPhone');
  console.log(`Search for "iPhone" returned ${testResults.hits.length} results in ${testResults.processingTimeMs}ms`);
  
  console.log('\nDone! Meilisearch is ready for phone search.');
}

function getRatingLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Average';
  if (score >= 50) return 'Below Average';
  return 'Poor';
}

main().catch(console.error);
