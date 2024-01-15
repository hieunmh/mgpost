import { useDistrict } from '@/hooks/address/useDistrict';
import { useProvince } from '@/hooks/address/useProvince';
import { useSendAddress } from '@/hooks/address/useSendAddress';
import { useWard } from '@/hooks/address/useWard';
import React, { useState } from 'react'

export default function SendAddress() {

  const { provinces } = useProvince();
  const { districts } = useDistrict();
  const { wards } = useWard();

  const { sendWard, sendDistrict, sendProvince, setSendWard, setSendDistrict, setSendProvince } = useSendAddress();

  let [sendProvinceCode, setSendProvinceCode] = useState<number>();
  let [sendDistrictCode, setSendDistrictsCode] = useState<number>();

  let [showSendProvince, setShowSendProvince] = useState<boolean>(false);
  let [showSendDistrict, setShowSendDistrict] = useState<boolean>(false);
  let [showSendWard, setShowSendWard] = useState<boolean>(false);


  const filterSendProvince = provinces.filter(province => {
    return province.name.toLowerCase().includes(sendProvince.toLowerCase());
  })
  

  const filterSendDistrict = districts.filter(district => {
    
    return district.province_code === sendProvinceCode &&
    district.name.toLowerCase().includes(sendDistrict.toLowerCase());
  })

  const filterSendWard = wards.filter(ward => {
    return ward.district_code === sendDistrictCode && ward.name.toLowerCase().includes(sendWard.toLowerCase());
  })

  return (
    <div className='w-full flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5'>
      <div className='w-full md:w-1/3 relative'>
        <input type='text' placeholder='Province' onChange={(e) => {
            setSendProvince(e.target.value); setSendDistrict(''); setSendWard('');
          }} value={sendProvince}
          className='bg-transparent border-b border-b-gray-200/20 
          py-2 px-4 outline-none w-full placeholder-gray-200/30'
          onFocus={() => setShowSendProvince(true)}
          onBlur={() => { setTimeout(() => setShowSendProvince(false), 0) }}
        />
        {showSendProvince && 
          <div className='w-full bg-[#242424] z-50 max-h-[150px] absolute mt-2 overflow-y-auto 
            scrollbar-thin scrollbar-thumb-[#5c9ead]'
          >
            {filterSendProvince.map((province, index) => (
              <option value={province.name} key={index} onMouseDown={() => {
                  setSendProvince(province.name);
                  setSendProvinceCode(province.code);
                  setShowSendProvince(false);
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
              setSendDistrict(e.target.value); setSendWard('');
            }} value={sendDistrict}
            className='bg-transparent border-b border-b-gray-200/20 
            py-2 px-4 outline-none w-full placeholder-gray-200/30' 
            onFocus={() => setShowSendDistrict(true)}
            onBlur={() => { setTimeout(() => setShowSendDistrict(false), 0) }}
          />
          {showSendDistrict && 
            <div className='w-full bg-[#242424] max-h-[150px] absolute mt-2 overflow-y-auto 
              scrollbar-thin scrollbar-thumb-[#5c9ead]'
            >
              {filterSendDistrict.map((district, index) => (
                <option value={district.name} key={index} onMouseDown={() => {
                    setSendDistrict(district.name);
                    setSendDistrictsCode(district.code);
                    setShowSendDistrict(false);
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
              setSendWard(e.target.value)
            }} value={sendWard}
            className='bg-transparent border-b border-b-gray-200/20 
            py-2 px-4 outline-none w-full placeholder-gray-200/30' 
            onFocus={() => setShowSendWard(true)}
            onBlur={() => { setTimeout(() => setShowSendWard(false), 0) }}
          />
          {showSendWard && 
            <div className='w-full bg-[#242424] max-h-[150px] absolute mt-2 overflow-y-auto 
              scrollbar-thin scrollbar-thumb-[#5c9ead]'
            >
              {filterSendWard.map((ward, index) => (
                <option value={ward.name} key={index} onMouseDown={() => {
                    setSendWard(ward.name);
                    setShowSendWard(false);
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
  )
}
