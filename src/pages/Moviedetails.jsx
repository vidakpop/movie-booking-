import React, { useEffect } from 'react'
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
    <div>Moviedetails</div>
  )
}

export default Moviedetails
