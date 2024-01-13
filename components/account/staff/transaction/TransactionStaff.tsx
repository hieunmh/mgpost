import { useTransactionStaff } from '@/hooks/staff/useTransactionStaff';
import React, { useEffect } from 'react';
import Overview from './Overview';
import Parcel from './Parcel';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';


export default function TransactionStaff() {

  const { menu, setMenu } = useTransactionStaff();

  const { allParcel,setAllParcel } = useAllParcel();

  const { userInfo } = useUser();

  useEffect(() => {
    const getAllParcel = async () => {
      const res = await axios.get(`api/parcel/getParcel1Location?userID=${userInfo?.id}`);
      setAllParcel(res.data.data);
    }
    if (allParcel.length == 0) {
      getAllParcel();
    }
    
  }, []);

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-full w-full overflow-y-hidden'>
      {menu === 'overview' && <Overview />}
      {menu === 'parcel' && <Parcel />}
    </div>
  )
}
