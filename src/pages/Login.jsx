import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Threads from '../components/Threads'

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", formData);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/movies");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0 ,scale: 0.8}}
        animate={{ opacity: 1 ,scale: 1}}
       
        className="flex bg-black items-center justify-center h-screen"
    >
      
    

        <div className='bg-black bg-opacity-60 p-8 rounded-lg shadow-lg'>
            <h2 className='text-3xl text-white mb-4'>Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder='Username' onChange={handleChange} className='w-full p-2 my-2 bg-gray-800 border border-neon text-white' />
              <input type="password" name='password' placeholder="Password" onChange={handleChange} className="w-full p-2 my-2 bg-gray-800 border border-neon text-white" />
              <button className="bg-neon w-full py-2 rounded mt-4">Login</button>
              <p className="mt-4 text-gray-400">Don't have an account? <Link to="/signup" className="text-neon">Sign up</Link></p>

            </form>

        </div>

    </motion.div>
  )
}

export default Login