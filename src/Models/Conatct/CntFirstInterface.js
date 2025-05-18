import { faAngleDoubleDown, faBolt, faClock, faEnvelope, faGears, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import content from "./ConatctData/CntFirstInterfaceData.json"; // Make sure this path is correct
import { delay, motion } from "framer-motion";

export default function CntFirstInterface() {
    const language = useSelector((state) => state.presntion.language);
    const lang = language || "fr"; // fallback to French
    const leftAnimation = (x = 0,d=0) => ({
        initial: { x: x, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { type: "spring",delay:d}
      })

    return (
        <>
            <div className={`w-full fg h-screen flex items-center justify-center  pt-[8%] mb-20`}>
                <img className={`h-full   opacity-30 sm:opacity-70 object-cover sm:object-contain lg:opacity-100 absolute  top-0 right-0`} src={process.env.PUBLIC_URL + `/images/map${lang}.webp`} alt="map" />
                <div className={`w-[90%] z-10 fgg  h-full flex justify-center items-center  md:mt-0`}>
                    <div className={`w-full text-neutral-900 text-center lg:${lang === 'ar' ? 'text-right items-end' : 'text-left'} flex flex-col  justify-center`}>
                        <div className={`lg:w-[80%] xl:w-[60%] mt-40 md:mt-0`}>
                            <motion.p {...leftAnimation(-50)} className={`text-neutral-500 uppercase`}>{content.contact_us[lang]}</motion.p>

                            <motion.h1 {...leftAnimation(-50,0.1)}  className={`text-4xl sm:text-5xl lg:text-6xl  2xl:text-8xl lg:leading-tight xl:leading-none font-bold`}dangerouslySetInnerHTML={{ __html: content.title[lang] }}></motion.h1>

                            <motion.p {...leftAnimation(-50,0.15)}  className={`md:text-lg lg:text-base xl:text-lg  mt-6 text-neutral-800`}dangerouslySetInnerHTML={{ __html: content.intro[lang] }}></motion.p>

                            <motion.div {...leftAnimation(-50,0.2)}  className={`flex w-full items-center justify-center lg:justify-start flex-col lg:flex-row ${language=="ar"&&' flex-row-reverse lg:flex-row-reverse '} mt-6 gap-3 `}>
                                <FontAwesomeIcon icon={faLocationDot} className={`text-xl lg:text-2xl text-blue-500`} />
                                <p className={`flex lg:text-base `}>{content.address[lang]}</p>
                            </motion.div>

                            <div className={`flex  w-full mt-6 gap-3 flex-col sm:flex-row items-center lg:items-start lg:justify-start  justify-center ${language=="ar"&&' flex-row-reverse lg:justify-end'}`}>
                                <motion.div {...leftAnimation(-50,0.22)}   className={`bg-neutral-100 flex items-center justify-center  p-[6px] pr-[8px] rounded-[20px] ${language=="ar"&&' flex-row-reverse'}`}>
                                    <div className={`w-10 h-10 rounded-[14px] bg-neutral-800 text-white flex justify-center items-center`}>
                                        <FontAwesomeIcon className={`${lang=="ar"&&'-scale-x-100'}`} icon={faPhone} />
                                    </div>
                                    <p className={`text-neutral-800 flex mx-[6px] font-semibold `}>{content.phone[lang]}</p>
                                </motion.div>
                                <motion.div {...leftAnimation(-80,0.3)}  className={`bg-neutral-100 flex items-center justify-center p-[6px] ${language=="ar"&&' flex-row-reverse'} rounded-[20px] pr-[8px]`}>
                                    <div className={`w-10 h-10 rounded-[14px] bg-neutral-800 text-white flex justify-center items-center`}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <p className={`text-neutral-800 flex mx-[6px] font-semibold`}>{content.email[lang]}</p>
                                </motion.div>
                            </div>
                        </div>

                        <div className={`flex flex-col lg:flex-row w-full items-end  mt-6  ${language!=="ar"?'items-end':' lg:flex-row-reverse items-end '}`}>
                            <div className={`lg:w-[60%] w-full flex items-center justify-center lg:justify-start ${lang=="ar"&&'lg:justify-end'} gap-3`}>
                                <motion.div {...leftAnimation(-50,0.3)}  className={`flex items-center justify-center flex-col p-4 rounded-[20px] border border-white/50 bg-black/5 backdrop-blur-md blurey text-center`}>
                                    <FontAwesomeIcon icon={faBolt} className={`text-2xl mb-2`} />
                                    <p className={`font-semibold`}>{content.quick_response[lang]}</p>
                                    <small className={`text-neutral-500 text-xs hidden lg:block`}>{content.quick_response_note[lang]}</small>
                                </motion.div>

                                <motion.div {...leftAnimation(-80,0.4)}  className={`flex items-center justify-center flex-col p-4 rounded-[20px] border border-white/50 bg-black/5 backdrop-blur-md blurey text-center`}>
                                    <FontAwesomeIcon icon={faClock} className={`text-2xl mb-2`} />
                                    <p className={`font-semibold`}>{content.support[lang]}</p>
                                    <small className={`text-neutral-500 text-xs hidden lg:block`}>{content.support_note[lang]}</small>
                                </motion.div>

                                <motion.div {...leftAnimation(-100,0.5)}  className={`flex items-center justify-center flex-col p-4 rounded-[20px] border border-white/50 bg-black/5 backdrop-blur-md blurey text-center`}>
                                    <FontAwesomeIcon icon={faGears} className={`text-2xl mb-2`} />
                                    <p className={`font-semibold`}>{content.solution[lang]}</p>
                                    <small className={`text-neutral-500 text-xs hidden lg:block`}>{content.solution_note[lang]}</small>
                                </motion.div>
                            </div>

                            <div className={`lg:w-[40%] w-full justify-center  my-5 lg:my-0 flex ${lang=="ar"?'lg:justify-start':"lg:justify-end"}`}>
                                <motion.div {...leftAnimation(80,0.3)}  className={`flex items-center  ${language=="ar"&&'flex-row-reverse'} justify-center border border-white/50 p-4 rounded-[20px] bg-black/5 backdrop-blur-md blurey gap-2 cursor-pointer`}>
                                    <img src={process.env.PUBLIC_URL + '/images/apple.webp'} className={`h-5`} alt="apple" /> | 
                                    <img className={`h-4 `} src={process.env.PUBLIC_URL + '/images/google.webp'} alt="google" />
                                    <div>{content.find_us[lang]}</div>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
