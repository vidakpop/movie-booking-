import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Threads from '../components/Threads';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/signup/", formData);
      navigate("/login");
    } catch (err) {
      setError("❌ Sign-up failed. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex bg-black items-center justify-center h-screen relative overflow-hidden"
    >
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />

      {/* Cyberpunk Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-purple-900 opacity-50"></div>

      <motion.div
        className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-xl border border-purple-500 neon-border backdrop-blur-lg max-w-md w-full"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
      >
        {/* Glitching Title */}
        <h2 className="text-4xl font-extrabold text-purple-400 text-center mb-4 glitch-effect">SIGN UP</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="👤 Username"
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-purple-400 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 neon-input"
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-purple-400 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 neon-input"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-purple-400 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 neon-input"
          />
          <motion.button
            type="submit"
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-lg font-semibold text-black shadow-md neon-button pulse-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Sign Up
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account? 
          <Link to="/login" className="text-purple-300 hover:text-purple-400 transition"> Login</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
