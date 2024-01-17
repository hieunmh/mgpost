import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const searchParam = request.nextUrl.searchParams;

  const userID = searchParam.get('userID') as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const aggregation = await supabase.from('aggregation').select('*').eq('user_id', userID).single();

  const parcel = await supabase.from('packages').select(`
    *,
    packageDetails(*),
    packageStatus(*)
    ` 
  )
  .eq('current_location', aggregation.data?.address as string);

  return NextResponse.json({ data: parcel.data, error: parcel.error });
}