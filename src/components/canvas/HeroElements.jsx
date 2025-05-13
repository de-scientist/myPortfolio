import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Shield = () => {
  const shieldRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    shieldRef.current.rotation.y += 0.01;
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.02;
    }
  });

  return (
    <group ref={shieldRef} position={[-2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color="#4169E1"
          metalness={0.7}
          roughness={0.2}
          emissive="#0044ff"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Shield particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#00ff88" transparent opacity={0.6} />
      </points>
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[0.7, 0.1, 16, 32]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const Satellite = () => {
  const satelliteRef = useRef();
  const dishRef = useRef();
  
  useFrame((state) => {
    satelliteRef.current.rotation.y += 0.02;
    satelliteRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    satelliteRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 3;
    if (dishRef.current) {
      dishRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={satelliteRef} position={[2, 2, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.2, 1]} />
        <meshStandardMaterial color="#silver" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={dishRef} position={[0, 0.4, 0]} rotation={[0.5, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color="#4169E1" metalness={0.5} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const EyeGlobe = () => {
  const globeRef = useRef();
  const eyeRef = useRef();
  const [languages] = useState([
    { name: 'JavaScript', color: '#f7df1e', icon: '⚡' },
    { name: 'Python', color: '#3776ab', icon: '🐍' },
    { name: 'React', color: '#61dafb', icon: '⚛️' },
    { name: 'Node.js', color: '#339933', icon: '🟢' },
    { name: 'TypeScript', color: '#007acc', icon: '📘' },
    { name: 'Vue', color: '#4fc08d', icon: '🟩' }
  ]);

  useFrame((state) => {
    globeRef.current.rotation.y += 0.005;
    
    // Animate eye movement
    if (eyeRef.current) {
      const time = state.clock.getElapsedTime();
      eyeRef.current.position.x = Math.sin(time * 0.5) * 0.1;
      eyeRef.current.position.y = Math.cos(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#1e90ff"
          metalness={0.4}
          roughness={0.7}
          opacity={0.8}
          transparent
        />
      </mesh>
      
      {/* Eye */}
      <group position={[0, 0, 1.2]}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={eyeRef} position={[0, 0, 0.15]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color="#000000"
            emissive="#000066"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Orbiting Languages */}
      {languages.map((lang, i) => {
        const angle = (i / languages.length) * Math.PI * 2;
        const radius = 2;
        const orbitSpeed = 0.5;
        const time = Date.now() * 0.001 * orbitSpeed;
        const orbitAngle = angle + time;
        
        return (
          <group key={lang.name}>
            <mesh
              position={[
                Math.cos(orbitAngle) * radius,
                Math.sin(orbitAngle) * radius * 0.5,
                Math.sin(orbitAngle) * radius,
              ]}
            >
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial 
                color={lang.color} 
                emissive={lang.color} 
                emissiveIntensity={0.5} 
              />
            </mesh>
            <pointLight
              position={[
                Math.cos(orbitAngle) * radius,
                Math.sin(orbitAngle) * radius * 0.5,
                Math.sin(orbitAngle) * radius,
              ]}
              intensity={0.2}
              distance={3}
              color={lang.color}
            />
          </group>
        );
      })}
    </group>
  );
};

const HeroElements = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
      className="absolute inset-0 z-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Shield />
        <Satellite />
        <EyeGlobe />
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HeroElements;