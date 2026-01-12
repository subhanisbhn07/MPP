#!/usr/bin/env node

/**
 * Apply Rating System Schema to Supabase
 * 
 * This script applies the dynamic rating system schema to the Supabase database.
 * It creates tables, functions, and materialized views for calculating phone ratings.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applySchema() {
  console.log('Applying rating system schema to Supabase...\n');
  
  // Read the SQL file
  const sqlPath = join(dirname(fileURLToPath(import.meta.url)), 'rating-system-schema.sql');
  const sqlContent = readFileSync(sqlPath, 'utf-8');
  
  // Split SQL into individual statements (handling multi-line statements)
  // We need to be careful with $$ delimited functions
  const statements = [];
  let currentStatement = '';
  let inDollarQuote = false;
  
  const lines = sqlContent.split('\n');
  for (const line of lines) {
    // Skip comment-only lines at the start of statements
    if (currentStatement.trim() === '' && line.trim().startsWith('--')) {
      continue;
    }
    
    currentStatement += line + '\n';
    
    // Track $$ delimited blocks
    const dollarMatches = line.match(/\$\$/g);
    if (dollarMatches) {
      for (const match of dollarMatches) {
        inDollarQuote = !inDollarQuote;
      }
    }
    
    // Check if statement is complete (ends with ; and not in $$ block)
    if (!inDollarQuote && line.trim().endsWith(';')) {
      const trimmed = currentStatement.trim();
      if (trimmed && !trimmed.startsWith('--')) {
        statements.push(trimmed);
      }
      currentStatement = '';
    }
  }
  
  console.log(`Found ${statements.length} SQL statements to execute.\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    // Extract a description from the statement
    let description = statement.substring(0, 80).replace(/\n/g, ' ');
    if (statement.includes('CREATE TABLE')) {
      const match = statement.match(/CREATE TABLE[^(]+(\w+)/i);
      description = `CREATE TABLE ${match ? match[1] : '...'}`;
    } else if (statement.includes('CREATE OR REPLACE FUNCTION')) {
      const match = statement.match(/CREATE OR REPLACE FUNCTION\s+(\w+)/i);
      description = `CREATE FUNCTION ${match ? match[1] : '...'}`;
    } else if (statement.includes('CREATE MATERIALIZED VIEW')) {
      const match = statement.match(/CREATE MATERIALIZED VIEW\s+(\w+)/i);
      description = `CREATE MATERIALIZED VIEW ${match ? match[1] : '...'}`;
    } else if (statement.includes('INSERT INTO')) {
      const match = statement.match(/INSERT INTO\s+(\w+)/i);
      description = `INSERT INTO ${match ? match[1] : '...'}`;
    } else if (statement.includes('CREATE INDEX')) {
      const match = statement.match(/CREATE INDEX[^O]+ON\s+(\w+)/i);
      description = `CREATE INDEX on ${match ? match[1] : '...'}`;
    } else if (statement.includes('CREATE POLICY')) {
      const match = statement.match(/CREATE POLICY\s+"([^"]+)"/i);
      description = `CREATE POLICY "${match ? match[1] : '...'}"`;
    } else if (statement.includes('ALTER TABLE')) {
      const match = statement.match(/ALTER TABLE\s+(\w+)/i);
      description = `ALTER TABLE ${match ? match[1] : '...'}`;
    } else if (statement.includes('GRANT')) {
      description = 'GRANT permissions';
    } else if (statement.includes('DROP')) {
      const match = statement.match(/DROP\s+\w+\s+\w+\s+(\w+)/i);
      description = `DROP ${match ? match[1] : '...'}`;
    }
    
    process.stdout.write(`[${i + 1}/${statements.length}] ${description}... `);
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        // Try direct query if RPC doesn't exist
        const { error: directError } = await supabase.from('_exec').select().limit(0);
        
        // Fall back to using the REST API with raw SQL
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ sql: statement })
        });
        
        if (!response.ok) {
          throw new Error(error.message || 'Failed to execute SQL');
        }
      }
      
      console.log('OK');
      successCount++;
    } catch (err) {
      // Some errors are expected (e.g., "already exists")
      const errorMsg = err.message || String(err);
      if (errorMsg.includes('already exists') || 
          errorMsg.includes('duplicate key') ||
          errorMsg.includes('does not exist')) {
        console.log('SKIPPED (already exists or not applicable)');
        successCount++;
      } else {
        console.log(`ERROR: ${errorMsg.substring(0, 100)}`);
        errorCount++;
      }
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Schema application complete!`);
  console.log(`Success: ${successCount}, Errors: ${errorCount}`);
  console.log(`========================================\n`);
  
  // Test the rating calculation
  console.log('Testing rating calculation...\n');
  
  try {
    const { data: phones, error } = await supabase
      .from('phones')
      .select('id, model')
      .limit(5);
    
    if (error) {
      console.log('Could not fetch phones for testing:', error.message);
    } else if (phones && phones.length > 0) {
      console.log(`Found ${phones.length} phones. Testing rating calculation...`);
      
      // Try to get ratings from materialized view
      const { data: ratings, error: ratingsError } = await supabase
        .from('phone_ratings_mv')
        .select('*')
        .limit(5);
      
      if (ratingsError) {
        console.log('Materialized view not ready yet:', ratingsError.message);
        console.log('You may need to run: SELECT refresh_phone_ratings();');
      } else if (ratings) {
        console.log('\nSample ratings from materialized view:');
        console.log('----------------------------------------');
        for (const r of ratings) {
          console.log(`${r.brand} ${r.model}: ${r.overall_rating?.toFixed(1)}/100 (${r.price_segment})`);
        }
      }
    }
  } catch (err) {
    console.log('Testing error:', err.message);
  }
}

// Run the schema application
applySchema().catch(console.error);
