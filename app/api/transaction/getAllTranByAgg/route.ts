import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const searchParam = request.nextUrl.searchParams;

  const userID = searchParam.get('userID') as string;


  const supabase = createRouteHandlerClient<Database>({ cookies });

  const agg = await supabase.from('aggregation').select('*').eq('user_id', userID).single();

  const allTran = await supabase.from('transaction_points').select('*')
  .eq('aggregation_address', agg.data?.address as string);

  return NextResponse.json({ data: allTran.data, error: allTran.error });
  
}