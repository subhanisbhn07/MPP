import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Supabase credentials not set');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('Adding unique constraint on phones.slug column...\n');
  
  // First, check if the constraint already exists
  const { data: constraints, error: checkError } = await supabase
    .from('phones')
    .select('slug')
    .limit(1);
  
  if (checkError) {
    console.error('Error checking phones table:', checkError.message);
    process.exit(1);
  }
  
  console.log('Phones table exists. Checking current phone count...');
  
  // Get current phone count
  const { count, error: countError } = await supabase
    .from('phones')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error counting phones:', countError.message);
  } else {
    console.log(`Current phones in database: ${count}`);
  }
  
  // Since we can't run raw SQL via the client, we need to use a different approach
  // We'll delete all phones first (since there are none from our scraper yet), 
  // then use INSERT instead of UPSERT for the initial load
  
  console.log('\nNote: The unique constraint needs to be added via the Supabase SQL Editor.');
  console.log('Please run this SQL in the Supabase dashboard:');
  console.log('\n  ALTER TABLE phones ADD CONSTRAINT phones_slug_unique UNIQUE(slug);');
  console.log('\nAlternatively, we can use INSERT instead of UPSERT for the initial data load.');
  
  // Check if there are any phones with duplicate slugs that would prevent adding the constraint
  const { data: phones, error: phonesError } = await supabase
    .from('phones')
    .select('slug');
  
  if (phonesError) {
    console.error('Error fetching phones:', phonesError.message);
  } else {
    const slugCounts = {};
    phones.forEach(p => {
      slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
    });
    
    const duplicates = Object.entries(slugCounts).filter(([_, count]) => count > 1);
    if (duplicates.length > 0) {
      console.log('\nWARNING: Found duplicate slugs that would prevent adding unique constraint:');
      duplicates.forEach(([slug, count]) => console.log(`  - ${slug}: ${count} occurrences`));
    } else {
      console.log('\nNo duplicate slugs found. Safe to add unique constraint.');
    }
  }
}

main().catch(console.error);
