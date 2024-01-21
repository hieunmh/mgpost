import React, { useEffect } from 'react';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useTransactionInfo } from '@/hooks/useTransactionInfo';
import { useTranHead } from '@/hooks/menuhead/useTranHead';
import Statistical from './Statistical';
import Manager from './Manager';
import { useAllTranStaff } from '@/hooks/manager/tran/userAllTranStaff';
import { useAllTranStaffPage } from '@/hooks/manager/tran/useAllTranStaffPage';
import { usePage } from '@/hooks/parcel/tran/useTranPage';
import { useStatisticalPage } from '@/hooks/manager/tran/useStatisticalPage';


export default function TranStaff() {
  const { menu, setMenu } = useTranHead();

  const { userInfo } = useUser();

  const { allParcel, setAllParcel } = useAllParcel();
  const { transactionInfo, setTransactionInfo } = useTransactionInfo();
  const { allTranStaff, setAllTranStaff } = useAllTranStaff();
  const { page, perPage, numberPage, setPage, setPerPage, setNumberPage } = useAllTranStaffPage();

  const useTranStatistical= useStatisticalPage();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchAllParcel = async () => {
      const channel = supabaseClient.channel('realtime parcel')
      .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'packages',
        }, 
        async (payload: any) => {
          const res = await axios.get(`api/parcel/getParcelInTransaction?userID=${userInfo?.id}`);
          setAllParcel(res.data.data);
          res.data.data.length / perPage === Math.floor(res.data.data.length / perPage) ?
          useTranStatistical.setNumberPage(res.data.data.length / perPage) 
          : useTranStatistical.setNumberPage(Math.floor(res.data.data.length / perPage) + 1);
        }
      ).subscribe()

      return () => supabaseClient.removeChannel(channel);
    }

    fetchAllParcel();
  })
  
  useEffect(() => {
    const getAllParcel = async () => {
      const res = await axios.get(`api/parcel/getParcelInTransaction?userID=${userInfo?.id}`);
      setAllParcel(res.data.data);
      res.data.data.length / perPage === Math.floor(res.data.data.length / perPage) ?
        useTranStatistical.setNumberPage(res.data.data.length / perPage) 
        : useTranStatistical.setNumberPage(Math.floor(res.data.data.length / perPage) + 1);
    }

    if (allParcel.length == 0) {
      getAllParcel();
    }
    
  }, []);

  useEffect(() => {
    const getTranInfo = async () => {
      const res = (await axios.get(`api/transaction/getTranInfo?userID=${userInfo?.id}`)).data;
      setTransactionInfo(res.data);
    }

    if (!transactionInfo) {
      getTranInfo();
    }
  }, []);

  useEffect(() => {
    const getAllTranStaff = async () => {
      const res = (await axios.get(`api/transaction/getAllTranStaff?userID=${userInfo?.id}`)).data;
      setAllTranStaff(res.data);
      res.data.length / perPage === Math.floor(res.data.length / perPage) ?
      setNumberPage(res.data.length / perPage) : setNumberPage(Math.floor(res.data.length / perPage) + 1);
    }

    if (allTranStaff.length === 0) {
      getAllTranStaff();
    }
  }, []);

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-[calc(100vh-60px)] 
      sm:h-[calc(100vh-76px)] space-y-3 sm:space-y-5 w-full overflow-hidden'
    >
      {transactionInfo ? (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 flex flex-col justify-between text-gray-300 rounded'>
          <p className='font-bold text-base sm:text-xl text-center'>{transactionInfo?.name}</p>
          <div className='w-full flex flex-col font-semibold md:flex-row 
            items-center justify-around text-xs sm:text-sm text-center'
          >
            <p>Address: {transactionInfo.address}</p>
            <p>Zipcode: {transactionInfo.zipcode}</p>
          </div>
        </div>
      ) : (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 rounded flex items-center justify-center'>
          <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
            <circle cx="50" cy="50" r="40"  />
          </svg>
        </div>
      )}

      {menu === 'statistical' && <Statistical />}
      {menu === 'manager' && <Manager />}

    </div>
  )
}