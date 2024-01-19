import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import axios from 'axios';
import { useAllTranStaff } from '@/hooks/manager/userAllTranStaff';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useAllTranStaffPage } from '@/hooks/manager/useAllTranStaffPage';
import { MdEdit, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaEye, FaUserPlus } from 'react-icons/fa';

export default function Manager() {

  const { userInfo } = useUser();

  const { allTranStaff, setAllTranStaff } = useAllTranStaff();
  const { page, perPage, numberPage, setPage, setPerPage, setNumberPage } = useAllTranStaffPage();

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const getAllTranStaff = async () => {
      const res = (await axios.get(`api/transaction/getAllTranStaff?userID=${userInfo?.id}`)).data;
      setAllTranStaff(res.data);
      res.data.length / perPage === Math.floor(res.data.length / perPage) ?
      setNumberPage(res.data.length / perPage) : setNumberPage(Math.floor(res.data.length / perPage) + 1);
    }

    if (allTranStaff.length === 0) {
      getAllTranStaff();
    }
  }, []);

  useEffect(() => {
    const fetchAllTranStaff = async () => {
      const channel = supabaseClient.channel('realtime staff')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'packages',
      }, 
      async (payload) => {
        const res = (await axios.get(`api/transaction/getAllTranStaff?userID=${userInfo?.id}`)).data;
        setAllTranStaff(res.data);
        res.data.length / perPage === Math.floor(res.data.length / perPage) ?
        setNumberPage(res.data.length / perPage) : setNumberPage(Math.floor(res.data.length / perPage) + 1);
      }
      ).subscribe();

      return () => supabaseClient.removeChannel(channel);
    }

    fetchAllTranStaff();
  })

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-[calc(100vh-184px)] sm:h-[calc(100vh-216px)] rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full rounded text-gray-300 flex flex-col space-y-5'>
        <div className='flex justify-between items-center text-center'>
          <p className='font-extrabold text-base sm:text-3xl'>Account</p>
          <button className='flex font-medium items-center justify-center 
            space-x-2 bg-[#5c9ead] hover:bg-[#5c9ead]/85 rounded px-2 py-1 sm:px-6 sm:py-3'
          >
            <FaUserPlus className='mb-1 sm:text-[24px]' />
            <p className='tracking-[1px] text-xs sm:text-sm'>Create account</p>
          </button>
        </div>

        <div className='w-full h-full flex flex-col'>
          <div className='w-full py-5 bg-[#5c9ead] rounded-t'>
            <div className='w-full flex justify-between font-semibold tracking-[1px] text-xs lg:text-sm'>
              <p className='w-[40px] text-center'>No</p>

              <div className='w-[calc(100%-130px)] grid grid-cols-12'>
                <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>Name</p>

                <p className='md:flex hidden items-center justify-center text-center col-span-6'>Email</p>

                <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3'>Phone</p>
              </div>

              <p className='w-[90px] text-center'>Action</p>
            </div>
          </div>

          {allTranStaff.map((staff, index) => (
            <div key={index} className={`w-full cursor-pointer py-3 flex justify-between font-medium tracking-[1px] 
              text-xs lg:text-sm ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
            >
              <div className='w-[40px] text-center flex items-center justify-center'>
                {index + 1 + perPage * (page - 1)}
              </div>

              <div className='w-[calc(100%-130px)] grid grid-cols-12'>

                <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>
                  {staff?.name}
                </p>

                <p className='md:flex hidden items-center justify-center text-center col-span-6'>
                  {staff?.email}
                </p>

                <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3 truncate'>
                  (+84) {staff?.phone?.substring(2, 5)} {' '}
                  {staff?.phone?.substring(5, 8)} {' '}
                  {staff?.phone?.substring(8, 11)}
                </p>
              </div>

              <div className='w-[90px] space-x-1 flex items-center justify-center'>
                <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'

                >
                  <FaEye size={15} />
                </button>

                <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
                  onClick={() => {

                  }}
                >
                  <MdEdit size={15} />
                </button>
              </div>       
          </div>
          ))}
        </div>

        <div className='w-full h-fit flex items-center justify-center'>
          <div className='text-gray-200 font-semibold md:text-xl flex justify-center items-center space-x-5'>
            <button onClick={() => { 
              if (page == 1) setPage(1);
              else setPage(page - 1)
            }}>
              <MdKeyboardArrowLeft className='md:text-2xl text-xl' />
            </button>

            {[...Array(numberPage)].map((key, index) => (
              <button key={index} onClick={() =>(setPage(index + 1))}
              className={`md:text-lg text-sm ${index + 1 == page ? 'text-gray-200' : 'text-gray-200/10'}`}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={() => {
              if (page == numberPage) setPage(numberPage);
              else setPage(page + 1);
            }}>
              <MdKeyboardArrowRight className='md:text-2xl text-xl' />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}