import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.json();

  const email = formData.email;
  const password = formData.password;
  
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase.auth.signInWithPassword({
    email, password
  })
  
  return NextResponse.json({ data: res.data, error: res.error });
}