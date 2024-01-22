import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreateAccount } from '@/hooks/manager/tran/useCreateAccount';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useTransactionInfo } from '@/hooks/useTransactionInfo';
import Image from 'next/image';

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateAggAccount } from '@/hooks/manager/agg/useCreateAggStaff';
import { useAggInfo } from '@/hooks/useAggInfo';

type InputForm = {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export default function CreateAccount() {

  const { setIsOpen } = useCreateAggAccount();
  const { transactionInfo, setTransactionInfo } = useTransactionInfo();
  const { aggInfo } = useAggInfo();
  const { register, handleSubmit } = useForm<InputForm>();

  let [loading, setLoading] = useState<boolean>(false);

  const createAccount: SubmitHandler<InputForm> = async (formData) => {
    if (!formData.email || !formData.name || !formData.password || !formData.phone) {
      toast.error('Please fill all!');
      return;
    }

    setLoading(true);
    const res = await axios.post('api/aggregation/createAggStaff', {
      email: formData.email,
      password: formData.password,
      phone: '84' + formData.phone.substring(1), 
      address: aggInfo?.address,
      name: formData.name,
    });

    setLoading(false);
    
    if (res.data.error) {
      toast.error('Create fail!');
    } else {
      toast.success('Create account successfully!');
      setTimeout(() => setIsOpen(false), 1000);
    }
  }

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    >
      <motion.div className='w-[800px] h-fit p-5 bg-[#363636]/70 rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpen(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full rounded space-y-5'>
          <div className='w-full flex justify-start'>
            <div className='h-[32px] sm:h-[48px]'>
              <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[100px] sm:w-[150px]'/>
            </div>
            <div></div>
          </div>

          <div className='w-full text-gray-300 space-y-5 font-semibold'>
            <div className='md:flex w-full space-y-5 md:space-y-0 md:space-x-5'>
              <div className='w-full space-y-1'>
                <p>Name</p>
                <input type='text' maxLength={25} {...register('name')}
                  className='outline-none bg-[#242424]/70 w-full rounded px-4 py-1.5' 
                />
              </div>

              <div className='w-full space-y-1'>
                <p>Email</p>
                <input type='email' {...register('email')}
                  className='outline-none bg-[#242424]/70 w-full rounded px-4 py-1.5' 
                />
              </div>
            </div>

            <div className='md:flex w-full space-y-5 md:space-y-0 md:space-x-5'>
              <div className='w-full md:w-[70%] space-y-1'>
                <p>Password</p>
                <input type='text' {...register('password')}
                  className='outline-none bg-[#242424]/70 w-full rounded px-4 py-1.5' 
                />
              </div>

              <div className='w-full md:w-[30%] space-y-1'>
                <p>Phone</p>
                <input type='text' {...register('phone')}
                  className='outline-none bg-[#242424]/70 w-full rounded px-4 py-1.5' maxLength={10}
                  pattern='[0-9]*' onKeyDown={(e) => !/[0-9]/.test(e.key) && e.key != 'Backspace' && e.preventDefault()}
                />
              </div>
            </div>
          </div>

          <button onClick={handleSubmit(createAccount)}
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
