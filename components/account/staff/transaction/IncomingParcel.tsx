import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { LuPackagePlus } from 'react-icons/lu';
import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import CreateParcel from './CreateParcel';
import { useSessionContext } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { useTranParcelDetail } from '@/hooks/parcel/useTranParcelDetail';
import { usePage } from '@/hooks/parcel/useTranPage';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ParcelDetail from './ParcelDetail';
import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';

export default function IncomingParcel() {

  const { allParcel, setAllParcel } = useAllParcel();
  const { isOpen, setIsOpen } = useCreateParcel();
  const { isOpenDetail, setIsOpenDetail } = useTranParcelDetail();
  const { page, perPage, numberPage, setPage, setNumberPage } = usePage();

  const { userInfo } = useUser();

  const { supabaseClient } = useSessionContext();

  const [parcelDetail, setParcelDetail] = useState<
  PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]}>();

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
          setNumberPage(res.data.data.length / perPage) : setNumberPage(Math.floor(res.data.data.length / perPage) + 1);
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
        </div>

        <div className='w-full h-full flex flex-col'>
          <div className='w-full py-5 bg-[#5c9ead] rounded-t'>
            <div className='w-full grid grid-cols-12 font-semibold tracking-[1px] text-xs lg:text-sm'>
              <p className='md:col-span-1 col-span-2 text-center'>No</p>

              <p className='md:col-span-3 sm:col-span-4 col-span-6 text-center'>Code</p>

              <p className='col-span-4 sm:block hidden text-center'>From - To</p>

              <p className='col-span-2 text-center md:block hidden'>Created date</p>

              <p className='sm:col-span-2 col-span-4 text-center'>Status</p>
            </div>
          </div>

          {allParcel.filter(parcel => parcel.status === 'Is coming').length === 0 ? (
            <div className='flex items-center font-bold mt-5 text-2xl md:text-4xl justify-center'>
              No parcel found!
            </div>
          ) : (
            <>
              {allParcel?.filter(parcel => parcel.status === 'Is coming')
              .slice((perPage * (page - 1)), perPage * page).map((parcel, index) => (
                <div key={index} className={`w-full py-5 cursor-pointer
                  ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
                  onClick={() => {
                    setParcelDetail(parcel);
                    setIsOpenDetail(true);
                  }}
                >
                  <div className='w-full grid grid-cols-12 font-medium tracking-[1px] text-xs lg:text-sm'>
                    <p className='md:col-span-1 col-span-2 text-center'>{index + 1 + perPage * (page - 1)}</p>
    
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
            </>
          )}
        </div>

        <div className='w-full h-[50px] flex items-center justify-center'>
          <div className='text-gray-200 font-semibold md:text-xl flex justify-center items-center space-x-5'>
            <button onClick={() => { 
              if (page == 1) setPage(1);
              else setPage(page - 1)
            }}>
              <MdKeyboardArrowLeft className='md:text-2xl text-xl' />
            </button>

            {[...Array(numberPage)].map((key, index) => (
              <button key={index} onClick={() =>(setPage(index + 1))}
              className={`md:text-lg text-sm ${index + 1 == page ? 'text-gray-200' : 'text-gray-200/10'}`}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={() => {
              if (page == numberPage) setPage(numberPage);
              else setPage(page + 1);
            }}>
              <MdKeyboardArrowRight className='md:text-2xl text-xl' />
            </button>
          </div>
        </div>
      </div>

      {isOpen && <CreateParcel />}
      {isOpenDetail && <ParcelDetail parcelDetail={parcelDetail!} />}
    </motion.div>
  )
}
