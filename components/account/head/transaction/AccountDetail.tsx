import React from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useAccountDetail } from '@/hooks/manager/tran/useAccountDetail';
import { TransactionType, UserInfoType } from '@/types/type';
import Image from 'next/image';

type accountDetail = UserInfoType & { transaction: TransactionType }

export default function AccountDetail({ account } : { account: accountDetail }) {

  const { setIsOpenDetail } = useAccountDetail();

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    >
      <motion.div className='w-[600px] h-fit p-5 bg-[#363636] rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpenDetail(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full space-y-5'>
          <div className='w-full flex justify-start'>
            <div className='h-[32px] sm:h-[48px]'>
              <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[100px] sm:w-[150px]'/>
            </div>
            <div></div>
          </div>

          <div className='w-full text-center font-semibold text-gray-300 
            text-xl flex items-center justify-center sm:space-x-2'
          >
            <span className='sm:block hidden'>Staff code:</span>
            <p>MG-{account?.id.slice(-12)}</p>
          </div>

          <div className='w-full text-gray-300 rounded-xl bg-gray-200/5 p-5 h-fit
          font-semibold text-sm sm:text-base'
          >
            <div className='w-full h-fit flex'>
              <p className='w-full flex items-center py-5'>Name:</p>
              <p className='w-full flex items-center py-5'>{account?.name}</p>
            </div>

            <div className='w-full h-fit flex'>
              <p className='w-full flex items-center py-5'>Email:</p>
              <p className='w-full flex items-center py-5'>{account?.email}</p>
            </div>

            <div className='w-full h-fit flex'>
              <p className='w-full flex items-center py-5'>Phone:</p>
              <p className='w-full flex items-center py-5'>
                (+84) {account?.phone?.substring(2, 5)} {' '}
                {account?.phone?.substring(5, 8)} {' '}
                {account?.phone?.substring(8, 11)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
