//import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechComponent = () => {
  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center sm:gap-6 md:gap-8 lg:gap-10'>
      {technologies.map((technology) => (
        <div 
          className='w-20 h-20 transition-all duration-300 sm:w-24 sm:h-24 md:w-28 md:h-28 hover:scale-110' 
          key={technology.name}
        >
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export const Tech = SectionWrapper(TechComponent, "");
export default Tech;
