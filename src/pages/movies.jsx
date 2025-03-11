import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movies/")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies", error));
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";  // Redirect to login
        return null;
    }

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refresh,
        });

        localStorage.setItem("access_token", response.data.access);
        return response.data.access;
    } catch (error) {
        console.error("Error refreshing token", error.response?.data || error);
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return null;
    }
};

const bookTicket = async (movieId, cinemaId) => {
    const token = localStorage.getItem("access_token");
    if (!token) return alert("You must be logged in to book tickets");

    try {
        await axios.post(
            "http://127.0.0.1:8000/api/bookings/",
            { movie_id: movieId, cinema_id: cinemaId, seats: 1 },
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        alert("Booking successful!");
    } catch (error) {
        console.error("Error booking ticket", error.response?.data || error);
        alert(error.response?.data?.message || "Error booking ticket");
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
            className="text-4xl text-neon font-bold text-center mb-6 p-10"
        >
            🎥 Movie Collection
        </motion.h1>
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2">
            {movies.map((movie) => (
                <motion.div key={movie.id} className="p-4 bg-gray-800 rounded-lg shadow-xl" whileHover={{ scale: 1.05 }}>
                    <img src={movie.poster} alt={movie.title} className="rounded-lg w-full" />
                    <h2 className="text-white text-xl mt-3">{movie.title}</h2>
                    <p className="text-gray-400">{movie.genre}</p>
                    <p className="text-white">{movie.description}</p>
                    <p className="text-green-499">Ksh{movie.price}</p>

                    {/* Cinema Selection Dropdown */}
                    <select
                        className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                        onChange={(e) => setCinemas((prev) => ({ ...prev, [movie.id]: e.target.value }))}
                    >
                        <option value="">Select a cinema</option>
                        {movie.cinemas.map((cinema) => (
                            <option key={cinema.id} value={cinema.id}>{cinema.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => bookTicket(movie.id, cinemas[movie.id])}
                        className="bg-neon w-full py-2 mt-3 rounded"
                        disabled={!cinemas[movie.id]}
                    >
                        Book Ticket
                    </button>
                </motion.div>
            ))}
        </div>
    </motion.div>
);
};

export default Movies;