import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <motion.div
        initial={{ opacity: 0 ,scale: 0.8}}
        animate={{ opacity: 1 ,scale: 1}}
       
        className="flex flex-col items-center justify-center h-screen"
    >

    </motion.div>
  )
}

export default Login