import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState,} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import FullNews from "./FullNews";
import { setShowTopMenu } from "../../redux(toolKit)/slices/showTopMenu";

export default function NewsCard({size,content,dealy=0}) {
  const language = useSelector((state) => state.presntion.language);
  const [isFull, setIsFull] = useState(false);
  const dispatch = useDispatch();
   useEffect(() => {
    if(isFull){
      dispatch(setShowTopMenu(false))
    }else{
      dispatch(setShowTopMenu(true))
    }
    }, [dispatch,isFull]);

  const styleSize = {
    sm: {
      container: "h-[250px] lg:h-[300px]",
      box:"p-5 h-[70%]",
      title: "text-2xl sm:text-base lg:text-xl ",
    },
    lg: {
      container: "h-[350px] sm:h-[520px] lg:h-[620px]",
      box:"p-5 lg:p-10 h-[90%]",
      title: "text-2xl lg:text-3xl",
    },
    xl: {
      container: "h-[400px] lg:h-[600px]",
      box:"p-5 lg:p-10 h-[70%] ",
      title: "text-2xl lg:text-5xl",
    },
  };
  const pinned = {
      "en": "Pinned",
      "fr": "Épinglé",
      "ar": "مثبت"
  }

  const categoryColorMap = {
    communication: "bg-yellow-400",
    sports: "bg-green-400",
    health: "bg-red-400",
    education: "bg-blue-400",
    technology: "bg-indigo-400",
    science: "bg-purple-400",
    art: "bg-pink-400",
    music: "bg-yellow-400",
    politics: "bg-rose-400",
    environment: "bg-emerald-400",
    economy: "bg-amber-400",
    history: "bg-slate-400",
    culture: "bg-fuchsia-400",
    travel: "bg-cyan-400",
    weather: "bg-sky-400",
    food: "bg-orange-400",
    fashion: "bg-violet-400",
    literature: "bg-lime-400",
    religion: "bg-teal-400",
    crime: "bg-red-500",
    justice: "bg-gray-400",
    psychology: "bg-pink-300",
    philosophy: "bg-purple-300",
    math: "bg-blue-500",
    physics: "bg-indigo-500",
    chemistry: "bg-cyan-300",
    biology: "bg-green-300",
    astronomy: "bg-sky-500",
    cinema: "bg-yellow-500",
    theater: "bg-amber-500",
    gaming: "bg-fuchsia-500",
    robotics: "bg-teal-500",
    innovation: "bg-lime-500",
    animals: "bg-rose-500",
    parenting: "bg-orange-300",
    transportation: "bg-gray-500",
    general: "bg-orange-400",
    other: "bg-neutral-200"
  };
  function getTailwindColor(category) {
    const key = category.toLowerCase().trim();
    const color = categoryColorMap[key] || "neutral-200";
    return {
      bg: `${color}`,
      text: `text-${color}`
    };
  }
  
  
 
  
   return (
    <>
    <motion.div initial={{y:40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:dealy}}  onClick={()=>setIsFull(true)} className={`w-full ${styleSize[size].container} shadow-md  rounded-3xl  lg:rounded-[40px] fd overflow-hidden cursor-pointer relative ${language=="ar"&&"text-right"}`}>
      <img src={process.env.PUBLIC_URL+content.imgSrc} className={`w-full h-full  object-cover hover:scale-110 ease-in-out duration-700`}/>
      <div className={`${styleSize[size].box} w-full pointer-events-none  absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent flex items-end ${language=="ar"&&" flex-row-reverse"}`}>
       <div className={`w-full lg:w-[80%] `}>
          {content.isPinned&&<div className={`flex ${language=="ar"&&"flex-row-reverse"} text-sm gap-2 text-white/70 items-center mb-2`}><FontAwesomeIcon icon={faThumbTack} /> {pinned[language]}</div>}
          <span className={`  rounded-full font-semibold  my-2 text-white ${language==="ar"?'flex-row-reverse px-4':"px-1.5"}  ${getTailwindColor(content.tag.tagName["en"]).bg}`}>{content.tag.tagName[language]} </span>
          <p dir={language==="ar"&&"rtl"} className={`${styleSize[size].title} text-white font-extrabold  mt-2`}>{content.title[language]}</p>
          <p dir={language==="ar"&&"rtl"} className={`text-white/70`}>{content.date[language]}</p>
       </div>
       <div className={`w-[20%] hidden  lg:flex ${language!=="ar"&&"justify-end"} text-white`}>
        <span className="w-10 h-10 rounded-full bg-white/10 shadow-xl backdrop-blur-2xl text-center font-bold gh justify-center flex items-center hover:text-white hover:bg-white/30  "><FontAwesomeIcon icon={faPlus}/></span>
       </div>
      </div>
    </motion.div>
    <AnimatePresence>
    {isFull&& <FullNews content={content} catColor={getTailwindColor(content.tag.tagName["en"]).bg} onClose={()=>setIsFull(false)}/>}

    </AnimatePresence>
      </>

   );
}


  