import { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";
import ErrorBoundary from "../enhanced/ErrorBoundary";

const Computers = ({ isMobile }) => {
  useEffect(() => {
    const animate = () => {
      const screenMesh = document.querySelector('canvas');
      if (screenMesh) {
        const material = screenMesh.__r3f?.getState()?.objects?.find(obj => obj.type === 'Mesh' && obj.material?.type === 'ShaderMaterial')?.material;
        if (material) {
          material.uniforms.time.value = performance.now() * 0.001;
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return (
    <mesh>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} groundColor="#000000" />
      <pointLight intensity={1.4} position={[0, 2, 0]} color="#ffffff" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow
        color="#ffffff"
      />
      <pointLight
        position={[0, 1.5, 2]}
        intensity={0.3}
        distance={3}
        decay={2}
        color="#4444ff"
      />
      
      {/* Monitor */}
      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, isMobile ? -3 : -2.2, isMobile ? -2.2 : -1.2]}
        rotation={[-0.01, -0.2, -0.1]}
      >
        {/* Screen Frame */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[3.5, 2.2, 0.12]} />
          <meshStandardMaterial 
            color="#2b2b2b"
            metalness={0.8}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Screen Display */}
        <mesh position={[0, 1.5, 0.07]} receiveShadow>
          <boxGeometry args={[3.3, 2, 0.01]} />
          <shaderMaterial
            uniforms={{
              time: { value: 0 },
              color: { value: [0.067, 0.294, 0.373] },
              opacity: { value: 0.8 }
            }}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float time;
              uniform vec3 color;
              uniform float opacity;
              varying vec2 vUv;
              
              void main() {
                float line = step(0.5, fract((vUv.y - time * 0.2) * 20.0));
                float pulse = 0.5 + 0.5 * sin(time * 2.0);
                float glow = smoothstep(0.4, 0.6, pulse);
                
                vec2 center = vec2(0.5, 0.5);
                float dist = length(vUv - center);
                float vignette = smoothstep(0.8, 0.2, dist);
                
                vec3 glowColor = vec3(0.1, 0.4, 0.6);
                vec3 baseColor = mix(color, glowColor, glow * 0.3);
                vec3 finalColor = mix(baseColor, vec3(0.0), line * 0.3) * vignette;
                
                gl_FragColor = vec4(finalColor, opacity * vignette);
              }
            `}
            transparent
          />
        </mesh>

        {/* Screen Bezel */}
        <mesh position={[0, 1.5, 0.02]}>
          <boxGeometry args={[3.4, 2.1, 0.05]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.85}
            roughness={0.15}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Stand */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 2, 32]} />
          <meshStandardMaterial 
            color="#666666" 
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Base */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 64]} />
          <meshStandardMaterial 
            color="#444444" 
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={1.5}
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
            [...Array(15)].map((_, col) => {
              const isSpecialKey = row === 0 && (col === 0 || col === 14);
              return (
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
                    color={isSpecialKey ? "#1a1a1a" : "#2a2a2a"}
                    metalness={0.7}
                    roughness={0.3}
                    envMapIntensity={1.2}
                  />
                </mesh>
              );
            })
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
