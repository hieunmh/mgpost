import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import { useTransactionInfo } from '@/hooks/useTransactionInfo';

import { TiLocation } from 'react-icons/ti';
import { FaBarcode } from 'react-icons/fa6';

import { LuPackage, LuPackageCheck, LuPackageOpen } from 'react-icons/lu';

export default function Overview() {

  const { userInfo } = useUser();

  const { transactionInfo, setTransactionInfo } = useTransactionInfo();


  useEffect(() => {
    const getTransactionInfo = async () => {
      const res = await axios.get(`/api/transaction/getTransactionInfo?userID=${userInfo?.id}`);
      setTransactionInfo(res.data.data);
      
    }

    if (!transactionInfo) {
      getTransactionInfo();
    }
  }, []);

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-full'
    >
      <div className='w-full h-full text-gray-300 space-y-5'>
          <div className='w-full h-fit space-y-5 bg-[#363636]/20 p-5 rounded-md'>
            <p className='flex w-full items-center justify-center font-bold text-lg md:text-3xl'>
              {transactionInfo?.name}
            </p>
            <div className='w-full md:flex font-semibold text-xs sm:text-sm items-center justify-around space-y-2 md:space-y-0'>
              <div className='flex items-center justify-center space-x-2'>
                <TiLocation className='text-[20px] mb-1' />
                <p>{transactionInfo?.address}</p>
              </div>

              <div className='flex items-center justify-center space-x-2'>
                <FaBarcode />
                <p>Zip code: {transactionInfo?.zipcode}</p>
                </div>
            </div>
          </div>

          <div className='w-full h-fit bg-[#363636]/20 p-5 rounded-md space-y-5'>
            <p className='font-bold text-2xl'>Overview</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 justify-between'>
              <div className='flex items-center w-full md:justify-center space-x-2 md:space-x-5 font-semibold'>
                <div className='h-11 w-11 md:h-[60px] md:w-[60px] bg-gray-200/5 rounded-2xl flex items-center justify-center'>
                  <LuPackage className='text-[25px] md:text-[40px]' />
                </div>

                <div className='md:h-[60px] h-11 flex flex-col justify-between'>
                  <p className='font-medium text-xs md:text-xl text-gray-400'>Total Goods</p>
                  <p className='font-bold md:text-xl text-sm'>460</p>
                </div>
              </div>

              <div className='flex items-center w-full md:justify-center space-x-2 md:space-x-5 font-semibold'>
                <div className='h-11 w-11 md:h-[60px] md:w-[60px] bg-gray-200/5 rounded-2xl flex items-center justify-center'>
                  <LuPackageOpen className='text-[25px] md:text-[40px]' />
                </div>

                <div className='md:h-[60px] h-11 flex flex-col justify-between'>
                  <p className='font-medium text-xs md:text-xl text-gray-400'>In Warehouse</p>
                  <p className='font-bold md:text-xl text-sm'>200</p>
                </div>
              </div>

              <div className='flex items-center w-full md:justify-center space-x-2 md:space-x-5 font-semibold'>
                <div className='h-11 w-11 md:h-[60px] md:w-[60px] bg-gray-200/5 rounded-2xl flex items-center justify-center'>
                  <LuPackageCheck className='text-[25px] md:text-[40px]' />
                </div>

                <div className='md:h-[60px] h-11 flex flex-col justify-between'>
                  <p className='font-medium text-xs md:text-xl text-gray-400'>Delivered</p>
                  <p className='font-bold md:text-xl text-sm'>260</p>
                </div>
              </div>


            </div>
          </div>
      </div>
    </motion.div>
  )
}
