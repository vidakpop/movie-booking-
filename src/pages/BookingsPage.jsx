import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";


const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Access Token Required! Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch bookings");
        setLoading(false);
      });
  };

  const handleCancelBooking = (bookingId) => {
    const token = localStorage.getItem("access_token");

    axios
      .delete(`http://127.0.0.1:8000/api/bookings/${bookingId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
      })
      .catch((error) => alert("Failed to cancel booking: " + error.response?.data?.message || "Unknown error"));
  };

  

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-cyan-400 neon-text">🎬 My Movie Bookings</h1>

      {loading && <p className="mt-6 text-lg text-gray-400">Loading your bookings... ⏳</p>}
      {error && <p className="mt-6 text-lg text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-5 bg-gray-800 border border-cyan-500 rounded-lg shadow-lg neon-glow"
          >
            {/* Movie Poster */}
            <img
              src={booking.movie_poster}
              alt={booking.movie_title}
              className="w-full h-60 object-cover rounded-md"
            />

            {/* Movie Details */}
            <h2 className="mt-3 text-2xl font-bold text-yellow-400">{booking.movie_title}</h2>
            <p className="text-gray-300">📍 {booking.cinema}</p>
            <p className="text-cyan-300 font-semibold">🎟️ Seat(s): {booking.seats.join(", ")}</p>
            <p className="text-gray-400 text-sm">🕒 Showtime: {booking.showtime}</p>

           

            {/* Cancel Booking Button */}
            <button
              onClick={() => handleCancelBooking(booking.id)}
              className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-black font-bold rounded-lg transition-all shadow-lg glitch-btn"
            >
              Cancel Booking ❌
            </button>

            {/* Cyberpunk Glow Effect */}
            <div className="absolute inset-0 border-4 border-cyan-400 neon-border animate-pulse opacity-50"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
