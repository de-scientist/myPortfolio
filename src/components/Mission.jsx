import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const Mission = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Mission & Vision</h2>
      </motion.div>

      <div className='grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3'>
        <motion.div
          variants={fadeIn('up', 'spring', 0.1, 0.75)}
          className='p-6 rounded-2xl bg-tertiary'
        >
          <h3 className='text-white text-[24px] font-bold mb-4'>Mission</h3>
          <p className='text-secondary text-[17px] leading-[30px]'>
            To empower businesses, individuals, and institutions with innovative,
            secure, and high-quality digital solutions while fostering a culture
            of continuous learning and technological advancement.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 0.2, 0.75)}
          className='p-6 rounded-2xl bg-tertiary'
        >
          <h3 className='text-white text-[24px] font-bold mb-4'>Vision</h3>
          <p className='text-secondary text-[17px] leading-[30px]'>
            To be the leading digital innovation center that transforms lives
            through technology, security, creativity, and education.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'spring', 0.3, 0.75)}
          className='p-6 rounded-2xl bg-tertiary lg:col-span-1 md:col-span-2'
        >
          <h3 className='text-white text-[24px] font-bold mb-4'>Core Values</h3>
          <ul className='space-y-4 list-none'>
            {[
              { title: 'Innovation', desc: 'Always exploring new ideas and technological advancements.' },
              { title: 'Integrity', desc: 'Providing honest, secure, and high-quality services.' },
              { title: 'Customer-Centricity', desc: 'Prioritizing client needs and delivering exceptional experiences.' },
              { title: 'Continuous Learning', desc: 'Encouraging skill development and knowledge-sharing.' },
              { title: 'Community Engagement', desc: 'Supporting and uplifting the digital community.' }
            ].map((value, index) => (
              <motion.li
                key={value.title}
                variants={fadeIn('right', 'spring', 0.1 * index, 0.5)}
                className='flex items-start space-x-4'
              >
                <span className='text-[#0066cc] font-bold'>{value.title}</span>
                <span>– {value.desc}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Mission, 'mission');