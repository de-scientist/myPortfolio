import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeIn } from '../utils/motion';

const MediaServiceCard = ({ title, description, features, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className='p-6 w-full rounded-2xl transition-colors bg-tertiary hover:bg-tertiary/80'
  >
    <h3 className='text-white font-bold text-[24px] mb-4'>{title}</h3>
    <p className='text-secondary text-[16px] leading-[24px] mb-6'>{description}</p>
    <ul className='space-y-2'>
      {features.map((feature, idx) => (
        <li key={idx} className='text-white-100 text-[14px] flex items-center'>
          <span className='w-2 h-2 bg-[#0066cc] rounded-full mr-2' />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

MediaServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired
};

export default MediaServiceCard;