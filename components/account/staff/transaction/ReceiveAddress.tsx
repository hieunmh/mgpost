import { useDistrict } from '@/hooks/address/useDistrict';
import { useProvince } from '@/hooks/address/useProvince';
import { useReceiveAddress } from '@/hooks/address/useReceiveAddress';
import { useSendAddress } from '@/hooks/address/useSendAddress';
import { useWard } from '@/hooks/address/useWard';
import React, { useState } from 'react'

export default function SendAddress() {

  const { provinces } = useProvince();
  const { districts } = useDistrict();
  const { wards } = useWard();

  const { reveiveDetail, receiveWard, receiveDistrict, receiveProvince, 
    setReceiveDetail, setReceiveWard, setReceiveDistrict, setReceiveProvince 
  } = useReceiveAddress();

  let [receiveProvinceCode, setReceiveProvinceCode] = useState<number>();
  let [receiveDistrictCode, setReceiveDistrictsCode] = useState<number>();

  let [showReceiveProvince, setShowReceiveProvince] = useState<boolean>(false);
  let [showReceiveDistrict, setShowReceiveDistrict] = useState<boolean>(false);
  let [showReceiveWard, setShowReceiveWard] = useState<boolean>(false);


  const filterSendProvince = provinces.filter(province => {
    return province.name.toLowerCase().includes(receiveProvince.toLowerCase());
  })
  

  const filterSendDistrict = districts.filter(district => {
    
    return district.province_code === receiveProvinceCode &&
    district.name.toLowerCase().includes(receiveDistrict.toLowerCase());
  })

  const filterSendWard = wards.filter(ward => {
    return ward.district_code === receiveDistrictCode && ward.name.toLowerCase().includes(receiveWard.toLowerCase());
  })

  return (
    <div className='w-full flex flex-col space-y-2 md:space-y-5'>
      <div className='w-full flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5'>
        <div className='w-full md:w-1/3 relative'>
          <input type='text' placeholder='Province' onChange={(e) => {
              setReceiveProvince(e.target.value); setReceiveDistrict(''); setReceiveWard('');
            }} value={receiveProvince}
            className='bg-[#242424]/50 rounded 
            py-2 px-4 outline-none w-full placeholder-gray-200/30'
            onFocus={() => setShowReceiveProvince(true)}
            onBlur={() => { setTimeout(() => setShowReceiveProvince(false), 0) }}
          />
          {showReceiveProvince && 
            <div className='w-full bg-[#242424] z-50 max-h-[150px] absolute mt-2 overflow-y-auto 
              scrollbar-thin scrollbar-thumb-[#5c9ead]'
            >
              {filterSendProvince.map((province, index) => (
                <option value={province.name} key={index} onMouseDown={() => {
                    setReceiveProvince(province.name);
                    setReceiveProvinceCode(province.code);
                    setShowReceiveProvince(false);
                  }}
                  className='py-1.5 px-3 hover:bg-gray-200/10 cursor-pointer'
                >
                {province.name}
                </option>
              ))}
            </div>
          }
        </div>

        <div className='w-full md:w-2/3 flex space-x-2 md:space-x-5'>
          <div className='w-full relative'>
            <input type='text' placeholder='District' onChange={(e) => {
                setReceiveDistrict(e.target.value); setReceiveWard('');
              }} value={receiveDistrict}
              className='bg-[#242424]/50 rounded 
              py-2 px-4 outline-none w-full placeholder-gray-200/30' 
              onFocus={() => setShowReceiveDistrict(true)}
              onBlur={() => { setTimeout(() => setShowReceiveDistrict(false), 0) }}
            />
            {showReceiveDistrict && 
              <div className='w-full bg-[#242424] max-h-[150px] absolute mt-2 overflow-y-auto 
                scrollbar-thin scrollbar-thumb-[#5c9ead]'
              >
                {filterSendDistrict.map((district, index) => (
                  <option value={district.name} key={index} onMouseDown={() => {
                      setReceiveDistrict(district.name);
                      setReceiveDistrictsCode(district.code);
                      setShowReceiveDistrict(false);
                    }}
                    className='py-1.5 px-3 hover:bg-gray-200/10 cursor-pointer'
                  >
                  {district.name}
                  </option>
                ))}
              </div>
            }
          </div>
          
          <div className='w-full relative'>
            <input type='text' placeholder='Ward' onChange={(e) => {
                setReceiveWard(e.target.value)
              }} value={receiveWard}
              className='bg-[#242424]/50 rounded 
              py-2 px-4 outline-none w-full placeholder-gray-200/30' 
              onFocus={() => setShowReceiveWard(true)}
              onBlur={() => { setTimeout(() => setShowReceiveWard(false), 0) }}
            />
            {showReceiveWard && 
              <div className='w-full bg-[#242424] max-h-[150px] absolute mt-2 overflow-y-auto 
                scrollbar-thin scrollbar-thumb-[#5c9ead]'
              >
                {filterSendWard.map((ward, index) => (
                  <option value={ward.name} key={index} onMouseDown={() => {
                      setReceiveWard(ward.name);
                      setShowReceiveWard(false);
                  }}
                    className='py-1.5 px-3 hover:bg-gray-200/10 cursor-pointer'
                  >
                    {ward.name}
                  </option>
                ))}
              </div>
            }
          </div>
        </div>
      </div>

      <div className='w-full'>
        <input type='text' placeholder='Detail' className='bg-[#242424]/50 rounded
          py-2 px-4 outline-none w-full placeholder-gray-200/30' 
          onChange={(e) => setReceiveDetail(e.target.value)}
        />
      </div>
    </div>
  )
}