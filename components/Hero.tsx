'use client';

import { useDistrict } from '@/hooks/address/useDistrict';
import { useProvince } from '@/hooks/address/useProvince';
import { ProvinceType } from '@/types/type';
import Image from 'next/image';
import React from 'react';

export default function Hero() {
  
  const { provinces } = useProvince();
  const { districts } = useDistrict();

  return (
    <section className='flex flex-col gap-4 pb-12 pt-20 text-center lg:items-center px-2 lg:px-0'>
      <div className='flex flex-1 flex-col items-center gap-4 text-center'>
        <div className='space-y-4'>
          <h1 className='text-xl font-bold lg:text-5xl text-gray-300'>
            A trusted provide of delivery services
          </h1>
          <h2 className='text-lg lg:text-3xl text-neutral-500/90'>
            We deliver your product safe in a reasonable time
          </h2>
          {/* {districts.map((dis) => (
            <div key={dis.code} className='text-gray-200'>{dis.name}</div>
          ))} */}
        </div>
      </div>

      <div className='flex justify-center items-center w-full'>
        <Image src={'/delivery.png'} priority width={1000} height={1000} className='w- [1000px]' alt='Header image' />
      </div>
    </section>
  )
}
