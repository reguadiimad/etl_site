import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { setScrollVal } from "../../redux(toolKit)/slices/scrollSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import texts from "./Datas/parentEleveData.json";
import { leftAnimation, rightAnimation, bottomAnimation, scaleAnimation, topAnimation } from "./animation";
import { motion } from "framer-motion";

const ParentEleve = ({ id }) => {
    const { language } = useSelector((state) => state.presntion);
    const parentAndStudent = [
        { sectionTitle: { ar: "لكلٍّ منكم اهتمام خاص", fr: "Chaque un a son traitement", en: "Each one has their own treatment" } },
        { mainHeading: { ar: "الآباء والتلاميذ", fr: "Parent et Élève", en: "Parent and Student" } }
    ];
    const student = texts.studentSection;
    const parent = texts.parentSection;
    const dispatch = useDispatch();
    const scrollValue = useSelector((state) => state.scrollVal);
    const { ref: motherRef, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            dispatch(setScrollVal(id));
        }
    }, [inView, dispatch]);

    return (
        <>
            <div id={id} ref={motherRef} className={`w-[90%] flex items-center justify-center flex-col mt-10 ${language === "ar" ? 'text-right ' : ''}`}>
                <motion.p {...topAnimation()} className={`text-neutral-500 xl:text-xl mb-2`}>{parentAndStudent[0].sectionTitle[language]}</motion.p>
                <motion.h1 {...topAnimation(0.2)} className={`text-4xl md:text-6xl 2xl:text-8xl w-[100%] text-blue-500 text-center`}>
                    <b>{parentAndStudent[1].mainHeading[language]}</b>
                </motion.h1>
                <div className={`w-full flex flex-col md:flex-row items-stretch mt-28 gap-5`}>
                    <div className={`w-full md:w-[40%] py-5`}>
                        <motion.div {...leftAnimation()} className={`w-[100%] h-full bg-red-500 rounded-[50px] lg:rounded-[50%] lg:rounded-bl-3xl lg:rounded-br-[30%] relative items-end overflow-x-hidden flex`}>
                            <img className={`absolute h-[90%]  md:scale-x-[1.45] lg:scale-110 xl:scale-100 origin-bottom`} src={process.env.PUBLIC_URL + '/images/dad.webp'} alt="Parent" />
                            <div className={`absolute xl:w-[45%] lg:w-[55%] scale-75 lg:scale-90 xl:scale-100  bg-white/5 rounded-3xl p-5 blurey backdrop-blur-xl lg:top-[45%] right-[5%] text-white border border-white/10 shadow-xl`}>
                                <motion.div {...bottomAnimation()} className={`w-full  md:flex-col text-center lg:flex-row lg:text-left flex  items-center gap-4 ${language === "ar" && "flex-row-reverse "}`}>
                                    <FontAwesomeIcon className={`${language === "ar" && "-scale-x-100 "}`} icon={faQuoteLeft} />
                                    <p className={`${language === "ar" ? "text-xl" : 'xl:text-base text-sm'}`}>{parent.quote1[language]}<br /><p className={`text-sm text-white/30`}>{parent.quote1Author[language]}</p></p>
                                </motion.div>
                            </div>
                            <div className={`lg:absolute hidden lg:block w-[45%] scale-75 bg-white/5 rounded-3xl p-5 blurey backdrop-blur-xl bottom-[5%] left-[5%] text-white border border-white/10 shadow-xl`}>
                                <motion.div  {...scaleAnimation()} className={`w-full flex items-center gap-4 ${language === "ar" && "flex-row-reverse "}`}>
                                    <FontAwesomeIcon className={`${language === "ar" && "-scale-x-100 "}`} icon={faQuoteLeft} />
                                    <p className={`${language === "ar" ? "text-xl" : 'text-base'}`}>{parent.quote2[language]}<br /><p className={`text-sm text-white/30`}>{parent.quote2Author[language]}</p></p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <div className={`flex-1 text-neutral-600 `}>
                        <motion.p {...rightAnimation()} className={`text-neutral-500`}>{parent.title[language]}</motion.p>
                        <motion.h1 {...rightAnimation(0.2)} className={`text-red-500 text-4xl lg:text-5xl 2xl:text-7xl mb-5`}><b>{parent.heading[language]}</b></motion.h1>
                        <motion.p {...rightAnimation(0.21)}>{parent.description[language]}</motion.p>
                        <motion.b {...rightAnimation(0.26)}>{parent.pillarsTitle[language]}</motion.b>
                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...rightAnimation(0)} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12  md:w-16 md:h-16 xl:w-20 xl:h-20 bg-red-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>1</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...rightAnimation(0.2)}>{parent.pillar1.title[language]}</motion.b>
                                <motion.p {...rightAnimation(0.3)}>{parent.pillar1.description[language]}</motion.p>
                            </div>
                        </div>
                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...rightAnimation()} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12  md:w-16 md:h-16 xl:w-20 xl:h-20 bg-red-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>2</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...rightAnimation(0.3)}>{parent.pillar2.title[language]}</motion.b>
                                <motion.p {...rightAnimation(0.4)}>{parent.pillar2.description[language]}</motion.p>
                            </div>
                        </div>
                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...rightAnimation()} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12  md:w-16 md:h-16 xl:w-20 xl:h-20 bg-red-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>3</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...rightAnimation(0.4)}>{parent.pillar3.title[language]}</motion.b>
                                <motion.p {...rightAnimation(0.5)}>{parent.pillar3.description[language]}</motion.p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* eleveSection */}
                <div className={`w-full flex flex-col-reverse md:flex-row items-stretch mt-28 gap-10`}>
                    <div className={`flex-1 text-neutral-600`}>
                        <motion.p {...leftAnimation()} className={`text-neutral-500`}>{student.title[language]}</motion.p>
                        <motion.h1 {...leftAnimation(0.2)} className={`text-blue-500 text-4xl lg:text-5xl 2xl:text-7xl mt-3 mb-5`}><b>{student.heading[language]}</b></motion.h1>
                        <motion.p {...leftAnimation(0.21)}>{student.description[language]}</motion.p>
                        <motion.b {...leftAnimation(0.26)}>{student.keysTitle[language]}</motion.b>

                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...leftAnimation(0)} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-blue-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>1</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...leftAnimation(0.2)}>{student.key1.title[language]}</motion.b>
                                <motion.p {...leftAnimation(0.3)}>{student.key1.description[language]}</motion.p>
                            </div>
                        </div>

                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...leftAnimation()} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-blue-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>2</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...leftAnimation(0.3)}>{student.key2.title[language]}</motion.b>
                                <motion.p {...leftAnimation(0.4)}>{student.key2.description[language]}</motion.p>
                            </div>
                        </div>

                        <div className={`w-full flex items-center justify-center mt-10 ${language === 'ar' && 'flex-row-reverse'}`}>
                            <motion.div {...leftAnimation()} className={`w-[20%] flex items-center justify-center p-2`}>
                                <div className={`w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-blue-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-white font-extrabold`}>3</div>
                            </motion.div>
                            <div className={`w-[80%]`}>
                                <motion.b {...leftAnimation(0.4)}>{student.key3.title[language]}</motion.b>
                                <motion.p {...leftAnimation(0.5)}>{student.key3.description[language]}</motion.p>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full md:w-[40%] p-5`}>
                        <motion.div {...rightAnimation()} className={`w-[100%] h-full rounded-[50px] bg-blue-500 lg:rounded-[50%] lg:rounded-br-3xl lg:rounded-bl-[30%] relative items-end overflow-x-hidden flex`}>
                            <img className={`absolute h-[90%] scale-x-[1.45] lg:scale-x-100 origin-bottom`} src={process.env.PUBLIC_URL + '/images/kid.webp'} alt="Student" />
                            <div className={`absolute lg:w-[45%]  bg-white/5 rounded-3xl p-5 blurey backdrop-blur-xl scale-75 lg:scale-100 lg:top-[42.5%] bottom-7 lg:bottom-auto lg:right-[5%] text-white border border-white/10 shadow-2xl`}>
                                <motion.div {...topAnimation()} className={`w-full flex flex-col text-center  items-center gap-4 ${language === "ar" && "flex-row-reverse "}`}>
                                    <FontAwesomeIcon className={`${language === "ar" && "-scale-x-100 "}`} icon={faQuoteLeft} />
                                    <p className={`${language === "ar" ? "text-xl" : 'text-base'}`}>{student.quote1[language]}<br /><p className={`text-sm text-white/30`}>{student.quote1Author[language]}</p></p>
                                </motion.div>
                            </div>
                            <div {...scaleAnimation()} className={`hidden lg:block absolute w-[45%] scale-[0.8] bg-white/5 rounded-3xl p-5 blurey backdrop-blur-xl bottom-[5%] left-[9%] text-white border border-white/10 shadow-xl`}>
                                <motion.div {...bottomAnimation()} className={`w-full lg:flex items-center gap-4 ${language === "ar" && "flex-row-reverse "}`}>
                                    <FontAwesomeIcon className={`${language === "ar" && "-scale-x-100 "}`} icon={faQuoteLeft} />
                                    <p className={`${language === "ar" ? "text-xl" : 'text-base'}`}>{student.quote2[language]}<br /><p className={`text-sm text-white/30`}>{student.quote2Author[language]}</p></p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ParentEleve;