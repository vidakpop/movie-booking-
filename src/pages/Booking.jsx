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

    useEffect(() =>{
        axios.get(`/api/cinemas/?movie_id=${movieId}`)
        .then(response => setCinemas(response.data))
        .catch(error => console.error('Error fetching cinemas',error))
    },[movieId])

    const handleCinemaSelect = (cinema) => {
        setSelectedCinema(cinema)
        setSeatingChart(cinema.seating_chart)
        setSelectedCinema([])
    }
    const handleSeatSelect = (row, col) => {
        if (seatingChart[row][col] === 'X') return; // Seat already booked
        const seatKey = `${row}-${col}`;
        setSelectedSeats(prev => prev.includes(seatKey) ? prev.filter(s => s !== seatKey) : [...prev, seatKey]);
      };

  return (
    <div>Booking</div>
  )
}

export default Booking