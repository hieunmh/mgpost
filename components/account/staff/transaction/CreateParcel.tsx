import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import SendAddress from './SendAddress';

import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Randomstring from 'randomstring';
import Image from 'next/image';

import { FaBarcode } from 'react-icons/fa6';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';

import { useProvince } from '@/hooks/address/useProvince';
import { useDistrict } from '@/hooks/address/useDistrict';
import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import { useSendAddress } from '@/hooks/address/useSendAddress';

type InputForm = {
  userID: string;
  parcelInfo: string;
  
  sendAddress: string;
  senderName: string;
  senderPhone: string;

  reveiveAddress: string;
  receiverName: string;
  receiverPhone: string;

  note: string;
  totalCharge: number;
  weight: number;
  code: string;
}

export default function CreateParcel() {

  const { isOpen, setIsOpen } = useCreateParcel();

  const { userInfo } = useUser();

  const { register, handleSubmit } = useForm<InputForm>();

  const { sendWard, sendDistrict, sendProvince } = useSendAddress();

  let [code, setCode] = useState<string>('');
  let [loading, setLoading] = useState<boolean>(false);


  let [receiveWard, setReceiveWard] = useState<string>('');
  let [receiveDistrict, setReceiveDistrict] = useState<string>('');
  let [receiveProvince, setReceiveProvince] = useState<string>('');


  const createParcel: SubmitHandler<InputForm> = async (formData) => {
    formData.userID = userInfo?.id as string;
    formData.code = code;
    formData.sendAddress = sendWard + ' - ' + sendDistrict + ' - ' + sendProvince;
    formData.reveiveAddress = receiveWard + ' - ' + receiveDistrict + ' - ' + receiveProvince;

    if (!formData.senderName || !formData.senderPhone || !sendWard || !sendDistrict || !sendProvince
      || !formData.receiverName || !formData.receiverPhone || !receiveWard || !receiveDistrict || !receiveProvince
      || !formData.weight || !formData.totalCharge || !formData.parcelInfo 
    ) {
      toast.error('Please fill all!');
      return;
    }

    setLoading(true);
    const res = await axios.post('/api/parcel/createParcel', formData);
    setLoading(false);
    
    if (res.data.error) {
      toast.error('Parcel created failed!');
    } else {
      toast.success('Parcel created successfully!');
    }

    setIsOpen(false);
  }

  useEffect(() => {
    setCode(Randomstring.generate({ charset: 'alphabetic', length: 3 }).toUpperCase() 
    + Randomstring.generate({ charset: 'numeric', length: 10 }) + 'MG')
  }, [])

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-md duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    > 
      <motion.div className='w-[1100px] h-fit p-5 bg-[#363636]/70 rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpen(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full space-y-5'>
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
              <p className='text-gray-200 font-semibold tracking-[2px] text-xs sm:text-base'>{code}</p>
            </div>
          </div>

          <div className='w-full lg:flex lg:space-y-0 space-y-5 gap-5 text-gray-200 font-medium text-xs lg:text-sm'>
            <div className='w-full'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-2xl'>Sender information</p>

                <div className='w-full flex space-x-2 md:space-x-5'>
                  <input {...register('senderName')} type='text' placeholder='Name'
                    className='bg-transparent border-b border-b-gray-200/20 
                    py-2 px-4 outline-none w-[65%] placeholder-gray-200/30' 
                  />
                  <input {...register('senderPhone')} type='text' placeholder='Phone' maxLength={10}
                    className='bg-transparent border-b border-b-gray-200/20 
                    py-2 px-4 outline-none w-[35%] placeholder-gray-200/30' 
                  />
                </div>

                <SendAddress />
              </div>
            </div>
            
            <div className='w-full'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-2xl'>Receiver information</p>
                <div className='w-full flex space-x-2 md:space-x-5'>
                  <input {...register('receiverName')} type='text' placeholder='Name'
                    className='bg-transparent border-b border-b-gray-200/20 py-2 px-4 outline-none w-[65%] placeholder-gray-200/30' 
                  />
                  <input {...register('receiverPhone')} type='text' placeholder='Phone' maxLength={10}
                    className='bg-transparent border-b border-b-gray-200/20 py-2 px-4 outline-none w-[35%] placeholder-gray-200/30' 
                  />
                </div>

                <div className='w-full flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5'>
                  <input type='text' placeholder='Province' onChange={(e) => setReceiveProvince(e.target.value)}
                    className='bg-transparent border-b border-b-gray-200/20 py-2 px-4 outline-none w-full md:w-1/3 placeholder-gray-200/30' 
                  />
                  <div className='w-full md:w-2/3 flex space-x-2 md:space-x-5'>
                    <input type='text' placeholder='District' onChange={(e) => setReceiveDistrict(e.target.value)}
                      className='bg-transparent border-b border-b-gray-200/20 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                    />
                    <input type='text' placeholder='Ward' onChange={(e) => setReceiveWard(e.target.value)}
                      className='bg-transparent border-b border-b-gray-200/20 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full text-gray-200 font-medium space-y-2 md:space-y-5 text-xs lg:text-sm'>
            <p className='text-2xl font-bold'>Parcel information</p>
            <div className='flex space-x-2 md:space-x-5'>
              <input type='text' placeholder='Parcel name' {...register('parcelInfo')}
                className='bg-transparent border-b border-b-gray-200/20 
                py-2 px-4 outline-none w-[65%] placeholder-gray-200/30'  
              />
              <input type='number' placeholder='weight (g)' min={0} {...register('weight')}
                className='bg-transparent border-b border-b-gray-200/20 
                py-2 px-4 outline-none w-[35%] placeholder-gray-200/30'  
              />
            </div>

            <div className='flex space-x-2 md:space-x-5'>
              <input type='number' placeholder='Fee (VND)' min={0} {...register('totalCharge')}
                className='bg-transparent border-b border-b-gray-200/20 
                py-2 px-4 outline-none w-full placeholder-gray-200/30'  
              />

              <input type='text' placeholder='Note *' {...register('note')}
                className='bg-transparent border-b border-b-gray-200/20 
                py-2 px-4 outline-none w-full placeholder-gray-200/30'  
              />
            </div>
          </div>

          <button onClick={handleSubmit(createParcel)}
            className='w-full bg-[#5c9ead] hover:bg-[#5c9ead]/85 
            px-4 py-2 rounded text-gray-200 text-sm lg:text-base flex items-center justify-center'
          >
            {loading ? (
              <div className='h-[25px]'>
                <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                  <circle cx="50" cy="50" r="40"  />
                </svg>
              </div>
            ) : (
              <p className='h-[25px]'>Create</p>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
