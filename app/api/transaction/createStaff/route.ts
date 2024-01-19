import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();
  const email = formData.email as string;
  const password = formData.password as string;
  const phone = formData.phone as string;
  const address = formData.address as string;


  const supabase = createRouteHandlerClient<Database>({ cookies });

  const newAccount = await supabase.auth.admin.createUser({
    email: email,
    phone: phone,
    password: password,
  });

  await supabase.from('users').insert({
    id: newAccount.data.user?.id as string,
    email: newAccount.data.user?.email,
    role: 'transaction staff',
    phone: newAccount.data.user?.phone,
    name: email.slice(0, -6),
  })

  await supabase.from('transaction').insert({
    user_id: newAccount.data.user?.id,
    address: address,
  })

  return NextResponse.json({ data: newAccount.data, error: newAccount.error });

}