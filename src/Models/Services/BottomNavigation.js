import { useSelector } from "react-redux";
import levels from "./ServicesDatas/btmNavData.json";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import {
  faBus,
  faMobileAlt,
  faUtensils,
  faTheaterMasks,
  faStethoscope,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { setShowLang } from "../../redux(toolKit)/slices/showLang";
import { useDispatch } from "react-redux";


const BottomNavigation = memo(({ show, handelSelect, selected }) => {
    const language = useSelector((state) => state.presntion.language);
    const icons = [faMobileAlt, faBus, faUtensils, faTheaterMasks, faStethoscope, faEllipsis];
    const dispatch = useDispatch();
    useEffect(() => {
        if(show){
            dispatch(setShowLang(false))
        }else{
            dispatch(setShowLang(true))
        }
    },[show])
    return (
        <AnimatePresence>
            {show && (
                <>
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    exit={{ y: 0, opacity: 0 }} 
                    transition={{ type: "spring" }} 
                    className="w-full hidden fixed left-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent lg:flex items-center justify-center gap-3 z-50 pt-10"
                >
                    {levels[language].map((level, index) => (
                        <motion.div
                            key={index}
                            layoutId={`bottom-nav-${index}`} // Optimized animation
                            initial={{ y: 70 }} 
                            animate={{ y: 0 }} 
                            exit={{ y: 50 }} 
                            transition={{ type: "spring", delay: index * 0.2 }}
                            onClick={() => handelSelect(index)}
                            className={`font-bold text-center my-5 text-lg cursor-pointer ease-in-out 
                                ${selected === index 
                                    ? "text-blue-500 bg-white/25 border-white/50 border blurey backdrop-blur-xl shadow-2xl rounded-full text-xl p-6 py-3" 
                                    : "text-white/80 rounded-2xl p-4 py-2"
                                }`}
                        >
                            {selected === index && <FontAwesomeIcon icon={icons[index]} className="text-2xl text-blue-500 mr-2" />}
                            {level}

                        </motion.div>
                    ))}
                </motion.div>

                <motion.div initial={{y:50,opacity:0}} animate={{y:0,opacity:1,scale:1}} exit={{y:50,opacity:0}} transition={{type:'ease'}} className="w-full lg:hidden fixed bottom-0  flex items-center justify-center gap-3 z-50">
                   <div className={`${language==="ar"&&"flex-row-reverse"} w-[98%] bg-black/10 blurey pb-6 backdrop-blur-lg border-[0.1px] border-white/60 border-b-0 p-4 px-6 shadow-md  rounded-t-3xl flex justify-between items-center`}>
                   {
                    icons.map((icon,index)=><div className="relative flex flex-col md:flex-row gap-x-2 items-center justify-center">
                        <motion.div initial={{y:30,opacity:0,scale:0.5}} animate={{y:0,opacity:1,scale:1}} exit={{y:30,opacity:0,scale:0.3}} transition={{type:"ease",delay:0.08*index}}><FontAwesomeIcon onClick={()=>handelSelect(index)} icon={icon} className={` ease-in-out duration-300 text-2xl  ${selected===index?"text-blue-500":"text-white"}`}/></motion.div>
                        <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1,scale:1}} exit={{y:30,opacity:0}} transition={{type:"ease",delay:0.081*index}} className={`text-[8px] sm:text-[10px] md:text-xs  ease-in-out duration-300 ${selected===index?"text-blue-500 font-semibold":"text-white"}`}>{levels[language][index]}</motion.p>
                         <AnimatePresence>
                                    {selected === index && (
                                      <motion.span
                                        initial={{ opacity: 0, scale: 0,y:10 }}
                                        animate={{ opacity: 1, scale: 1,y:0 }}
                                        exit={{ opacity: 0, scale: 0,y:20 }}
                                        transition={{ duration: 0.3, ease: "easeOut",delay:0.08 }}
                                        className="absolute -bottom-2 md:hidden bg-blue w-1 h-1 rounded-full bg-blue-500"
                                      ></motion.span>
                                    )}
                                    </AnimatePresence>
                    </div>)
                   }
                   </div>
                </motion.div>
                </>


            )}
        </AnimatePresence>
    );
});

export default BottomNavigation;
