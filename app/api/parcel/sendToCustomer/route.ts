import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();

  const parcelCode = formData.parcelCode as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });


  const pk = await supabase.from('packages').update({
    status: 'Delivering',
  }).eq('code', parcelCode);

  const pkstt = await supabase.from('packageStatus').insert({
    current_location: 'Delivering to customer',
    code: parcelCode,
    status: 'Delivering',
  })

  return NextResponse.json({ data: pk.data, error: pk.error });
}