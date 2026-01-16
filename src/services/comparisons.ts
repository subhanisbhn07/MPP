import { supabase } from '@/lib/supabase';
import type { Comparison, PhoneWithSpecs } from '@/lib/database.types';

export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching comparison:', error);
    return null;
  }

  return data;
}

export async function getFeaturedComparisons(limit: number = 10): Promise<Comparison[]> {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('view_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured comparisons:', error);
    return [];
  }

  return data;
}

export async function getPopularComparisons(limit: number = 20): Promise<Comparison[]> {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*')
    .eq('is_published', true)
    .order('view_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching popular comparisons:', error);
    return [];
  }

  return data;
}

export async function incrementComparisonViewCount(comparisonId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_comparison_view', {
    comparison_id: comparisonId,
  });

  if (error) {
    console.error('Error incrementing comparison view count:', error);
  }
}

export async function createOrGetComparison(
  phoneIds: string[],
  slug: string
): Promise<Comparison | null> {
  const existing = await getComparisonBySlug(slug);
  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from('comparisons')
    .insert({
      slug,
      phone_ids: phoneIds,
      is_published: true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating comparison:', error);
    return null;
  }

  return data;
}
