import { usePage } from '@/hooks/parcel/tran/useTranPage';
import { useTranParcelDetail } from '@/hooks/parcel/tran/useTranParcelDetail';
import { PackageDetailsType, PackageStatusType, PackageType } from '@/types/type';
import React, { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { FaEye, FaUser } from 'react-icons/fa';
import ParcelDetail from './ParcelDetail';
import { IoClose } from 'react-icons/io5';
import { FaWarehouse } from 'react-icons/fa6';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';

type ParcelCom = PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[] }

export default function ParcelCom({ parcel, index } : { parcel: ParcelCom, index: number }) {

  const { page, perPage, numberPage, setPage, setNumberPage } = usePage();

  const { isOpenDetail, setIsOpenDetail } = useTranParcelDetail();

  const { userInfo } = useUser();

  const [parcelDetail, setParcelDetail] = useState<
  PackageType & { packageDetails: PackageDetailsType, packageStatus: PackageStatusType[]}>();

  let [isOpenNextAddress, setIsOpenNextAddress] = useState<boolean>(false);

  let [loading, setLoading] = useState<boolean>(false);
  let [loadingAgg, setLoadingAgg]  = useState<boolean>(false);


  const sendToCustomer = async () => {
    setLoading(true);
    
    const res = await axios.post('api/parcel/sendToCustomer', {
      parcelCode: parcel.code
    })

    setLoading(false);

    if (res.data.error) {
      toast.error('Fail!');
      return;
    }

    toast.success('Delivering to customer!');

    setTimeout(() => setIsOpenNextAddress(false), 1000);
  }

  const sentToAgg = async () => {
    setLoadingAgg(true);

    const res = await axios.post('api/parcel/sendToAgg', {
      userID: userInfo?.id,
      parcelCode: parcel.code,
    })

    setLoadingAgg(false);

    if (res.data.error) {
      toast.error('Fail!');
      return;
    }

    toast.success('Sent successfully!');

    setTimeout(() => setIsOpenNextAddress(false), 1000);
  }


  return (
    <div className='w-full flex relative'>
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
            setParcelDetail(parcel);
            setIsOpenDetail(true);
          }}
        >
          <FaEye size={15} />
        </button>

        <button className='flex items-center justify-center p-2 rounded-md bg-[#242424]/50'
          onClick={() => {
            setParcelDetail(parcel);
            setIsOpenNextAddress(true);
          }}
        >
          <BsFillSendFill size={15} />
        </button>
      </div>

      <div className={`h-[55px] -top-3 bg-[#242424] absolute right-0 duration-500
        ${isOpenNextAddress ? 'w-[126px] opacity-100 visible' 
        : 'w-[24px] opacity-0'}`}
      >
        <div className={`w-full h-full px-3 py-3 space-x-1 
          ${isOpenNextAddress ? 'flex' : 'hidden'}`}
        >
  
          <button className='flex items-center justify-center p-2 rounded-md bg-[#5c9ead]'
            onClick={sendToCustomer}
          > 
            {!loading ? (
              <FaUser size={15} />
            ) : (
              <div className='h-[15px]'>
                <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                  <circle cx="50" cy="50" r="40"  />
                </svg>
              </div>
            )}
          </button>

          <button className='flex items-center justify-center p-2 rounded-md bg-[#5c9ead] disabled:bg-[#363636]'
            onClick={sentToAgg} disabled={parcel.packageStatus.length > 1}
          >
            {!loadingAgg ? (
              <FaWarehouse size={15} />
            ) : (
              <div className='h-[15px]'>
                <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                  <circle cx="50" cy="50" r="40"  />
                </svg>
              </div>
            )}
          </button>

          <button onClick={() => setIsOpenNextAddress(false)} 
            className='flex items-center justify-center p-2 rounded-md bg-[#363636]'
          >
            <IoClose size={15} />
          </button>
        </div>
      </div>


      {isOpenDetail && <ParcelDetail parcelDetail={parcelDetail!} />}
    </div>
  )
}
