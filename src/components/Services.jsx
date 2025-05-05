import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = [
    {
      title: 'Cybersecurity Solutions',
      description: 'AI-based threat detection and prevention, SSL encryption, firewall protection, and vulnerability assessments for comprehensive digital security.'
    },
    {
      title: 'Media Production',
      description: 'Professional media services enhanced with AI technology, ensuring high-quality content protected from piracy and unauthorized access.'
    },
    {
      title: 'IT Training',
      description: 'Real-world, project-based learning with customized courses for all skill levels, focusing on practical, job-ready skills.'
    },
    {
      title: 'Cybercafé Services',
      description: 'Modern digital workspace with AI-driven support systems and comprehensive technical assistance.'
    }
  ];

  const features = [
    {
      title: 'Integrated Solutions',
      description: 'All digital needs met under one brand with seamless integration between services.'
    },
    {
      title: 'AI-Powered Innovation',
      description: 'Advanced AI chatbots for customer support, smart threat detection, and enhanced media services.'
    },
    {
      title: 'Practical Learning',
      description: 'Hands-on, skill-based IT training focused on real-world applications and career advancement.'
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Our Services</h2>
        <p className={`${styles.sectionSubText} text-secondary`}>
          Comprehensive Digital Solutions
        </p>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        We provide a comprehensive suite of services under one brand, combining expertise
        across different fields to deliver top-tier solutions without outsourcing.
      </motion.p>

      <div className='grid grid-cols-1 gap-10 mt-20 md:grid-cols-2'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <motion.div
        variants={fadeIn('up', 'spring', 0.5, 1)}
        className='mt-20 bg-black-200 rounded-[20px] p-8'
      >
        <h3 className='text-white font-bold text-[24px] mb-6'>Key Features</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn('right', 'spring', 0.2 * index, 0.5)}
              className='bg-tertiary rounded-[15px] p-6'
            >
              <h4 className='text-white font-semibold text-[18px] mb-2'>{feature.title}</h4>
              <p className='text-secondary text-[14px]'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Services, 'services');