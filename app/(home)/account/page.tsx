'use client';

import TransactionStaff from '@/components/account/staff/transaction/TransactionStaff';
import Header from '@/components/header/Header';
import TranStaffSidebar from '@/components/siderbar/staff/transaction/TranStaffSidebar';
import { useUser } from '@/hooks/useUser';
import React from 'react';

export default function Account() {

  const { userInfo } = useUser();

  return (
    <div className='w-full flex'>
      <div id='sidebar' className='h-screen'>
        {userInfo?.role === 'transaction staff' && <TranStaffSidebar />}
      </div>

      <div className='w-full flex flex-col'>
        <Header />
        {userInfo?.role?.toLowerCase() == 'transaction staff' && <TransactionStaff />}
      </div>
    </div>
  )
}
