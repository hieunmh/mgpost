import { useMenu } from '@/hooks/useMenu';
import { UserInfoType } from '@/types/type';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';


export default function Menu({ userDetail } : { userDetail: UserInfoType | null }) {

  const supabaseClient = useSupabaseClient();

  const { showMenu, setShowMenu } = useMenu();
  const router = useRouter();

  let [loading, setLoading] = useState<boolean>(false);


  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signOut();
    setLoading(false);

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      setShowMenu(false);
      toast.success('Logged out!');
    }
    
  }

  return (
    <div className={`lg:hidden block fixed top-20 rounded h-[200px] w-fit 
      transition-all duration-500 ${showMenu ? 'z-0 right-5' : '-right-[250px]'}`}
    >
      {userDetail ? (
        <div className='flex flex-col items-end space-y-4'>
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
            <div className='absolute right-12 top-0 font-semibold bg-[#363636] px-4 py-2 rounded text-gray-200/60 
              shadow-lg text-[14px] invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-500'
            >
              {userDetail?.email} 
            </div>
          </button>
        </div>
      ) : (
        <div className='flex flex-col space-y-4'>
          <Link href={'/login'} onClick={() => setShowMenu(false)}
            className='bg-gray-200 px-6 py-1.5 font-semibold rounded-full text-center hover:scale-110'
          > 
            Log in
          </Link>

          <Link href={'/signup'} onClick={() => setShowMenu(false)}
            className='bg-gray-200 px-6 py-1.5 font-semibold rounded-full text-center hover:scale-110'
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  )
}
