import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const searchParam = request.nextUrl.searchParams;

  const userID = searchParam.get('userID') as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const aggHead = await supabase.from('aggregation').select('*').eq('user_id', userID).single();

  const allStaff = await supabase.from('users').select(`
    *,
    aggregation!inner(*)
  `)
  .eq('role', 'aggregation staff')
  .eq('aggregation.address', aggHead.data?.address as string);


  return NextResponse.json({ data: allStaff.data, error: allStaff.error });
}