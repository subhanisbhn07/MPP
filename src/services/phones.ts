import { supabase } from '@/lib/supabase';
import type { PhoneWithBrand, PhoneWithSpecs, Brand } from '@/lib/database.types';

export async function getAllPhones(): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching phones:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getPhoneBySlug(brandSlug: string, modelSlug: string): Promise<PhoneWithSpecs | null> {
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', brandSlug)
    .single();

  if (brandError || !brand) {
    console.error('Error fetching brand:', brandError);
    return null;
  }

  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*),
      phone_specs (*)
    `)
    .eq('brand_id', brand.id)
    .eq('slug', modelSlug)
    .single();

  if (error) {
    console.error('Error fetching phone:', error);
    return null;
  }

  return data as PhoneWithSpecs;
}

export async function getPhoneById(id: string): Promise<PhoneWithSpecs | null> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*),
      phone_specs (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching phone by id:', error);
    return null;
  }

  return data as PhoneWithSpecs;
}

export async function getFeaturedPhones(limit: number = 10): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .eq('is_featured', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching featured phones:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getTrendingPhones(limit: number = 10): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .eq('is_trending', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching trending phones:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getPhonesByBrand(brandSlug: string): Promise<PhoneWithBrand[]> {
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', brandSlug)
    .single();

  if (brandError || !brand) {
    console.error('Error fetching brand:', brandError);
    return [];
  }

  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .eq('brand_id', brand.id)
    .order('announced_date', { ascending: false });

  if (error) {
    console.error('Error fetching phones by brand:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function searchPhones(query: string, limit: number = 20): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .ilike('model', `%${query}%`)
    .limit(limit);

  if (error) {
    console.error('Error searching phones:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getPhonesByPriceRange(
  minPrice: number,
  maxPrice: number,
  limit: number = 50
): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .gte('price_usd', minPrice)
    .lte('price_usd', maxPrice)
    .order('price_usd', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching phones by price range:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getRecentPhones(limit: number = 20): Promise<PhoneWithBrand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*)
    `)
    .order('announced_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent phones:', error);
    return [];
  }

  return data as PhoneWithBrand[];
}

export async function getPhonesForComparison(phoneIds: string[]): Promise<PhoneWithSpecs[]> {
  const { data, error } = await supabase
    .from('phones')
    .select(`
      *,
      brands (*),
      phone_specs (*)
    `)
    .in('id', phoneIds);

  if (error) {
    console.error('Error fetching phones for comparison:', error);
    return [];
  }

  return data as PhoneWithSpecs[];
}
