import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import PropTypes from 'prop-types';

// Import team member images
import markImage from '../assets/team/mark.jpeg';
import martinImage from '../assets/team/martin.jpeg';
import richardImage from '../assets/team/richard.jpg';

const TeamMember = ({ name, role, responsibilities, image, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
  >
    <div className='flex flex-col items-center'>
      <img
        src={image}
        alt={`${name}'s profile`}
        className='w-32 h-32 rounded-full mb-4 object-cover border-4 border-[#0066cc]'
      />
      <h3 className='text-white font-bold text-[24px] text-center'>{name}</h3>
      <p className='text-secondary text-[16px] font-semibold text-center' style={{ margin: '10px 0' }}>
        {role}
      </p>
      <ul className='mt-5 space-y-2 w-full list-none'>
        {responsibilities.map((item, idx) => (
          <li
            key={idx}
            className='text-white-100 text-[14px] pl-4 tracking-wider'
            style={{ position: 'relative' }}
          >
            <span
              className='absolute left-0 top-2 w-2 h-2 bg-[#0066cc] rounded-full'
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
  index: PropTypes.number.isRequired
};

const Team = () => {
  const teamMembers = [
    {
      name: 'Mark Kinyanjui',
      role: 'Chief Executive Officer (CEO)',
      image: markImage,
      responsibilities: [
        'The truth is and will always be that, there always is someone better than you. All you need to do is - Learn, Earn, and Return '
      ]
    },
    {
      name: 'Martin Mawira',
      role: 'Managing Director (MD)',
      image: martinImage,
      responsibilities: [
        'Everyday is a day to learn, a day to be better and be the best version of ones-self'
      ]
    },
    {
      name: 'Richard Karanja',
      role: 'Chief Finance Director (CFD)',
      image: richardImage,
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