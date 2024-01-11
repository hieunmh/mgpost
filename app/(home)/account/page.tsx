'use client';

import Header from '@/components/header/Header';
import StaffSidebar from '@/components/siderbar/StaffSidebar';
import { useUser } from '@/hooks/useUser';
import React from 'react';

export default function Account() {

  const { userInfo } = useUser();

  return (
    <div className='w-full flex'>
      <Header />
      <div id='sidebar' className='absolute top-0 h-screen'>
        {userInfo?.role?.includes('staff') && <StaffSidebar />}
      </div>

      <div className='flex flex-col'>
        <div>

        </div>
      </div>
    </div>
  )
}
