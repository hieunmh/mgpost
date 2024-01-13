import React from 'react';
import { motion } from 'framer-motion'; 

export default function Overview() {
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 50 }}
      className='w-full h-full bg-neutral-500/20 rounded'
    >
      <div className='w-full h-full'>

      </div>
    </motion.div>
  )
}
