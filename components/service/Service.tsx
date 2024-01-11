import React from 'react';

import { FaClock, FaMap, FaTruck, FaUser } from 'react-icons/fa';

export default function Service() {
  return (
    <div className='w-full px-5 flex items-center justify-center mb-5 lg:my-20'>
      <div className='w-[1100px] grid grid-cols-2 gap-10 lg:grid-cols-4 text-gray-300'>
        <div className='flex flex-col items-center space-y-5 my-5'>
          <FaMap size={40} />
          <p className='font-bold text-[#5c9ead] text-2xl lg:text-4xl'>63+</p>
          <p className='text-sm sm:text-xl font-semibold'>States Covered</p>
        </div>

        <div className='flex flex-col items-center space-y-5 my-5'>
          <FaUser size={40} />
          <p className='font-bold text-[#5c9ead] text-2xl lg:text-4xl'>611k</p>
          <p className='text-sm sm:text-xl font-semibold'>Happy Clients</p>
        </div>

        <div className='flex flex-col items-center space-y-5 my-5'>
          <FaTruck size={40} />
          <p className='font-bold text-[#5c9ead] text-2xl lg:text-4xl'>260M+</p>
          <p className='text-sm sm:text-xl font-semibold'>Goods Delivery</p>
        </div>

        <div className='flex flex-col items-center space-y-5 my-5'>
          <FaClock size={40} />
          <p className='font-bold text-[#5c9ead] text-2xl lg:text-4xl'>250M+</p>
          <p className='text-sm sm:text-xl font-semibold'>Business Hours</p>
        </div>
      </div>
    </div>
  )
}
