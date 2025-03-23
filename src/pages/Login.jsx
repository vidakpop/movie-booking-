import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Threads from '../components/Threads';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
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
      
      // Show popup
      setShowPopup(true);
      
      // Hide popup after 3 seconds and navigate
      setTimeout(() => {
        setShowPopup(false);
        navigate("/movies");
      }, 3000);

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />

      {/* Welcome Pop-up */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute top-10 right-5 bg-black bg-opacity-70 backdrop-blur-lg p-4 rounded-lg shadow-xl w-64 text-center border border-blue-500"
          >
            <h3 className="text-xl text-blue-400 font-bold">Welcome Back!</h3>
            <p className="text-gray-300">You have successfully logged in.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bg-black bg-opacity-60 p-8 rounded-lg shadow-xl backdrop-blur-lg w-[350px] text-center"
      >
        <h2 className="text-3xl text-white mb-4 font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-2 rounded-lg mt-4 hover:opacity-90 transition-all">
            Login
          </button>
          <p className="mt-4 text-gray-400">Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link></p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
