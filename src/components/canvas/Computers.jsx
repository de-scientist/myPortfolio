import { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";
import ErrorBoundary from "../enhanced/ErrorBoundary";

const Computers = ({ isMobile }) => {
  return (
    <mesh>
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.35} groundColor="#000000" />
      <pointLight intensity={1.2} position={[0, 2, 0]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        castShadow
      />
      
      {/* Monitor */}
      <group
        scale={isMobile ? 0.9 : 1.2}
        position={[0, isMobile ? -3 : -2.5, isMobile ? -2.2 : -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      >
        {/* Screen Frame */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[3.5, 2.2, 0.12]} />
          <meshStandardMaterial 
            color="#2b2b2b"
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen Display */}
        <mesh position={[0, 1.5, 0.07]} receiveShadow>
          <boxGeometry args={[3.3, 2, 0.01]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#114B5F"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Screen Bezel */}
        <mesh position={[0, 1.5, 0.02]}>
          <boxGeometry args={[3.4, 2.1, 0.05]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Stand */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
          <meshStandardMaterial 
            color="#666666" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Base */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial 
            color="#444444" 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Keyboard Base */}
        <mesh position={[0, -0.3, 1.2]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[2.2, 0.1, 0.9]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Keyboard Keys */}
        <group position={[0, -0.25, 1.2]} rotation={[0.12, 0, 0]}>
          {[...Array(6)].map((_, row) => (
            [...Array(15)].map((_, col) => (
              <mesh
                key={`key-${row}-${col}`}
                position={[
                  (col - 7) * 0.13,
                  0,
                  (row - 2.5) * 0.13
                ]}
                castShadow
              >
                <boxGeometry args={[0.11, 0.05, 0.11]} />
                <meshStandardMaterial
                  color="#2a2a2a"
                  metalness={0.5}
                  roughness={0.4}
                />
              </mesh>
            ))
          ))}
        </group>
      </group>
    </mesh>
  );
};

Computers.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [22, 4, 6], fov: 28 }}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          antialias: true,
          alpha: true
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
            enableRotate={true}
            rotateSpeed={0.5}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </ErrorBoundary>
  );
};

export default ComputersCanvas;
