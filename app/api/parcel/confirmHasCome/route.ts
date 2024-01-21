import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();

  const current_location = formData.current_location as string;
  const parcelCode = formData.parcelCode as string;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const updatePackage = await supabase.from('packages').update({ status: 'In warehouse' })
  .eq('current_location', current_location)
  .eq('code', parcelCode);

  await supabase.from('packageStatus').update({ 
    status: 'In warehouse'
  })
  .eq('current_location', current_location)
  .eq('code', parcelCode);


  return NextResponse.json({ data: updatePackage.data, error: updatePackage.error });
  
}