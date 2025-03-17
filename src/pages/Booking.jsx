import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
const Booking = () => {
    const {movieId} = useParams()
    const [cinemas,setCinemas] = useState([])
    const [selectedCinema,setSelectedCinema] = useState(null)
    const [seatingChart,setSeatingChart] = useState([])
    const [selectedSeats,setSelectedSeats] = useState([])
    const [loading,setLoading] = useState(false)
  return (
    <div>Booking</div>
  )
}

export default Booking