import { Suspense, useEffect, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";
import ErrorBoundary from "../enhanced/ErrorBoundary";

const Shield = ({ position }) => {
  const shieldRef = useRef();
  const particlesRef = useRef();
  
  const particleCount = 50;
  const particles = useMemo(() => {
    const temp = [];
    for(let i = 0; i < particleCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y += 0.01;
    }
    
    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity);
      if (particle.position.length() > 1.5) {
        particle.position.normalize().multiplyScalar(1.5);
        particle.velocity.reflect(particle.position.clone().normalize());
      }
      const vertices = particlesRef.current.geometry.attributes.position.array;
      vertices[i * 3] = particle.position.x;
      vertices[i * 3 + 1] = particle.position.y;
      vertices[i * 3 + 2] = particle.position.z;
    });
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <mesh ref={shieldRef}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshPhongMaterial color="#4a90e2" transparent opacity={0.6} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(particleCount * 3)}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00ff00" />
      </points>
    </group>
  );
};

Shield.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};

const Satellite = ({ position }) => {
  const satelliteRef = useRef();
  const orbitRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.5;
      orbitRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={position} ref={orbitRef}>
      <mesh ref={satelliteRef}>
        <boxGeometry args={[0.5, 0.2, 0.8]} />
        <meshPhongMaterial color="#c0c0c0" />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.05]} />
          <meshPhongMaterial color="#4a90e2" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.05]} />
          <meshPhongMaterial color="#4a90e2" />
        </mesh>
      </mesh>
    </group>
  );
};

Satellite.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};

const EyeGlobe = ({ position }) => {
  const globeRef = useRef();
  // Removed unused textures

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group position={position} ref={globeRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#2b6cb0"
          transparent
          opacity={0.8}
          emissive={new THREE.Color("#004080")}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[0.3, 32]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0, 0.2]}>
        <circleGeometry args={[0.1, 32]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
    </group>
  );
};

EyeGlobe.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};

const Scene = ({ isMobile }) => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.7 : 1}
      position={[0, isMobile ? -3 : -2, isMobile ? -2.2 : -1.2]}
    >
      <Shield position={[-2, 0, 0]} />
      <Satellite position={[2, 0, 0]} />
      <EyeGlobe position={[0, 2, 0]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 2]} intensity={0.5} />
    </group>
  );
};

Scene.propTypes = {
  isMobile: PropTypes.bool.isRequired
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
        camera={{ position: [0, 0, 10], fov: 45 }}
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
          <Scene isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </ErrorBoundary>
  );
};

export default ComputersCanvas;