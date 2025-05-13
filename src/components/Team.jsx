import { motion } from 'framer-motion';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

// Import team member images
import markImage from '../assets/team/mark.jpeg';
import martinImage from '../assets/team/martin.jpeg';
import richardImage from '../assets/team/richard.jpg';
import TeamMember from './TeamMember';

const TeamComponent = () => {
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

const WrappedTeam = SectionWrapper(TeamComponent, 'team');
export default WrappedTeam;