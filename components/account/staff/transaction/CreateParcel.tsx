
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';

import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Randomstring from 'randomstring';
import Image from 'next/image';

import { FaBarcode } from 'react-icons/fa6';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';

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

  const [code, setCode] = useState<string>('');
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<string>('');
  let [creating, setCreating] = useState<string>('');

  let [sendWard, setSendWard] = useState<string>('');
  let [sendDistrict, setSendDistrict] = useState<string>('');
  let [sendProvince, setSendProvince] = useState<string>('');

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
      setError('Please fill all!');
      return;
    } else {
      setError('');
    }

    setLoading(true);
    setCreating('Creating . . .')
    
    const res = await axios.post('/api/parcel/createParcel', formData);

    setCreating('');
    setLoading(false);
    
    if (res.data.error) {
      toast.error('Parcel created failed!');
    }
    else {
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
      backdrop-blur-md duration-500 flex items-center justify-center px-3 py-5 sm:px-20 sm:py-20'
    > 
      <motion.div className='w-full h-fit p-5 bg-[#363636]/70 rounded-xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-xl rounded-bl-xl'
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

          <div className='w-full space-y-5 gap-5 text-gray-200 font-medium text-xs lg:text-base'>
            <div className='w-full rounded-xl space-y-2 lg:space-y-5'>
              <p className='font-semibold text-2xl'>Sender information</p>
              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input {...register('senderName')} type='text' placeholder='Fullname'
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[60%] placeholder-gray-200/30' 
                />
                <input {...register('senderPhone')} type='text' placeholder='Phone number'
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[40%] placeholder-gray-200/30' 
                />
              </div>

              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input type='text' placeholder='Province' onChange={(e) => setSendProvince(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input type='text' placeholder='District' onChange={(e) => setSendDistrict(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input type='text' placeholder='Ward' onChange={(e) => setSendWard(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>
            </div>

            <div className='w-full rounded-xl space-y-2 lg:space-y-5'>
              <p className='font-semibold text-2xl'>Receiver information</p>
              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input {...register('receiverName')} type='text' placeholder='Fullname'
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[60%] placeholder-gray-200/30' 
                />
                <input {...register('receiverPhone')} type='text' placeholder='Phone number'
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[40%] placeholder-gray-200/30' 
                />
              </div>

              <div className='w-full flex space-x-2 lg:space-x-5'>
                <input type='text' placeholder='Province' onChange={(e) => setReceiveProvince(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input type='text' placeholder='District' onChange={(e) => setReceiveDistrict(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
                <input type='text' placeholder='Ward' onChange={(e) => setReceiveWard(e.target.value)}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                />
              </div>
            </div>
          </div>

          <div className='w-full text-gray-200 font-medium space-y-2 lg:space-y-5 text-xs lg:text-base'>
            <p className='text-2xl font-bold'>Parcel information</p>
            <div className='flex space-x-2 lg:space-x-5'>
              <input type='text' placeholder='Parcel name' {...register('parcelInfo')}
                className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[65%] placeholder-gray-200/30'  
              />
              <input type='number' placeholder='Weight (g)' min={0} {...register('weight')}
                className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[35%] placeholder-gray-200/30'  
              />
            </div>

            <div className='flex space-x-2 lg:space-x-5'>
              <input type='number' placeholder='Total (VND)' min={0} {...register('totalCharge')}
                className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[40%] placeholder-gray-200/30'  
              />
              <input type='text' placeholder='Note *' {...register('note')}
                className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-[60%] placeholder-gray-200/30'  
              />
            </div>
          </div>

          <div className='w-full h-[80px] flex flex-col justify-between'>
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

            <div className='w-full text-red-400 font-semibold text-center text-xs lg:text-base'>
              {error}
            </div>
            <div className='w-full text-green-600 font-semibold text-center text-xs lg:text-base'>
              {creating}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
