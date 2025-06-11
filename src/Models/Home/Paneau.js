import { useState } from "react";
import { useInView } from "react-intersection-observer";

import CountUp from "react-countup";
import { useSelector } from 'react-redux'; 
import {motion} from "framer-motion"

import texts from './Datas/paneuData.json';

const Panneau = () => {
    const [startAnimation, setStartAnimation] = useState(false);

    const { ref} = useInView({
        triggerOnce: true,
        threshold: 1.0,
        onChange: (inView) => {
            if (inView) setStartAnimation(true);
        },
    });

    
    const { language } = useSelector((state) => state.presntion); 

    const currentText = texts[language];  
    return (
        <section
            ref={ref}
            className="lg:w-[90%] w-[94%] sm:p-2 sm:py-7 py-7 md:p-10 md:py-16 rounded-3xl md:rounded-[40px] bg-white/20 mb-10 border border-white/20 lg:-mt-32 xl:-mt-16 -mt-5  blurey blurey backdrop-blur-xl flex justify-center pnee items-center z-10"
        >
            <div className="w-full flex justify-center">
                {/* Élèves Inscrits */}
              

                {/* Taux de Réussite */}
                <motion.div className="flex-1 md:m-2 flex justify-center items-center flex-col border-transparent border-r border-r-neutral-900/10"  initial={{y:30,opacity:0.2}} whileInView={{y:0,opacity:1}} transition={{type:"spring",delay:0.1}} >
                    <p className="text-neutral-900/55 pb-4 text-[10px] sm:text-sm md:text-base xl:text-lg ">{currentText.successRate}</p>
                    <b className="sm:text-3xl md:text-5xl text-2xl xl:text-7xl text-red-500 text-center tex">
                        {startAnimation ? <CountUp className="font-bold" start={0} end={100} duration={2.5} suffix="%" /> : <b className="">0</b>}
                    </b>
                    <p className="text-neutral-900/55 mt-4 xl:text-xl md:text-lg tiny">{currentText.successRateText}</p>
                </motion.div>

                {/* Langues enseignées */}
                <motion.div className="flex-1 md:m-2 flex justify-center items-center flex-col border-transparent border-r border-r-neutral-900/10" initial={{y:30,opacity:0.1}} whileInView={{y:0,opacity:1}} transition={{type:"spring",delay:0}} >
                    <p className="text-neutral-900/55 pb-4 text-[10px] sm:text-sm md:text-base xl:text-lg ">{currentText.languages}</p>
                    <b className="sm:text-3xl md:text-5xl text-2xl xl:text-7xl text-blue-500 text-center">
                        {startAnimation ? <CountUp className="font-bold" start={0} end={parseInt(currentText.languagesCount)} duration={2.5} /> : 0}
                        <sup>
                            <b>+1</b>
                        </sup>
                    </b>
                    <p className="text-neutral-900/55 mt-4 md:text-lg xl:text-xl tiny">{currentText.languagesText}</p>
                </motion.div>
                <motion.div className="flex-1 md:m-2 flex justify-center items-center flex-col border border-transparent" initial={{y:40,opacity:0}} whileInView={{y:0,opacity:1}} transition={{type:"spring",delay:0.22}} >
                    <p className="text-neutral-900/55 pb-4 text-[10px] sm:text-sm md:text-base xl:text-lg text-center">{currentText.isoCertification}</p>
                    <span className="sm:text-3xl font-semibold md:text-5xl text-2xl xl:text-7xl text-red-500 text-center">
                       ISO{startAnimation ? <CountUp  start={0} end={parseInt(9001)} duration={1.7} separator=""  /> : 0}
                    </span>
                    <p className="text-neutral-900/55 mt-4 xl:text-xl md:text-lg tiny">{currentText.isoCertificationText}</p>
                </motion.div>

               

                

                
            </div>
        </section>
    );
};

export default Panneau;
