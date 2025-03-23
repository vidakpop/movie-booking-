// Signup.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Threads from '../components/Threads';

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/signup/", formData);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bg-black bg-opacity-60 p-8 rounded-lg shadow-xl backdrop-blur-lg w-[350px] text-center"
      >
        <h2 className="text-3xl text-white mb-4 font-bold">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 my-2 bg-gray-900 border border-neon rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none" />
          <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white w-full py-2 rounded-lg mt-4 hover:opacity-90 transition-all">
            Sign Up
          </button>
          <p className="mt-4 text-gray-400">Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
