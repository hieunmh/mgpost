import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
  );

  const formData = await request.json();
  const email = formData.email as string;
  const password = formData.password as string;

  const phone = formData.phone as string;
  const address = formData.address as string;

  const name = formData.name as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const newAccount = await supabaseAdmin.auth.admin.createUser({
    email: email,
    phone: phone,
    password: password,
    email_confirm: true,
  });

  await supabase.from('users').insert({
    id: newAccount.data.user?.id as string,
    email: newAccount.data.user?.email,
    role: 'aggregation staff',
    phone: newAccount.data.user?.phone,
    name: name,
  })

  await supabase.from('aggregation').insert({
    user_id: newAccount.data.user?.id,
    address: address,
  })

  return NextResponse.json({ data: newAccount.data, error: newAccount.error });

}