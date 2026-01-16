import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const featured = searchParams.get('featured');
  const trending = searchParams.get('trending');
  const brand = searchParams.get('brand');
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    let query = supabase
      .from('phones')
      .select(`
        *,
        brands (*)
      `)
      .range(offset, offset + limit - 1);

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (trending === 'true') {
      query = query.eq('is_trending', true);
    }

    if (brand) {
      const { data: brandData } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brand)
        .single();

      if (brandData) {
        query = query.eq('brand_id', brandData.id);
      }
    }

    query = query.order('announced_date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ phones: data, count: data?.length || 0 });
  } catch (error) {
    console.error('Error fetching phones:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
