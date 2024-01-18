'use client';

import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { TiArrowRightThick } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';

import Status from './Status';
import { useParcelStatus } from '@/hooks/useParcelStatus';
import { SubmitHandler, useForm } from 'react-hook-form';

type ParcelStatusForm = {
  parcelCode: string;
}

export default function ParcelStatus() {

  let [loading, setLoading] = useState<boolean>(false);


  let [height, setHeight] = useState<number>(168);

  const { register, handleSubmit } = useForm<ParcelStatusForm>();

  const { showParcelStatus, setShowParcelStatus } = useParcelStatus();

  let [parcelStatus, setParcelStatus] = 
    useState<PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]} | null>(null);


  const getParcel: SubmitHandler<ParcelStatusForm> = async (formData) => {
    if (!formData.parcelCode) return;

    setLoading(true);
    const res = await axios.get(`/api/parcel/parcelStatus?code=${formData.parcelCode}`);

    if (res.data.error) {
      toast.error('Parcel not found!')
    } else {
      setParcelStatus(res.data.data);
      setShowParcelStatus(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (parcelStatus && parcelStatus.packageStatus.length) {
      let sttLength = parcelStatus.packageStatus.length;
      setHeight(40 * (sttLength - 1) + 48 * sttLength + 344);
    }
  })

  return (
    <div className='px-5 w-full transition-all duration-500' style={{ height: height }}>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-full flex flex-col text-center space-y-3'>
          <p className='text-gray-200 font-bold text-xl sm:text-3xl'>Track your parcel</p>

          <p className='text-neutral-500/90 font-medium text-xs sm:text-lg'>
            Tracking your parcel by enter your parcel {' '}
            <span className='text-[#5c9ead] underline cursor-pointer'>code</span> below
          </p>

          <form className='flex items-center justify-center space-x-4'>
            <input type='text' placeholder='Enter your parcel code' {...register('parcelCode')}
              className='py-3 px-5 outline-none h-12 text-xs sm:text-base font-semibold 
              rounded bg-neutral-500/50 text-gray-200 w-[500px]'
            />
            <button onClick={handleSubmit(getParcel)} className=' bg-gray-200 h-12 px-4 rounded'>
              {loading ? (
                <div className='h-[24px] w-[60px] items-center flex justify-center'>
                  <svg viewBox="0 0 100 100" className='loading h-full stroke-[#363636]'>
                    <circle cx="50" cy="50" r="40"  />
                  </svg>
                </div>
              ) : (
                <div className='h-[24px] w-[60px] font-semibold text-center flex items-center justify-center'>
                  <TiArrowRightThick size={30} className='text-[#363636]' />
                </div>
              )}
            </button>
          </form>
        </div>

        <div className='w-full lg:px-10 my-5 rounded flex items-center justify-center'>
          <div className={`bg-neutral-500/10 w-[1100px] rounded p-5 relative transition
            ${showParcelStatus && parcelStatus ? 'opacity-100 visible duration-1000' : 'opacity-0 invisible duration-200'}`}
          >
            <button onClick={() => {
              setShowParcelStatus(false);
              setParcelStatus(null);
              setHeight(168);
            }}
              className='absolute text-black -top-[10px] -right-[10px] bg-neutral-500 rounded-full'>
              <IoClose size={20} className='m-0.5' />
            </button>
              
            <div className='w-full flex justify-around text-gray-300 font-semibold'>
              <div className='text-center text-[10px] md:text-base space-y-3'>
                <p>Send Address</p>
                <p className='font-normal'>{parcelStatus?.packageDetails.sender_address?.split('-').pop()}</p>
              </div>

              <div className='text-center text-[10px] md:text-base space-y-3'>
                <p>Receive Address</p>
                <p className='font-normal'>{parcelStatus?.packageDetails.receiver_address.split('-').pop()}</p>
              </div>

              <div className='text-center text-[10px] md:text-base space-y-3'>
                <p>Weight</p>
                <p className='font-normal'>{parcelStatus?.packageDetails.totalWeight} g</p>
              </div>

              <div className='text-center text-[10px] md:text-base space-y-2'>
                <p>Status</p>
                <p className='bg-green-700 rounded-full py-1 px-3'>
                  {parcelStatus?.status}
                </p>
              </div>
            </div>

            <div className='w-full mt-10 space-y-10 transition-all duration-500'>
              {parcelStatus?.packageStatus.map((status, key) => (
                <Status key={status.id} index={key} status={status} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
