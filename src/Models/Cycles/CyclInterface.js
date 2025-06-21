import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faBrain, faGraduationCap, faHeart,faPaintBrush, faQuoteLeftAlt, faRocket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import content from "./Datas/CycInterfaceData.json";
import content1 from "./Datas/CycInterfaceData1.json";
import {motion} from "framer-motion"
import { bottomAnimation, leftAnimation, rightAnimation, topAnimation } from "./animation";


const CyclInterface = ({handelSelect}) => {
    const { language } = useSelector((state) => state.presntion);
    const cycleImages = [
        { src: '/images/c1.webp', alt: 'Cycle 1', borderClasses: 'border-r-[4px] border-b-[4px]' },
        { src: '/images/c2.webp', alt: 'Cycle 2', borderClasses: 'border-l-[4px] border-b-[4px]' },
        { src: '/images/c3.webp', alt: 'Cycle 3', borderClasses: 'border-r-[4px] border-t-[4px]' },
        { src: '/images/c4.webp', alt: 'Cycle 4', borderClasses: 'border-l-[4px] border-t-[4px]' },
      ];
      
      

    return (
        <>
            <div className={`w-[95%] lg:w-[90%]   h-[590px] md:h-[800px] lg:h-[700px] xl:h-[800px] rounded-2xl md:rounded-[50px]  flex overflow-hidden relative flex-col  justify-end lg:p-[25px] text-neutral-700 lg:text-5xl xl:text-7xl ${language==='ar' && 'lg:text-6xl xl:text-7xl 2xl:text-8xl text-right'}`}>
                <div className={`absolute top-0 left-0 w-full h-full -z-10 grid grid-cols-2 grid-rows-2 md:flex bg-white`}>
                    {cycleImages.map((image, index) => (
                        <motion.img 
                            initial={{y:index%2==0?90:-90,opacity:0}}
                            whileInView={{y:0,opacity:1}}
                            transition={{type:'spring',delay:0.18*index}}
                            key={index}
                            className={`h-full w-full md:w-[25%] ${image.borderClasses} border-white md:border-none object-cover`}
                            src={process.env.PUBLIC_URL + image.src}
                            alt={image.alt}
                        />
                    ))}
                </div>

                <div className={`absolute top-0 left-0 w-full h-full -z-10 hidden md:flex`}>
                    <div className={`flex-1 h-full border-r-[14px]  border-white`}></div>
                    <div className={`flex-1 h-full border-r-[14px] border-white`}></div>
                    <div className={`flex-1 h-full border-r-[14px] border-white`}></div>
                    <div className={`flex-1 h-full`}></div>
                </div>

                <motion.div className="" initial={{x:-60,y:80,opacity:0}} whileInView={{x:0,y:0,opacity:1}} transition={{type:'spring'}}>
                    <div className={`w-fit  hidden lg:block bg-white   -z-10 ${language=="ar"&&" flex flex-row-reverse"} rounded-t-[25px] p-[30px] pb-0 flex items-end justify-end   gap-x-2  psd`}>
                        <motion.div {...leftAnimation(0.1)} className={`flex justify-center items-center ${language=="ar"&&" -scale-x-100 gap-x-4 flex-row-reverse"}`}>
                            <p className={` font-bold mr-2`}>{content.texts.header[language].prt1+' '} </p>
                            <h1 className={`bg-red-500 rounded-[10px] p-4 text-white `}><b>{content.texts.header[language].prt2}</b></h1>
                        </motion.div>
                    </div>

                    <div className={`w-[45%]  lg:w-[55%] xl:w-[50%] 2xl:w-[45%] ${language==="fr"&&"w-[45%]  lg:w-[50%] xl:w-[58%] 2xl:w-[45%]"}   hidden -z-10 lg:block  bg-white ${language=="ar"?"rounded-r-[25px] pb-5":"rounded-r-[25px] pb-1"}   p-[30px] gap-x-2  `}>
                        <motion.div {...leftAnimation(0.15)} className={`flex items-end gap-x-2 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <p className={`pb-[20px] font-bold`}>{content.texts.subHeader[language].prt1}</p>
                            <h1 className={`bg-blue-500 rounded-[10px] p-4 text-white`}><b>{content.texts.subHeader[language].prt2}</b></h1>
                        </motion.div>
                        <motion.p {...leftAnimation(0.16)} className={`xl:text-lg lg:text-base  ${language==="ar"&&"text-xl"} mt-6`}>{content.texts.description[language]}</motion.p>
                    </div>

                    <div {...leftAnimation(0.21)} className={`w-fit  hidden lg:block -z-10 bg-white  rounded-b-[25px] p-[30px] pt-0 shadow-lg psdr block`}>
                        <motion.button {...leftAnimation(0.3)} className={`bg-red-500 px-5 p-3 ${language=="ar"&&"-scale-x-100 "} text-white rounded-full gap-x-2 font-bold text-base xl:text-xl 2xl:text-xl`}>
                            {content.texts.buttonText[language]} <FontAwesomeIcon className={`mx-2`} icon={faArrowDown} />
                        </motion.button>
                    </div>
                </motion.div>   

                <motion.div  className={`absolute top-3  lg:top-auto w-full lg:w-auto md:bottom-0 right-0 md:block text-center right-0`}>
                    <div className={`md:p-[30px] p-1 flex items-center justify-center text-[14px] sm:text-lg lg:text-base xl:text-xl md:gap-x-2 gap-x-1 relative ${language === 'ar' && 'flex-row-reverse'}`}>
                        <div className="absolute hidden md:block w-full h-full md:p-6 bg-black/70 blur-3xl -top-4 lg:-bottom-4"></div>
                        {Object.keys(content.texts.ageGroups).map((groupKey, index) => {
                        const group = content.texts.ageGroups[groupKey];
                        const blurLevel = ['25', '50', '75', '100'][index];
                        const bgColor = index % 2 === 0 ? 'bg-blue-500' : 'bg-red-500';
                        return (
                            <motion.div {...leftAnimation(0.16*index)} key={groupKey} className={`rounded-full md:w-[20%]  border-white/30 border  lg:w-auto relative flex items-center justify-center p-1 sm:p-3 xl:p-4 bg-white/30 md:bg-white/${blurLevel} backdrop-blur-lg shadow-2xl`}>
                            <p className={`rounded-full md:p-2  p-2 w-full sm:px-4 ${bgColor} ${language==="en"&&"text-[13px] lg:text-[11px] xl:text-base "} shadow-xl font-bold text-white`}>{group.label[language]}</p>
                            <span className={`md:-top-8 -top-5 w-full  lg:text-sm xl:text-base absolute text-white/90 hidden md:block ${language === 'ar' && 'text-base'}`}>{group.age[language]}</span>
                            </motion.div>
                        );
                        })}
                    </div>
                </motion.div>

                <div className={`w-full h-[100%] bg-gradient-to-t from-white to-white/5 gap-y-3 lg:hidden text-neutral-700 text-xl flex flex-col justify-end p-3 ${language === 'ar' && 'text-right items-end'}`}>
                    <motion.div {...leftAnimation()} className={`flex items-center text-4xl sm:text-6xl md:text-7xl gap-x-3  ${language === 'ar' && 'flex-row-reverse'}`}>
                        <p className={` font-bold  `}>{content.texts.header[language].prt1+' '} </p>
                        <h1 className={`bg-red-500 rounded-[10px] p-3 text-white `}><b>{content.texts.header[language].prt2}</b></h1>
                    </motion.div>
                    <motion.div {...leftAnimation(0.2)}  className={`flex items-center text-4xl sm:text-6xl md:text-7xl gap-x-3 ${language === 'ar' && 'flex-row-reverse'}`}>
                        <p className={`font-bold `}>{content.texts.subHeader[language].prt1}</p>
                        <h1 className={`bg-blue-500 rounded-[10px] p-3 text-white`}><b>{content.texts.subHeader[language].prt2}</b></h1>
                    </motion.div>
                    <motion.p {...leftAnimation(0.23)}  className={`text-base md:text-lg ${language==="ar"&&"text-xl"} `}>{content.texts.description[language]}</motion.p>

                    <motion.button {...bottomAnimation(0.28)} className={`bg-red-500 p-3 md:py-5 flex items-center justify-center  ${language === 'ar' && 'flex-row-reverse text-xl'} text-white rounded-full font-bold text-base sm:text-lg  w-full`}>
                        <p><b>{content.texts.buttonText[language]} </b></p><FontAwesomeIcon className={`mx-2`} icon={faArrowDown} />
                    </motion.button>
                
                </div>

                <motion.div initial={{x:50,y:-90,opacity:0}} whileInView={{x:0,y:0,opacity:1}} transition={{type:'spring'}} className={`absolute w-[40%] xl:w-[35%] hidden  top-[20px] right-[20px] lg:flex flex-col items-end text-xl gap-x-2 `}>
                    <div className={`bg-white p-[30px] pb-[20px] flex items-center rounded-t-[20px] rounded-l-[20px] gap-x-5 text-lg xl:text-xl text-right shadow-2xl `}>
                        <FontAwesomeIcon className={`lg:text-3xl xl:text-5xl text-blue-500 ${language==="ar"&&'-scale-x-100'}`} icon={faQuoteLeftAlt} />
                        <p className={`${language==="ar"&&'2xl:text-2xl'}`}><b>{content.texts.testimonial.quote[language]}</b></p>
                    </div>

                    <div className={` bg-white w-fit p-[30px] pb-[20px] pt-[0px] -mt-[10px] flex items-center rounded-b-[20px] gap-x-5 text-right  text-neutral-500 lg:text-sm xl:text-lg psdl relative`}>
                        <p className={`${language==="ar"&&''}`}>{content.texts.testimonial.author[language]}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="w-[90%]  flex items-center justify-center text-center mt-10 lg:mt-20 flex-col">
                <motion.p {...topAnimation()} className="text-neutral-500">{content1.texts.discover[language]}</motion.p>
                <motion.h1 {...topAnimation(0.2)} className={`text-blue-500 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl ${language=="ar"&&"text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl"}`}><b>{content1.texts.nos_cycles_pedagogiques[language]}</b></motion.h1>
                <motion.p {...topAnimation(0.3)} className="text-neutral-500 mt-2 md:mt-6 lg:mt-10 text-[10px] md:text-base lg:text-lg lg:w-[95%] ">
                {content1.texts.description[language]}
                </motion.p>

                <div className={`w-full mt-10 lg:flex gap-x-6 lg:gap-x-2 2xl:gap-x-6 items-stretch ${language==="en"?'xl:h-[780px]':'xl:h-[750px]'} lg:h-[600px] overflow-hidden text-white`}>

                    <div className="w-full lg:w-[40%] flex flex-col items-center justify-center gap-y-6 lg:gap-y-2 2xl:gap-y-6">
                        <motion.div {...topAnimation()} className="w-full h-[80%] rounded-[50px] bg-blue-500 flex items-end justify-center overflow-hidden  pt-10">
                        <img src={process.env.PUBLIC_URL+'/images/cyy0.webp'} className="w-[52%]  scale-125 sm:w-[40%] sm:scale-110 lg:scale-125 lg:w-[52%] origin-bottom  object-cover"></img>
                        <div className="flex-1 h-full flex justify-end text-left flex-col pr-2">
                            <p className="text-white/70 sm:text-xl lg:text-sm 2xl:text-lg">
                                {content1.texts.maternelle.subTitle[language]}
                            </p>
                            <h1 className={` ${language==="en"?"sm:text-4xl text-xl lg:text-2xl  2xl:text-4xl":"sm:text-5xl text-2xl lg:text-3xl 2xl:text-5xl "} ${language=="ar"&&" lg:text-4xl xl:text-4xl 2xl:text-6xl"}`}><b>
                            {content1.texts.maternelle.title[language]}
                            </b></h1>
                            <p className={`text-white/70 text-[12px]${language=="ar"&&'text-sm'} sm:mb-10 lg:mb-2 2xl:mb-10 trr`}>{content1.texts.maternelle.description[language]}</p>

                            <div className="w-full flex items-center lg:my-3 sm:my-2 my-1">
                                <span className="w-14 h-14 lg:w-8 lg:h-8 2xl:w-14 2xl:h-14 bg-white text-blue-500 sm:flex items-center justify-center text-2xl lg:text-sm 2xl:text-2xl rounded-[20px] hidden "><FontAwesomeIcon icon={faPaintBrush}/></span>
                                <FontAwesomeIcon className="sm:hidden" icon={faPaintBrush}/>

                                <b className="ml-2 sm:text-xl lg:text-sm 2xl:text-lg">{content1.texts.maternelle.features.playful_learning[language]}</b>
                            </div>

                            <div className="w-full flex items-center lg:my-3 sm:my-2 my-1">
                                <span className="w-14 h-14 lg:w-8 lg:h-8 2xl:w-14 2xl:h-14 bg-white text-blue-500 sm:flex items-center justify-center text-2xl lg:text-sm 2xl:text-2xl rounded-[20px] hidden "><FontAwesomeIcon icon={faHeart}/></span>
                                <FontAwesomeIcon className="sm:hidden" icon={faHeart}/>

                                <b className="ml-2 sm:text-xl lg:text-sm 2xl:text-lg">{content1.texts.maternelle.features.nurturing_environment[language]}</b>
                            </div>

                            <div className="w-full flex items-center lg:my-3 sm:my-2 my-1">
                                <span className="w-14 h-14 lg:w-8 lg:h-8 2xl:w-14 2xl:h-14 bg-white text-blue-500 sm:flex items-center justify-center text-2xl lg:text-sm 2xl:text-2xl rounded-[20px] hidden "><FontAwesomeIcon icon={faRocket}/></span>
                                <FontAwesomeIcon className="sm:hidden" icon={faRocket}/>
                                <b className="ml-2 sm:text-xl lg:text-sm 2xl:text-lg">{content1.texts.maternelle.features.autonomy_basics[language]}</b>
                            </div>

                            <div className="w-full flex justify-end my-5 mb-7">
                                <button onClick={()=>handelSelect(0)} className="p-3 bg-white/10 shadow-2xl backdrop-blur-xl sm:text-lg lg:text-sm 2xl:text-lg font-bold text-white border-white border-2 rounded-[20px] mr-4">{content1.texts.readMore["Voir Plus"][language]}</button>
                            </div>
                        </div>

                        </motion.div>
                        <motion.div {...bottomAnimation(0)}  className={`w-full h-[20%] rounded-[50px] bg-neutral-800 overflow-hidden lg:flex hidden items-center justify-center font-bold px-10 text-left `}>
                            <FontAwesomeIcon icon={faQuoteLeftAlt} className="mr-10 text-4xl"/>
                            <div className={`font-bold  ${language=="ar"&&'text-right'} `}>
                            {content1.texts.footer.quote[language]}
                            <p className={`text-white/60 text-sm ${language==="ar"&&'text-right text-base'} `}>{content1.texts.footer.signature[language]}</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div {...rightAnimation(0.2)} className="flex-1 rounded-[50px] h-[300px] mt-6 lg:hidden  bg-red-500 overflow-hidden relative">
                       <img src={process.env.PUBLIC_URL+'/images/ccy6.webp'} className="absolute bottom-0 right-0 w-full sm:w-[55%]"></img>
                        <div className="w-full p-6 pb-0 flex">
                        <div className=" text-left w-[70%]">
                                    <p className="text-white/70 text-sm">{content1.texts.primaire.subTitle[language]} </p>
                                    <h1 className="text-3xl sm:text-5xl"><b>{content1.texts.primaire.title[language]}</b></h1>
                                    <p className="text-white/70 text-sm sm:text-lg">{content1.texts.primaire.description[language]}</p>

                                </div>

                                <div className=" text-right w-[30%]">
                                    <button onClick={()=>handelSelect(1)} className="p-2 cursor-pointer mt-2 bg-white font-bold text-red-500 rounded-[20px]">{content1.texts.readMore["Lire Plus"][language]}</button>

                                </div>
                        </div>
                    </motion.div>

                    <div className="w-full lg:w-[60%] h-full flex-col flex gap-6 lg:gap-2 2xl:gap-6 mt-6 lg:mt-0">
                   
                        <motion.div {...rightAnimation(0.2)} className="w-full lg:h-[45%] h-[200px]  rounded-[50px] bg-red-500 overflow-hidden  flex  relative z-30">
                            <div className=" w-full  flex items-center h-[45%] -mt-3 p-7 pb-4">
                                <div className=" text-left w-[70%]">
                                    <p className="text-white/70 lg:text-sm text-[10px]">{content1.texts.college.subTitle[language]} </p>
                                    <h1 className="sm:text-5xl text-3xl lg:text-3xl 2xl:text-5xl"><b>{content1.texts.college.title[language]}</b></h1>
                                </div>

                                <div className=" text-right w-[70%] z-50">
                                    <p className="text-white/70 text-sm hidden lg:block lg:text-sm ">{content1.texts.college.description[language]}</p>
                                    <button onClick={()=>handelSelect(2)} className=" sm:p-3 cursor-pointer z-50 p-1 lg:p-2 2xl:p-3 mt-2 bg-white sm:text-base lg:text-sm 2xl:text-base font-bold text-red-500 rounded-[20px] shadow-2xl">{content1.texts.readMore["En Savoir Plus"][language]}</button>

                                </div>
                               
                            </div>
                        <img src={process.env.PUBLIC_URL+'/images/cc8.webp'} className="w-full z-0  object-cover absolute  sm:top-8 lg:top-16 scale-95 origin-bottom scale-x-100 bottom-0"></img>

                        </motion.div>
                       <div className="w-full h-[55%] flex  flex-col lg:flex-row  gap-6 lg:gap-2 2xl:gap-6">
                            <motion.div {...bottomAnimation(0)} className="flex-1 rounded-[50px] h-full hidden lg:block bg-red-500 overflow-hidden relative">
                            <img src={process.env.PUBLIC_URL+'/images/ccy6.webp'} className="absolute bottom-0 right-0 w-full z-0"></img>
                                <div className="w-full p-6 pb-0 flex z-40">
                                <div className=" text-left w-[70%]">
                                            <p className="text-white/70 text-sm">{content1.texts.primaire.subTitle[language]} </p>
                                            <h1 className="2xl:text-5xl lg:text-3xl"><b>{content1.texts.primaire.title[language]}</b></h1>
                                            <p className="text-white/70 text-[12px] 2xl:text-sm">{content1.texts.primaire.description[language]}</p>

                                        </div>

                                        <div className=" text-right w-[30%] z-50">
                                            <button onClick={()=>handelSelect(1)} className="2xl:p-3 p-2 mt-2 bg-white cursor-pointer z-50 2xl:text-base lg:text-[12px] font-bold text-red-500 rounded-[20px]">{content1.texts.readMore["Lire Plus"][language]}</button>

                                        </div>
                                </div>
                            </motion.div>
                            <motion.div {...bottomAnimation(0.1)}  className=" flex-1 rounded-[50px] h-full  bg-blue-500 overflow-hidden relative">
                            <img src={process.env.PUBLIC_URL+'/images/ccy7.webp'} className="absolute -bottom-12 lg:bottom-0 2xl:-bottom-12 -right-14   w-full sm:w-[70%] lg:w-full z-10 "></img>
                            <div className="w-full p-6 pb-0 flex">
                                <div className=" text-left w-[50%]">
                                            <p className="text-white/70 lg:text-sm text-[12px] lg:text-[10px] 2xl:text-sm">{content1.texts.lycee.subTitle[language]}</p>
                                            <h1 className={`${language=="en"?'sm:text-4xl text-2xl lg:text-2xl 2xl:text-4xl':'sm:text-5xl text-3xl lg:text-3xl 2xl:text-5xl'}`}><b>{content1.texts.lycee.title[language]}</b></h1>
                                        

                                        </div>

                                    
                                </div>
                                <div className="p-7 lg:pt-2 xl:pt-7">
                                    <div className="w-[60%] flex items-center text-left gap-x-2 text-sm lg:text-[12px] 2xl:text-sm font-semibold my-3 lg:my-2 2xl:my-3">
                                                <div className="p-4 lg:p-2 2xl:p-4 lg:w-8 2xl:w-14 w-14 text-xl lg:text-sm 2xl:text-xl rounded-2xl bg-white sm:flex hidden items-center justify-center text-blue-500 ">
                                                    <FontAwesomeIcon icon={faGraduationCap}/>
                                                </div>
                                                <FontAwesomeIcon className="text-xl mr-1 sm:hidden " icon={faGraduationCap}/>
                                                <p className="w-[60%] font-bold">{content1.texts.lycee.features.excellence_teaching[language]}</p>
                                    </div>
                                    <div className="w-[60%] flex items-center text-left gap-x-2 text-sm lg:text-[12px] 2xl:text-sm font-semibold my-3 lg:my-2 2xl:my-3">
                                                <div className="p-4 lg:p-2 2xl:p-4 lg:w-8 2xl:w-14 w-14 text-xl lg:text-sm 2xl:text-xl rounded-2xl bg-white sm:flex hidden items-center justify-center text-blue-500 ">
                                                    <FontAwesomeIcon icon={faUserTie}/>
                                                </div>
                                                <FontAwesomeIcon className="text-xl mr-1 sm:hidden  " icon={faUserTie}/>

                                                <p className="w-[60%] font-bold">{content1.texts.lycee.features.future_guidance[language]}</p>
                                                
                                    </div>
                                    <div className="w-[60%] flex items-center text-left gap-x-2 text-sm lg:text-[11px] 2xl:text-sm font-semibold my-3 lg:my-2 2xl:my-3">
                                                <div className="p-4 lg:p-2 2xl:p-4 lg:w-8 2xl:w-14 w-14 text-xl lg:text-sm 2xl:text-xl rounded-2xl bg-white sm:flex hidden items-center justify-center text-blue-500 ">
                                                    <FontAwesomeIcon  icon={faBrain}/>
                                                </div>
                                                <FontAwesomeIcon className="text-xl mr-1 sm:hidden " icon={faBrain}/>

                                                <p className="w-[60%] font-bold">{content1.texts.lycee.features.key_skills[language]}</p>
                                    </div>
                                    
                                    <div className="w-full bg-red-500 flex justify-end">
                                    <button onClick={()=>handelSelect(3)} className="p-3 bg-white/10 backdrop-blur-xl absolute bottom-0  font-bold text-white rounded-[20px]  shadow-lg border-white border-2 mb-5 -mr-3 z-40 blurey">{content1.texts.readMore["Découvrir Plus"][language]}</button>
                                    </div>
                                    
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CyclInterface;
