import { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Moviedetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/api/movies/${id}/`)
          .then((response) => {
            setMovie(response.data);
            setLoading(false);
          })
          .catch((error) => console.error("Error fetching movie details", error));
      }, [id]);

      if (loading) return <p className="text-white text-center">Loading...</p>;
  return (
    <motion.div
        className="bg-black min-h-screen p-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <div className='max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg'>
            <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-lg w-full"
            />
            <h1 className='text-4xl font-bold mt-4'>{movie.title}</h1>
            <p className='text-gray-400 mt-2'>{movie.genre}</p>
            <p className='mt-4'>{movie.description}</p>
            


        </div>

    </motion.div>
  )
}

export default Moviedetails
