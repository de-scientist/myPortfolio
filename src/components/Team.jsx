import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import PropTypes from 'prop-types';
import { FaEnvelope } from 'react-icons/fa';

// Import team member images
import markImage from '../assets/team/mark.jpeg';
import martinImage from '../assets/team/martin.jpeg';
import richardImage from '../assets/team/richard.jpg';

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

const Team = () => {
  const teamMembers = [
    {
      name: 'Mark Kinyanjui',
      role: 'Chief Executive Officer (CEO)',
      image: markImage,
      email: 'gitaumark502@gmail.com',
      responsibilities: [
        'The truth is and will always be that, there always is someone better than you. All you need to do is - Learn, Earn, and Return '
      ]
    },
    {
      name: 'Martin Mawira',
      role: 'Managing Director (MD)',
      image: martinImage,
      email: 'kaariamawiramartin@gmail.com',
      responsibilities: [
        'Everyday is a day to learn, a day to be better and be the best version of ones-self'
      ]
    },
    {
      name: 'Richard Karanja',
      role: 'Chief Finance Director (CFD)',
      image: richardImage,
      email: 'richyranjas@gmail.com',
      responsibilities: [
        'Plan, budget, propose and then go for it. Never say never'
      ]
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Meet the Team</h2>
        <p className={`${styles.sectionSubText} text-secondary`}>
          Leadership driving innovation and excellence
        </p>
      </motion.div>

      <div className='flex flex-wrap gap-7 justify-center mt-20'>
        {teamMembers.map((member, index) => (
          <TeamMember key={member.name} index={index} {...member} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Team, 'team');