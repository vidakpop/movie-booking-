import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { motion,AnimatePresence } from 'framer-motion';

const Booking = () => {
  const { movieId } = useParams();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [seatingChart, setSeatingChart] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!movieId) return;
    axios.get(`http://127.0.0.1:8000/api/cinemas/?movie_id=${movieId}`)
      .then((response) => setCinemas(response.data))
      .catch((error) => console.error("Error fetching cinemas", error));
  }, [movieId]);

  const handleCinemaSelect = (cinemaId) => {
    const cinema = cinemas.find((c) => c.id == cinemaId);
    if (cinema) {
      setSelectedCinema(cinema);
      setSeatingChart(cinema.seating_chart || []);
      setSelectedSeats([]);
    }
  };

  const handleSeatSelect = (row, col) => {
    if (seatingChart[row][col] === 'X') return;
    const seatKey = `${row}-${col}`;
    setSelectedSeats((prev) =>
      prev.includes(seatKey) ? prev.filter((s) => s !== seatKey) : [...prev, seatKey]
    );
  };

  const handleBooking = () => {
    if (!selectedCinema || selectedSeats.length === 0) {
      alert('Please select a cinema and at least one seat.');
      return;
    }
  
    setLoading(true);
    const token = localStorage.getItem("access_token");
  
    axios.post(
      'http://127.0.0.1:8000/api/bookings/',
      {
        movie_id: movieId,
        cinema_id: selectedCinema.id,
        seats: selectedSeats.map((seat) => seat.split('-').map(Number)),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        setShowPopup(true);
        setSeatingChart((prevChart) =>
          prevChart.map((row, rowIndex) =>
            row.map((seat, colIndex) =>
              selectedSeats.includes(`${rowIndex}-${colIndex}`) ? 'X' : seat
            )
          )
        );
        setSelectedSeats([]);
  
        // 🚀 Navigate to payment page and pass selectedSeats and other info
        navigate('/payment', {
          state: {
            selectedSeats,
            movieId,
            cinemaId: selectedCinema.id,
            moviePrice: selectedCinema.price, // assuming cinema has price
          },
        });
      })
      .catch((error) =>
        alert('Booking failed: ' + (error.response?.data?.message || "Unknown error"))
      )
      .finally(() => setLoading(false));
  };

  

  const seatGrid = useMemo(() => {
    if (!seatingChart.length) return <p className="text-gray-400">No seating chart available</p>;
    
    return seatingChart.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center space-x-2 mb-2">
        {row.map((seat, colIndex) => {
          const seatKey = `${rowIndex}-${colIndex}`;
          const isSelected = selectedSeats.includes(seatKey);
          const isReserved = seat === 'X';
          
          return (
            <motion.div
              key={seatKey}
              className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer font-bold transition-all
                ${isReserved ? 'bg-red-600 text-white' : isSelected ? 'bg-green-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'}
              `}
              whileTap={{ scale: 0.9 }}
              onClick={() => !isReserved && handleSeatSelect(rowIndex, colIndex)}
            >
              {isReserved ? 'X' : seatKey}
            </motion.div>
          );
        })}
      </div>
    ));
  }, [seatingChart, selectedSeats]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Book Your Seat</h1>

      <div className="mb-6">
        <label className="text-lg">Select Cinema:</label>
        <select
          className="ml-2 p-2 bg-gray-800 rounded text-white"
          onChange={(e) => handleCinemaSelect(e.target.value)}
        >
          <option value="">-- Select --</option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCinema && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
          <div className="flex flex-col items-center gap-2">{seatGrid}</div>
        </div>
      )}

      <motion.button
        onClick={handleBooking}
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Confirm Booking ✅'}
      </motion.button>

      <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50"
          onClick={() => setShowPopup(false)} // Close popup when clicking outside
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative p-6 w-96 bg-gray-900 text-white border border-blue-500 shadow-xl rounded-lg neon-glow"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Cyberpunk Title */}
            <h2 className="text-3xl font-extrabold text-cyan-400 tracking-widest neon-text">
              🎉 ACCESS GRANTED 🎉
            </h2>

            {/* Username Display */}
            <p className="mt-3 text-lg text-gray-300">
              Welcome, <span className="text-pink-500 font-semibold">{username}</span>
            </p>

            {/* Seat Details */}
            <p className="mt-2 text-lg font-bold text-cyan-300">
              Seats Locked In: <span className="text-yellow-300">{selectedSeats.join(", ")}</span>
            </p>

            {/* Fun Message */}
            <p className="text-sm mt-2 italic text-gray-400">
              Hope you don’t hack the entire row’s snacks! 🍿😂
            </p>

            {/* Close Button */}
            <button
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setShowPopup(false)} // Ensure it correctly updates state
              className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all shadow-lg glitch-btn"
            >
              Cool! 😎
            </button>

            {/* Cyberpunk Light Effects */}
            <div className="absolute inset-0 border-4 border-cyan-400 neon-border animate-pulse opacity-50"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default Booking;