import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div 
        className={`flex justify-center items-center bg-tertiary ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Error loading image: ${alt}`}
      >
        <span className="text-sm text-secondary">Failed to load image</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <img
        src={src}
        alt={alt}
        className={`${className} ${!isLoaded ? 'invisible' : ''}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
      />
      {!isLoaded && (
        <div 
          className={`absolute inset-0 animate-pulse bg-tertiary ${className}`}
          style={{ width, height }}
        />
      )}
    </motion.div>
  );
};

export default OptimizedImage;