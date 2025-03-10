import {useEffect,useState} from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/movies/")
        .then(response => setMovies(response.data))
        .catch(error => console.error("Error fetching movies", error))
    },[])
  return (
    <motion.div
        initial={{ opacity: 0 ,scale: 0.8}}
        animate={{ opacity: 1 ,scale: 1}}
       
        className="bg-black min-h-screen p-10 "
    >
        <motion.h1
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl text-neon font-bold text-center mb-6 p-10"
        >
            🎥 Movie Collection
        </motion.h1>
        <div className='grid grid-cols-3 gap-6'>
            {movies.map(movie =>(
                <motion.div
                  className='p-4 bg-gray-800 rounded-lg shadow-xl'
                  whileHover={{scale:1.05}}
                >
                    <img src={movie.poster} alt={movie.title} className='rounded-lg w-full' />
                    <h2 className='text-white text-xl mt-3'>{movie.title}</h2>
                    <p className='text-gray-400'>{movie.genre}</p>
                    <p className='text-white'>{movie.description}</p>
                    <p className='text-green-499'>Ksh{movie.price}</p>
                    <button className='bg-neon w-full py-2 mt-3 rounded '>Book Ticket</button>



                </motion.div>

            ))}

        </div>

    </motion.div>
  )
}

export default movies