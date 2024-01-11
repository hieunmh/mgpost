import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import React from 'react';

import { GoHomeFill } from 'react-icons/go';
import { BiSolidPackage } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';

export default function StaffSidebar({}) {

  const { userInfo } = useUser();

  return (
    <div className='w-[80px] sm:w-[30vw] sm:max-w-[250px] h-screen bg-[#363636]/20 py-8 flex flex-col justify-between'>
      <div>
        <div className='px-5'>
          <Link href={'/'} className='bg-gray-300 rounded-full sm:rounded p-1.5 sm:p-2 
            items-center w-fit sm:w-full flex font-semibold sm:space-x-2'
          >
            <GoHomeFill size={24} className='sm:ml-4' />
            <p className='sm:block hidden text-xs md:text-sm'>Back to home</p>
          </Link>
        </div>

        <div className='pt-5 px-3 sm:px-5 space-y-5 flex flex-col'>
          <p className='w-full text-gray-300 font-bold text-center uppercase hidden sm:block text-sm md:text-base'>
            {userInfo?.role}
          </p>

          <button className='w-full rounded py-3 bg-neutral-500/50 flex 
            space-x-2 items-center justify-center text-lg text-gray-300'
          >
            <HiViewGrid size={30} />
            <p className='hidden sm:block font-semibold text-sm md:text-base'>Overview</p>
          </button>

          <button className='w-full rounded py-3 bg-neutral-500/20 flex 
            space-x-2 items-center justify-center text-lg text-gray-300'
          >
            <BiSolidPackage size={30} />
            <p className='hidden sm:block font-semibold text-sm md:text-base'>Parcel</p>
          </button>
        </div>
      </div>

      <p className='text-gray-300 uppercase whitespace-nowrap 
        tracking-[5px] font-bold text-xl -rotate-90 pl-8 sm:hidden'
      >
        {userInfo?.role}
      </p>
    </div>
  )
}
