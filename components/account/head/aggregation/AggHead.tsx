import { useAggHead } from '@/hooks/menuhead/useAggHead'
import { useAggInfo } from '@/hooks/useAggInfo';
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import React, { useEffect } from 'react'

export default function AggHead() {

  const { menu } = useAggHead();
  const { userInfo } = useUser();
  const { aggInfo, setAggInfo } = useAggInfo();

  useEffect(() => {
    const getAggInfo = async () => {
      const res = (await axios.get(`api/aggregation/getAggInfo?userID=${userInfo?.id}`)).data;
      setAggInfo(res.data);
    } 

    if (!aggInfo) {
      getAggInfo();
    }
  }, []);

  useEffect(() => {
    const getAllAggStaff = async () => {
      const res = (await axios.get(`api/aggregation/getAllAggStaff?userID=${userInfo?.id}`)).data;

      console.log(res.data);
    }

    getAllAggStaff();
  }, []);

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-[calc(100vh-60px)] 
      sm:h-[calc(100vh-76px)] space-y-3 sm:space-y-5 w-full overflow-hidden'
    >
      {aggInfo ? (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 flex flex-col justify-between text-gray-300 rounded'>
          <p className='font-bold text-base sm:text-xl text-center'>{aggInfo?.name}</p>
          <div className='w-full flex flex-col font-semibold md:flex-row 
            items-center justify-around text-xs sm:text-sm text-center'
          >
            <p>Address: {aggInfo.address}</p>
            <p>Zipcode: {aggInfo.zipcode}</p>
          </div>
        </div>
      ) : (
        <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 rounded flex items-center justify-center'>
          <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
            <circle cx="50" cy="50" r="40"  />
          </svg>
        </div>
      )}

      {/* {menu === 'statistical' && <Statistical />}
      {menu === 'manager' && <Manager />} */}

    </div>
  )
}
