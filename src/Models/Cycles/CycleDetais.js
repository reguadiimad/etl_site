import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";
import { leftAnimation,rightAnimation,topAnimation,bottomAnimation } from "./animation";
import BottomNavigation from "./BottomNavigation";


const CycleDetails = ({ content, cycImages, isBlue = true, coverImage }) => {
    const { language } = useSelector((state) => state.presntion);
    const [direction, setDirection] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),  // Swipe left to go next
        onSwipedRight: () => handlePrev(), // Swipe right to go previous
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const handleNext = () => {
        setDirection(1);
        setSelectedIndex((prev) => (prev + 1) % cycImages.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setSelectedIndex((prev) => (prev - 1 + cycImages.length) % cycImages.length);
    };

    const handleClose = () => {
        setSelectedIndex(null);
    };

    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedIndex]);

    const getTextSize = (baseSize, increaseSize) => {
        return language === "ar" ? increaseSize : baseSize;
    };

    const getColor = (defaultColor, alternateColor) => {
        return isBlue ? defaultColor : alternateColor;
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (selectedIndex !== null) {
                if (event.key === "ArrowLeft") {
                    handlePrev();
                } else if (event.key === "ArrowRight") {
                    handleNext();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePrev, handleNext, selectedIndex]);

    return (
        <div className={`w-full relative`}>

            <div className={`w-full flex ${language === "ar" && 'flex-row-reverse text-right'} `}> 
                <div className={`w-[60%]`}>
                    <motion.p {...leftAnimation()} className={`text-neutral-500`}>{content.subtitle[language]}</motion.p>
                    <motion.h1 {...leftAnimation(0.13)} className={` ${getTextSize("text-5xl", "text-6xl")} md:${getTextSize("text-6xl", "text-7xl")} lg:${getTextSize("text-7xl", "text-8xl")} xl:${getTextSize("text-8xl", "text-9xl")} ${getColor("text-blue-500", "text-red-500")}`}>
                       <b> {content.title[language]}</b>
                    </motion.h1>
                </div>
                <motion.div {...leftAnimation(0.15)} className={`w-[40%] hidden sm:flex justify-end text-right ${language === "ar" && 'flex-row-reverse text-right'} text-neutral-500`}>
                    {content.description[language]}
                </motion.div>
            </div>

            <div className={`flex w-full mt-10 flex-col-reverse  lg:flex-row ${isBlue?'':'lg:flex-row-reverse'} `}>
                <div className={`lg:w-[45%] w-full text-neutral-500 flex flex-col gap-y-5`}>
                    <motion.p {...leftAnimation(0.15)} className={`text-neutral-500`}>
                        {content.explication[language]}
                    </motion.p>
                    <motion.div {...leftAnimation()} className={`w-full flex items-center mt-10 gap-x-5`}>
                        <div  className={`w-20 h-20 ${isBlue?'sm:bg-blue-500':'sm:bg-red-500'}  rounded-[35px] rotate-45 flex items-center justify-center text-5xl font-bold shadow-sm`}>
                            <p className={`-rotate-45 ${getColor("text-blue-500", "text-red-500")} sm:text-white font-extrabold`}>1</p>
                        </div>
                        <div>
                            <motion.h1 {...leftAnimation(0.15)} className={`${getTextSize("text-2xl", "text-3xl")} font-bold ${getColor("text-blue-500", "text-red-500")}`}>{content.benefit1.title[language]}</motion.h1>
                            <motion.p {...leftAnimation(0.16)}>{content.benefit1.description[language]}</motion.p>
                        </div>
                    </motion.div>

                    <motion.div {...leftAnimation()} className={`w-full flex items-center mt-10 gap-x-5`}>
                        <div className={`w-20 h-20 ${isBlue?'sm:bg-blue-500':'sm:bg-red-500'}  rounded-[35px] -rotate-45 flex items-center justify-center text-5xl font-bold shadow-sm`}>
                            <p className={`rotate-45 ${getColor("text-blue-500", "text-red-500")} sm:text-white font-extrabold`}>2</p>
                        </div>
                        <div>
                            <h1 className={`${getTextSize("text-2xl", "text-3xl")} font-bold ${getColor("text-blue-500", "text-red-500")}`}>{content.benefit2.title[language]}</h1>
                            <p>{content.benefit2.description[language]}</p>
                        </div>
                    </motion.div>

                    <motion.div {...leftAnimation()} className={`w-full flex items-center mt-10 gap-x-5`}>
                        <div className={`w-20 h-20 ${isBlue?'sm:bg-blue-500':'sm:bg-red-500'} rounded-[35px] rotate-45 flex items-center justify-center text-5xl font-bold shadow-sm`}>
                            <p className={`-rotate-45 ${getColor("text-blue-500", "text-red-500")} sm:text-white font-extrabold`}>3</p>
                        </div>
                        <div>
                            <h1 className={`${getTextSize("text-2xl", "text-3xl")} font-bold ${getColor("text-blue-500", "text-red-500")}`}>{content.benefit3.title[language]}</h1>
                            <p>{content.benefit3.description[language]}</p>
                        </div>
                    </motion.div>
                </div>
                <div className={`w-[55%]  pl-20 relative hidden lg:flex items-center justify-center`}>
                    <motion.img {...bottomAnimation()} className={`absolute bottom-2 right-0 h-full scale-110 ${!isBlue&&'-scale-x-100 left-0'} `} src={process.env.PUBLIC_URL + coverImage.pc} alt="Maternelle" />
                    <motion.div {...bottomAnimation(0.21)} className={`absolute  ${isBlue?'left-20':'right-20'} p-4 2xl:p-10 text-center border   border-white/60  rounded-[40px] shadow-xl w-[56%] hidden xl:block bg-apple-light/50 blurey backdrop-blur-3xl`}>
                        <h1 className={`2xl:${getTextSize("text-2xl", "text-3xl")} ${getTextSize("text-lg", "text-xl")} font-extrabold ${getColor("text-blue-500", "text-red-500")} mb-3 2xl:mb-10`}>{content.highlight.title[language]}</h1>
                        <p className={`text-left ${getTextSize("text-sm", "text-base")} ${language === "ar" && ' text-right'} 2xl:${getTextSize("text-base", "text-lg")} text-apple-dark`}>
                            {content.highlight.description[language]}
                        </p>
                        <p className={`${getTextSize("text-sm", "text-base")} text-left text-neutral-900/50 font-bold mt-2`}>{content.highlight.sub_description[language]}</p>
                    </motion.div>
                    <div className={`absolute bottom-0 right-0 flex gap-2`}>
                        <motion.div {...rightAnimation()} className={`text-center flex items-center justify-center border border-white/30 bg-gradient-to-br from-black/5 to-white/5 rounded-[20px] shadow-xl p-2 blurey backdrop-blur-2xl`}>
                            <FontAwesomeIcon className={`text-neutral-700/40 text-4xl`} icon={faQuoteLeft} />
                        </motion.div>
                        <motion.div {...rightAnimation(0.2)} className={`2xl:text-neutral-700/40 items-center justify-center border px-4 text-left border-white/30 bg-apple-light/70 rounded-[20px] shadow-xl p-2 blurey backdrop-blur-2xl lg:text-apple-dark ${getTextSize("text-sm", "text-base")}`}>
                            {content.testimonials[language]}<br /><p className={`font-bold`}>{content.testimonials_author[language]}</p>
                        </motion.div>
                    </div>
                </div>
                <div className={`w-full flex lg:hidden items-center justify-center relative mb-14`}>
                    <motion.img {...bottomAnimation()} className={`w-full h-full sm:h-[450px] md:h-[550px] sm:w-auto`} src={process.env.PUBLIC_URL + coverImage.phn} alt="Maternelle Mobile" />
                    <motion.div {...bottomAnimation()} className={`absolute -bottom-10 left-0 p-4 text-center border border-white/60 bg-gradient-to-br from-black/5 to-white/5 rounded-[20px] shadow-xl w-[70%] blurey backdrop-blur-3xl`}>
                        <motion.h1 className={`${getTextSize("text-base", "text-lg")} text-left font-extrabold ${getColor("text-blue-500", "text-red-500")} mb-2`}>{content.highlight.title[language]}</motion.h1>
                        <motion.p className={`text-neutral-900/70 hidden md:block text-left`}>{content.highlight.sub_description[language]}</motion.p>
                    </motion.div>
                </div>
            </div>

            <div className={`w-full flex p-[20px] bg-neutral-100 rounded-[40px] mt-10 overflow-x-scroll`}>
                <div>
                    <div>
                        <div className={`flex gap-4 pr-[20px]`}>
                            {cycImages.map((image, index) => (
                                <motion.img {...leftAnimation(0.1*index)}
                                    key={index}
                                    src={process.env.PUBLIC_URL + image}
                                    className={`h-[150px] sm:h-[200px] md:h-[250px] rounded-[20px] shadow-sm border-4 border-white ease-in-out duration-200 hover:scale-[1.08] hover:shadow-lg cursor-pointer hover:border-[10px] hover:rounded-[30px]`}
                                    onClick={() => setSelectedIndex(index)}
                                    alt={`Maternelle Image ${index}`}
                                />
                            ))}
                            <div className={`h-[150px] sm:h-[200px] md:h-[250px] rounded-[30px] text-center mr-[20px] items-center justify-center flex text-neutral-400/70 ${getTextSize("text-2xl", "text-3xl")} font-bold cursor-pointer pl-6 pr-14 duration-200 ease-in-out hover:${getColor("text-blue-500", "text-red-500")}/90`}>
                                {content.more_photos[language]}
                            </div>
                        </div>
                        <AnimatePresence>
                            {selectedIndex !== null && (
                                <motion.div
                                    {...handlers}
                                    className={`fixed top-0 left-0 w-full h-full p-5 md:p-0 bg-black/50 flex items-center justify-center flex-col gap-4`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleClose}
                                >
                                    <motion.h1 initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 10 }} className={`text-white/90 font-bold ${getTextSize("text-5xl", "text-6xl")}`}>{content.image_gallery_title[language]}</motion.h1>
                                    <motion.div initial={{ x: 70 }} animate={{ x: 0 }} exit={{ x: 100 }} className={`border border-white/40 bg-white/20 blurey backdrop-blur-2xl rounded-[50px] p-[25px] z-50`}>
                                        <motion.img
                                            key={selectedIndex}
                                            src={process.env.PUBLIC_URL + cycImages[selectedIndex]}
                                            className={`rounded-[25px] h-[300px] md:h-[700px] border border-white/60`}
                                            initial={{ x: direction * 100, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -direction * 100, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                                            alt={`Selected Maternelle Image`}
                                        />
                                    </motion.div>

                                    <button
                                        className={`absolute bottom-0 md:bottom-4 lg:bottom-auto left-10 text-white/70 text-3xl bg-white/5 w-20 h-20 p-3 rounded-[20px] border border-white/10 blurey backdrop-blur-2xl ease-in-out duration-200 hover:bg-white/10 hover:text-white shadow-2xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePrev();
                                        }}
                                    >
                                        <FontAwesomeIcon className={`hover:animate-pulse`} icon={faChevronLeft} />
                                    </button>

                                    <button
                                        className={`absolute bottom-0 md:bottom-4 lg:bottom-auto right-10 text-white/70 text-3xl bg-white/5 w-20 h-20 p-3 rounded-[20px] border border-white/10 blurey backdrop-blur-2xl ease-in-out duration-200 hover:bg-white/10 hover:text-white shadow-2xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleNext();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} className={`transform rotate-180`} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CycleDetails;