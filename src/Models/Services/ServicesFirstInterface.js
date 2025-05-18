import { useSelector } from "react-redux";
import translations from "./ServicesDatas/firtsInterfaceData.json"; 
import {motion} from "framer-motion";

const ServicesFirstInterface = () => {
  const { language } = useSelector((state) => state.presntion); 
  const content = translations[language] || translations["fr"];
  const isArabic = language === "ar"; 
  const leftAnimation = (d = 0,x=-40) => ({
      initial: { x: x, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
      transition: { type: "spring", delay: d }
    }), rightAnimation = (d = 0) => ({
      initial: { x: 50, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
      transition: { type: "spring", delay: d }
    })
  
  

  return (
    <>
    <div className={`w-[90%] text-center lg:text-left lg:flex  justify-center mt-32 xl:mt-24 lg:mt-10 text-neutral-900 ${isArabic &&"flex-row-reverse lg:text-right"} `}>
        <div className={`w-full lg:w-[60%] ${isArabic && 'flex flex-col lg:items-end'}`}>
          <motion.p className="text-neutral-500" {...leftAnimation(0,-55)}  >{content.services}</motion.p>
          <motion.h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-${isArabic ? "9xl lg:text-8xl text-4xl" : "8xl"}`} {...leftAnimation()} >
            <b>{content.title}</b>
          </motion.h1>
          <motion.p className={`text-neutral-500 lg:w-[80%] xl:text-${isArabic ? "xl" : "lg"}`} {...leftAnimation(0,-45)} >
            {content.description}
          </motion.p>
          <div className={`hidden lg:flex items-center py-16 text-neutral-500 ${isArabic&&'flex-row-reverse'}`}>
            <motion.p {...leftAnimation()} className={` xl:text-${isArabic ? "xl pl-6" : "lg pr-6"}`} >{content.mobileApp}</motion.p> 
            <motion.div {...leftAnimation(0.05)} className="w-2 h-2 bg-red-500 rounded-full"></motion.div>
            <motion.p {...leftAnimation(0.1)} className={`px-6 xl:text-${isArabic ? "xl" : "lg"}`}>{content.transport}</motion.p> 
            <motion.div {...leftAnimation(0.15)} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div>
            <motion.p {...leftAnimation(0.2)} className={`px-6 xl:text-${isArabic ? "xl" : "lg"}`}>{content.canteen}</motion.p> 
            <motion.div {...leftAnimation(0.25)} className="w-2 h-2 bg-red-500 rounded-full"></motion.div>
            <motion.p {...leftAnimation(0.3)} className={`px-6 xl:text-${isArabic ? "xl" : "lg"}`}>{content.infirmary}</motion.p> 
            <motion.div {...leftAnimation(0.35)} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div>
            <motion.p {...leftAnimation(0.4)} className={`px-6 xl:text-${isArabic ? "xl" : "lg"}`}>{content.clubs}</motion.p> 
            <motion.div {...leftAnimation(0.45)} className="w-2 h-2 bg-red-500 rounded-full"></motion.div>
            <motion.p {...leftAnimation(0.5)} className={`xl:text-${isArabic ? "xl pr-6 " : "lg pl-6 "}`}>{content.other}</motion.p>
          </div>
          <div className="w-full lg:hidden text-[10px] sm:text-xs flex my-3 mb-6 items-center justify-center text-neutral-500">
            {content.mobileApp}
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-1"></div>
            {content.transport}
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-1"></div>
            {content.infirmary}
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-1"></div>
            {content.clubs}
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-1"></div>
            {content.other}



          </div>
          <button className="lg:block hidden bg-blue-500 px-5 py-3  text-xl rounded-3xl text-white">
            <b>{content.discoverMore}</b>
          </button>
        </div>
        <motion.div {...rightAnimation(0.3)}  className=" w-full lg:w-[40%]  lg:bg-transparent flex items-center justify-center lg:justify-end  rounded-[50%]  h-auto relative">
          <img className="w-full lg:w-full lg:h-auto scale-105 sm:w-auto sm:h-96 md:h-[500px]  lg:scale-125" src={process.env.PUBLIC_URL + '/images/'+content.image} alt="Services" />
        </motion.div>
        <button className="px-4 lg:hidden py-2 bg-blue-500 text-base md:text-lg md:mt-8 rounded-3xl mt-4 mb-14 text-white">
            <b>{content.discoverMore}</b>
          </button>
      </div>

    </>
  );
}

export default ServicesFirstInterface;
