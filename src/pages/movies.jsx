import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const MEDIA_URL = "http://127.0.0.1:8000/posters/";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movies/")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies", error));
  }, []);

  return (
    <motion.div 
      className="bg-black min-h-screen p-10 flex flex-col items-center" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-5xl font-extrabold text-center mb-8 text-cyan-400 neon-glow mt-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🎬 Movie Collection
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="relative p-4 bg-gray-900 rounded-xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <img
              src={movie.poster.startsWith("http") ? movie.poster : `${MEDIA_URL}${movie.poster}`}
              alt={movie.title}
              className="rounded-lg w-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-cyan-300 text-2xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400">{movie.genre}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Movies;