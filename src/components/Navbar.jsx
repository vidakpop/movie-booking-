import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 w-full bg-black bg-opacity-60 backdrop-blur-lg p-4 flex justify-between items-center z-50"
    >
      <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
        🎬 MovieVerse
      </Link>

      {/* Desktop Navigation */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="hover:text-blue-400 cursor-pointer text-white">Home</Link>
        <Link to="/movies" className="hover:text-blue-400 cursor-pointer text-white">Movies</Link>
        {isAuthenticated ? (
          
          <button onClick={handleLogout} className="hover:text-red-400 cursor-pointer text-white">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 cursor-pointer text-white">Login</Link>
            <Link to="/signup" className="hover:text-blue-400 cursor-pointer text-white">Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl">
        ☰
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed top-0 right-0 h-screen w-2/3 bg-black bg-opacity-90 p-6 flex flex-col space-y-6 md:hidden"
          >
            <button onClick={() => setOpen(false)} className="self-end text-white text-2xl">
              ✖
            </button>
            <Link to="/" onClick={() => setOpen(false)} className="text-white text-lg hover:text-blue-400">
              Home
            </Link>
            <Link to="/movies" onClick={() => setOpen(false)} className="text-white text-lg hover:text-blue-400">
              Movies
            </Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-white text-lg hover:text-red-400">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-white text-lg hover:text-blue-400">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="text-white text-lg hover:text-blue-400">
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
