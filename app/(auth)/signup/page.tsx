'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { FaLock, FaPhoneAlt, FaUser } from 'react-icons/fa';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

type Inputs = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function Login() {

  let [emailError, setEmailError] = useState<string>('');
  let [passwordError, setPasswordError] = useState<string>('');
  let [phoneError, setPhoneError] = useState<string>('');
  let [serverError, setServerError] = useState<string>('');

  let [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Inputs>();
  const searchparam =  useSearchParams();
  const router = useRouter();

  const supabase = createClientComponentClient();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    if (formData.email.length === 0) {
      setEmailError('Please enter your email');
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError('Invalid email!');
      return;
    } else {
      setEmailError('');
    }

    if (formData.phone.length === 0) {
      setPhoneError('Please enter your phone number');
      return;
    } else if (!formData.phone.startsWith('0')) {
      setPhoneError('Phone number must be start with 0');
      return;
    } else if (formData.phone.length < 10) {
      setPhoneError('Phone number must be 10 character');
      return;
    } else {
      setPhoneError('');
    }

    if (formData.password.length === 0) {
      setPasswordError('Please enter your password');
      return;
    } else if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }

    setIsLoading(true);
    const res = await axios.post('/api/auth/signup', formData);

    if (res.data.error) {
      if (res.data.error.message === 'Invalid login credentials') {
        setServerError('Please check your email or password!');
      } else {
        setServerError(res.data.error.message);   
      }
    } else {      
      if (searchparam.get('redirect')) {
        router.push(searchparam.get('redirect') as string);
      } else {
        router.push('/');
      }
    }
    router.refresh();

    setIsLoading(false);
  }

  const loginGoogle = () => {
    console.log('Login GG');
  }


  return (
    <div className='h-screen w-full'>
      <div className='w-full h-full flex items-center justify-center lg:space-x-20'>
        <div className='lg:block hidden'>
          <Link href={'/'}>
            <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[400px]' />
          </Link>
        </div>

        <div className='w-[500px] h-fit lg:bg-[#363636]/20 rounded p-8 flex flex-col items-center'>
          <h4 className='text-2xl font-semibold text-gray-200 text-center lg:block hidden'>Sign up</h4>

          <Link href={'/'}>
            <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} 
              className='w-[100px] items-center lg:hidden block' 
            />
          </Link>

          <form className='w-full mt-10 space-y-3'>
            <div className='rounded h-20'>
              <div className={`flex items-center border-b ${emailError 
                ? 'border-b-red-400' : 'border-b-neutral-500/50'}`}
              >
                <FaUser className='text-gray-200 ml-4 text-xl' />
                <input type='email' placeholder='Email' {...register('email')}
                  className='w-full outline-none font-semibold bg-transparent text-gray-200 px-4 py-2 rounded' 
                />
              </div>
              <p className='text-red-400 font-semibold text-xs mt-2'>{emailError}</p>
            </div>

            <div className='rounded h-20'>
              <div className={`flex items-center border-b ${phoneError 
                ? 'border-b-red-400' : 'border-b-neutral-500/50'}`}>
                <FaPhoneAlt className='text-gray-200 ml-4 text-xl' />
                <input type='text' placeholder='Phone' {...register('phone')} maxLength={10}
                  pattern='[0-9]*' onKeyDown={(e) => !/[0-9]/.test(e.key) && e.key != 'Backspace' && e.preventDefault()}
                  className='w-full outline-none font-semibold bg-transparent text-gray-200 px-4 py-2 rounded' 
                />
              </div>
              <p className='text-red-400 font-semibold text-xs mt-2'>{phoneError}</p>
            </div>

            <div className='rounded h-20'>
              <div className={`flex items-center border-b ${passwordError 
                ? 'border-b-red-400' : 'border-b-neutral-500/50'}`}>
                <FaLock className='text-gray-200 ml-4 text-xl' />
                <input type='password' placeholder='Password' {...register('password')}
                  className='w-full outline-none font-semibold bg-transparent text-gray-200 px-4 py-2 rounded' 
                />
              </div>
              <p className='text-red-400 font-semibold text-xs mt-2'>{passwordError}</p>
            </div>

            <button onClick={handleSubmit(onSubmit)} className='rounded bg-[#5c9ead] w-full py-4 
              text-gray-300 font-bold flex items-center justify-center hover:scale-[1.02]'
            >
              {!isLoading ? (
                <p className='h-[25px]'>Sign Up</p>
              ) : (
                <div className='h-[25px]'>
                  <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                    <circle cx="50" cy="50" r="40"  />
                  </svg>
                </div>
              )}
            </button>
          </form>

          <div className='w-full mt-5 flex flex-col'>
            <div className='w-full flex flex-col h-20'>
              <button onClick={loginGoogle} className='w-full bg-neutral-500/10 hover:bg-neutral-500/20 
                font-semibold text-gray-300 py-4 rounded flex items-center justify-center'
              >
                <Image src={'/google-logo.png'} alt='google logo' width={1000} height={1000} 
                  className='w-[20px] mr-2'
                />
                Login with Google
              </button>
              
              <p className='text-red-400 font-bold text-sm text-center mt-2'>{serverError}</p>
            </div>
            
            <p className='mt-3 text-center text-gray-300 font-semibold'>
              Have an account ? {' '}
              <Link href={'/login'} className='text-[#5c9ead] hover:underline'>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
