import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { inView, motion } from "framer-motion";
import { faDirections, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import content from "./ConatctData/CntMapData.json";
import { useInView } from "react-intersection-observer";
import { setShowLang } from "../../redux(toolKit)/slices/showLang";

export default function CntMapInterface() {
    const language = useSelector((state) => state.presntion.language);
    const [selectedMap, setSelectedMap] = useState(0);
    const dispatch = useDispatch();
    const thresholdValue =  0.65
    const { ref: navRef, inView: navInView } = useInView({
        threshold: thresholdValue, // trigger when 10% of the Nav is visible
      });
      useEffect(() => {
        if (navInView) {
          dispatch(setShowLang(false))
        }else{
            dispatch(setShowLang(true))
        }
      }, [navInView]); 
      const upAnimation = (d=0) => ({
        initial: { y: -50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { type: "spring",delay:d}
      })

    return (
        <>
            <div className={`w-full flex items-center justify-center flex-col mb-20 flash`}>
                <motion.p {...upAnimation()} className={`text-neutral-500`}>{content.localisation[language]}</motion.p>
                <motion.h1 {...upAnimation(0.2)} className={`text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl text-blue-500 font-bold text-center`}>
                    {content.title[language]}
                </motion.h1>
                <div className="w-full flex items-center justify-center h-[100px]">
                <Nav inView={navInView} selectedMap={selectedMap} clickHandel={(index) => setSelectedMap(index)} language={language} />

                </div>
                <motion.div {...upAnimation()} ref={navRef} className={`w-[90%] mt-5 xl:mt-10 h-[500px] xl:h-[900px] bg-neutral-100 rounded-[20px] lg:rounded-[35px] shadow-inner overflow-hidden ease-in-out duration-300`}>
                    <div className={`w-[200%] ease-in-out duration-300 h-full flex items-center justify-center relative ${selectedMap && "translate-x-[-50%]"}`}>
                        <div className={`w-[50%] ease-in-out duration-300 h-full p-[5px] lg:p-[20px]`}>
                            <div className={`w-full h-full bg-white rounded-[15px] lg:rounded-[15px] shadow-lg relative`}>
                                 
                                    
                                    <iframe
                                        src={content.mapUrls[language]}
                                        className={`w-full h-full -z-10 rounded-[15px] `}
                                    ></iframe>
                                
                                <div className={`absolute blurey  top-[5px] flash ${language==="ar"?'right-[5px] flex-row-reverse text-right':'left-[5px]'} sm:py-3 sm:w-[350px] bg-white/50 backdrop-blur-md rounded-[10px] border-[0.1px] border-white shadow-2xl z-40 p-2 flex items-center justify-center`}>
                                    <div className={`w-[80%] text-neutral-400`}>
                                        <h1 className={`text-blue-500 sm:text-xl`}><b>{content.schoolName[language]}</b></h1>
                                        <p className={`text-[8px]  lg:text-[10px] -mt-1`}>{content.address[language]}</p>
                                        <a
                                            href="https://www.google.com/maps/place/Ecole+La+Tour+Eiffel/@33.5758243,-7.5156495,17z/data=!4m14!1m7!3m6!1s0xda7cb4e3b1536db:0x8a260272bc14ecfb!2sEcole+La+Tour+Eiffel!8m2!3d33.5758199!4d-7.5130746!16s%2Fg%2F11bw4745c1!3m5!1s0xda7cb4e3b1536db:0x8a260272bc14ecfb!8m2!3d33.5758199!4d-7.5130746!16s%2Fg%2F11bw4745c1!5m1!1e2?hl=en&entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                                            target="_blank"
                                        >
                                            <p className={`text-neutral-600 lg:text-base`}>{content.rating[language]}</p>
                                            <div className={`flex ${language=="ar"?"flex-row-reverse":""} items-center gap-x-2`}>
                                                <h1 className={`text-blue-500 font-extrabold lg:text-3xl text-xl`}>4.5</h1>
                                                <img className={`h-3 lg:h-5   ${language=="ar"?"-scale-x-100":""} `} src={process.env.PUBLIC_URL + '/images/stars.webp'} />
                                            </div>
                                        </a>
                                        <a className={`text-xs underline hover:text-neutral-500`} href="https://www.google.com/maps?ll=33.57582,-7.513075&z=17&t=m&hl=en&gl=MA&mapclient=embed&cid=9954646718154075387" target="_blank">
                                            {content.seeLargeMap[language]}
                                        </a>
                                    </div>
                                    <a
                                        href="https://www.google.com/maps/dir//Ecole+La+Tour+Eiffel+HFGP%2B8QF+Casablanca+20250/@33.5758199,-7.5130746,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0xda7cb4e3b1536db:0x8a260272bc14ecfb!2m2!1d-7.5130746!2d33.5758199!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        className={`w-[20%] flex flex-col items-center justify-center text-blue-500 hover:text-blue-400 ease-in-out duration-200`}
                                    >
                                        <FontAwesomeIcon icon={faLocationArrow} className={`text-3xl  lg:text-5xl`} />
                                        <p className={`text-xs mt-2`}>{content.directions[language]}</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={`w-[50%] h-full p-[5px] lg:p-[20px]`}>
                            <div className={`w-full h-full bg-white rounded-[15px] shadow-lg relative`}>
                                <a href="https://maps.apple.com/place?place-id=I734CF5A751229AC0&address=20400+Casablanca%2C+Morocco&coordinate=33.5758565%2C-7.513023&name=Ecole+La+Tour+Eiffel&_provider=9902" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/images/appleMapLoc.webp'} className={`w-full h-full object-cover -z-10 rounded-[15px] `} />
                                </a>
                                <div className={`absolute blurey top-[5px] ${language==="ar"?'right-[5px] flex-row-reverse text-right':'left-[5px]'} lg:w-[350px] bg-white/50 backdrop-blur-md rounded-[10px] border-[0.1px] border-white shadow-2xl z-50 p-2 flex items-center justify-center`}>
                                    <div className={`w-[80%] text-neutral-400 ${language==="ar"?'text-right flex flex-col items-end':''}`}>
                                        {language!=="ar"?<img src={process.env.PUBLIC_URL + '/images/ApMaps.webp'} className={`lg:h-20 h-14 -ml-5 -mt-4`} />:
                                        <div className="flex items-center mb-3 text-neutral-900 font-extrabold gap-x-1"><img src={process.env.PUBLIC_URL + '/images/apple.webp'} className={`h-5 lg:h-8`} /> خرائط</div>}
                                        <h1 className={`text-blue-500 sm:text-xl ${language==="ar"?"":"-mt-4" }`}> <b>{content.schoolName[language]}</b></h1>
                                        <p className={`text-[10px] -mt-1`}>{content.address[language]}</p>
                                        <a className={`text-xs underline hover:text-neutral-500`} href="https://maps.apple.com/place?place-id=I734CF5A751229AC0&address=20400+Casablanca%2C+Morocco&coordinate=33.5758565%2C-7.513023&name=Ecole+La+Tour+Eiffel&_provider=9902" target="_blank">
                                            {content.seeLargeMap[language]}
                                        </a>
                                    </div>
                                    <a
                                        href="https://maps.apple.com/directions?destination=33.5758565%2C+-7.513023&mode=driving"
                                        target="_blank"
                                        className={`w-[20%] flex flex-col items-center justify-center text-blue-500 hover:text-blue-400 ease-in-out duration-200`}
                                    >
                                        <FontAwesomeIcon icon={faDirections} className={`lg:text-5xl text-3xl`} />
                                        <p className={`text-xs mt-2`}>{content.directions[language]}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

const Nav = ({ selectedMap, clickHandel, language,inView }) => {
    return (
        <motion.div layout transition={{type:"spring"}} className={`  ${inView?'fixed bottom-5 w-[80%] rounded-full  md:w-[60%] lg:w-[50%] shadow-2xl':"w-[90%] rounded-[20px] md:w-[70%] lg:w-[60%]"} border border-white/80 2xl:w-[25%] xl:w-[50%] bg-black/5 backdrop-blur-lg blurey z-50 p-[5px] lg:p-[10px] mt-5 lg:mt-10  shadow-inner`}>
            <div className={`w-full flex items-center py-4 justify-center relative rounded-[10px]`}>
                <div className={`w-full h-full absolute top-0 left-0 z-0 flex overflow-visible`}>
                    <motion.div
                        layout
                        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                        style={{ left: `${selectedMap * 50}%` }}
                        className={`w-[50%] absolute top-0 ${inView?"bg-white/80 rounded-full ":"bg-white rounded-[15px] lg:rounded-[10px]"}   shadow-lg h-full`}
                    ></motion.div>
                </div>

                <div
                    className={`w-[50%] flex items-center justify-center z-10 cursor-pointer`}
                    onClick={() => clickHandel(0)}
                >
                    <img src={process.env.PUBLIC_URL + `/images/google${selectedMap === 0 ? "bl" : ""}.webp`} alt="map" className={`h-5`} />
                    <p className={`font-semibold mx-2 ease-in-out duration-200 ${selectedMap == 0 ? "text-blue-500" : ""}`}>
                        {content.googleMaps[language]}
                    </p>
                </div>

                <div
                    className={`w-[50%] flex items-center justify-center z-10 cursor-pointer`}
                    onClick={() => clickHandel(1)}
                >
                    <img src={process.env.PUBLIC_URL + `/images/apple${selectedMap === 1 ? "bl" : ""}.webp`} alt="map" className={`h-5`} />
                    <p className={`font-semibold mx-2 ease-in-out duration-200 ${selectedMap == 1 ? "text-blue-500" : ""}`}>
                        {content.appleMaps[language]}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
