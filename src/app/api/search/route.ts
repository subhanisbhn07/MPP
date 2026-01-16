import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const brand = searchParams.get('brand');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    let dbQuery = supabase
      .from('phones')
      .select(`
        *,
        brands (*)
      `)
      .or(`model.ilike.%${query}%,brands.name.ilike.%${query}%`)
      .limit(limit);

    if (minPrice) {
      dbQuery = dbQuery.gte('price_usd', parseFloat(minPrice));
    }

    if (maxPrice) {
      dbQuery = dbQuery.lte('price_usd', parseFloat(maxPrice));
    }

    if (brand) {
      const { data: brandData } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brand)
        .single();

      if (brandData) {
        dbQuery = dbQuery.eq('brand_id', brandData.id);
      }
    }

    const { data, error } = await dbQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from('search_analytics').insert({
      query: query.trim(),
      results_count: data?.length || 0,
    });

    return NextResponse.json({
      phones: data,
      count: data?.length || 0,
      query: query.trim(),
    });
  } catch (error) {
    console.error('Error searching phones:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
