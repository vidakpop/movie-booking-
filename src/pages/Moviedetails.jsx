import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Moviedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/movies/${id}/`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching movie details", error));
  }, [id]);

  if (loading) return <p className="text-white text-center text-2xl">🚀 Loading...</p>;

  return (
    <motion.div 
      className="relative min-h-screen flex justify-center items-center bg-black overflow-hidden"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      {/* Animated Cyberpunk Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-70 animate-gradient"></div>
      <div className="absolute inset-0 bg-grid opacity-10"></div>

      {/* Movie Card */}
      <div className="relative flex flex-col lg:flex-row max-w-5xl w-full bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-2xl border border-cyan-500 backdrop-blur-lg p-6 z-10">
        
        {/* Movie Poster with Holographic Effect */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        >
          <motion.img
            src={movie.poster}
            alt={movie.title}
            className="w-80 h-96 object-cover rounded-lg shadow-lg border-2 border-cyan-500 neon-border"
            whileHover={{ scale: 1.05, rotateY: 10 }}
          />
          {/* Holographic Shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-500 opacity-10 hover:opacity-30 transition-all duration-500"></div>
        </motion.div>

        {/* Movie Details */}
        <motion.div
          className="w-full lg:w-1/2 p-6 flex flex-col justify-center text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        >
          {/* Glitching Movie Title */}
          <motion.h1
            className="text-5xl font-extrabold text-cyan-300 mb-2 glitch-effect"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
          >
            {movie.title}
          </motion.h1>
          
          <motion.p
            className="text-gray-400 text-lg mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } }}
          >
            🎭 {movie.genre}
          </motion.p>
          
          <motion.p
            className="text-gray-300 text-md leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8 } }}
          >
            {movie.description}
          </motion.p>
          
          <motion.p
            className="mt-6 text-3xl text-green-400 font-bold neon-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.8 } }}
          >
            Ksh {movie.price}
          </motion.p>
          
          {/* Booking Button with Cyberpunk Hover Effect */}
          <motion.button
            onClick={() => navigate(`/bookings/${movie.id}`)}
            className="mt-8 w-full lg:w-1/2 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-lg font-semibold shadow-lg neon-border pulse-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.3, duration: 1 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Book Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Moviedetails;
