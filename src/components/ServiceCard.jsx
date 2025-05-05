import { Tilt } from 'react-tilt';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

import { fadeIn } from "../utils/motion";

const ServiceCard = ({ index, title, description }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
  >
    <div
      className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
    >
      <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      <p className='text-secondary text-[14px] text-center'>{description}</p>
    </div>
  </motion.div>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ServiceCard;