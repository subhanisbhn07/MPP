import { MeiliSearch } from 'meilisearch';

// Meilisearch client configuration
// For self-hosted: Use your own server URL and master key
// Default: localhost:7700 for local development
const MEILISEARCH_HOST = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

// Create Meilisearch client
export const meilisearchClient = new MeiliSearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILISEARCH_API_KEY,
});

// Index name for phones
export const PHONES_INDEX = 'phones';

// Phone document type for Meilisearch
export interface MeilisearchPhone {
  id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  rating: number;
  ratingLabel: string;
  displaySize: string;
  cameraMP: string;
  batteryMAh: number;
  ram: string;
  storageType: string;
  refreshRate: string;
  chipset: string;
  releaseDate: string;
  // Searchable text fields
  searchText: string;
}

// Initialize the phones index with proper settings
export async function initializePhonesIndex() {
  try {
    const index = meilisearchClient.index(PHONES_INDEX);
    
    // Update searchable attributes
    await index.updateSearchableAttributes([
      'brand',
      'model',
      'chipset',
      'searchText',
    ]);
    
    // Update filterable attributes for faceted search
    await index.updateFilterableAttributes([
      'brand',
      'price',
      'rating',
      'batteryMAh',
      'refreshRate',
    ]);
    
    // Update sortable attributes
    await index.updateSortableAttributes([
      'price',
      'rating',
      'releaseDate',
    ]);
    
    // Update ranking rules for relevance
    await index.updateRankingRules([
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
    ]);
    
    console.log('Meilisearch phones index initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Meilisearch index:', error);
    return false;
  }
}

// Search phones with optional filters
export async function searchPhones(
  query: string,
  options?: {
    filters?: string;
    sort?: string[];
    limit?: number;
    offset?: number;
  }
) {
  try {
    const index = meilisearchClient.index(PHONES_INDEX);
    
    const searchParams: any = {
      limit: options?.limit || 20,
      offset: options?.offset || 0,
    };
    
    if (options?.filters) {
      searchParams.filter = options.filters;
    }
    
    if (options?.sort) {
      searchParams.sort = options.sort;
    }
    
    const results = await index.search(query, searchParams);
    
    return {
      hits: results.hits as MeilisearchPhone[],
      totalHits: results.estimatedTotalHits || 0,
      processingTimeMs: results.processingTimeMs,
    };
  } catch (error) {
    console.error('Meilisearch search error:', error);
    return {
      hits: [],
      totalHits: 0,
      processingTimeMs: 0,
    };
  }
}

// Index a batch of phones
export async function indexPhones(phones: MeilisearchPhone[]) {
  try {
    const index = meilisearchClient.index(PHONES_INDEX);
    const task = await index.addDocuments(phones);
    console.log(`Indexing task created: ${task.taskUid}`);
    return task;
  } catch (error) {
    console.error('Failed to index phones:', error);
    throw error;
  }
}

// Delete all documents from the index
export async function clearPhonesIndex() {
  try {
    const index = meilisearchClient.index(PHONES_INDEX);
    const task = await index.deleteAllDocuments();
    console.log(`Clear index task created: ${task.taskUid}`);
    return task;
  } catch (error) {
    console.error('Failed to clear phones index:', error);
    throw error;
  }
}

// Check if Meilisearch is healthy
export async function checkMeilisearchHealth() {
  try {
    const health = await meilisearchClient.health();
    return health.status === 'available';
  } catch (error) {
    console.error('Meilisearch health check failed:', error);
    return false;
  }
}
