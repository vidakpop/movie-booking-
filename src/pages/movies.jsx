import {useEffect,useState} from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

const movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/movies/")
    })
  return (
    <div>movies</div>
  )
}

export default movies