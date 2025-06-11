import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux(toolKit)/slices/contentSlice";
import { setPageIndex } from "../../redux(toolKit)/slices/pageIndexSlice";
const Menu = ({ visible }) => {
    const isHome = useSelector((state) => state.isHome);
    const dispatch = useDispatch();
    const [linked, setlinked] = useState(0);
    const [langClicked, setLangClicked] = useState(false);
    const { language } = useSelector((state) => state.presntion);
    const { showLang } = useSelector((state) => state.showLang);
    const {pageIndex}=useSelector((state)=>state.pageIndex);
    const { showTopMenu } = useSelector((state) => state.showTopMenu);
    const navigate = useNavigate();



    

     // Assuming Redux store
    const menuList = {
        fr: ["Accueil", "À propos", "Cycles", "Services", "Actualités", "Galerie", "Contact", "Inscription"],
        en: ["Home", "About", "Cycles", "Services", "News", "Gallery", "Contact", "Registration"],
        ar: ["الرئيسية", "حولنا", "الدورات", "الخدمات", "الأخبار", "المعرض", " اتصل بنا", "التسجيل"],
    };
    const routes = ["/", "/about", "/cycles", "/services", "/news", "/gallery", "/contact", "/registration"];

    const [showMenu, setShowMenu] = useState(true); 
    const showMenu2 = useSelector((state)=>state.showMenu)// State to toggle menu visibility
    const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= 0) {
                setShowMenu(true); // Ensure menu stays visible at the top
            } else if (window.scrollY > lastScrollY) {
                setShowMenu(false); // Hide menu when scrolling down
            } else {
                setShowMenu(true); // Show menu when scrolling up
            }
            setLastScrollY(window.scrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);
    

    const dropAndPopAnimation = () => ({
        initial: { y: "-100%",  scale: 0.5 },
        animate: { y: 0, scale: 1 },
        exit: { y: "-100%", scale: 0.5 },
        transition: { type: "spring",damping: 13,mass:1 },
    });

    const currentMenuList = menuList[language] || menuList["fr"];

    const langButtons = (lang) => {
        if (lang === "ar") {
            return (
                <>
                    <button onClick={() => dispatch(setLanguage("fr"))}>fr</button>
                    <button onClick={() => dispatch(setLanguage("en"))}>en</button>
                </>
            );
        } else if (lang === "fr") {
            return (
                <>
                    <button onClick={() => dispatch(setLanguage("en"))}>en</button>
                    <button onClick={() => dispatch(setLanguage("ar"))}>ar</button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={() => dispatch(setLanguage("fr"))}>fr</button>
                    <button onClick={() => dispatch(setLanguage("ar"))}>ar</button>
                </>
            );
        }
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    

    return (
        <>
        

            <AnimatePresence>
            
                {visible && (showMenu && showTopMenu) && (
                    <>
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'spring'}} className="top-blur hidden xl:block backdrop-blur-3xl"></motion.div>
                    <motion.div
                        className="lg:w-full hidden   lg:fixed top-0 left-0 xl:flex items-center justify-center  pt-5 pb-10 lg:text-base md:text-sm sm:w-0 md:overflow-visible sm:overflow-hidden -mt-10 nav z-50"
                        {...dropAndPopAnimation()}
                    >
                       
                        <motion.div
                            {...dropAndPopAnimation()}
                            className="mt-8 xl:w-[58%] md:w-[75%] bg-apple-light/80  hidden p-2.5 blurey blurey backdrop-blur-2xl border border-white/80 rounded-full lg:flex items-center justify-center shadow-lg "
                        >
                            <div className={`w-[100%] flex items-center justify-between relative sm:hidden md:flex  ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                                <AnimatePresence>
                                {pageIndex<8&&<motion.span
                                    layout transition={{type: "spring",bounce: 0.2}}
                                    exit={{scale:0,opacity:0}} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
                                    style={{
                                        width: 100 / currentMenuList.length + "%",
                                        [language === "ar" ? "right" : "left"]: pageIndex * (100 / currentMenuList.length) + "%"
                                      }}
                                      
                                    className="absolute bg-red-500  h-full rounded-full  border border-white/80"
                                />}
                                </AnimatePresence>
                                {currentMenuList.map((text, index) => (
                                    <Link
                                        to={routes[index]}
                                        key={index}
                                        style={{ width: 100 / currentMenuList.length + "%" }}
                                        className={`text-center z-40  xl:py-5 md:py-4 lg:text-base md:text-sm  ${
                                            language === "ar" ? "lg:text-lg" : "lg:text-base"
                                        } ${pageIndex === index ? "text-white/90 font-bold " : "text-apple-dark hover:animate-pulse mix-blend-difference"}`}
                                        onClick={() => {
                                            dispatch(setPageIndex(index));
                                            scrollToTop(); // Scroll to the top when clicking a link
                                        }}
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div></>
                )}
            </AnimatePresence>
            
    
  
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <div className="fixed bottom-0  left-0 mx-w-52 max-h-52 blur-3xl scale-150 z-40">
                    <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-full absolute -bottom-16 -left-32 scale-150"></div>
                </div>
                <div className={`w-[4%] scale-110 gap-y-2 pb-5 bottom-0 left-6 lg:left-1 fixed flex flex-col items-center language ease-in duration-200 z-50 ${!showLang&&" mt-24 lg:mt-0 lg:opacity-100"} `}>
                    <AnimatePresence>
                        {langClicked && (
                            <motion.div
                                key="lang-menu"
                                initial={{ y: 50, scale: 0.5 }}
                                animate={{ y: 0, scale: 1 }}
                                exit={{ y: 80, scale: 0.2 }}
                                transition={{ type: "spring", damping: 13, duration: 0.1 }}
                                className={`w-10 text-apple-dark bg-apple-light/90 blurey backdrop-blur-lg duration-0 rounded-full flex flex-col items-center justify-center gap-y-2 lg:py-2 py-4 ${!showLang&&'opacity-0'} `}
                            >
                                {langButtons(language)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                   <motion.button initial={{x:-50}} animate={{x:0}} exit={{x:-50}} transition={{type:'spring',damping:13,mass:1}}
                        onClick={() => setLangClicked(!langClicked)}
                        className={`text-apple-dark shadow-lg bg-apple-light/90  rounded-full w-10 h-10 blurey backdrop-blur-lg font-semibold hover:bg-apple-light/80  ${!showLang&&"opacity-0 -ml-36 lg:mt-0 lg:opacity-100"}`}
                    >
                    {language}

                    </motion.button>
                   
                    </AnimatePresence>
                </div>
            </motion.div>
 
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
               className="hidden lg:flex"
            >
                <div className="fixed bottom-0  right-0  blur-3xl scale-150 z-0">
                    <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-full absolute -bottom-16 -left-32 scale-150">
                        
                    </div>
                </div>
                <div className="w-[4%] scale-110 gap-y-2 pb-5 bottom-0 right-8 lg:right-10 fixed flex flex-col items-center language ease-in duration-200 z-40">
                    
                    <AnimatePresence>
                  {
                    pageIndex!==8&& <motion.button layout onClick={()=>{navigate('/postuler')}} initial={{x:100,y:10,opacity:0,scale:0.5}} animate={{x:0,opacity:1,y:0,scale:1}} exit={{x:100,opacity:0,y:10,scale:0.5}} transition={{type:'spring',bounce:0.2}}
            
                     className={`text-apple-dark shadow-lg  bg-[rgba(237,237,240)]  rounded-full p-2 blurey font-semibold backdrop-blur-xl hover:bg-apple-light ${!showLang&&"-mr-64 opacity-0 pointer-events-none lg:-ml-0 lg:opacity-100"}`}
                 >
 {                 {
  fr: "Postuler",
  en: "Apply",
  ar: "التقديم"}[language]
}
                 </motion.button>
                  }
                   
                    </AnimatePresence>
                </div>
            </motion.div>
    


        </>
    );
};

export default Menu;
