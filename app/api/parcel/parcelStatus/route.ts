import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const searchParam = request.nextUrl.searchParams;

  const parcelCode = searchParam.get('code') as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const parcel = await supabase.from('packages').select(`
    *,
    packageDetails (*),
    packageStatus (*)
    `
  ).eq('code', parcelCode).order('created_at', {
    foreignTable: 'packageStatus',
    ascending: false,
  }).single();

  return NextResponse.json({ data: parcel.data, error: parcel.error });
}