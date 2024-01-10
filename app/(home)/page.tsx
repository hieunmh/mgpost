import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ParcelStatus from '@/components/parcel/ParcelStatus';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='w-full h-screen scroll-smooth overflow-x-hidden scrollbar-none'>
      <Header />
        
      <Hero />

      <ParcelStatus />

    </div>
  )
}
