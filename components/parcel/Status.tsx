'use client';

import React from 'react';

import { PackageStatusType } from '@/types/type';
import { FaLocationDot } from 'react-icons/fa6';

export default function Status({ status, index } : { status: PackageStatusType, index: number }) {

  const dateTime = new Date(status.created_at);

  return (
    <div className={`w-full  flex justify-between items-center space-x-5 text-xs md:text-base
    ${index == 0 ? 'text-green-600' : 'text-gray-300'}`}
    >
      <div className='flex items-center space-x-5 font-semibold'>
        <FaLocationDot size={24} />
        <p>{status.current_location}</p>
      </div>

      <div className='flex flex-col font-semibold text-center'>
        <p>
          {String(dateTime.getDate()).padStart(2, '0')}
          /{String(dateTime.getMonth() + 1).padStart(2, '0')}
          /{dateTime.getFullYear()}
        </p>
        <p>{dateTime.toLocaleTimeString('en-US', { hour12: false })}</p>
      </div>
    </div>
  )
}
