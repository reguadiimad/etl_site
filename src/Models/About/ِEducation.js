import { faDownload, faFlask, faGlobe, faLanguage, faQuoteLeftAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { setScrollVal } from "../../redux(toolKit)/slices/scrollSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import texts from './Datas/educationData.json';
import { leftAnimation,rightAnimation,bottomAnimation, scaleAnimation } from "./animation";
import {motion} from "framer-motion";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Education = ({ id=2 }) => {
    const dispatch = useDispatch();
    const scrollValue = useSelector((state) => state.scrollVal); // Assuming this is correctly defined in your Redux store
    const { ref: motherRef, inView } = useInView({
      threshold: 0.2, // Trigger when 50% of the component is visible
    });
   
    const { language } = useSelector((state) => state.presntion); 
    
    
    useEffect(() => {
      if (inView) {
        dispatch(setScrollVal(id)); // Ensure `id` is defined correctly
      }
    }, [inView, dispatch]);

   
    const t = texts.certifications;



    return (
        <>

           <div ref={motherRef}  id={id}>
           <div  className={`w-full items-center   justify-center hidden lg:flex flex-col ${language==="ar"&&'text-xl'}`}>
                <motion.div  {...bottomAnimation()} className={`w-[90%]  overflow-hidden rounded-[50px] mt-10 relative lg:flex items-center justify-center  `}>
                    <img className={`w-full opacity-90 h-auto min-h-[700px] xl:min-h-[870px] object-cover`} src={process.env.PUBLIC_URL + '/images/edction.webp'} alt="Education" />
                    <div className={`absolute w-full h-full flex hhy ${language==="ar"&&'flex-row-reverse text-right'}`}>
                        <div className={`flex-1 h-full pl-12 py-12 flex justify-center flex-col gap-y-10 ${language==="ar"&&'text-base  xl:text-xl'}`}>           
                            <div className={`w-full pr-10`}>
                                <motion.p {...bottomAnimation(0.1)} className={`text-red-500 `}>{texts.tagline[language]}</motion.p>
                                <motion.h1 {...bottomAnimation(0.2)} className={`${language==="ar"?'text-5xl xl:text-8xl':'text-5xl xl:text-7xl'} text-white`}><b>{texts.main_heading[language]}</b></motion.h1>
                            </div>
                            <div className={`w-full flex pr-10`}>
                                <div className={`text-white drop-shadow-2xl text-justify`}>
                                    <motion.p {...bottomAnimation()} className={`mb-4`}>{texts.section1[language]}</motion.p>
                                    <motion.p {...bottomAnimation()}>{texts.section2[language]}</motion.p>
                                    <div className={`w-full flex flex-row-reverse mt-4 p-2`}>
                                        <motion.button {...scaleAnimation()} className={`bg-red-500 shadow-xl p-4 rounded-2xl flex gap-x-2`}>
                                            <b><FontAwesomeIcon icon={faDownload} className={`mr-2`} /> {texts.button[language]}</b>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`w-[45%] h-full flex gap-x-3 flex-row-reverse ${language==='ar'&&'-scale-x-100'}`}>
                            <div className={`w-[20%] h-full flex flex-col gap-y-3 `}>
                                <div className={`bg-white/10 w-full h-[20%] blurey backdrop-blur-md border border-white/20 border-t-0 border-r-0 rounded-bl-[20px] shadow-md`}></div>
                                <div className={`bg-white/10 w-full h-[50%] blurey backdrop-blur-md border border-white/20 border-r-0 rounded-l-[20px] shadow-md`}></div>
                                <div className={`bg-white/10 w-full h-[30%] blurey backdrop-blur-md border border-white/20 border-b-0 border-r-0 rounded-tl-[20px] shadow-md`}></div>
                            </div>
                            <div className={`w-[40%] h-full flex flex-col gap-y-3`}>
                                <div className={`bg-white/10 w-full h-[5%] blurey backdrop-blur-md border border-white/20 border-t-0 rounded-b-[20px] shadow-md`}></div>
                                <div className={`${language==='ar'&&'-scale-x-100'} bg-white/50 w-full h-[40%] blurey backdrop-blur-xl border border-white rounded-[20px] shadow-xl flex flex-col items-center justify-center relative`}>
                                    <FontAwesomeIcon icon={faFlask} className={`text-black/10 text-2xl absolute xl:top-3 lg:bottom-2 right-2`} />
                                    <div className={`w-full flex scale-95 flex-col items-center justify-center`}>
                                        <p className={`bg-black/5 xl:p-2 xl:px-3 text-center lg:text-[12px] xl:text-base px-2 py-1 rounded-full text-blue-500 font-semibold`}>{texts.categoryTitles[language].innovation}</p>
                                        <h1 className={`text-2xl xl:text-3xl 2xl:text-4xl text-red-500/90 my-2`}><b>{texts.innovation_title[language]}</b></h1>
                                        <p className={`text-[10px] xl:text-sm w-[90%] tracking-tighter xl:tracking-normal text-center text-black/35`}>{texts.innovation_text[language]}</p>
                                    </div>
                                </div>
                                <div className={`${language==='ar'&&'-scale-x-100'} bg-white/50 w-full h-[40%] blurey backdrop-blur-xl border border-white rounded-[20px] shadow-xl flex flex-col items-center justify-center relative`}>
                                    <FontAwesomeIcon icon={faGlobe} className={`text-black/10 text-2xl absolute xl:top-3 lg:bottom-2 right-2`} />
                                    <div className={`w-full flex scale-95 flex-col items-center justify-center`}>
                                        <p className={`bg-black/5 xl:p-2 xl:px-3 text-center lg:text-[12px] px-2 py-1  xl:text-base rounded-full text-blue-500 font-semibold`}>{texts.categoryTitles[language].engagement}</p>
                                        <h1 className={`text-2xl xl:text-3xl 2xl:text-4xl text-red-500/90 my-3`}><b>{texts.engagement_title[language]}</b></h1>
                                        <p className={`text-[10px] xl:text-sm w-[90%] tracking-tighter xl:tracking-normal text-center text-black/35`}>{texts.engagement_text[language]}</p>
                                    </div>
                                </div>
                                <div className={`bg-white/10 w-full h-[15%] blurey backdrop-blur-md border border-white/20 border-b-0 rounded-t-[20px] shadow-md`}></div>
                            </div>
                            <div className={`${language==='ar'&&'-scale-x-100'} w-[40%] h-full flex flex-col gap-y-3`}>
                                <div className={`bg-white/5 w-full h-[30%] blurey backdrop-blur-md border border-white/20 border-t-0 rounded-b-[20px] shadow-md`}></div>
                                <div className={`bg-white/50 w-full h-[40%] blurey backdrop-blur-xl border border-white rounded-[20px] shadow-xl flex flex-col items-center justify-center relative`}>
                                    <FontAwesomeIcon icon={faLanguage} className={`text-black/10 text-2xl absolute xl:top-3 lg:bottom-2 right-2`} />
                                    <p className={`bg-black/10 xl:p-2 xl:px-3 text-center lg:text-[12px] px-2 py-1  xl:text-base rounded-full text-blue-500 font-semibold`}>{texts.categoryTitles[language].languages}</p>
                                    <h1 className={`text-3xl xl:text-4xl 2xl:text-5xl text-red-500/90 my-2`}><b>{texts.languages_title[language]}</b></h1>
                                    <p className={` text-[10px] xl:text-sm tracking-tighter xl:tracking-normal w-[90%] text-center text-black/35`}>{texts.languages_text[language]}</p>
                                </div>
                                <div className={`bg-white/10 w-full h-[30%] blurey backdrop-blur-md border border-white/20 border-b-0 rounded-t-[20px] shadow-md`}></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                

                <div  className={`w-[90%] my-20`}>
                    <div className={`rounded-[50px] flex gapx-10 items-center ${language==="ar"&&'flex-row-reverse text-right text-xl'}`}>
                        <div className={`flex-1`}>
                            <motion.p  {...leftAnimation()} className={`text-neutral-500 text-xl mb-5`}>{t.title[language]}</motion.p>
                            <motion.h1 {...leftAnimation(0.1)} className={`2xl:text-8xl xl:text-7xl lg:text-6xl text-blue-500 `}><b>{t.mainHeading[language]}</b></motion.h1>
                        </div>
                        <div className={`flex flex-row-reverse`}>
                            <motion.img {...rightAnimation(0.2)} className={`xl:h-64 h-52`} src={process.env.PUBLIC_URL +'/images/iso.webp'} alt="ISO Certification"/>
                        </div>
                    </div>
                    <div className={`w-full flex mt-10 ${language==="ar"&&'flex-row-reverse text-right text-xl'}`}>
                        <div className={`w-[20%] flex flex-col items-end text-neutral-500 pb-2`}>
                        <motion.div {...bottomAnimation()} className={`w-full h-[50%]`}>
                            <a href="https://youtu.be/fgWZsQMrUOo?si=SedbfhGedBwG6EI9" target="_blank" className={`rounded-full p-3 border border-black/10`}>
                            <FontAwesomeIcon className={`mr-2 text-red-500`} icon={faYoutube} /> {t.downloadButton[language]}
                            </a>
                        </motion.div>
                        <motion.div {...bottomAnimation(0.2)}  className={`w-full h-[50%] flex flex-col justify-end text-base `}>
                            <div className={`w-full flex items-center gap-x-3 mb-2 ${language==="ar"&&'flex-row-reverse text-right text-xl'}`}>
                                <FontAwesomeIcon className={`text-red-500`} icon={faQuoteLeftAlt} />
                                <p><b>{t.quote[language]}</b></p>
                            </div>
                            <p className={`text-sm`}>{t.founder[language]}</p>
                        </motion.div>
                        </div>
                        <div className={`w-[80%] overflow-x-scroll ${language==="ar"?'mr-10':'ml-10'}`}>
                        <div className={`flex xl:w-[120%] w-[155%] items-stretch justify-center gap-x-4 text-neutral-700 text-base`}>
                            <motion.div {...leftAnimation(0.2)} className={`p-7 border border-black/10 rounded-[40px] flex-1 flex flex-col items-center justify-center gap-y-3`}>
                            <strong className={`text-blue-500 text-xl`}>{t.whatIsISO[language]}</strong>
                            <p>{t.whatIsISODescription[language]}</p>
                            </motion.div>
                            <motion.div {...leftAnimation(0.4)} className={`p-7 border border-black/10 rounded-[40px] flex-1 flex flex-col items-center justify-center gap-y-3`}>
                            <strong className={`text-red-500 text-xl`}>{t.howItHelps[language]}</strong>
                            <p>{t.howItHelpsDescription[language]}</p>
                            </motion.div>
                            <motion.div {...leftAnimation(0.6)} className={`p-7 border border-black/10 rounded-[40px] flex-1 flex flex-col items-center justify-center gap-y-3`}>
                            <strong className={`text-blue-500 text-xl`}>{t.whatYouGain[language]}</strong>
                            <p>{t.whatYouGainDescription[language]}</p>
                            </motion.div>
                            <motion.div {...leftAnimation(0.8)} className={`p-6 border border-black/10 rounded-[40px] flex-1 flex flex-col items-center justify-center gap-y-3`}>
                            <strong className={`text-red-500 text-xl`}>{t.whyChooseUs[language]}</strong>
                            <p>{t.whyChooseUsDescription[language]}</p>
                            </motion.div>
                        </div>
                        </div>
                    </div>
                    <div className={`w-full flex justify-end animate-pulse mt-5 text-neutral-600 ${language==="ar"&&'flex-row-reverse text-right text-xl'}`}>
                        {t.slideText[language]}  {/* Here's the corrected line */}
                    </div>
                </div>
            </div>

            <div  className={`w-full items-center h-auto justify-center flex lg:hidden flex-col ${language === "ar" && 'text-xl'}`}>
                {/* Top Section */}
                <motion.div {...bottomAnimation()} className={`w-[90%] hhy md:h-[600px] h-[500px] overflow-hidden rounded-[30px] sm:rounded-[50px] mt-10 relative flex flex-col lg:flex-row items-center justify-center`}>
                    <img className={`h-full object-cover  opacity-90`} src={process.env.PUBLIC_URL + '/images/edction.webp'} alt="Education" />
                    <div className={`absolute hhy w-full h-full flex flex-col lg:flex-row ${language === "ar" && 'flex-row-reverse text-right'}`}>
                        <div className={`flex-1 px-5 sm:px-12 py-6 sm:py-12 flex justify-center flex-col gap-y-4 sm:gap-y-10`}>
                            <motion.p {...bottomAnimation(0.1)} className={`text-red-500 text-sm sm:text-lg`}>{texts.tagline[language]}</motion.p>
                            <motion.h1 {...bottomAnimation(0.2)} className={`${language === "ar" ? 'text-4xl sm:text-8xl' : 'text-3xl sm:text-3xl md:text-5xl'} text-white`}><b>{texts.main_heading[language]}</b></motion.h1>
                            <motion.p {...bottomAnimation()} className={`text-white text-sm sm:text-base`}>{texts.section1[language]}</motion.p>
                            
                        </div>
                    </div>
                </motion.div>

                {/* Cards Section */}
                <div className={`w-[90%] my-10 flex flex-col sm:flex-row gap-4`}>
                    {[
                        { icon: faFlask, title: texts.categoryTitles[language].innovation, heading: texts.innovation_title[language], text: texts.innovation_text[language] },
                        { icon: faGlobe, title: texts.categoryTitles[language].engagement, heading: texts.engagement_title[language], text: texts.engagement_text[language] },
                        { icon: faLanguage, title: texts.categoryTitles[language].languages, heading: texts.languages_title[language], text: texts.languages_text[language] }
                    ].map((item, index) => (
                        <motion.div key={index} {...leftAnimation(0.1 * index)} className={`bg-white/50 w-full sm:w-[30%] p-4 rounded-xl shadow-md flex flex-col items-center`}>
                            <FontAwesomeIcon icon={item.icon} className={`text-black/10 text-xl sm:text-2xl mb-2`} />
                            <p className={`text-blue-500 font-semibold`}>{item.title}</p>
                            <h1 className={`text-red-500 text-lg sm:text-2xl my-2`}><b>{item.heading}</b></h1>
                            <p className={`text-sm text-black/50 text-center`}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>

 
                <div className={`w-[90%] my-10   flex flex-col gap-y-5`}>
                    <motion.h1 {...leftAnimation(0.2)} className={`text-blue-500 text-2xl sm:text-5xl  text-center`}><b>{t.mainHeading[language]}</b></motion.h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:text-lg ">
    {[
        { title: t.whatIsISO[language], text: t.whatIsISODescription[language] },
        { title: t.howItHelps[language], text: t.howItHelpsDescription[language] },
        { title: t.whatYouGain[language], text: t.whatYouGainDescription[language] },
        { title: t.whyChooseUs[language], text: t.whyChooseUsDescription[language] }
    ].map((item, index) => (
        <motion.div
            key={index}
            {...leftAnimation(0.2 * index)}
            className="p-4 border border-black/10 rounded-xl text-center"
        >
            <strong className="text-blue-500 text-lg">{item.title}</strong>
            <p className="text-sm">{item.text}</p>
        </motion.div>
    ))}
</div>

                    <div className={`text-center text-neutral-600 animate-pulse mt-5`}>
                        
                    </div>
                </div>
            </div>
           </div>
        </>
    );
};

export default Education;
