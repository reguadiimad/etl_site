import { useSelector } from "react-redux";
import content from './GalDatas/GalSecondInterface.json'; // Import the JSON file
import React, { useEffect, useRef, useState } from 'react';
import SmoothScrollSlider from "./SmoothScrollSlider";
import GalExplain from "./GalExplain";
import { motion } from "framer-motion";

export default function GalSecondeInterface() {
    const language = useSelector((state) => state.presntion.language); // Assuming your language state is correct
    

    return (
        <>
           <div className={`w-[90%] md:mt-16 xl:mt-40  ${language=="ar"&&"text-right"} sm:text-center flex items-center justify-center flex-col text-neutral-900`}>
  <motion.p 
    className={`w-full sm:w-auto font-semibold text-sm lg:text-xl  text-blue-500`}
    initial={{ opacity: 0,scaleX:0.8}} 
    whileInView={{ opacity: 1,scaleX:1 }} 
    transition={{ type: 'spring', }}
  >
    {content[language].captions}
  </motion.p>

  <motion.h1 
    className={`${language=="ar"?"text-5xl sm:text-6xl mt-2 lg:text-7xl xl:text-7xl 2xl:text-8xl ":"text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl "} sm:mb-2 lg:mb-4`}
    initial={{ opacity: 0, y: -50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ type: 'spring',  }}
  >
    <b>{content[language].heading1}</b>
  </motion.h1>

  <motion.h1 
    className={`${language=="ar"?"text-5xl sm:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl ":"text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl "} `}
    initial={{ opacity: 0, y: -90 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ type: 'spring',  }}
  >
    <b>{content[language].heading2}</b>
  </motion.h1>

  <motion.p 
    className={`sm:w-[70%] lg:w-[60%] text-sm md:text-base lg:text-lg 2xl:text-xl lg:text-center sm:mt-6 text-neutral-400 font-semibold mb-3 lg:mb-10`}
    initial={{ opacity: 0, y: -130 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ type: 'spring',  }}
  >
    {content[language].description}
  </motion.p>
</div>
            <SmoothScrollSlider/>
            <GalExplain/>
          
        </>
    );
}




