import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import content from "./GalDatas/GalFirstInterfaceData.json"; // Adjust the path based on your project structure
import { motion } from "framer-motion";

export default function GalFirstInterface() {
    const language = useSelector((state) => state.presntion.language);

    return (
        <>
            <div 
                className={`w-full h-full gallery rounded-b-[40px] lg:rounded-b-[70px] rounded-t-none relative 
                flex items-center justify-center flex-col overflow-hidden`}
            >
                <video 
                    src={process.env.PUBLIC_URL + "/videos/movedGal.mp4"} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={`w-full h-full absolute top-0 left-0 object-cover 
                    rounded-b-[40px] lg:rounded-b-[70px] rounded-t-none`}
                />
                <div className={`w-full h-full items-center justify-center flex flex-col  bg-black/10`}></div>
               
                <div className={`w-full absolute h-full flex flex-col items-center justify-center left-0 z-10 gap-3`}>
                    <div className={`w-full h-[20%]`}></div>
                    <div className={`w-full h-[60%] flex flex-col items-center justify-center text-center`}>
                        <motion.p initial={{scale:0.9,opacity:0,y:60}} whileInView={{scale:1,opacity:1,y:0}} transition={{type:"spring",bounce:0.1}} className={`text-white/90 font-medium tracking-wide`}>{content.la_galerie[language]}</motion.p>
                        <motion.h1 initial={{scale:0.76,opacity:0.2,y:2}} whileInView={{scale:1,opacity:1,y:0}} transition={{type:"spring",bounce:0.1}} className={`text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl ${language=="ar"&&"text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl "}mb-4`}>
                            <b>{content.each_moment_counts[language]}</b>
                        </motion.h1>
                        <motion.p initial={{scale:0.82,opacity:0,y:-55}} whileInView={{scale:1,opacity:1,y:0}} transition={{type:"spring",bounce:0.1}} className={`text-white/90 font-medium tracking-wide w-[90%]`}>
                            {content.discover_school_life[language]}
                        </motion.p>
                        <motion.button initial={{scale:0.2,opacity:0}} whileInView={{scale:1,opacity:1,y:0}} transition={{type:"spring",bounce:0.1}}
                            className={`hover:bg-blue-500/80 backdrop-blur-xl  px-6 py-3 
                            bg-blue-500 text-white rounded-3xl font-medium tracking-wide mt-6`}
                        >
                            {content.view_gallery[language]}
                        </motion.button>
                    </div>
                    <div className={`w-full h-[10%] flex text-white/60 xl:text-white/80 items-end justify-end text-xl xl:text-2xl gap-x-3`}></div>
                </div>
                <div className={`absolute lg:right-0 bottom-0 p-[20px] lg:p-[30px] info`}>
                    <motion.div initial={{y:10,scale:0.8,opacity:0}} whileInView={{y:0,scale:1,opacity:1}} transition={{type:"spring",bounce:0.1}}
                        className={`lg:w-[400px] bg-white/30 shadow-xl backdrop-blur-lg blurey rounded-[30px] lg:rounded-[40px] 
                        border border-white/30 flex items-center justify-center p-2 lg:p-3 ${language==="ar"?"flex-row-reverse":"flex-row"} `}
                    >
                    <motion.div initial={{y:30,opacity:0}} whileInView={{y:0,scale:1,opacity:1}} transition={{type:"spring",bounce:0.1,delay:0.1}}
                          className={`w-[80%]`}>
                            <p className={`text-white lg:text-sm font-medium  text-white/80 ${language==="ar"?"text-right pr-2":"text-left pl-2"}`}>
                                {content.immortalize_best_moments[language]}
                            </p>
                        </motion.div>
                    <motion.div initial={{scale:0.4,opacity:0}} whileInView={{y:0,scale:1,opacity:1}} transition={{type:"spring",bounce:0.1,delay:0.3}}
                 className={`w-[20%] flex ${language==="ar"?"":"justify-end"}  `}>
                            <motion.div className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 cursor-pointer`}>
                                <FontAwesomeIcon icon={faArrowCircleDown} className={`text-white`} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
