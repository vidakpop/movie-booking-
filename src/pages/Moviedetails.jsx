import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

const Moviedetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const controls = useAnimation();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/movies/${id}/`)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching movie details", error));
    }, [id]);

    useEffect(() => {
        if (!loading) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
            });
        }
    }, [loading, controls]);

    if (loading) return <p className="text-white text-center">Loading...</p>;

    return (
        <motion.div 
            className="bg-black min-h-screen text-white overflow-hidden" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
        >
            <div className="flex flex-col lg:flex-row h-screen">
                <motion.div
                    className="w-1/2 lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden"
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls}
                >
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
                    <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="absolute bottom-8 left-8">
                            <motion.h1
                                className="text-5xl font-bold text-cyan-400"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                {movie.title}
                            </motion.h1>
                            <motion.p
                                className="text-gray-400 mt-2 text-xl"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 1 }}
                            >
                                {movie.genre}
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="w-1/2 lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-16 flex flex-col justify-center bg-gray-900"
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls}
                >
                    <motion.p
                        className="text-xl text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 1 }}
                    >
                        {movie.description}
                    </motion.p>
                    <motion.p
                        className="mt-6 text-3xl text-green-400 font-bold"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 1 }}
                    >
                        Ksh {movie.price}
                    </motion.p>
                    <motion.button
                        onClick={() => navigate(`/bookings/${movie.id}`)}
                        className="mt-8 w-full lg:w-1/2 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Now
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Moviedetails;
