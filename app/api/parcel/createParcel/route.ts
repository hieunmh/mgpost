import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {

  const formData = await request.json();

  const senderName = formData.senderName;
  const senderPhone  = formData.senderPhone;
  const senderAddress = formData.sendAddress;

  const receiverName = formData.receiverName;
  const receiverPhone  = formData.receiverPhone;
  const receiveAddress = formData.reveiveAddress;

  const packageInfo = formData.parcelInfo;

  const note = formData.note;
  const totalCharge = formData.totalCharge;
  const weight = formData.weight;
  const code = formData.code;
  const userID = formData.userID;


  const supabase = createRouteHandlerClient<Database>({ cookies });

  const transaction = await supabase.from('transaction').select('*').eq('user_id', userID).single();

  const create = await supabase.from('packages').insert({
    code: code,
    current_location: transaction.data?.address,
    status: 'In warehouse'
  });

  const getpk = await supabase.from('packages').select('*').eq('code', code).single();

  await supabase.from('packageDetails').insert({
    id: getpk.data?.id as string,
    code: code,
    package_info: packageInfo,
    sender_name: senderName,
    sender_phone_no: senderPhone,
    sender_address: senderAddress,

    receiver_name: receiverName,
    receiver_phone_no: receiverPhone,
    receiver_address: receiveAddress,

    notes: note,
    totalCharge: totalCharge,
    totalWeight: weight,
    
  });

  await supabase.from('packageStatus').insert({
    id: getpk.data?.id,
    status: 'In warehouse',
    current_location: transaction.data?.address,
    code: code,
  })

  return NextResponse.json({ status: create.status, error: create.error });
}