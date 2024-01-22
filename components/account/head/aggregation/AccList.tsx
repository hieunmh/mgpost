import { useAggAccountDetail } from '@/hooks/manager/agg/useAccountDetail';
import { useAllAggStaffPage } from '@/hooks/manager/agg/useAllAggStaffPage';
import { AggregationType, UserInfoType } from '@/types/type';
import React, { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useAggStaffDetail } from '@/hooks/manager/agg/useAggStaffDetail';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AccList({ staff, index } : { staff: UserInfoType & { aggregation: AggregationType }, index: number}) {


  const { page, perPage, numberPage, setPage, setPerPage, setNumberPage } = useAllAggStaffPage();

  const { setIsOpenDetail } = useAggAccountDetail();

  const { setStaffDetail } = useAggStaffDetail();

  let [loading, setLoading] = useState<boolean>(false);

  const deleteAccount = async () => {
    setLoading(true);
    const res = await axios.post('api/aggregation/deleteAggStaff', {
      userID: staff.id,
    })

    setLoading(false);

    if (res.data.error) {
      toast.error('Fail!');
    } else {
      toast.success('Delete staff successfully!');
    }
  }

  return (
    <>
    <div className='w-[40px] text-center flex items-center justify-center'>
        {index + 1 + perPage * (page - 1)}
      </div>

      <div className='w-[calc(100%-130px)] grid grid-cols-12'>

        <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3 truncate'>
          {staff?.name?.replace(/\b(\w)/g, s => s.toUpperCase())}
        </p>

        <p className='md:flex hidden items-center justify-center text-center col-span-6 truncate'>
          {staff?.email}
        </p>

        <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3 truncate'>
          (+84) {staff?.phone?.substring(2, 5)} {' '}
          {staff?.phone?.substring(5, 8)} {' '}
          {staff?.phone?.substring(8, 11)}
        </p>
      </div>

      <div className='w-[90px] space-x-1 flex items-center justify-center'>
        <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
          onClick={() => {
            setIsOpenDetail(true);
            setStaffDetail(staff);
          }}
        >
          <FaEye size={15} />
        </button>

        <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
          onClick={() => {
            deleteAccount()
          }}
        > 
          {!loading ? (
            <FaTrash size={15} />
          ) : (
            <div className='h-[15px]'>
              <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                <circle cx="50" cy="50" r="40"  />
              </svg>
            </div>
          )}
        </button>
      </div> 
    </>
  )
}
