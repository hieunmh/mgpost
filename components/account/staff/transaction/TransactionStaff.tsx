import { useTransactionStaff } from '@/hooks/staff/useTransactionStaff';
import React, { useEffect } from 'react';
import Overview from './Overview';
import Parcel from './Parcel';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import axios from 'axios';


export default function TransactionStaff() {

  const { menu, setMenu } = useTransactionStaff();

  const { setAllParcel } = useAllParcel();

  useEffect(() => {
    const getAllParcel = async () => {
      const res = await axios.get('api/parcel/getAllParcel');
      setAllParcel(res.data.data);
    }
    getAllParcel();
  }, []);

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-full w-full overflow-y-hidden'>
      {menu === 'overview' && <Overview />}
      {menu === 'parcel' && <Parcel />}
    </div>
  )
}
