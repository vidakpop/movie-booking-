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
        <Link to="/" className="text-neon text-2xl font-bold">🎬 MovieVerse</Link>

    </motion.nav>
  )
}

export default Navbar