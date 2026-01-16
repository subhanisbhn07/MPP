import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (categoryError) {
      if (categoryError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json({ error: categoryError.message }, { status: 500 });
    }

    const { data: phoneCategories, error: phonesError } = await supabase
      .from('phone_categories')
      .select(`
        phones (
          *,
          brands (*)
        )
      `)
      .eq('category_id', category.id)
      .limit(limit);

    if (phonesError) {
      return NextResponse.json({ error: phonesError.message }, { status: 500 });
    }

    const phones = phoneCategories
      ?.map((pc) => pc.phones)
      .filter(Boolean) || [];

    return NextResponse.json({ category, phones, phoneCount: phones.length });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
