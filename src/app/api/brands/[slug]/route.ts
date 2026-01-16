import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
      }
      return NextResponse.json({ error: brandError.message }, { status: 500 });
    }

    const { data: phones, error: phonesError } = await supabase
      .from('phones')
      .select(`
        *,
        brands (*)
      `)
      .eq('brand_id', brand.id)
      .order('announced_date', { ascending: false });

    if (phonesError) {
      return NextResponse.json({ error: phonesError.message }, { status: 500 });
    }

    return NextResponse.json({ brand, phones, phoneCount: phones?.length || 0 });
  } catch (error) {
    console.error('Error fetching brand:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
