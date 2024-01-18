import { useTransactionStaff } from '@/hooks/staff/useTranStaff';
import React, { useEffect } from 'react';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { usePage } from '@/hooks/parcel/useTranPage';
import Parcel from './Parcel';
import { useAggStaff } from '@/hooks/staff/useAggStaff';
import IncomingParcel from './IncomingParcel';


export default function TranStaff() {
  const { menu } = useAggStaff();

  const { userInfo } = useUser();

  const { allParcel, setAllParcel } = useAllParcel();
  const { page, perPage, numberPage, setPage, setNumberPage } = usePage();
  
  useEffect(() => {
    const getAllParcel = async () => {
      const res = await axios.get(`api/parcel/getParcelInAggregation?userID=${userInfo?.id}`);
      setAllParcel(res.data.data);
      res.data.data.length / perPage === Math.floor(res.data.data.length / perPage) ?
      setNumberPage(res.data.data.length / perPage) : setNumberPage(Math.floor(res.data.data.length / perPage) + 1);
    }

    if (allParcel.length == 0) {
      getAllParcel();
    }
    
  }, []);


  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-[calc(100vh-100px)] w-full overflow-y-hidden'>
      {/* {menu === 'overview' && <Overview />} */}
      {menu === 'parcel' && <Parcel />}
      {menu === 'incoming' && <IncomingParcel />}
    </div>
  )
}
