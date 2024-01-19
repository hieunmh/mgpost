import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';
import { useAllAgg } from '@/hooks/useAllAgg';
import { useAllTranByAgg } from '@/hooks/useAllTranByAgg';
import Image from 'next/image';
import { FaBarcode } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useTranNextAddress } from '@/hooks/parcel/useTranNextAddress';

type ParcelDetailType = PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]}

export default function NextAddress({ parcelDetail } : { parcelDetail: ParcelDetailType }) {

  const { isOpenNextAddress, setIsOpenNextAddress } = useTranNextAddress();

  const { allAgg } = useAllAgg();
  const { allTranByAgg }  = useAllTranByAgg();

  let [nextAddress, setNextAddress] = useState<string>('');
  let [loading, setLoading] = useState<boolean>(false);



  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    >
      <motion.div className='w-[500px] h-fit p-3 md:p-5 bg-[#363636] rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpenNextAddress(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full space-y-3 lg:space-y-5 text-gray-300 font-semibold'>
          <div className='w-full flex justify-around'>
            <div className='h-[32px] sm:h-[48px]'>
              <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[100px] sm:w-[150px]'/>
            </div>

            <div className='flex flex-col items-center h-[32px] sm:h-[48px] justify-between'>
              <div className='flex'>
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
                <FaBarcode className='text-gray-200 sm:text-[25px]' />
              </div>
              <p className='text-gray-200 font-semibold tracking-[2px] text-xs sm:text-base'>{parcelDetail?.code}</p>
            </div>
          </div>


          {parcelDetail.packageStatus.length <= 1 && (
            <button className='w-full bg-[#5c9ead] py-3 px-5 rounded flex items-center justify-center text-center'

            >
              {loading ? (
                  <div className='h-[24px] w-full items-center flex justify-center'>
                    <svg viewBox="0 0 100 100" className='loading h-full stroke-gray-200'>
                      <circle cx="50" cy="50" r="40"  />
                    </svg>
                  </div>
                ) : (
                  <div className='h-[24px] w-full text-center flex items-center justify-center'>
                    <div className='flex items-center justify-center space-x-2'>
                      <p>Send to aggregation</p>
                    </div>
                  </div>
                )}
            </button> 
          )}

          <button className='w-full bg-[#5c9ead] py-3 px-5 rounded flex items-center justify-center text-center'
          >
            {loading ? (
                <div className='h-[24px] w-full items-center flex justify-center'>
                  <svg viewBox="0 0 100 100" className='loading h-full stroke-gray-200'>
                    <circle cx="50" cy="50" r="40"  />
                  </svg>
                </div>
              ) : (
                <div className='h-[24px] w-full text-center flex items-center justify-center'>
                  <div className='flex items-center justify-center space-x-2'>
                    <p>Send to customer</p>
                  </div>
                </div>
              )}
          </button> 

        </div>
      </motion.div>
    </div>
  )
}
