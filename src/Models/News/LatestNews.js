import { useSelector } from "react-redux";
import { useState } from "react";
import conetnt from "./NewsData/LatestNewsENtryData.json";
import NewsCard from "./NewsCard";
import MoreNews from "./MoreNews";
import {motion,AnimatePresence} from "framer-motion"
import { categoryColorMap,getTailwindColor } from "react";



export default function Latestnews() {
  const language = useSelector((state) => state.presntion.language);
  const { latest, status, error } = useSelector((state) => state.latestNews);

  const t = conetnt[language];

  const currentDate = new Date();
  const month = t.months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const [seeMore,setIsSeeMore] = useState(false);

  return (
    <div className="w-screen flex flex-col items-center justify-center relative py-20 lg:py-32">
      <div className="w-[90%] md:w-[85%] 2xl:w-[60%] items-center justify-center sm:items-end">
        <div className={`w-full flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-end text-center sm:text-left ${language === "ar" ? "sm:flex-row-reverse sm:text-right" : ""}`}>
          <div className="flex-1">
            <motion.p initial={{x:-40,opacity:0}} whileInView={{x:0,opacity:1}} transition={{type:"spring",delay:0}} className="text-red-500">{t.discover}</motion.p>
            <motion.p initial={{x:-50,opacity:0}} whileInView={{x:0,opacity:1}} transition={{type:"spring",delay:0.1}} className="text-neutral-800 font-extrabold text-3xl leading-8 md:text-5xl">{t.latestNews}</motion.p>
          </div>
          <div className={`flex-1 mt-4 flex ${language === "ar" ? "items-end" : "items-end justify-end"} text-neutral-400`}>
            <motion.span initial={{x:40,opacity:0}} whileInView={{x:0,opacity:1}} transition={{type:"spring",delay:0.12}} className="px-4 p-2 bg-the-gray font-semibold text-white rounded-xl">{`${month}, ${year}`}</motion.span>
          </div>
        </div>
      </div>

      <div className="w-[90%] md:w-[85%] 2xl:w-[60%]  flex  flex-col mt-10 mb-[20px]">
          <NewsCard  size={"xl"} content={latest[0]} />
      </div>
      <div className="w-[90%] md:w-[85%] 2xl:w-[60%] flex flex-col sm:flex-row gap-[20px]">
          <div className="w-full ">
            <NewsCard size={"lg"} content={latest[1]} />

          </div>
          <div className="w-full flex flex-col gap-[20px]">
            <NewsCard size={"sm"} content={latest[2]} />
            <NewsCard size={"sm"} content={latest[3]} />
          </div>
      </div>

      <div className="w-[90%] md:w-[85%] 2xl:w-[60%] flex flex-col  sm:flex-row gap-[20px] mt-[20px]">
        <div className="flex-1"><NewsCard size={"sm"} content={latest[4]}  /></div>
        <div className="flex-1"><NewsCard size={"sm"} content={latest[5]} dealy={0.2} /></div>
        <div className="flex-1"><NewsCard size={"sm"} content={latest[6]} dealy={0.4} /></div>
      </div>

     
<motion.button 

  layout
  onClick={() => setIsSeeMore(!seeMore)} 
  transition={{type:"spring"}}
  initial={{y:40,opacity:0}} whileInView={{y:0,opacity:10}}
  className={`mt-10 ${language==="ar"&&"flex-row-reverse"} px-4 py-2 gap-2  rounded-full flex items-center justify-center bg-apple-light text-apple-dark font-semibold  hover:bg-apple-light/90  transition duration-300 ease-in-out cursor-pointer`}
>
 <p className="font-semibold">
 {
    language === "ar"
      ? seeMore ? "عرض أقل" : "عرض المزيد"
      : language === "fr"
        ? seeMore ? "Voir moins" : "Voir plus"
        : seeMore ? "Show less" : "Show more"
  }
 </p>

  <div className="w-2.5 lg:w-3.5  relative flex items-center justify-center ">
    <span className="w-full h-[2px] lg:h-[3px] absolute bg-apple-dark rounded-full"></span>
    <span  
      className={`w-full h-[2px] lg:h-[3px] absolute bg-apple-dark rotate-90 rounded-full ease-in-out duration-500 ${seeMore ? "scale-x-0" : "scale-x-100"}`}>
    </span>
  </div>
  </motion.button>
 <AnimatePresence>
 {
    seeMore&&<MoreNews/>
  }
 </AnimatePresence>

     
      

     
    </div>

  );
}

