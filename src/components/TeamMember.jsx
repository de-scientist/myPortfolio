import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaEnvelope } from 'react-icons/fa';
import { fadeIn } from '../utils/motion';

const TeamMember = ({ name, role, responsibilities, image, email, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className='bg-tertiary p-4 sm:p-5 rounded-2xl w-full sm:w-[360px]'
  >
    <div className='flex flex-col items-center'>
      <img
        src={image}
        alt={`${name}'s profile`}
        className='w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-3 sm:mb-4 object-cover border-4 border-[#0066cc]'
      />
      <h3 className='text-white font-bold text-[20px] sm:text-[24px] text-center'>{name}</h3>
      <p className='text-secondary text-[14px] sm:text-[16px] font-semibold text-center mt-2 mb-2 sm:my-3'>
        {role}
      </p>
      <a 
        href={`mailto:${email}`} 
        className='flex items-center gap-2 text-[#00a6ff] hover:text-[#0066cc] transition-colors duration-300 text-[12px] sm:text-[14px] mb-3 sm:mb-4'
      >
        <FaEnvelope className="text-[14px] sm:text-[16px]"/>
        {email}
      </a>
      <ul className='mt-4 space-y-2 w-full list-none'>
        {responsibilities.map((item, idx) => (
          <li
            key={idx}
            className='text-white-100 text-[12px] sm:text-[14px] pl-4 tracking-wider'
            style={{ position: 'relative' }}
          >
            <span
              className='absolute left-0 top-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0066cc] rounded-full'
              style={{ transform: 'translateY(-50%)' }}
            />
            {item}
          </li>
        ))}      
      </ul>
    </div>
  </motion.div>
);

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default TeamMember;