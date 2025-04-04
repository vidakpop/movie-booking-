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
    const totalAmount = moviePrice * selectedSeats.length;
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
      setLoading(true);
      axios.post('http://127.0.0.1:8080/api/payment/', {
        phone_number: phoneNumber,
        email,
        amount: totalAmount,
        movie_id: movieId,
        cinema_id: cinemaId,
        seats: selectedSeats,
      })
      .then(response => {
        alert('Payment initiated.Please complete the payment on your phone')
        navigate('/confirmation', {state: {email, phoneNumber, selectedSeats, moviePrice, movieId, cinemaId}});
      })
      .catch(error => {
        alert('Payment failed. Please try again.' + (error.response?.data?.message || 'Unknown error'));
      })
      .finally(() => {
        setLoading(false);
      });
    }
    
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
      <p className="text-lg mb-2">Selected Seats: {selectedSeats?.join(', ')}</p>
      <p className="text-lg font-bold mb-6">Total Amount: KES {totalAmount}</p>

      <input
        type="tel"
        placeholder="Enter M-Pesa Number"
        className="p-2 mb-4 rounded bg-gray-800 text-white w-80"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      
      <input
        type="email"
        placeholder="Enter Email"
        className="p-2 mb-4 rounded bg-gray-800 text-white w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <motion.button
        onClick={handlePayment}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </motion.button>
    </div>
  );
};
export default Payment