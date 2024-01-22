'use client';

import Header from '@/components/header/Header';

import TranStaffSidebar from '@/components/account/staff/transaction/TranStaffSidebar';
import TranStaff from '@/components/account/staff/transaction/TranStaff';

import AggStaffSidebar from '@/components/account/staff/aggregation/AggStaffSidebar';
import AggStaff from '@/components/account/staff/aggregation/AggStaff';

import TranHeadSidebar from '@/components/account/head/transaction/TranHeadSidebar';
import TranHead from '@/components/account/head/transaction/TranHead';

import AggHeadSidebar from '@/components/account/head/aggregation/AggHeadSidebar';


import { useUser } from '@/hooks/useUser';
import React from 'react';
import AggHead from '@/components/account/head/aggregation/AggHead';

export default function Account() {

  const { userInfo } = useUser();

  return (
    <div className='w-full flex'>
      <div id='sidebar' className='h-screen'>
        {userInfo?.role === 'transaction staff' && <TranStaffSidebar />}
        {userInfo?.role === 'aggregation staff' && <AggStaffSidebar />}

        {userInfo?.role === 'transaction head' && <TranHeadSidebar />}
        {userInfo?.role === 'aggregation head' && <AggHeadSidebar />}
      </div>

      <div className='w-full flex flex-col'>
        <Header />
        {userInfo?.role?.toLowerCase() == 'transaction staff' && <TranStaff />}
        {userInfo?.role?.toLowerCase() == 'aggregation staff' && <AggStaff />}

        {userInfo?.role === 'transaction head' && <TranHead />}
        {userInfo?.role === 'aggregation head' && <AggHead />}
      </div>
    </div>
  )
}
