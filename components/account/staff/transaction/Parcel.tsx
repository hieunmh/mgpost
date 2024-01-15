import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { LuPackagePlus } from 'react-icons/lu';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import CreateParcel from './CreateParcel';
import { useSessionContext } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { useParcelDetail } from '@/hooks/parcel/useParcelDetail';

export default function Parcel() {

  const { allParcel, setAllParcel } = useAllParcel();
  const { isOpen, setIsOpen } = useCreateParcel();
  const { isOpenDetail, setIsOpenDetail } = useParcelDetail();

  const { userInfo } = useUser();

  const { supabaseClient } = useSessionContext();

  
  const [pageNumber, setPageNumber] = useState<number>();
  const [perPage, setPerPage] = useState<number>();

  useEffect(() => {
    const fetchAllParcel = async () => {
      const channel = supabaseClient.channel('realtime parcel')
      .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'packages',
        }, 
        async (payload: any) => {
          const res = await axios.get(`api/parcel/getParcel1Location?userID=${userInfo?.id}`);
          setAllParcel(res.data.data);
        }
      ).subscribe()

      return () => supabaseClient.removeChannel(channel);
    }

    fetchAllParcel();
  })

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-full rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full text-gray-300 flex flex-col space-y-8'>
        <div className='flex justify-between items-center text-center'>
          <p className='font-extrabold text-base sm:text-3xl'>Parcel List</p>
          <button className='flex font-medium items-center justify-center 
            space-x-2 bg-[#5c9ead] hover:bg-[#5c9ead]/85 rounded px-2 py-1 sm:px-6 sm:py-3'
            onClick={() => setIsOpen(true)}
          >
            <LuPackagePlus className='mb-1 sm:text-[24px]' />
            <p className='tracking-[1px] text-xs sm:text-sm'>Create parcel</p>
          </button>
        </div>

        <div className='w-full h-full'>
          <div className='w-full py-5 bg-[#5c9ead] rounded-t'>
            <div className='w-full grid grid-cols-12 font-semibold tracking-[1px] text-xs lg:text-sm'>
              <p className='md:col-span-1 col-span-2 text-center'>No</p>

              <p className='md:col-span-3 sm:col-span-4 col-span-6 text-center'>Code</p>

              <p className='col-span-4 sm:block hidden text-center'>From - To</p>

              <p className='col-span-2 text-center md:block hidden'>Created date</p>

              <p className='sm:col-span-2 col-span-4 text-center'>Status</p>
            </div>
          </div>

          {allParcel.map((parcel, index) => (
            <div key={index} className={`w-full py-5  
              ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
            >
              <div className='w-full grid grid-cols-12 font-medium tracking-[1px] text-xs lg:text-sm'>
                <p className='md:col-span-1 col-span-2 text-center'>{index + 1}</p>

                <p className='md:col-span-3 sm:col-span-4 col-span-6 text-center truncate'>{parcel.code}</p>
  
                <p className='col-span-4 sm:block hidden text-center truncate'>
                  {parcel.packageDetails?.sender_address?.split('-').pop()} - {' '}
                  {parcel.packageDetails?.receiver_address?.split('-').pop()}
                </p>

                <p className='col-span-2 text-center md:block hidden'>
                  {String(new Date(parcel.created_at).getDate()).padStart(2, '0')}
                  /{String(new Date(parcel.created_at).getMonth() + 1).padStart(2, '0')}
                  /{String(new Date(parcel.created_at).getFullYear())}
                </p>

                <p className='sm:col-span-2 col-span-4 text-center'>
                  {parcel.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && <CreateParcel />}
      {}
    </motion.div>
  )
}
