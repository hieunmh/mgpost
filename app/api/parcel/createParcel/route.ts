import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = request.json();


  const supabase = createRouteHandlerClient<Database>({ cookies });

  
}