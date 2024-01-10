import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <section className='flex flex-col gap-4 pb-12 pt-20 text-center lg:items-center px-2 lg:px-0'>
      <div className='flex flex-1 flex-col items-center gap-4 text-center'>
        <div className='space-y-4'>
          <h1 className='text-xl font-bold lg:text-5xl text-gray-300'>
            A trusted provide of delivery services
          </h1>
          <h2 className='text-lg lg:text-3xl text-neutral-500/90'>
            We deliver your product safe in a reasonable time
          </h2>
        </div>
      </div>

      <div className='flex flex-1 justify-center lg:justify-end'>
        <Image src={'/delivery.png'} priority width={500} height={500} alt='Header image' />
      </div>
    </section>
  )
}
