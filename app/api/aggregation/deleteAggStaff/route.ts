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

  const userID = formData.userID as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });


  const deleteAccount = await supabaseAdmin.auth.admin.deleteUser(userID);

  await supabase.from('users').delete().eq('id', userID);

  await supabase.from('aggregation').delete().eq('user_id', userID);

  return NextResponse.json({ data: deleteAccount.data, error: deleteAccount.error });

}