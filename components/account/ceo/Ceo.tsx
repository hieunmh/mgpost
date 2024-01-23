import { useMenuCeo } from '@/hooks/menuceo/useMenuCeo';
import React from 'react';
import Statistical from './Statistical';
import { useUser } from '@/hooks/useUser';
import Manager from './Manager';

export default function Ceo() {

  const { userInfo } = useUser();
  const { menu, setMenu } = useMenuCeo();

  return (
    <div className='sm:px-5 px-3 pb-3 sm:pb-5 h-[calc(100vh-60px)] 
      sm:h-[calc(100vh-76px)] space-y-3 sm:space-y-5 w-full overflow-hidden'
    >
      <div className='w-full h-[100px] bg-neutral-500/10 p-3 sm:p-5 flex flex-col justify-between text-gray-300 rounded'>
        <p className='font-bold text-base sm:text-xl text-center'>MGP Magic Post Co.Ltd</p>
        <div className='w-full flex flex-col font-semibold md:flex-row 
          items-center justify-around text-xs sm:text-sm text-center'
        >
          <p>Ceo: {userInfo?.name}</p>
        </div>
      </div>

      {menu === 'statistical' && <Statistical />}
      {menu === 'manager' && <Manager />}
    </div>
  )
}
