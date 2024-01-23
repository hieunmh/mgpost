import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {


  const supabase = createRouteHandlerClient<Database>({ cookies });

  const allHead = await supabase.from('users').select('*').in('role', ['transaction head', 'aggregation head']);

  return NextResponse.json({ data: allHead.data, error: allHead.error });

}