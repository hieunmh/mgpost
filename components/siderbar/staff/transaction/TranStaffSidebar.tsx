import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import React from 'react';

import { GoHomeFill } from 'react-icons/go';
import { BiSolidPackage } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import { useTransactionStaff } from '@/hooks/staff/useTransactionStaff';

export default function StaffSidebar({}) {

  const { userInfo } = useUser();

  const { menu, setMenu } = useTransactionStaff();

  return (
    <div className='w-[70px] lg:w-[30vw] lg:max-w-[250px] h-screen bg-[#363636]/20 flex flex-col justify-between'>
      <div>
        <div className='py-5 lg:px-5 px-0 h-[100px] flex items-center justify-center'>
          <Link href={'/'} className='bg-gray-300 rounded-full lg:rounded p-1.5 lg:p-2 
            items-center w-fit lg:w-full flex font-semibold lg:space-x-2 justify-center'
          >
            <GoHomeFill size={24} />
            <p className='lg:block hidden text-xs md:text-sm'>Back to home</p>
          </Link>
        </div>

        <div className='px-3 lg:px-5 space-y-5 flex flex-col'>
          <p className='w-full text-gray-300 font-bold text-center uppercase hidden lg:block text-sm md:text-base'>
            {userInfo?.role}
          </p>

          <button className={`w-full rounded py-2 flex space-x-2 items-center justify-center transition
            text-lg text-gray-300 ${menu == 'overview' ? 'bg-[#5c9ead] duration-500' : 'bg-neutral-500/20 duration-0'}`}
            onClick={() => setMenu('overview')}
          >
            <HiViewGrid size={30} />
            <p className='hidden lg:block font-semibold text-sm md:text-base'>Overview</p>
          </button>

          <button className={`w-full rounded py-2 flex space-x-2 items-center justify-center transition
            text-lg text-gray-300 ${menu == 'parcel' ? 'bg-[#5c9ead] duration-500' : 'bg-neutral-500/20 duration-0'}`}
            onClick={() => setMenu('parcel')}
          >
            <BiSolidPackage size={30} />
            <p className='hidden lg:block font-semibold text-sm md:text-base'>Parcel</p>
          </button>
        </div>
      </div>

      <p className='text-gray-300 uppercase whitespace-nowrap 
        tracking-[5px] font-bold text-xl -rotate-90 pl-16 lg:hidden'
      >
        {userInfo?.role}
      </p>
    </div>
  )
}
