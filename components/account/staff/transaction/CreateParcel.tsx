
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';

import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Randomstring from 'randomstring';
import Image from 'next/image';

import { FaBarcode } from 'react-icons/fa6';

type InputForm = {
  parcelInfo: string;
  sendAddress: string;
  reveiveAddress: string;
  senderName: string;
  receiverName: string;
  senderPhone: string;
  receiverPhone: string;
  note: string;
  totalCharge: number;
  weight: number;
  code: string;
}

export default function CreateParcel() {

  const { isOpen, setIsOpen } = useCreateParcel();

  const { register, handleSubmit } = useForm<InputForm>();

  const [code, setCode] = useState<string>('');

  const createParcel: SubmitHandler<InputForm> = async (formData) => {
    formData.code = code;

  }

  useEffect(() => {
    setCode(Randomstring.generate({ charset: 'alphabetic', length: 3 }).toUpperCase() 
    + Randomstring.generate({ charset: 'numeric', length: 10 }) + 'MG')
  }, [])

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-md duration-500 flex items-center justify-center px-3 py-5 sm:px-20 sm:py-20'
    > 
      <motion.div className='w-full h-full p-5 bg-[#363636]/70 rounded relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr'
          onClick={() => setIsOpen(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full mt-8 space-y-5'>
          <div className='w-full flex justify-between'>
            <div className='h-[32px] sm:h-[48px]'>
              <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} 
                className='w-[100px] sm:w-[150px]'
              />
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
              <p className='text-gray-200 font-semibold tracking-[2px] text-sm sm:text-base'>{code}</p>
            </div>
          </div>

          <div className='w-full grid md:grid-cols-2 gap-5 text-gray-200 font-medium text-xs lg:text-base'>
            <div className='w-full rounded space-y-2 lg:space-y-5'>
              <p className='font-semibold text-2xl'>Sender information</p>
              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input {...register('senderName')} type='text' placeholder='Fullname'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input {...register('senderPhone')} type='text' placeholder='Phone number'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>

              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input  type='text' placeholder='Province / City'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input  type='text' placeholder='District'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input  type='text' placeholder='Commune / Ward'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>
            </div>

            <div className='w-full rounded space-y-2 lg:space-y-5'>
              <p className='font-semibold text-2xl'>Receiver information</p>
              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input {...register('receiverName')} type='text' placeholder='Fullname'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input {...register('receiverPhone')} type='text' placeholder='Phone number'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>

              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input  type='text' placeholder='Province / City'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input  type='text' placeholder='District'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input  type='text' placeholder='Commune / Ward'
                  className='rounded shadow-lg bg-[#242424] py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>
            </div>
          </div>

          <div className='w-full text-white font-medium'>
            <p className='text-2xl font-bold'>Parcel Information</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
