import { faAngleDown, faAngleUp, faBars, faLanguage, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setLanguage } from "../../redux(toolKit)/slices/contentSlice";
import { Link } from "react-router-dom";

const MobileStckMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showScrolledMenu, setShowScrolledMenu] = useState(false);
    const { language } = useSelector((state) => state.presntion); 
    const dispatch = useDispatch();

    const toggleMenu = () => setIsOpen(!isOpen);
    const {pageIndex}=useSelector((state)=>state.pageIndex);
    const routes = ["/", "/about", "/cycles", "/services", "/news", "/gallery", "/contact", "/registration","postuler"];
    


 useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto"); // Cleanup
    }, [isOpen]);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowScrolledMenu(true);
            } else {
                setShowScrolledMenu(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const menuItems = {
        fr: ["Accueil", "À propos", "Cycles", "Services", "Actualités", "Galerie", "Contact", "Inscription", "Postuler"],
        en: ["Home", "About", "Cycles", "Services", "News", "Gallery", "Contact", "Registration", "Apply"],
        ar: ["الرئيسية", "حولنا", "الدورات", "الخدمات", "الأخبار", "الصور", "اتصل بنا", "التسجيل", "التقديم"],
      };
      
      const currentMenuList = menuItems[language] || menuItems["fr"];
    return (
        <>
            <div className={`w-full flex  justify-center p-4 px-4 pr-5 lg:hidden absolute top-0 left-0 z-50 ${language==='ar'?'flex-row-reverse':''}`}>
                <div className={`w-[50%] z-30 flex ${language==='ar'&&' justify-end'}`}>
                    <img src={process.env.PUBLIC_URL + (language==="fr"?"/logos/logo1.webp":(language==="ar"?"/logos/logo1ar.webp":"/logos/logo1eng.webp"))} alt="logo" className={`h-10 md:h-12 filter ease-in-out duration-300 ${(pageIndex===5&&!isOpen)?"":"invert-[1]"}  ${isOpen&&"opacity-0"}`}/>
                </div>
                <div className={`w-[50%] flex items-end ${language==='ar'?'':'  justify-end'}`}>
                    <div className={`w-7 p-1 flex flex-col gap-2 cursor-pointer relative z-50 theBars mb-1`} onClick={toggleMenu}>
                        <span className={`w-full h-[2px] rounded-3xl ${(pageIndex===5&&!isOpen)?"bg-white/90":"bg-black/90"} absolute   ${isOpen ? 'rotate-45 absolute w-6 -mt-2' : 'rotate-0 -mt-[9px]'}`}></span>
                        <span className={`w-full h-[2px] rounded-3xl ${(pageIndex===5&&!isOpen)?"bg-white/90":"bg-black/90"}   absolute   ${isOpen ? '-rotate-45 absolute w-6 -mt-2' : 'rotate-0'}`}></span>
                    </div>
                </div>
            </div>
            <AnimatePresence>
    {isOpen && (
        <motion.div 
            initial={{ height: 0, top: 0 }} 
            animate={{ height: '100%' }} 
            exit={{ y:100,height: 0,opacity:0,duration:0.6 }} 
            transition={{ type: "ease" }} 
            className="w-full h-screen  bg-white/90 fixed top-0 left-0 z-40 flex items-center justify-center lg:hidden blurey  backdrop-blur-md"
        >
            <div className={`w-[80%] flex flex-col menudropd`}>
                {currentMenuList.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", delay: 0.05 * index }}
                        className="w-full h-14  md:h-20 flex"
                    >
                        <Link to={routes[index]} onClick={()=>setIsOpen(false)} className={`${language==='ar'?'text-right justify-end':""} links text-neutral-700 font-semibold text-2xl md:text-3xl  relative w-full flex items-center`}>
                        {language!=="ar"&&(pageIndex===index&&<span className="w-3  h-3 rounded-full bg-blue-500 mr-2"></span>)} {item} {language==="ar"&&(pageIndex===index&&<span className="w-3  h-3 rounded-full bg-blue-500 ml-2"></span>)}</Link>
                        
                    </motion.div>
                ))}

                <div className={`w-[80%] absolute bottom-10 text-neutral-700 text-base ${language!== 'ar'&&" flex justify-end"}`}>
                    {}
                    <FontAwesomeIcon icon={faLanguage} className="text-2xl text-neutral-700 -mb-0.5 "/> 
                    
                    <select 
                    value={language}
    onChange={(e) => dispatch(setLanguage(e.target.value))}
    id="language-selector"
    className="outline-none ml-2 font-semibold bg-transparent cursor-pointer"
    aria-label="Language Selector"
>
    <option value="fr">Français</option>
    <option value="ar">العربية</option>
    <option value="en">English</option>
</select>

                </div>
            </div>
        </motion.div>
    )}
</AnimatePresence>


            {showScrolledMenu && <ScrooledMenu routes={routes} menuList={currentMenuList} inscription={currentMenuList[7]} currentPage={currentMenuList[pageIndex]}  />}
        </>
    );
};

const ScrooledMenu = ({currentPage,inscription,menuList,routes}) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const [isFull, setIsFull] = useState(false);
    const { language } = useSelector((state) => state.presntion); 
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY != lastScrollY && isFull) {
                setIsFull(false); // Scroll up detected
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFull]);
    const translations = {
    ar: {
        title: "مدارس برج إيفل",
    },
    fr: {
        title: "Les Écoles la tour Eiffel",
    },
    en: {
        title: "The Eiffel Tower Schools",
    },
};
const text = isFull ? translations[language]?.title : currentPage;
   return(
    <>
    <AnimatePresence mode="wait">
        <motion.div initial={{opacity:0,y:-80}} animate={{opacity:1,y:0}} transition={{type:"ease"}} exit={{opacity:0,y:-20}} className={`w-full lg:hidden h-screen ${!isFull&&"pointer-events-none"} fixed top-0 left-0 z-50`}>
           
                {isFull&&(<motion.div onClick={()=>setIsFull(false)} initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{type:"ease"}} exit={{opacity:0,y:-20}} className={`w-full h-screen blurey backdrop-blur-lg absolute bg-white/30 -z-10`}></motion.div>)}
                <motion.div className={`p-2 pointer-events-auto blurey z-50 ${isFull?"bg-white ":"bg-white/50 "} ease-in-out duration-200 backdrop-blur-lg w-full border-b border-black/20`}>
                    <div className={`w-full  flex ${language === 'ar' && 'flex-row-reverse'}`}>
                        <div className={`w-[70%] flex items-center ${language === 'ar' && 'justify-end'}`}>
                        <motion.p
                        key={text}
            className="font-semibold text-neutral-900 text-base"
            initial={{ opacity: 0, x: text===translations[language].title ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: language==="ar"? 25 : -25, transition: { delay: 0.3 } }} // Delayed exit
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {text}
            
        </motion.p>
                        </div>
                        <div className={`w-[30%] flex items-center ${language !== 'ar' && 'justify-end'}`}>
                            {
                                language !== "ar" && (
                                    <FontAwesomeIcon 
                                        onClick={() => setIsFull(!isFull)} 
                                        icon={faAngleDown} 
                                        className={`text-lg ease-in-out duration-150 font-thin mr-3 text-neutral-800 ${isFull && '-scale-y-100'}`}
                                    />
                                )
                            }
                            <button 
                                className={`p-2 px-3 text-white text-xs bg-blue-500 rounded-2xl font-light ${language === "ar" && "font-semibold"}`}
                            >
                                {inscription}
                            </button>
                            {
                                language === "ar" && (
                                    <FontAwesomeIcon 
                                        onClick={() => setIsFull(!isFull)} 
                                        icon={faAngleDown} 
                                        className={`text-lg ease-in-out duration-150 ml-3 font-thin text-neutral-800 ${isFull && '-scale-y-100'}`}
                                    />
                                )
                            }
                        </div>
                    </div>
                   <AnimatePresence mode="wait">

                     
                   {isFull && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }} 
                            transition={{ duration: 0.3, ease: "easeInOut", exit: { duration: 0.7 } }} 
                            className={`overflow-hidden  flex flex-col gap-4 pb-4 pt-8 ${language=="ar"?"":""} ${!isFull&&'h-0' }`}
                        >
                         {menuList.map((item, index) => {
                            if (index===7) return;
                            return(
                                <motion.div  
                                key={index}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    type: "spring", 
                                    delay: 0.05 * index // Entry delay only
                                }}
                                className={`w-full flex ${language === 'ar' && 'items-end text-right '}`}
                            >
                                <Link 
                                    to={routes[index]} 
                                    onClick={() => {
                                        setIsFull(false);
                                        scrollToTop();
                                    }}  
                                    className={`w-full  flex items-center ${language=="ar"?"justify-end pr-6 ":"pl-6"} text-base text-neutral-600 border-transparent relative`}
                                >
                                    {currentPage === item && (
                                        <span className={`w-[2px] rounded-3xl h-4 bg-blue-500 absolute ${language=="ar"?"-mr-6 ":"-ml-6"}`}></span>

                                    )}
                                    {item}
                                </Link>
                            </motion.div>
                            )
                         }
                          
                        )}

                        </motion.div>

                    )}
                   </AnimatePresence>



                </motion.div>
           
        </motion.div>
        </AnimatePresence>

        
    </>
   )
};

export default MobileStckMenu;




