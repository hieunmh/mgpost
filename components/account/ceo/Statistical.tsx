import React from 'react';
import { motion } from 'framer-motion';

export default function Statistical() {
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-[calc(100vh-184px)] sm:h-[calc(100vh-216px)] rounded bg-neutral-500/10 p-3 sm:p-5'
    >
      <div className='w-full h-full rounded text-gray-300 flex flex-col space-y-5'>

      </div>
    </motion.div>
  )
}
