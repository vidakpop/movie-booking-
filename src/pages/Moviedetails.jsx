import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const Moviedetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    
  return (
    <div>Moviedetails</div>
  )
}

export default Moviedetails
