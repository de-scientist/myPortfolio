import { motion } from 'framer-motion';

const ResumeDownload = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <a 
        href="/assets/De-Scientist_Resume.pdf" 
        download
        className="px-8 py-3 font-bold text-white rounded-xl shadow-md outline-none bg-tertiary w-fit shadow-primary"
      >
        Download Resume
      </a>
    </motion.div>
  );
};

export default ResumeDownload;