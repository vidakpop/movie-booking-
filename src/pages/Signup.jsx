import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <motion.div
        initial={{opacity: 0,scale: 0.8}}
        animate={{opacity: 1,scale: 1}}
        className='h-screen flex items-center justify-center'
    >
        <div className='bg-black bg-opacity-60 p-8 rounded-lg shadow-lg'>
            <h2 className='text-3xl text-neon mb-4'>
                Sign Up
            </h2>
            <input type="text" placeholder='Name' className='w-full p-2 my-2 bg-gray-800 border border-neon text-white' />
            <input type="email" placeholder='Email' className='w-full p-2 my-2 bg-gray-800 border border-neon text-white'/>
        </div>
        
    </motion.div>
  )
}

export default Signup