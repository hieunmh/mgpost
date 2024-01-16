import { useTransactionStaff } from '@/hooks/staff/useTransactionStaff';
import React, { useEffect } from 'react';
import Overview from './Overview';
import Parcel from './Parcel';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';


export default function TransactionStaff() {
  const { menu } = useTransactionStaff();


  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-[calc(100vh-100px)] w-full overflow-y-hidden'>
      {menu === 'overview' && <Overview />}
      {menu === 'parcel' && <Parcel />}
    </div>
  )
}
