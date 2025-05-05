import { motion } from 'framer-motion';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import MediaServiceCard from './MediaServiceCard';

const MediaServices = () => {
  const services = [
    {
      title: 'Graphic Design',
      description: 'Transform your brand with our professional graphic design services.',
      features: [
        'Brand identity and logo design',
        'Marketing materials and collateral',
        'Social media graphics and templates',
        'Custom illustrations and infographics',
        'Print and digital publication design'
      ]
    },
    {
      title: 'Videography',
      description: 'Capture your story through professional video production.',
      features: [
        'Corporate event coverage',
        'Product demonstrations and showcases',
        'Promotional and marketing videos',
        'Documentary-style storytelling',
        'Aerial and drone cinematography'
      ]
    },
    {
      title: 'Video Editing',
      description: 'Polish your content with our expert editing services.',
      features: [
        'Professional color grading',
        'Sound design and mixing',
        'Motion graphics and animations',
        'Special effects and transitions',
        'Content optimization for platforms'
      ]
    },
    {
      title: 'Photography',
      description: 'Preserve moments with our professional photography services.',
      features: [
        'Corporate and event photography',
        'Product and e-commerce shots',
        'Professional headshots and portraits',
        'Architectural and interior photography',
        'Post-production and retouching'
      ]
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Media Services</h2>
        <p className={`${styles.sectionSubText} text-secondary`}>
          Professional Media Solutions for Your Business
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-8 mx-auto mt-20 max-w-7xl md:grid-cols-2'>
        {services.map((service, index) => (
          <MediaServiceCard
            key={service.title}
            index={index}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

const WrappedMediaServices = SectionWrapper(MediaServices, 'media-services');
export default WrappedMediaServices;