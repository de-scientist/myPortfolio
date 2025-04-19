import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const SkillOrbit = ({ skills }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create orbiting spheres
    skills.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.8
      });
      const sphere = new THREE.Mesh(geometry, material);

      const angle = (index / skills.length) * Math.PI * 2;
      const radius = 5;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;

      scene.add(sphere);
      spheresRef.current.push(sphere);
    });

    camera.position.z = 10;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      spheresRef.current.forEach((sphere, index) => {
        const time = Date.now() * 0.001;
        const angle = (index / skills.length) * Math.PI * 2 + time;
        const radius = 5;

        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [skills]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[400px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex absolute inset-0 justify-center items-center">
        <div className="text-center">
          <h3 className="text-white text-[20px] font-bold">Tech Stack</h3>
          <p className="text-secondary text-[14px]">
            Hover over the orbiting spheres to see my tech stack
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillOrbit;