import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { option } from 'framer-motion/client'
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
      const handleBooking = () => {
        if (!selectedCinema || selectedSeats.length === 0) {
          alert("Please select a cinema and at least one seat.");
          return;
        }
    
        setLoading(true);
        axios.post("/api/bookings/", {
          movie_id: movieId,
          cinema_id: selectedCinema.id,
          seats: selectedSeats.map(seat => seat.split('-').map(Number))
        })
        .then(response => {
          alert("Booking successful!");
          setSeatingChart(prevChart => prevChart.map((row, rowIndex) =>
            row.map((seat, colIndex) =>
              selectedSeats.includes(`${rowIndex}-${colIndex}`) ? 'X' : seat
            )
          ));
          setSelectedSeats([]);
        })
        .catch(error => alert("Booking failed: " + error.response.data.message))
        .finally(() => setLoading(false));
      };

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center p-6'>
       <h1 className='text-3xl font-bold  p-15'>
        Book your seat
       </h1> 
       {/*Cinema Selection */}
       <div className='mb-6'>
        <label className='text-lg'>Select Cinema</label>
        <select 
          className='ml-2 p-2 bg-gray-800 rounded text-white'
          onChange={(e) => handleCinemaSelect(cinemas.find((c) => c.id == e.target.value))}
          >
            <option value="">-- Select --</option>
           {/*  {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>{cinema.name}</option>
            ))}*/}
        </select>

        {/* Seating Selection */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>
            Select Seats
          </h2>
          <div className='grid grid-cols-10 gap-2'>
            {seatingChart.map((row, rowIndex)=>
             row.map((seat, colIndex)=>(
              <motion.div
                key={`${rowIndex}-${colIndex}`}
              >

              </motion.div>
             ))
            )}

          </div>

        </div>
        

       </div>
    </div>
  )
}

export default Booking