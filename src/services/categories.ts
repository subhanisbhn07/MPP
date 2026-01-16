import { supabase } from '@/lib/supabase';
import type { Category, PhoneWithBrand } from '@/lib/database.types';

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

export async function getPhonesByCategory(categorySlug: string, limit: number = 50): Promise<PhoneWithBrand[]> {
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return [];
  }

  const { data, error } = await supabase
    .from('phone_categories')
    .select(`
      phones (
        *,
        brands (*)
      )
    `)
    .eq('category_id', category.id)
    .limit(limit);

  if (error) {
    console.error('Error fetching phones by category:', error);
    return [];
  }

  return data.map((item) => item.phones).filter(Boolean) as PhoneWithBrand[];
}
