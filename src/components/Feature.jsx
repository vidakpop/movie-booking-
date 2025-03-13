import { motion } from "framer-motion";
import { section } from "framer-motion/client";
import { FaFilm, FaTheaterMasks, FaMobileAlt, FaRegCreditCard } from "react-icons/fa";

const Feature = () => {
  return (
    <section className="py-16 bg-gray-900 text-center">
      <h2 className="text-4xl font-bold">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-10">
        <FeatureCard icon={<FaFilm size={40} />} title="Latest Movies" description="Explore a vast collection of blockbuster movies and indie gems." />
        <FeatureCard icon={<FaTheaterMasks size={40} />} title="Top Cinemas" description="Find the best cinemas near you and their latest movie offerings." />
        <FeatureCard icon={<FaMobileAlt size={40} />} title="Easy Booking" description="Book your favorite movie seats easily via our seamless platform." />
        <FeatureCard icon={<FaRegCreditCard size={40} />} title="Mpesa Payments" description="Secure and instant payments using Mpesa integration." />
      </div>
    </section>
  )
}

export default Feature