import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

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

    if (loading) return <p className="text-white text-center text-xl">Loading...</p>;

    return (
        <motion.div 
            className="bg-black min-h-screen text-white overflow-hidden flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-cyan-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative">
                    <motion.img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-96 object-cover rounded-t-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
                </div>
                <div className="p-6 text-center">
                    <motion.h1 
                        className="text-4xl font-bold text-cyan-400"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {movie.title}
                    </motion.h1>
                    <motion.p 
                        className="text-gray-400 mt-2 text-lg"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {movie.genre}
                    </motion.p>
                    <motion.p 
                        className="mt-4 text-xl text-gray-300 leading-relaxed"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        {movie.description}
                    </motion.p>
                    <motion.p 
                        className="mt-6 text-3xl text-green-400 font-bold"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        Ksh {movie.price}
                    </motion.p>
                    <motion.button
                        onClick={() => navigate(`/bookings/${movie.id}`)}
                        className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Now
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Moviedetails;
