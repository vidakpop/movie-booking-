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
    <motion.div className="bg-black min-h-screen p-10">
      <motion.h1 className="text-4xl font-bold text-center mb-6 text-white">
        🎥 Movie Collection
      </motion.h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="p-4 bg-gray-800 rounded-lg shadow-xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={movie.poster.startsWith("http") ? movie.poster : `${MEDIA_URL}${movie.poster}`}
              alt={movie.title}
              className="rounded-lg w-full"
            />
            <h2 className="text-white text-xl mt-3">{movie.title}</h2>
            <p className="text-gray-400">{movie.genre}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Movies;
