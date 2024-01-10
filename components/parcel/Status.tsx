'use client';

import React from 'react';

import { PackageStatusType } from '@/types/type';
import { FaLocationDot } from 'react-icons/fa6';

export default function Status({ status } : { status: PackageStatusType }) {

  const dateTime = new Date(status.created_at);

  return (
    <div className='w-full text-gray-300 flex justify-between items-center'>

      <div className='flex space-x-5 font-semibold'>
        <FaLocationDot size={24} />
        <p>{status.current_location}</p>
      </div>

      <div className='flex flex-col font-semibold text-center'>
        <p>{dateTime.getDate()}/{dateTime.getMonth() + 1}/{dateTime.getFullYear()}</p>
        <p>{dateTime.toLocaleTimeString('en-US', { hour12: false })}</p>
      </div>
    </div>
  )
}
