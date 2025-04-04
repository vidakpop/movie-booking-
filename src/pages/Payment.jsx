import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {selectedSeats, moviePrice,movieId,cinemaId} = location.state || {};

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const totalAmount = selectedSeats.length * moviePrice;

    useEffect(() =>{
        if (!selectedSeats || selectedSeats.length === 0) {
            alert('No seats selected. Please go back and select seats.');
            navigate(-1);
        }
    }, [selectedSeats, navigate]);
    const handlePayment = () => {
      if (!phoneNumber || !email) {
        alert('Please enter your phone number and email.');
        return;
      }
    }
    
  return (
    <div>Payment</div>
  )
}

export default Payment