import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import PropTypes from 'prop-types';

const ServiceSlide = ({ service, direction }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
    transition={{ duration: 0.5 }}
    className="p-8 mx-auto w-full max-w-4xl rounded-2xl bg-tertiary"
  >
    <div className="flex justify-center items-center mb-6">
      <img src={service.icon} alt={service.title} className="w-16 h-16" />
    </div>
    <h3 className="text-white text-[24px] font-bold text-center mb-4">{service.title}</h3>
    <div className="text-secondary text-[16px] leading-[24px]">
      {service.title === "Web Developer" && (
        <p>Our web development team specializes in creating responsive, modern websites using the latest technologies. We focus on performance, accessibility, and user experience, delivering solutions that make your business stand out online.</p>
      )}
      {service.title === "React Native Developer" && (
        <p>With expertise in React Native, we build cross-platform mobile applications that provide native-like performance. Our mobile solutions are optimized for both iOS and Android, ensuring a seamless user experience across all devices.</p>
      )}
      {service.title === "Backend Developer" && (
        <p>Our backend development team creates robust, scalable server-side solutions. We specialize in API development, database design, and system architecture, ensuring your applications perform efficiently and securely.</p>
      )}
      {service.title === "Content Creator" && (
        <p>Our content creation team combines creativity with technical expertise to produce engaging digital content. From interactive media to technical documentation, we help communicate your message effectively to your target audience.</p>
      )}
    </div>
  </motion.div>
);

ServiceSlide.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired
};

const AboutComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        We are a skilled software development company with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. We are quick learners and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className='relative mt-20'>
        <AnimatePresence mode='wait'>
          <ServiceSlide 
            key={currentIndex} 
            service={services[currentIndex]} 
            direction={direction}
          />
        </AnimatePresence>
        
        <div className="flex absolute top-1/2 justify-between px-4 w-full -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-primary/80 hover:bg-primary"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-primary/80 hover:bg-primary"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
};

export const About = SectionWrapper(AboutComponent, "about");
export default About;
