import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

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
        <h1 className="text-5xl text-neon font-bold">Welcome to MovieVerse</h1>
        <p className="mt-4 text-gray-400">Your gateway to unlimited entertainment</p>
      </div>
    </div>
  );
};

export default Hero;
