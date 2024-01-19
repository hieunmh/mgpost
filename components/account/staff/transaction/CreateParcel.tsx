import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import SendAddress from './SendAddress';
import ReceiveAddress from './ReceiveAddress';

import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Randomstring from 'randomstring';
import Image from 'next/image';

import { FaBarcode } from 'react-icons/fa6';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';

import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';
import { useSendAddress } from '@/hooks/address/useSendAddress';
import { useReceiveAddress } from '@/hooks/address/useReceiveAddress';

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

  const { setIsOpen } = useCreateParcel();
  const { userInfo } = useUser();
  const { register, handleSubmit } = useForm<InputForm>();

  let [fee, setFee] = useState<number>();

  const { sendDetail, sendWard, sendDistrict, sendProvince, 
    setSendDetail, setSendWard, setSendDistrict, setSendProvince 
  } = useSendAddress();

  const { reveiveDetail, receiveWard, receiveDistrict, receiveProvince, 
    setReceiveDetail, setReceiveWard, setReceiveDistrict, setReceiveProvince 
  } = useReceiveAddress();

  let [code, setCode] = useState<string>('');
  let [loading, setLoading] = useState<boolean>(false);

  const createParcel: SubmitHandler<InputForm> = async (formData) => {
    formData.userID = userInfo?.id as string;
    formData.code = code;
    formData.totalCharge = fee ? fee * 11 / 10 : 0;

    formData.sendAddress = sendDetail + ' - ' + sendWard + ' - ' + sendDistrict + ' - ' + sendProvince;
    formData.reveiveAddress = reveiveDetail +  ' - ' + receiveWard + ' - ' + receiveDistrict + ' - ' + receiveProvince;

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
      return;
    } else {
      toast.success('Parcel created successfully!');

      setSendProvince('');
      setSendDistrict('');
      setSendWard('');
      setSendDetail('');

      setReceiveProvince('');
      setReceiveDistrict('');
      setReceiveWard('');
      setReceiveDetail('');

      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }

  useEffect(() => {
    setCode(Randomstring.generate({ charset: 'alphabetic', length: 3 }).toUpperCase() 
    + Randomstring.generate({ charset: 'numeric', length: 10 }) + 'MG')
  }, [])

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
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
            <div className='w-full bg-gray-200/0 rounded-xl'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-2xl'>Sender information</p>

                <div className='w-full flex space-x-2 md:space-x-5'>
                  <input {...register('senderName')} type='text' placeholder='Name'
                    className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[65%] placeholder-gray-200/30' 
                  />
                  <input {...register('senderPhone')} type='text' placeholder='Phone' maxLength={10}
                    className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[35%] placeholder-gray-200/30' 
                  />
                </div>

                <SendAddress />
              </div>
            </div>
            
            <div className='w-full bg-gray-200/0 rounded-xl'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-2xl'>Receiver information</p>
                <div className='w-full flex space-x-2 md:space-x-5'>
                  <input {...register('receiverName')} type='text' placeholder='Name'
                    className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[65%] placeholder-gray-200/30' 
                  />
                  <input {...register('receiverPhone')} type='text' placeholder='Phone' maxLength={10}
                    className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[35%] placeholder-gray-200/30' 
                  />
                </div>

                <ReceiveAddress />
              </div>
            </div>
          </div>

          <div className='w-full text-gray-200 font-medium '>
            <div className='w-full bg-gray-200/0 rounded-xl font-medium space-y-2 md:space-y-5 text-xs lg:text-sm'>
              <p className='text-2xl font-bold'>Parcel information</p>

              <div className='flex space-x-2 md:space-x-5'>
                <input type='text' placeholder='Parcel name' {...register('parcelInfo')}
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[65%] placeholder-gray-200/30'  
                />
                <input type='number' placeholder='Weight (g)' min={0} {...register('weight')}
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-[35%] placeholder-gray-200/30'  
                />
              </div>

              <div className='flex space-x-2 md:space-x-5'>
                <input type='number' placeholder='Fee (VND)' min={0} onChange={(e) => setFee(Number(e.target.value))}
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />

                <input type='text' placeholder='VAT (10%)' min={0} 
                  value={fee ? (fee / 10).toLocaleString() : ''} disabled
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />

                <input type='text' placeholder='Total (VND)' min={0} {...register('totalCharge')} 
                  value={fee ? (fee * 11 / 10).toLocaleString() : ''} disabled
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />
              </div>

              <input type='text' placeholder='Note *' {...register('note')}
                  className='bg-[#242424]/50 rounded py-2 px-4 outline-none w-full placeholder-gray-200/30'  
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
