import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();

  const parcelCode = formData.parcelCode as string;
  const nextAddress = formData.nextAddress as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });


  const pk = await supabase.from('packages').update({
    current_location: nextAddress,
    status: 'Is coming'
  }).eq('code', parcelCode);

  const pkstt = await supabase.from('packageStatus').insert({
    current_location: nextAddress,
    code: parcelCode,
    status: 'Is coming'
  })

  return NextResponse.json({ data: pk.data, error: pk.error });
  
}