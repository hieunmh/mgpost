import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { IoClose } from 'react-icons/io5';
import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';
import Image from 'next/image';
import { FaBarcode, FaCheck } from 'react-icons/fa6';
import axios from 'axios';
import { useAggParcelDetail } from '@/hooks/parcel/useAggParcelDetail';
import toast from 'react-hot-toast';


type ParcelDetailType = PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]}

export default function ParcelDetail({ parcelDetail } : { parcelDetail: ParcelDetailType }) {

  let [loading, setLoading] = useState<boolean>(false);

  const { setIsOpenDetail } = useAggParcelDetail();


  const confirmHasCome = async () => {
    setLoading(true);
    const res = await axios.post('/api/parcel/conFirm', {
      current_location: parcelDetail.current_location,
      parcelCode: parcelDetail.code
    });

    console.log(res.data.data);

    setLoading(false);

    if (res.data.error) {
      toast.error('Fail!');
      return;
    } else {
      toast.success('Confirmed!');
      setTimeout(() => {
        setIsOpenDetail(false);
      }, 1000);
    }
  }

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-sm duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    >
      <motion.div className='w-[1100px] h-fit p-3 md:p-5 bg-[#363636] rounded-2xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-2xl rounded-bl-2xl'
          onClick={() => setIsOpenDetail(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full space-y-3 lg:space-y-5'>
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
              <p className='text-gray-200 font-semibold tracking-[2px] text-xs sm:text-base'>{parcelDetail?.code}</p>
            </div>
          </div>

          <div className='w-full lg:flex lg:space-y-0 space-y-3 gap-3 md:gap-5 text-gray-200 font-medium text-xs lg:text-base'>
            <div className='w-full bg-gray-200/5 p-3 md:p-5 rounded-xl'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-xl md:text-2xl'>Sender information</p>
                <div className='w-full flex flex-col space-y-2 md:space-y-5'>
                  <p>{parcelDetail?.packageDetails.sender_name}</p>
                  <p>{parcelDetail?.packageDetails.sender_address}</p>
                  <p>(+84) {' '}
                    {parcelDetail?.packageDetails.sender_phone_no?.substring(1, 3)}{' '}
                    {parcelDetail?.packageDetails.sender_phone_no?.substring(3, 6)}{' '}
                    {parcelDetail?.packageDetails.sender_phone_no?.substring(6, 8)}{' '}
                    {parcelDetail?.packageDetails.sender_phone_no?.substring(8, 10)}
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full bg-gray-200/5 p-3 md:p-5 rounded-xl'>
              <div className='w-full rounded-xl space-y-2 md:space-y-5'>
                <p className='font-semibold text-xl md:text-2xl'>Receive information</p>
                <div className='w-full flex flex-col space-y-2 md:space-y-5'>
                  <p>{parcelDetail?.packageDetails.receiver_name}</p>
                  <p>{parcelDetail?.packageDetails.receiver_address}</p>
                  <p>(+84) {' '}
                    {parcelDetail?.packageDetails.receiver_phone_no?.substring(1, 3)}{' '}
                    {parcelDetail?.packageDetails.receiver_phone_no?.substring(3, 6)}{' '}
                    {parcelDetail?.packageDetails.receiver_phone_no?.substring(6, 8)}{' '}
                    {parcelDetail?.packageDetails.receiver_phone_no?.substring(8, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full text-gray-200 bg-gray-200/5 rounded-xl p-3 md:p-5 font-medium'>
            <div className='w-full rounded-xl 
              font-medium space-y-2 md:space-y-5 text-xs lg:text-base'
            >
              <p className='text-xl md:text-2xl font-bold'>Parcel information</p>

              <div className='flex flex-col w-full'>
                <div className='w-full flex h-fit rounded-t-md'>
                  <div className='w-full flex items-center py-3'>1. Created datetime:</div>
                  <div className='w-full flex items-center py-3 flex-row space-x-2 md:space-x-5'>
                    <p>{String(new Date(parcelDetail?.created_at).toLocaleTimeString('vi-VN', { hour12: false }))}</p>
                    <p>
                    {String(new Date(parcelDetail?.created_at).getDate()).padStart(2, '0')}
                    -{String(new Date(parcelDetail?.created_at).getMonth() + 1).padStart(2, '0')}
                    -{String(new Date(parcelDetail?.created_at).getFullYear())}
                    </p>
                  </div>
                </div>

                <div className='w-full flex h-fit'>
                  <p className='w-full flex items-center py-3'>2. Parcel content:</p>
                  <p className='w-full flex items-center py-3'>{parcelDetail?.packageDetails.package_info}</p>
                </div>

                <div className='w-full flex h-fit'>
                  <p className='w-full flex items-center py-3'>3. Note * :</p>
                  <p className='w-full flex items-center py-3 truncate'>{parcelDetail?.packageDetails.notes}</p>
                </div>

                <div className='w-full flex h-fit'>
                  <p className='w-full flex items-center py-3'>4. Weight:</p>
                  <p className='w-full flex items-center py-3'>{parcelDetail.packageDetails.totalWeight} g</p>
                </div>

                <div className='w-full flex h-fit rounded-b-md'>
                  <p className='w-full flex items-center py-3'>5. Total Fee:</p>
                  <p className='w-full flex items-center py-3'>
                    {parcelDetail.packageDetails.totalCharge?.toLocaleString()} VND
                  </p>
                </div>
              </div>

              
            </div>
          </div>

          {parcelDetail.status == 'Is coming' && (
            <button className='w-full bg-[#5c9ead] hover:bg-[#5c9ead]/85 
              px-4 py-2 rounded-md text-gray-200 text-sm lg:text-base flex items-center justify-center'
              onClick={confirmHasCome}
            >
              {loading ? (
                <div className='h-[24px] w-full items-center flex justify-center'>
                  <svg viewBox="0 0 100 100" className='loading h-full stroke-gray-200'>
                    <circle cx="50" cy="50" r="40"  />
                  </svg>
                </div>
              ) : (
                <div className='h-[24px] w-full text-center flex items-center justify-center'>
                  <div className='flex items-center justify-center space-x-2'>
                    <FaCheck size={20} />
                    <p>Confirm has come</p>
                  </div>
                </div>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}