import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {selectedSeats, moviePrice,movieId,cinemaId} = location.state || {};

    
  return (
    <div>Payment</div>
  )
}

export default Payment