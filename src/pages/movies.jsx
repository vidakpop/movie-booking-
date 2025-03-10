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
       
        className="bg-black min-h-screen p-10"
    >

    </motion.div>
  )
}

export default movies