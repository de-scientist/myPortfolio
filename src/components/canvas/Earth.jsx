import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Sphere, Points } from "@react-three/drei";

import CanvasLoader from "../Loader";

const CodeParticles = () => {
  const count = 1000;
  const ref = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 1.5 + Math.random() * 0.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <pointsMaterial
        size={0.02}
        color="#00ff00"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </Points>
  );
};

const Earth = () => {
  const earthRef = useRef();
  
  useFrame(() => {
    earthRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1.5} />
      <mesh ref={earthRef}>
        <Sphere args={[1, 64, 64]} onBeforeRender={(renderer) => {
          renderer.localClippingEnabled = true;
        }}>
          <meshStandardMaterial
            color="#2b6cb0"
            roughnessMap={null}
            roughness={0.7}
            metalnessMap={null}
            metalness={0.3}
            emissiveMap={null}
            emissive="#004080"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </mesh>
      <CodeParticles />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
