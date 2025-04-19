import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const CaseStudyCard = ({ index, title, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        role="article"
        aria-label={`Case study for ${title}`}
      >
        <img
          src={image}
          alt={title}
          className="object-contain w-16 h-16"
          loading="lazy"
        />

        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        
        <p className="text-secondary text-[14px] text-center">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {tags.map((tag) => (
            <p
              key={`${title}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="flex absolute inset-0 justify-end m-3">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer black-gradient"
            role="button"
            aria-label={`View source code for ${title}`}
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && window.open(source_code_link, "_blank")}
          >
            <img
              src="/github.png"
              alt="source code"
              className="object-contain w-1/2 h-1/2"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;