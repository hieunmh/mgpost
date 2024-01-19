import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const searchParam = request.nextUrl.searchParams;

  const userID = searchParam.get('userID') as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const transaction = await supabase.from('transaction').select('*').eq('user_id', userID).single();

  const tranInfo = await supabase.from('transaction_points').select('*')
  .eq('address', transaction.data?.address as string).single();

  return NextResponse.json({ data: tranInfo.data, error: tranInfo.error });
}