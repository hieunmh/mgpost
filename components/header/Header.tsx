'use client';

import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { FaUser } from 'react-icons/fa';
import { IoClose, IoMenu } from 'react-icons/io5';
import Menu from './Menu';
import { useMenu } from '@/hooks/useMenu';

export default function Header() {


  const { user, userInfo, isLoading } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { showMenu, setShowMenu } = useMenu();

  let [loading, setLoading] = useState<boolean>(false);


  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signOut();
    setLoading(false);

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  }


  const toggleMenu = () => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  }


  return (
    <div className='h-[100px] w-full p-5 flex justify-between items-center'>
      <div className=''>
        <Image src={'/mgpostwhite.png'} alt='logo' width={1000} height={1000} className='w-[100px]' />
      </div>

      <div className='lg:block hidden'>
        {!user ? (
          <div className='space-x-4 h-fit'>
            <Link href={'/login'}>
              <button className='bg-gray-200 px-6 py-1.5 font-semibold rounded-full hover:scale-110'>
                Log in
              </button>
            </Link>

            <Link href={'/signup'}>
              <button className='text-gray-300 px-6 py-1.5 font-semibold rounded-full hover:scale-110'>
                Sign up
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-x-4 items-center'>
            <button onClick={handleLogout} 
              className='bg-gray-200 px-6 py-1.5 flex text-center items-center rounded-full'
            >
              {loading ? (
                <div className='h-[24px] w-[60px] items-center flex justify-center'>
                  <svg viewBox="0 0 100 100" className='loading h-full stroke-[#5c9ead]'>
                    <circle cx="50" cy="50" r="40"  />
                  </svg>
                </div>
              ) : (
                <div className='h-[24px] w-[60px] font-semibold text-center'>
                  Log out
                </div>
              )}
            </button>

            <button onClick={() => router.push('/account')} className='bg-gray-200 rounded-full relative group'>
              <FaUser size={17} className='m-2.5' />
              <div className='absolute -right-1 top-12 font-semibold bg-[#363636] px-4 py-2 rounded text-gray-200/60 
                shadow-lg invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-500'
              >
                {userInfo?.email} 
              </div>
            </button>
          </div>
        )}
      </div>

      <div className='lg:hidden block overflow-x-hidden'>
        <button className='bg-gray-200 rounded-full' onClick={toggleMenu}>
          <IoClose size={25} className={`m-1.5 transition duration-500 ${showMenu ? 'rotate-0' : ' -rotate-[135deg]'}`} />
        </button>
      </div>

      <Menu userDetail={userInfo} />
    </div>
  )
}
