import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { LuPackagePlus } from 'react-icons/lu';
import { useAllParcel } from '@/hooks/parcel/tran/useAllParcel';
import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import CreateParcel from './CreateParcel';
import { usePage } from '@/hooks/parcel/tran/useTranPage';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ParcelCom from './ParcelCom';

export default function Parcel() {

  const { allParcel, setAllParcel } = useAllParcel();
  const { isOpen, setIsOpen } = useCreateParcel();
  const { page, perPage, numberPage, setPage, setNumberPage } = usePage();

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-[calc(100vh-184px)] sm:h-[calc(100vh-216px)] rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full rounded text-gray-300 flex flex-col space-y-5'>
        <div className='flex justify-between items-center text-center'>
          <p className='font-extrabold text-base sm:text-3xl'>Warehouse</p>
          <button className='flex font-medium items-center justify-center 
            space-x-2 bg-[#5c9ead] hover:bg-[#5c9ead]/85 rounded px-2 py-1 sm:px-6 sm:py-2'
            onClick={() => setIsOpen(true)}
          >
            <LuPackagePlus className='mb-1 sm:text-[24px]' />
            <p className='tracking-[1px] text-xs sm:text-sm'>Create parcel</p>
          </button>
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

          {allParcel.filter(parcel => parcel.status == 'In warehouse').length === 0 ? (
            <div className='flex items-center font-bold text-2xl md:text-4xl mt-5 justify-center'>
              No parcel found!
            </div>
          ) : (
            <>
              {allParcel.filter(parcel => parcel.status === 'In warehouse')
                ?.slice((perPage * (page - 1)), perPage * page).map((parcel, index) => (
                <div key={index} className={`w-full cursor-pointer py-3 flex justify-between font-medium tracking-[1px] 
                  text-xs lg:text-sm ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
                >
                  <ParcelCom parcel={parcel} index={index} />
                </div>
              ))}
            </>
          )}
        </div>

        <div className='w-full h-fit flex items-center justify-center'>
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
    </motion.div>
  )
}
