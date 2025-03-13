import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {TypeAnimation} from 'react-type-animation';

const Hero = () => {
  return (
    <div className="h-screen">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
      </Canvas>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          <TypeAnimation
            sequence={["Welcome to Multiverse", 1000, "Your gateway to unlimited entertainment", 1000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
          </h1>
        <p className="mt-4 text-gray-400">Discover Cinemas & Movies, Book Instantly with Mpesa</p>
      </div>
    </div>
  );
};

export default Hero;
