import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateParcel } from '@/hooks/parcel/useCreateParcel';

import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import Randomstring from 'randomstring';
import Image from 'next/image';

import { FaBarcode } from 'react-icons/fa6';
import axios from 'axios';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';

import { useProvince } from '@/hooks/address/useProvince';
import { useDistrict } from '@/hooks/address/useDistrict';

type InputForm = {
  userID: string;
  parcelInfo: string;
  
  sendAddress: string;
  senderName: string;
  senderPhone: string;

  reveiveAddress: string;
  receiverName: string;
  receiverPhone: string;

  note: string;
  totalCharge: number;
  weight: number;
  code: string;
}

export default function CreateParcel() {

  const { isOpen, setIsOpen } = useCreateParcel();

  const { userInfo } = useUser();

  const { register, handleSubmit } = useForm<InputForm>();

  const { provinces } = useProvince();
  const { districts } = useDistrict();

  let [provinceCode, setProvinceCode] = useState<number>();
  let [districtCode, setDistrictsCode] = useState<number>();

  let [showProvince, setShowProvince] = useState<boolean>(false);
  let [showDistrict, setShowDistrict] = useState<boolean>(false);
  let [showWard, setShowWard] = useState<boolean>(false);


  let [code, setCode] = useState<string>('');
  let [loading, setLoading] = useState<boolean>(false);

  let [sendWard, setSendWard] = useState<string>('');
  let [sendDistrict, setSendDistrict] = useState<string>('');
  let [sendProvince, setSendProvince] = useState<string>('');

  let [receiveWard, setReceiveWard] = useState<string>('');
  let [receiveDistrict, setReceiveDistrict] = useState<string>('');
  let [receiveProvince, setReceiveProvince] = useState<string>('');

  const filterSendProvince = provinces.filter(province => {
    return province.name.toLowerCase().includes(sendProvince.toLowerCase());
  })
  


  const filterSendDistrict = districts.filter(district => {
    
    return district.province_code === provinceCode &&
    district.name.toLowerCase().includes(sendDistrict.toLowerCase());
  })


  const createParcel: SubmitHandler<InputForm> = async (formData) => {
    formData.userID = userInfo?.id as string;
    formData.code = code;
    formData.sendAddress = sendWard + ' - ' + sendDistrict + ' - ' + sendProvince;
    formData.reveiveAddress = receiveWard + ' - ' + receiveDistrict + ' - ' + receiveProvince;

    if (!formData.senderName || !formData.senderPhone || !sendWard || !sendDistrict || !sendProvince
      || !formData.receiverName || !formData.receiverPhone || !receiveWard || !receiveDistrict || !receiveProvince
      || !formData.weight || !formData.totalCharge || !formData.parcelInfo 
    ) {
      toast.error('Please fill all!');
      return;
    }

    setLoading(true);
    const res = await axios.post('/api/parcel/createParcel', formData);
    setLoading(false);
    
    if (res.data.error) {
      toast.error('Parcel created failed!');
    } else {
      toast.success('Parcel created successfully!');
    }

    setIsOpen(false);
  }

  useEffect(() => {
    setCode(Randomstring.generate({ charset: 'alphabetic', length: 3 }).toUpperCase() 
    + Randomstring.generate({ charset: 'numeric', length: 10 }) + 'MG')
  }, [])

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-transparent transition
      backdrop-blur-md duration-500 flex items-center justify-center px-5 py-5 sm:px-20 sm:py-20'
    > 
      <motion.div className='w-[1100px] h-fit p-5 bg-[#363636]/70 rounded-xl relative'
        initial={{ opacity: 1, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.03, 1] }}
        transition={{ type: 'just', duration: 0.5 }}
      >
        <button className='absolute top-0 right-0 text-white bg-[#5c9ead] rounded-tr-xl rounded-bl-xl'
          onClick={() => setIsOpen(false)}
        >
          <IoClose className='m-1 text-[17px] md:text-[28px]' />
        </button>

        <div className='w-full h-full space-y-5'>
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
              <p className='text-gray-200 font-semibold tracking-[2px] text-xs sm:text-base'>{code}</p>
            </div>
          </div>

          <div className='w-full space-y-5 gap-5 text-gray-200 font-medium text-xs lg:text-base'>
            <div className='w-full rounded-xl space-y-2 md:space-y-5'>
              <p className='font-semibold text-2xl'>Sender information</p>
              <div className='w-full flex space-x-2 md:space-x-5'>
                <div className='w-[65%] space-y-1'>
                  <p className='ml-1'>Full name</p>
                  <input {...register('senderName')} type='text' placeholder=''
                    className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                  />
                </div>
                <div className='w-[35%] space-y-1'>
                  <p className='ml-1'>Phone number</p>
                  <input {...register('senderPhone')} type='text' placeholder='' maxLength={10}
                    className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                  />
                </div>
              </div>

              <div className='w-full space-y-1'>
                <p className='ml-1'>Address</p>
                <div className='w-full flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5'>
                  <div className='w-full md:w-1/3 relative'>
                    <input type='text' placeholder='Province' onChange={(e) => {
                      setSendProvince(e.target.value);
                      setSendDistrict('');
                      setSendWard('');
                    }}
                      className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                      onFocus={() => setShowProvince(true)} value={sendProvince} onBlur={() => setShowProvince(false)}
                    />
                    {showProvince && (
                      <div className='rounded w-full max-h-[300px] absolute bg-[#242424] mt-2 md:mt-5 overflow-y-auto
                        scrollbar-thin scrollbar-thumb-[#5c9ead] scrollbar-track-transparent'
                        onMouseOver={() => setShowProvince(true)}
                      >
                        {filterSendProvince.map((province, index) => (
                          <option value={province.name} key={index}
                            className=' hover:bg-[#363636]/30 cursor-pointer py-3 px-2 md:px-5'
                            onClick={() => {
                              setProvinceCode(province.code);
                              setSendProvince(province.name);
                              // setShowProvince(false);
                            }}
                          >
                            {province.name}
                          </option>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className='w-full md:w-2/3 flex space-x-2 md:space-x-5'>
                    <div className='w-full relative' onBlur={() => setShowDistrict(false)}>
                      <input type='text' placeholder='District' onChange={(e) => setSendDistrict(e.target.value)}
                        className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                        onFocus={() => setShowDistrict(true)} value={sendDistrict}
                      />
                      {showDistrict && (
                        <div className='rounded w-full h-[300px] absolute bg-[#242424] mt-2 md:mt-5 overflow-y-auto
                          scrollbar-thin scrollbar-thumb-[#5c9ead] scrollbar-track-transparent'
                        >
                          {filterSendDistrict.map((district, index) => (
                            <option value={district.name} key={index}
                              className=' hover:bg-[#363636]/30 cursor-pointer py-3 px-2 md:px-5'
                              onClick={() => {
                                setDistrictsCode(district.code);
                                setSendDistrict(district.name);
                                setShowDistrict(false);
                              }}
                            >
                              {district.name}
                            </option>
                          ))}
                        </div>
                      )}
                    </div>
                    <input type='text' placeholder='Ward' onChange={(e) => setSendWard(e.target.value)}
                      className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full rounded-xl space-y-2 md:space-y-5'>
              <p className='font-semibold text-2xl'>Receiver information</p>
              <div className='w-full flex space-x-2 md:space-x-5'>
                <div className='w-[65%] space-y-1'>
                  <p className='ml-1'>Full name</p>
                  <input {...register('receiverName')} type='text' placeholder=''
                    className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                  />
                </div>
                <div className='w-[35%] space-y-1'>
                  <p className='ml-1'>Phone number</p>
                  <input {...register('receiverPhone')} type='text' placeholder='' maxLength={10}
                    className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                  />
                </div>
              </div>

              <div className='w-full space-y-1'>
                <p className='ml-1'>Address</p>
                <div className='w-full flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5'>
                  <input type='text' placeholder='Province' onChange={(e) => setReceiveProvince(e.target.value)}
                    className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full md:w-1/3 placeholder-gray-200/30' 
                  />
                  <div className='w-full md:w-2/3 flex space-x-2 md:space-x-5'>
                    <input type='text' placeholder='District' onChange={(e) => setReceiveDistrict(e.target.value)}
                      className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                    />
                    <input type='text' placeholder='Ward' onChange={(e) => setReceiveWard(e.target.value)}
                      className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30' 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full text-gray-200 font-medium space-y-2 md:space-y-5 text-xs lg:text-base'>
            <p className='text-2xl font-bold'>Parcel information</p>
            <div className='flex space-x-2 md:space-x-5'>
              <div className='w-[65%] space-y-1'>
                <p className='ml-1'>Parcel name</p>
                <input type='text' placeholder='' {...register('parcelInfo')}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />
              </div>
              <div className='w-[35%] space-y-1'>
                <p className='ml-1'>Weight (g)</p>
                <input type='number' placeholder='' min={0} {...register('weight')}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />
              </div>
            </div>

            <div className='flex space-x-2 md:space-x-5'>
              <div className='w-[40%] space-y-1'>
                <p className='ml-1'>Total (VND)</p>
                <input type='number' placeholder='' min={0} {...register('totalCharge')}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />
              </div>
              <div className='w-[60%] space-y-1'>
                <p className='ml-1'>Note *</p>
                <input type='text' placeholder='' {...register('note')}
                  className='rounded bg-[#242424]/50 py-2 px-4 outline-none w-full placeholder-gray-200/30'  
                />
              </div>
            </div>
          </div>

          <button onClick={handleSubmit(createParcel)}
            className='w-full bg-[#5c9ead] hover:bg-[#5c9ead]/85 
            px-4 py-2 rounded text-gray-200 text-sm lg:text-base flex items-center justify-center'
          >
            {loading ? (
              <div className='h-[25px]'>
                <svg viewBox="0 0 100 100" className='loading h-full stroke-[#f2f2f2]'>
                  <circle cx="50" cy="50" r="40"  />
                </svg>
              </div>
            ) : (
              <p className='h-[25px]'>Create</p>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
