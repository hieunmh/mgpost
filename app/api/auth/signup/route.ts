import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.json();

  const email = formData.email;
  const password = formData.password;
  const phone = formData.phone;
  
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase.auth.signUp({
    email, password
  })

  if (res.error) return NextResponse.json({ error: res.error });

  const  { data: updateUser, error } = await supabase.auth.updateUser({ phone: '84' + phone.substring(1) });

  if (error) return NextResponse.json({ error: res.error });

  await supabase.from('users').insert({ 
    id: res.data.user?.id as string, 
    email: res.data.user?.email,
    phone: '84' + phone.substring(1),
    role: 'customer',
  })

  return NextResponse.json({ data: res.data, error: res.error });
}