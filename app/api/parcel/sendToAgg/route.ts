import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();

  const userID = formData.userID as string;
  const parcelCode = formData.parcelCode as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });


  const transaction = await supabase.from('transaction').select('*').eq('user_id', userID).single();

  const nextAgg = await supabase.from('transaction_points').select('*')
  .eq('address', transaction.data?.address as string).single();


  await supabase.from('packages').update({ 
    current_location: nextAgg.data?.aggregation_address,
    status: 'Coming to warehouse'
  }).eq('code', parcelCode);

  await supabase.from('packageStatus').insert({
    current_location: nextAgg.data?.aggregation_address,
    code: parcelCode,
    status: 'Coming to warehouse'
  });


  return NextResponse.json({ data: nextAgg.data, error: nextAgg.error });
  
}