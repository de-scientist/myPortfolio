import { motion } from "framer-motion";
import { styles } from "../styles";
import HeroElements from "./canvas/HeroElements";

const Hero = () => {
  return (
    <section className={`relative mx-auto w-full h-screen bg-no-repeat bg-cover bg-hero-pattern`}>
      <HeroElements />
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#0066cc]' />
          <div className='w-1 h-40 sm:h-80 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Welcome to <span className='text-[#0066cc]'>TechVision S&S</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Pioneering digital solutions through <br className='hidden sm:block' />
            innovation, creation, and education
          </p>
        </div>
      </div>

      <div className='flex absolute bottom-32 justify-center items-center w-full xs:bottom-10'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='mb-1 w-3 h-3 rounded-full bg-secondary'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
