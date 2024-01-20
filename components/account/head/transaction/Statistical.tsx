import React from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from 'react-chartjs-2'

import { useAllParcel } from '@/hooks/parcel/useAllParcel';
import { FaEye } from 'react-icons/fa';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useStatisticalPage } from '@/hooks/manager/tran/useStatisticalPage';

export default function Statistical() {

  const { allParcel, setAllParcel } = useAllParcel(); 
  const { page, perPage, numberPage, setPage, setNumberPage } = useStatisticalPage();

  const inwarehouse = allParcel.filter(parcel => parcel.status === 'In warehouse').length;

  const delivered = allParcel.filter(parcel => parcel.status === 'Delivered' 
  || parcel.status === 'Delivering').length;

  const isComing = allParcel.filter(parcel => parcel.status === 'Is coming').length;

  const total = allParcel.length;

  const datas = {
    labels: [ 'In warehouse', 'Delivered', 'Is coming' ],
    datasets: [{
      label: '',
      data: [inwarehouse, delivered, isComing],
      backgroundColor: ['#d33d3c', '#0b97ac', '#22c55e'],
      borderColor: ['transparent'],
    }],
  };

  let options = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-[calc(100vh-184px)] sm:h-[calc(100vh-216px)] rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full space-y-5'>
        <div className='h-[120px] sm:h-[200px] w-full flex items-center justify-center space-x-3 sm:space-x-5'>
          <div className='h-full relative'>
            <Doughnut className='z-50' data={datas} options={options} />
            <div className='-z-0 absolute top-0 left-0 h-full aspect-square flex items-center justify-center'>
              <div className='text-gray-300 font-bold text-sm sm:text-xl'>Total: {total}</div>
            </div>
          </div>

          <div className='h-full flex flex-col justify-around font-semibold text-xs'>
            <div className='flex items-center space-x-3'>
              <div className='w-[20px] h-[20px] bg-[#d33d3c] rounded'></div>
              <p className='text-[#d33d3c]'>In Warehouse</p>
            </div>

            <div className='flex items-center space-x-3'>
              <div className='w-[20px] h-[20px] bg-[#0b97ac] rounded'></div>
              <p className='text-[#0b97ac]'>Delivered</p>
            </div>

            <div className='flex items-center space-x-3'>
              <div className='w-[20px] h-[20px] bg-[#22c55e] rounded'></div>
              <p className='text-[#22c55e]'>Is coming</p>
            </div>
          </div>
        </div>

        <div className='h-[calc(100%-140px)] sm:h-[calc(100%-220px)] text-gray-200 w-full 
          rounded flex flex-col justify-between'
        > 
          <div className='w-full'>
            <div className='w-full py-5 bg-[#5c9ead] rounded-t'>
              <div className='w-full flex justify-between font-semibold tracking-[1px] text-xs lg:text-sm'>
                <p className='w-[40px] text-center'>No</p>

                <div className='w-[calc(100%-130px)] grid grid-cols-12'>
                  <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>Code</p>

                  <p className='md:flex hidden items-center justify-center text-center col-span-3'>From</p>

                  <p className='md:flex hidden items-center justify-center text-center col-span-3'>To</p>

                  <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3'>Created date</p>
                </div>

                <p className='w-[90px] text-center'>Action</p>
              </div>
            </div>

            {allParcel.length === 0 ? (
              <div className='flex items-center font-bold text-2xl md:text-4xl mt-5 justify-center'>
                No parcel found!
              </div>
            ) : (
              <div>
                {allParcel?.slice((perPage * (page - 1)), perPage * page).map((parcel, index) => (
                  <div key={index} className={`w-full cursor-pointer py-3 flex justify-between font-medium tracking-[1px] 
                    text-xs lg:text-sm ${index % 2 == 0 ? 'bg-neutral-500/30' : 'bg-neutral-500/10'}`} 
                  >
                    <div className='w-[40px] text-center flex items-center justify-center'>
                      {index + 1 + perPage * (page - 1)}
                    </div>

                    <div className='w-[calc(100%-130px)] grid grid-cols-12'>
                      <p className='flex items-center justify-center text-center col-span-12 sm:col-span-6 md:col-span-3'>
                        {parcel.code}
                      </p>
        
                      <p className='md:flex hidden items-center justify-center text-center col-span-3'>
                        {parcel.packageDetails?.sender_address?.split('-').pop()}
                      </p>

                      <p className='md:flex hidden items-center justify-center text-center col-span-3'>
                        {parcel.packageDetails?.receiver_address?.split('-').pop()}
                      </p>
      
                      <p className='sm:flex hidden items-center justify-center text-center col-span-6 md:col-span-3'>
                        {String(new Date(parcel.created_at).getDate()).padStart(2, '0')}
                        /{String(new Date(parcel.created_at).getMonth() + 1).padStart(2, '0')}
                        /{String(new Date(parcel.created_at).getFullYear())}
                      </p>
                    </div>
    
                    <div className='w-[90px] space-x-1 flex items-center justify-center'>
                      <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
                        onClick={() => {

                        }}
                      >
                        <FaEye size={15} />
                      </button>

                      <button className={`flex items-center justify-center p-2 rounded-md h-full aspect-square
                        ${parcel.status == 'In warehouse' && 'bg-[#d33d3c]'}
                        ${parcel.status == 'Delivered' || parcel.status == 'Delivering' && 'bg-[#0b97ac]'}
                        ${parcel.status == 'Is coming' && 'bg-[#22c55e]'}`}
                      >
                      </button>
                    </div>
                  </div>
                ))}
                  
              </div>
            )}
          </div>

          <div className='w-full h-fit flex items-center justify-center'>
            <div className='text-gray-200 font-semibold md:text-xl flex justify-center items-center space-x-5'>
              <button onClick={() => { 
                  if (page == 1) setPage(1);
                  else setPage(page - 1)
                }}
                className={`${page === 1 ? 'text-gray-200/10' : ''}`}
              >
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
                }}
                className={`${page === numberPage ? 'text-gray-200/10' : ''}`}
              >
                <MdKeyboardArrowRight className='md:text-2xl text-xl' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}