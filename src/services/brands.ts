import { supabase } from '@/lib/supabase';
import type { Brand } from '@/lib/database.types';

export async function getAllBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }

  return data;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching brand:', error);
    return null;
  }

  return data;
}

export async function getBrandById(id: string): Promise<Brand | null> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching brand by id:', error);
    return null;
  }

  return data;
}

export async function getPopularBrands(limit: number = 10): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('phone_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching popular brands:', error);
    return [];
  }

  return data;
}
