import React from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'

const Dashboard = () => {
  return (
    <div className='relative  w-full h-screen overflow-hidden bg-black text-white'>
      <Hero />
      <Feature />
    </div>
  )
}

export default Dashboard