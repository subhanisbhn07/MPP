import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const popular = searchParams.get('popular');
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    let query = supabase
      .from('brands')
      .select('*')
      .eq('is_active', true);

    if (popular === 'true') {
      query = query.order('phone_count', { ascending: false });
    } else {
      query = query.order('name', { ascending: true });
    }

    query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ brands: data, count: data?.length || 0 });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
