import Image from 'next/image';
import React from 'react';

import { TiLocation } from 'react-icons/ti';
import { FaBusinessTime, FaRegCopyright } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='w-full px-5 pt-5 flex items-center justify-center bg-[#363636]/20'>
      <div className='w-[1100px] flex flex-col'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 text-gray-300 font-semibold'>
          <div className='space-y-3 flex flex-col items-center'>
            <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[100px]' />

            <p>MGP Magic Post Co.Ltd</p>

            <div className='flex font-medium items-center justify-center space-x-1 text-sm sm:text-lg'>
              <div className='flex space-x-2 items-center'>
                <TiLocation size={24} className='mb-1' />
                <p className='font-bold'>Address:</p>
              </div>
              <p>Tien Kien - Lam Thao - Phu Tho</p>
            </div>
          </div>

          <div className='lg:flex flex-col items-center justify-center space-y-3 hidden'>
            <p className='font-bold text-2xl'>Services</p>

            <div className='flex items-center space-x-2 font-medium'>
              <FaBusinessTime />
              <p>Business Services</p>
            </div>

            <div className='flex items-center space-x-2 font-medium'>
              <FaStore />
              <p>Personal Services</p>
            </div>
          </div>
        </div>

        <div className='w-full grid grid-cols-1 lg:grid-cols-2 font-semibold text-gray-300 
          pt-3 my-3 border-t border-t-neutral-500 text-[10px] sm:text-sm'
        >
          <div className='flex items-center justify-center lg:justify-start space-x-2'>
            <FaRegCopyright />
            <p className=''>2023 - 2024 All rights reserved | Build by Nguyen Minh Hieu</p>
          </div>

          <div className='lg:flex justify-end space-x-5 hidden'>
            <p className=' cursor-pointer hover:text-[#5c9ead]'>Privacy Policy</p>
            <p className=' cursor-pointer hover:text-[#5c9ead]'>Terms of Use</p>
          </div>
        </div>
      </div>  
    </div>
  )
}
