//import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechComponent = () => {
  return (
    <div className='flex flex-row flex-wrap gap-10 justify-center'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export const Tech = SectionWrapper(TechComponent, "");
export default Tech;
