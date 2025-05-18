import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Menu from '../Models/Menu/Menu.js';
import MobileMenu from "../Models/Menu/MobileMenu.js";
import MobileStckMenu from "../Models/Menu/MobileStckMenu.js";
import { useDispatch, useSelector } from 'react-redux';
import { setIsHome } from '../redux(toolKit)/slices/isHomeSlice';

const Navbar = () => {
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useSelector((state) => state.presntion); 
  const isHome = useSelector((state) => state.isHome);

  const dispatch =useDispatch();
  useEffect(()=>{dispatch(setIsHome(false))},[dispatch])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = {
    fr: ["Accueil", "À propos", "Cycles", "Services", "Actualités", "Galerie"],
    en: ["Home", "About", "Cycles", "Services", "News", "Gallery"],
    ar: ["الرئيسية", "حولنا", "الدورات", "الخدمات", "الأخبار", "الصور"],
  };

  const buttonsText = {
    fr: {
      inscription: "Inscription",
      contact: "Contact",
    },
    en: {
      inscription: "Registration",
      contact: "Contact",
    },
    ar: {
      inscription: "التسجيل",
      contact: "اتصل",
    },
  };
  const routes = ["/", "/about", "/cycles", "/services", "/news", "/gallery", "/contact", "/registration"];

  return (
    <>
     
       <nav dir={language==="ar"&&"rtl"} className={`lg:flex items-center justify-between w-[94%] p-2 hidden font-sans absolute ${language==='ar'&&'text-xl'} rounded-lg top-3 left-[3%] text-neutral-900/90 z-30 `}>
       <div className="w-[50%] lg:w-[30%]">
         <img
           alt="logo"
           src={process.env.PUBLIC_URL + `/logos/${language==='ar'?'logo1ar.webp':(language==='en'?'logo1eng.webp':'logo1.webp')}`}
           className={`h-12 md:h-16 object-cover  opacity-90 mb-4 ${(pageIndex!==0 ) && "filter invert hidden xl:block"}   ${(pageIndex===0 && language!=="ar") && "filter invert"} `}
         />
       </div>

       {/* Links Section - Desktop */}
       <div  className={`hidden lg:flex lg:w-[50%] xl:w-[50%] justify-between text-center `}>
         {menuItems[language].map((text, index) => (
           <div
           onClick={()=>navigate(routes[index])}
             key={index}
             className={`w-[16.6666666667%] ${pageIndex!==0&&"hidden"} flex items-center cursor-pointer justify-center relative text-center ${(pageIndex===0 && language!=="ar" && index>3) && "text-white"} ${(pageIndex===0 && language==="ar" && index<2) && "text-white"}  hover:animate-pulse`}
           >
             {text}
             <div className={`w-1 h-1 absolute -mb-2 bottom-0 rounded-full  ${pageIndex===index&&"bg-neutral-900"} ${(pageIndex===index&&index<2&&pageIndex===0)&&language==="ar"&&"bg-white"}  mx-auto`}></div>
           </div>
         ))}
       </div>

       {/* Contact & Registration Section - Desktop */}
       <div className="hidden lg:flex lg:w-[30%] items-center flex-row-reverse -mr-10">
         <Link to={'/registration'} className={`m-2  lg:p-3.5 lg:py-3 flex items-center justify-center py-5 bg-red-500 rounded-[30px] hover:bg-red-500/90 shadow-lg ${pageIndex!==0&&"hidden"}`}>
         <div className={`w-1 h-1  rounded-full  ${pageIndex===7&&"bg-white"}  mx-auto`}></div>
           <span className={`mx-2 text-white `} >{buttonsText[language].inscription}</span>
         </Link>
         <Link  to={'/contact'} className={`text-neutral-900 relative flex items-center justify-center ${pageIndex!==0&&"hidden"}  ${(pageIndex===0 && language!=="ar") && "text-white"} `}>
         {buttonsText[language].contact}
         <div className={`w-1 h-1 absolute -mb-2 bottom-0 rounded-full  ${pageIndex===6&&"bg-neutral-900"}  mx-auto`}></div>

         </Link>
       </div>

       {/* Mobile Menu Icon */}
       <div className="flex lg:hidden w-[50%] justify-end">
         <FontAwesomeIcon icon={faBars} className="text-3xl md:text-4xl z-50 hover:animate-pulse"  onClick={()=>setIsMobile(true)} />
       </div>
     </nav>
     

    
      

      {/* Menu Section */}
      <Menu visible={pageIndex?true:(scrolled && !isMobile)} />
      <MobileMenu visible={isMobile} onClose={() => setIsMobile(false)} />
      <MobileStckMenu visible={scrolled} onOpen={() => setIsMobile(true)} />
    </>
  );
};

export default Navbar;
