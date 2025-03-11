import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const MEDIA_URL = "http://127.0.0.1:8000/posters/";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movies/")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies", error));
  }, []);

  const fetchCinemasForMovie = async (movieId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cinemas/?movie_id=${movieId}`
      );
      setCinemas(response.data);
      setSelectedMovie(movieId);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching cinemas", error);
    }
  };

  const bookTicket = async (cinema) => {
    if (cinema.capacity === 0) {
      alert("Slots Full! No tickets available.");
      return;
    }

    let token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to book tickets");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/",
        { movie_id: selectedMovie, cinema_id: cinema.id, seats: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Booking successful! Redirecting to payment...");
      window.location.href = "/payment"; // Redirect to payment page
    } catch (error) {
      console.error("Error booking ticket", error.response?.data || error);
      alert("Error booking ticket");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black min-h-screen p-10"
    >
      <motion.h1
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold text-center mb-6 p-10 text-white"
      >
        🎥 Movie Collection
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="p-4 bg-gray-800 rounded-lg shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={movie.poster.startsWith("http") ? movie.poster : `${MEDIA_URL}${movie.poster}`}
              alt={movie?.title}
              className="rounded-lg w-full"
            />
            <h2 className="text-white text-xl mt-3">{movie?.title}</h2>
            <p className="text-gray-400">{movie?.genre}</p>
            <p className="text-white">{movie?.description}</p>
            <p className="text-green-500 font-semibold">Ksh {movie?.price}</p>
            <button
              onClick={() => fetchCinemasForMovie(movie.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 mt-3 rounded"
            >
              Book Ticket
            </button>
          </motion.div>
        ))}
      </div>

      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center backdrop-blur-sm">
    <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700 shadow-2xl w-96 transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Select a Cinema
      </h2>
      {cinemas.length === 0 ? (
        <p className="text-gray-400">No cinemas available</p>
      ) : (
        cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="mb-4 p-4 rounded-xl bg-gray-900 border border-gray-700 hover:border-purple-500 transition-all duration-200"
          >
            <p className="font-bold text-lg text-gray-100">{cinema.name}</p>
            <p className="text-sm text-gray-400"><b className="text-red-400">Location:</b>{cinema.location}</p>
            <p className="text-sm text-gray-400">
              Slots:{" "}
              <span
                className={`font-semibold ${
                  cinema.capacity > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {cinema.capacity > 0 ? cinema.capacity : "Full"}
              </span>
            </p>
            <button
              onClick={() => bookTicket(cinema)}
              className={`w-full py-2 mt-3 rounded-lg font-semibold transition-all duration-200 ${
                cinema.capacity > 0
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
              disabled={cinema.capacity === 0}
            >
              {cinema.capacity > 0 ? "Book Now" : "Slots Full"}
            </button>
          </div>
        ))
      )}
      <button
        onClick={() => setShowPopup(false)}
        className="mt-6 w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200"
      >
        Close
      </button>
    </div>
  </div>
)}
    </motion.div>
  );
};

export default Movies;
