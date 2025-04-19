import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

const BlogCard = ({ title, excerpt, date, readTime, slug, image, index }) => {
  return (
    <motion.article
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="w-full sm:w-[360px] bg-tertiary rounded-2xl p-5 cursor-pointer"
      onClick={() => window.location.href = `/blog/${slug}`}
      role="link"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && (window.location.href = `/blog/${slug}`)}
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-2xl"
          loading="lazy"
        />
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-secondary text-[14px]">{date}</p>
          <p className="text-secondary text-[14px]">{readTime} min read</p>
        </div>

        <h3 className="text-white font-bold text-[24px]">{title}</h3>
        
        <p className="mt-2 text-secondary text-[14px]">
          {excerpt}
        </p>

        <div className="flex justify-end mt-4">
          <span 
            className="text-[#915EFF] text-[14px] hover:underline"
            aria-label={`Read more about ${title}`}
          >
            Read More →
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;