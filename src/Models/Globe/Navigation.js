import { faUserTie, faChalkboardTeacher, faBook, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setShowLang } from "../../redux(toolKit)/slices/showLang";

import { AnimatePresence,motion } from "framer-motion";

const Navigation = ({menuList}) => {

    const scrollValue = useSelector((state) => state.scrollVal);
    const show = window.innerWidth < 768 && scrollValue !== null ;

const dispatch = useDispatch();
    useEffect(() => {
        if(show){
            dispatch(setShowLang(false))
        }else{
            dispatch(setShowLang(true))
        }
    },[show])

    const [linked, setlinked] = useState(0);
    useEffect(() => {
        console.log("scrollValue", scrollValue);
        setlinked(scrollValue);
    }, [scrollValue]);
    
    useEffect(() => {
        console.log("linkedn", linked);
    }, [linked]);

    // Icon mapping based on the menuList index
    const icons = [faUserTie, faChalkboardTeacher, faBook, faUserFriends];
    const handleScroll = (id) => {

       
        const element = document.getElementById(id);
        const block = id===0?"center":"start"
        if (element) {
          element.scrollIntoView({ 
            behavior: "auto", 
            block:block,
          });

        }
    };
  const { language } = useSelector((state) => state.presntion); 
  const leftAnimation = (d = 0) => ({
    initial: { x: -50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  });
  const bottomAnimation = (d = 0) => ({
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: "spring", damping: 10, delay: d }
  });

    return (
        <>
            {/* Main Navigation */}
            <div className="xl:w-[55%] lg:w-[70%] w-full  rounded-full p-2 lg:mt-20 flex items-center navi justify-center">
                <div className="w-[100%] flex items-center justify-between relative sm:hidden md:flex">
                    <span
                        style={{
                            width: 100 / menuList[language].length + "%",
                            left: linked * (100 / menuList[language].length) + "%",
                        }}
                        className="absolute -bottom-1  lg:bottom-1 h-1 md:h-2 lg:h-1.5 flex justify-center items-center flash"
                    >
                        <motion.div {...leftAnimation()} className="w-[50%] bg-blue-500 h-full rounded-full shadow-xl"></motion.div>
                    </span>
                    {menuList[language].map((text, index) => (
                        <motion.a {...leftAnimation(0.15*index)}
                            key={index}
                            style={{ width: 100 / menuList[language].length + "%" }}
                            className={`text-center cursor-pointer z-40 xl:py-5 md:py-4 text-[8px] md:text-sm md:mt-10 lg:text-lg   ${linked === index ? 'text-blue-500 lg:text-base  text-sm' : 'text-black/50 text-[10px] lg:text-sm xl:text-lg'}`}
                            onClick={() => {setlinked(index);handleScroll(index)}}
                        >
                            {text}
                        </motion.a>
                    ))}
                </div>
            </div>
         <AnimatePresence>
               
           {
            scrollValue !== null && 
            <motion.div  initial={{y:50}} animate={{opacity:1,y:0}}exit={{y:50}} transition={{type:'spring'}} className="w-full bg-gradient-to-t from-white to-transparent flex p-5 -bottom-3 fixed items-center justify-center  md:flex z-50 cursor-pointer ">
                <motion.div  initial={{opacity:0}} animate={{opacity:1}}exit={{opacity:0}} transition={{type:'spring'}} className="w-full scale-x-110 h-20 bg-black/90 blur-3xl fixed -bottom-14 z-50"></motion.div>
                {menuList[language].map((text, index) => (
                    <motion.div
                        key={index}
                        className={` flex h-16 cursor-pointer pops rounded-full border items-center justify-center  border-transparent bg-transparent  ${linked == index ? ' rounded-full px-2 py-0  lg:px-3 lg:py-3 bg-white/5  blurey backdrop-blur-xl border  border-white/10 shadow-xl' : ' mt-3 px-2 scale-90'} z-50 gap-x-2`}
                        onClick={() => {handleScroll(index);}}
                        initial={{y:50}} animate={{y:0}}exit={{y:50}} transition={{type:'spring',delay:0.09*index}}
                        
                    >

                        <div className={`items-center mix-blend-difference  flex  justify-center ease-in-out duration-200 text-xs ${language==="ar"&& "font-black"} md:text-base lg:text-lg lg:px-2 ${linked == index ? 'text-white/90 font-semibold ' : 'text-white/60 hover:animate-pulse hidden '}`}>
                            {text} 
                        </div>
                        
                            <div className={` lg:w-10 lg:h-10 md:w-10 md:h-10 ${linked == index?'bg-blue-500 w-14 h-10   text-white/90':'text-white/70 hover:text-white hover:animate-fast-pulse'} flex items-center justify-center rounded-full text-base  lg:text-xl scale-105`}>
                                <FontAwesomeIcon icon={icons[index]} />
                            </div>
                        
                    </motion.div>
                ))}
            </motion.div>
           }
         </AnimatePresence>
           
            
         
        </>
    );
};

export default Navigation;





















/*    */