import React, { useEffect } from 'react';
import { useAllAggParcel } from '@/hooks/parcel/agg/useAllAggParcel';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { useAggPage } from '@/hooks/parcel/agg/useAggPage';
import Parcel from './Parcel';
import { useAggStaff } from '@/hooks/menustaff/useAggStaff';
import IncomingParcel from './IncomingParcel';
import { useAllTranByAgg } from '@/hooks/useAllTranByAgg';
import { useAllAgg } from '@/hooks/useAllAgg';
import { useAggInfo } from '@/hooks/useAggInfo';


export default function TranStaff() {
  const { menu } = useAggStaff();

  const { userInfo } = useUser();

  const { allParcel, setAllParcel } = useAllAggParcel();
  const { page, perPage, numberPage, setPage, setNumberPage } = useAggPage();
  const { allTranByAgg, setAllTranByAgg } = useAllTranByAgg();  
  const { allAgg, setAllAgg } = useAllAgg();

  const { aggInfo, setAggInfo } = useAggInfo();
  

  // get all parcel in aggregation
  useEffect(() => {
    const getAllParcel = async () => {
      const res = await axios.get(`api/parcel/getParcelInAggregation?userID=${userInfo?.id}`);
      setAllParcel(res.data.data);
      res.data.data.length / perPage === Math.floor(res.data.data.length / perPage) ?
      setNumberPage(res.data.data.length / perPage) : setNumberPage(Math.floor(res.data.data.length / perPage) + 1);
    }

    if (allParcel.length === 0) {
      getAllParcel();
    }
    
  }, []);


  // get all transaction by Agg
  useEffect(() => {
    const getAllTranByAgg = async () => {
      const res = (await axios.get(`api/transaction/getAllTranByAgg?userID=${userInfo?.id}`)).data;
      setAllTranByAgg(res.data);
    }
    
    if (allTranByAgg.length === 0) {
      getAllTranByAgg();
    }
  }, []);


  // get all agg point
  useEffect(() => {
    const getAllAgg = async () => {
      const res = (await axios.get(`api/aggregation/getAllAgg?userID=${userInfo?.id}`)).data;
      setAllAgg(res.data);
    }

    if (allAgg.length === 0) {
      getAllAgg();
    }
  }, [])

  
  // get agg information
  useEffect(() => {
    const getAggInfo = async () => {
      const res = (await axios.get(`api/aggregation/getAggInfo?userID=${userInfo?.id}`)).data;
      setAggInfo(res.data);
    }

    if (!aggInfo) {
      getAggInfo();
    }

  }, [])

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 space-y-3 sm:space-y-5 h-[calc(100vh-60px)] 
      sm:h-[calc(100vh-76px)] w-full overflow-hidden'
    >
      {aggInfo ? (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 
          text-gray-300 rounded flex flex-col justify-between'
        >
          <p className='font-bold text-base sm:text-xl text-center'>{aggInfo?.name}</p>
          <div className='w-full flex flex-col font-semibold md:flex-row 
            items-center justify-around text-xs sm:text-sm text-center'
          >
            <p>Address: {aggInfo?.address}</p>
            <p>Zipcode: {aggInfo?.zipcode}</p>
          </div>
        </div>
      ) : (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 rounded flex items-center justify-center'>
          <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
            <circle cx="50" cy="50" r="40"  />
          </svg>
        </div>
      )}
      {menu === 'warehouse' && <Parcel />}
      {menu === 'incoming' && <IncomingParcel />}
    </div>
  )
}
