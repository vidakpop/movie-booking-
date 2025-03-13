import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Navbar = () => {
    const [Open, setOpen] = useState(false);
  return (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 w-full bg-black bg-opacity-50 p-4 flex justify-between items-center z-50"
    >
        <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">🎬 MovieVerse</Link>
        <div className="space-x-4 hidden md:flex">
            <Link to="/" className="hover:text-blue-400 cursor-pointer text-white">Home</Link>
            <Link to="/movies" className="hover:text-blue-400 cursor-pointer text-white">Movies</Link>
            <Link to="/login" className="hover:text-blue-400 cursor-pointer text-white">Login</Link>
            <Link to="/signup" className="hover:text-blue-400 cursor-pointer text-white">Sign Up</Link>

        </div>
        <button onClick={() => setOpen(!Open)} className="md:hidden text-white text-2xl">
        ☰
        </button>

    </motion.nav>
  )
}

export default Navbar