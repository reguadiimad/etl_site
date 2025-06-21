import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { faClock, faClose, faCross, faEnvelope, faLink, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";


export default function FullNews({ onClose, content,catColor }) {
  const language = useSelector((state) => state.presntion.language);




  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const translations = {
    en: [
        "{minutes} min of read",   // Singular
        "{minutes} mins of read",   // Plural
        
    ],
    fr: [
        "{minutes} min de lecture", // Singular
        "{minutes} mins de lecture" // Plural
    ],
    ar: [
        "دقيقة واحدة من القراءة",    // Singular (1 minute)
        "دقيقتان من القراءة",         // Dual (2 minutes)
        "{minutes} دقائق من القراءة" // Plural (3+ minutes)
    ]
};



function estimateReadingTime(text, wordsPerMinute = 200, language) {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    let phrase;

    if (language === 'ar') {
        if (minutes === 1) {
            phrase = translations.ar[0]; // "دقيقة واحدة من القراءة"
        } else if (minutes === 2) {
            phrase = translations.ar[1]; // "دقيقتان من القراءة"
        } else {
            phrase = translations.ar[2]; // "دقائق {minutes} من القراءة"
        }
    } else {
        // For English and French, use singular or plural form based on the minute count
        const isPlural = minutes > 1;
        phrase = isPlural
            ? translations[language][1]  // Plural
            : translations[language][0]; // Singular
    }

    return phrase.replace("{minutes}", minutes);
}


  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} transition={{ease:"circInOut"}} className="w-screen h-screen bg-white/25 backdrop-blur-xl blurey fixed top-0 left-0 flex flex-col justify-end items-center z-50">
      
        <motion.div onClick={(e) => e.stopPropagation()} initial={{y:'90%',scale:0.5}}  animate={{y:0,scale:1}} exit={{y:'100%'}} transition={{type:"spring",bounce:0.14}} className="w-[95%] 2xl:w-[50%] sss h-[89%] lg:h-[94%] bg-white/95 rounded-t-3xl relative overflow-y-scroll p-[20px] pb-0 z-50">  
            <div onClick={()=>onClose()}  className="top-1  sticky ml-[92%] bg-[#EDEDF0] text-[#6E6E73] w-8 h-8 flex items-center justify-center   z-50 backdrop-blur-3xl rounded-full  cursor-pointer ease-in-out duration-500   hover:scale-105 hover:text-black/70  focus:scale-90">
                <FontAwesomeIcon icon={faClose}/>
            </div> 
  

            <div className="w-full flex flex-col items-center">
            <span className={`  rounded-full font-semibold mt-12 mb-4 text-white ${language==="ar"?'flex-row-reverse px-4':"px-1.5"}  ${catColor}`}>{content.tag[language]} </span>

            <div className="w-[90%] lg:w-[50%]  flex items-center justify-center text-[#6E6E73] gap-4 text-xs  lg:text-base">
                <div className=" flex items-center justify-end gap-2">
                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    <p dir={language==="ar"&&"rtl"}  >{estimateReadingTime(content.article[language], 200, language)}</p>
                </div>
                <div className="w-1 h-1 rounded-full bg-neutral-400"></div>
                <div className="">
                <p dir={language==="ar"&&"rtl"} className={``}>{content.news_date}</p>
                </div>
            </div>
            <p dir={language==="ar"&&"rtl"} className={` text-[#1D1D20]  text-xl sm:text-4xl text-center w-[90%] lg:w-[80%]  font-extrabold  mt-4`}>{content.title[language]}</p>
            <p dir={language==="ar"&&"rtl"} className={` text-neutral-800 text-xs sm:text-lg text-center w-[95%] lg:w-[90%]  font-semibold  mt-4`}>{content.description[language]}</p>

            <div className="flex  items-center justify-center gap-2 text-[#6E6E73] my-4 lg:my-10">
            <FontAwesomeIcon icon={faLink}/>
            <FontAwesomeIcon icon={faEnvelope}/>
            <FontAwesomeIcon icon={faXTwitter}/>
            <FontAwesomeIcon icon={faFacebook}/>

            </div>
            <img src={process.env.PUBLIC_URL+content.imgSrc} className="w-[95%] lg:w-[90%] h-[240px] sm:h-[450px] object-cover rounded-[10px]"/>


            <p className={`w-[90%] ${language==="ar"?"text-right leading-9":"text-justify"}  text-neutral-600 mt-10 mb-10`}>
            {content.article[language]}
            </p>

            <div  className="flex w-full items-center justify-center gap-2 mb-10">
                <div onClick={()=>{onClose()}} className="rounded-full px-2 underline text-neutral-400 cursor-pointer">
                {language==="ar"?"إغلاق":(language==="fr"?"Fermer":"Close")}
                </div>
            </div>
            </div>
        </motion.div>
        
    </motion.div>
  );
}
