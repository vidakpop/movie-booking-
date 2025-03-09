import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData,setFormData]=useState({username:"",password:""})
  const [error,setError]=useState("")
  const navigate = useNavigate()
  
  return (
    <motion.div
        initial={{ opacity: 0 ,scale: 0.8}}
        animate={{ opacity: 1 ,scale: 1}}
       
        className="flex  items-center justify-center h-screen"
    >
        <div className='bg-black bg-opacity-60 p-8 rounded-lg shadow-lg'>
            <h2 className='text-3xl text-neon mb-4'>Login</h2>
            <input type="email" placeholder='Email' className='w-full p-2 my-2 bg-gray-800 border border-neon text-white' />
            <input type="password" placeholder="Password" className="w-full p-2 my-2 bg-gray-800 border border-neon text-white" />
            auth<button className="bg-neon w-full py-2 rounded mt-4">Login</button>
            <p className="mt-4 text-gray-400">Don't have an account? <Link to="/signup" className="text-neon">Sign up</Link></p>


        </div>

    </motion.div>
  )
}

export default Login