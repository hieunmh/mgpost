'use client';


import Header from '@/components/header/Header';
import TranStaffSidebar from '@/components/account/staff/transaction/TranStaffSidebar';
import TranStaff from '@/components/account/staff/transaction/TranStaff';

import AggStaffSidebar from '@/components/account/staff/aggregation/AggStaffSidebar';
import AggStaff from '@/components/account/staff/aggregation/AggStaff';


import { useUser } from '@/hooks/useUser';
import React from 'react';

export default function Account() {

  const { userInfo } = useUser();

  return (
    <div className='w-full flex'>
      <div id='sidebar' className='h-screen'>
        {userInfo?.role === 'transaction staff' && <TranStaffSidebar />}
        {userInfo?.role === 'aggregation staff' && <AggStaffSidebar />}
      </div>

      <div className='w-full flex flex-col'>
        <Header />
        {userInfo?.role?.toLowerCase() == 'transaction staff' && <TranStaff />}
        {userInfo?.role?.toLowerCase() == 'aggregation staff' && <AggStaff />}
      </div>
    </div>
  )
}
