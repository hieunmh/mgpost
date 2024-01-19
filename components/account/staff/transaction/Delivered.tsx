import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import CreateParcel from './CreateParcel';
import { useSessionContext } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import { useTranParcelDetail } from '@/hooks/parcel/useTranParcelDetail';
import { usePage } from '@/hooks/parcel/useTranPage';

import { FaEye } from 'react-icons/fa';
import { BsFillSendFill } from 'react-icons/bs';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ParcelDetail from './ParcelDetail';
import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';

export default function Delivered() {

  const { allParcel, setAllParcel } = useAllParcel();
  const { isOpen, setIsOpen } = useCreateParcel();
  const { isOpenDetail, setIsOpenDetail } = useTranParcelDetail();
  const { page, perPage, numberPage, setPage, setNumberPage } = usePage();

  const { userInfo } = useUser();

  const { supabaseClient } = useSessionContext();

  const [parcelDetail, setParcelDetail] = useState<
  PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]}>();



  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-[calc(100%-110px)] sm:h-[calc(100%-120px)] rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full text-gray-300 flex flex-col space-y-8'>
        <div className='flex justify-between items-center text-center'>
          <p className='font-extrabold text-base sm:text-3xl'>Delivered</p>
        </div>

        <div className='w-full h-full flex flex-col'>
          <div className='w-full py-5 bg-[#5c9ead] rounded-t'>
            <div className='w-full flex justify-between font-semibold tracking-[1px] text-xs lg:text-sm'>
              <p className='w-[40px] text-center'>No</p>

              <div className='w-[calc(100%-130px)] grid grid-cols-12'>
                <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>Code</p>

                <p className='md:flex hidden items-center justify-center text-center col-span-3'>From</p>

                <p className='md:flex hidden items-center justify-center text-center col-span-3'>To</p>

                <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3'>Created date</p>
              </div>

              <p className='w-[90px] text-center'>Action</p>
            </div>
          </div>

          {allParcel.filter(parcel => parcel.status === 'Delivering' || parcel.status === 'Delivered').length === 0 ? (
            <div className='flex items-center font-bold text-2xl md:text-4xl mt-5 justify-center'>
              No parcel found!
            </div>
          ) : (
            <>
              {allParcel.filter(parcel => parcel.status === 'Delivering' || parcel.status === 'Delivered')
                ?.slice((perPage * (page - 1)), perPage * page).map((parcel, index) => (
                <div key={index} className={`w-full cursor-pointer py-3 flex justify-between font-medium tracking-[1px] 
                  text-xs lg:text-sm ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
                >
              
                    <div className='w-[40px] text-center flex items-center justify-center'>
                      {index + 1 + perPage * (page - 1)}
                    </div>

                    <div className='w-[calc(100%-130px)] grid grid-cols-12'>
                      <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>
                        {parcel.code}
                      </p>
        
                      <p className='md:flex hidden items-center justify-center text-center col-span-3'>
                        {parcel.packageDetails?.sender_address?.split('-').pop()}
                      </p>

                      <p className='md:flex hidden items-center justify-center text-center col-span-3'>
                        {parcel.packageDetails?.receiver_address?.split('-').pop()}
                      </p>
      
                      <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3'>
                        {String(new Date(parcel.created_at).getDate()).padStart(2, '0')}
                        /{String(new Date(parcel.created_at).getMonth() + 1).padStart(2, '0')}
                        /{String(new Date(parcel.created_at).getFullYear())}
                      </p>
                    </div>
    
                    <div className='w-[90px] space-x-1 flex items-center justify-center'>
                      <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
                        onClick={() => {
                          setParcelDetail(parcel)
                          setIsOpenDetail(true);
                        }}
                      >
                        <FaEye size={15} />
                      </button>

                      <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
                        onClick={() => {
                          
                        }}
                      >
                        <BsFillSendFill size={15} />
                      </button>
                    </div>
                </div>
              ))}
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
            </>
          )}
        </div>

        
      </div>

      {isOpenDetail && <ParcelDetail parcelDetail={parcelDetail!} />}
    </motion.div>
  )
}
