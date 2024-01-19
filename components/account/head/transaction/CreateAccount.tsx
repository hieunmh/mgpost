import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreateAccount } from '@/hooks/manager/tran/useCreateAccount';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useTransactionInfo } from '@/hooks/useTransactionInfo';

export default function CreateAccount() {

  const { setIsOpen } = useCreateAccount();
  const { transactionInfo, setTransactionInfo } = useTransactionInfo();

  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [phone, setPhone] = useState<string>('');


  const createAccount = async () => {
    const res = await axios.post('api/transaction/createStaff', {
      email: email,
      password: password,
      phone: phone, 
      address: transactionInfo?.address,
    });
    
  }

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    >
      <motion.div className='w-[1100px] h-[500px] p-5 bg-[#363636]/70 rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpen(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div>

        </div>
      </motion.div>
    </div>
  )
}
