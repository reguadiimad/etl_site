import { faArrowTrendUp, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { setScrollVal } from "../../redux(toolKit)/slices/scrollSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import translations from "./Datas/firstInterFaceDats.json";
import { motion, AnimatePresence } from "framer-motion";

const FirstInterface = () => {
    const { language } = useSelector((state) => state.presntion); // Access language from Redux state
    const dispatch = useDispatch();
    const scrollValue = useSelector((state) => state.scrollVal);
    const { ref: motherRef, inView } = useInView({
        threshold: 0.5, // Trigger when 50% of the component is visible
    });

    useEffect(() => {
        inView && dispatch(setScrollVal(null));
    }, [inView, dispatch, scrollValue]);

    const yr = new Date().getFullYear();
    const leftAnimation = (d = 0) => ({
        initial: { x: -50, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { type: "spring", damping: 10, delay: d }
      });
      
      const rightAnimation = (d = 0) => ({
        initial: { x: 50, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { type: "spring", damping: 10, delay: d }
      });
      
      const topAnimation = (d = 0) => ({
        initial: { y: -50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { type: "spring", damping: 10, delay: d }
      });
      
      const bottomAnimation = (d = 0) => ({
        initial: { y: 50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { type: "spring", damping: 10, delay: d }
      });
      const scaleAnimation = (d = 0) => ({
        initial: { scale: 0, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        transition: { type: "spring", damping: 12, delay: d }
      });
      
      
      
    


    return (
        <>
            <div ref={motherRef} className={`w-[90%] flex-col lg:flex-row flex mt-10 lg:mt-0 items-center justify-center mb-10 lg:mb-16  ${language==='ar'?'lg:flex-row-revers lg:flex-row-reverse  ':''}`}>
                <div className={`w-full  lg:w-[55%] mb-5 gap-y-2 flex flex-col items-center justify-center text-center lg:text-left lg:items-start ${language==="ar"&&'lg:items-end '}`}>
                    <motion.p {...leftAnimation()}  className={`text-neutral-500  `}>{translations.surNous[language]}</motion.p>
                    <motion.h1 {...leftAnimation(0.11)}  className={`  font-bold ${language==="ar"?'2xl:text-9xl lg:text-8xl leading-tight lg:text-right text-4xl md:text-6xl':' text-3xl md:text-5xl lg:text-6xl xl:text-7xl'} text-neutral-900`}>
                        <b>{translations.title[language]}</b>
                    </motion.h1>
                    <motion.p {...leftAnimation(0.22)}  className={`text-neutral-500`}>{translations.description[language]}</motion.p>
                    <div className={`flex gap-x-4 items-center mt-4`}>
         
                    <motion.a {...leftAnimation(0.33)}  href="tel:1234567890">
                            <div className={`p-3 flex items-center justify-center md:p-3 lg:p-4 md:text-base rounded-full bg-blue-500 text-white/90 cursor-pointer ${language==="ar"&&'flex flex-row-reverse '}`}>
                                <FontAwesomeIcon className={`${language==="ar"?'ml-1  -scale-x-100':'mr-2'} cursor-pointer`} icon={faPhone} />{" "}
                                {translations.callUs[language]}
                            </div>
                        </motion.a>
                        
                    </div>
                </div>
                <div className={`w-full lg:w-[45%] flex flex-col gap-y-5 p-0 ${language==="ar"?'lg:pr-4':'lg:pl-4'}`}>
                    <div className={`flex w-full gap-x-2 lg:gap-x-5`}>
                        <motion.div {...topAnimation()}  className={`flex-1 lg:h-64 relative`}>
                            <motion.div initial={{y:-100,scale:0}} whileInView={{y:0,scale:1}} transition={{type:'spring',damping:13,delay:0.6}}  className={`absolute z-40 border border-white/10 -top-12 right-8 hidden lg:w-24 lg:h-24 rounded-full lg:flex  items-center justify-center bg-black/5 blurey backdrop-blur-xl shadow-lg lg:text-5xl text-blue-500`}>
                                <FontAwesomeIcon icon={faArrowTrendUp} />
                            </motion.div>
                            <div className={`w-full h-full overflow-hidden rounded-tl-full`}>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/about.webp"}
                                    className={`-z-10 w-full h-full object-cover rounded-2xl md:rounded-[30px] lg:rounded-[40px] transform -scale-x-100 rounded-br-[20px]`}
                                />
                            </div>
                        </motion.div>
                        <motion.div {...topAnimation(0.35)}  className={`flex-1 lg:h-64 bg-black/5 rounded-2xl md:rounded-[30px] lg:rounded-[40px] p-3 2xl:px-5`}>
                            <div className={`w-full flex flex-col items-center  lg:text-sm text-[8px] md:text-sm justify-center text-neutral-500 `}>
                                <motion.p {...scaleAnimation(0.4)}>{translations.since[language]}</motion.p>
                                <motion.h1 {...scaleAnimation(0.36)} className={`xl:text-8xl  text-3xl md:text-6xl text-red-500`}>
                                    <b>{translations.year[language]}</b>
                                </motion.h1>
                                <motion.p {...scaleAnimation(0.42)} className={`text-xs lg:text-sm text-center text-neutral-500 mt-3  ${language=="ar"&&'text-sm '}`}>
                                    {translations.successStory[language]}
                                </motion.p>
                            </div> 
                        </motion.div>
                    </div>
                    <motion.div {...bottomAnimation(0.25)}  className={`w-full bg-red rounded-2xl lg:rounded-[40px] md:rounded-[30px] h-48 lg:h-64 bg-neutral-900 flex pr-2 lg:px-4 overflow-hidden`}>
                        <motion.div {...leftAnimation(0.33)} className={`flex-1  h-full relative overflow-hidden`}>
                            <img
                                className={`w-full h-full object-cover top-0 left-0 absolute hidden lg:block`}
                                src={process.env.PUBLIC_URL + "/images/bon.webp"}
                            />
                            <div className={`w-full items-center justify-center flex flex-col h-[65%] top-[17.5%] px-5 left-0 absolute text-white/90`}>
                                <div className={`w-full flex items-center justify-center text:base md:text-xl  xl:text-2xl font-bold mb-4`}>
                                    <div className={`h-[2px] bg-white/50 w-[28%]`} />
                                    <p className={`w-[70%]  text-right`}>
                                        {translations.yearsOfSuccess[language].replace(
                                            "{yr-2008}",
                                            yr - 2008
                                        )}
                                    </p>
                                </div>
                                <p className={`w-full text-[10px] md:text-base xl:text-lg`}>{translations.sharedSuccess[language]}</p>
                                <p className={`w-full text-[10px] md:text-base xl:text-lg xl:text-justify`}>{translations.sharedFuture[language]}</p>
                            </div>
                        </motion.div>
                        <div className={`flex-1 h-full gap-x-4 flex items-end `}>
                            <motion.div {...leftAnimation(0.32)} className={`flex-1 bg-red-300 h-[60%] -mb-[20%] rounded-t-3xl`}></motion.div>
                            <motion.div {...leftAnimation(0.42)} className={`flex-1 bg-red-400 h-[80%] -mb-[20%] rounded-t-3xl`}></motion.div>
                            <motion.div {...leftAnimation(0.52)} className={`flex-1 bg-red-500 h-[100%] -mb-[20%] rounded-t-3xl`}></motion.div>
                        
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className={`w-[90%] lg:flex items-center justify-center ${language==="ar"&&'flex-row-reverse'}`}>
                <motion.div {...leftAnimation()}  className={`flex-1 text-neutral-500 ${language==="ar"&&'flex flex-col-reverse items-end '}`}>
                    <p>{translations.collaboration[language]}</p>
                    <h1 className={`${language==="ar"?'lg:text-6xl':'lg:text-5xl'} text-3xl md:text-5xl md:mb-2 text-blue-500`}>
                        <b>{translations.partnerWith[language]}</b>
                    </h1>
                </motion.div>
                <motion.div {...rightAnimation(0.33)}  className={`flex-1 flex flex-row-reverse `}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/prtb.webp"}
                        className={`w-full h-24 md:my-2 md:h-20 object-cover opacity-90`}
                    ></img> 
                </motion.div>
            </div>
        </>
    );}
    
export default FirstInterface;
