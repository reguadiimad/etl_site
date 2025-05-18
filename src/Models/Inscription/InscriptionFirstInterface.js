import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { motion, spring } from "framer-motion";
import Etel from "./Etel";

const texts = {
    fr: {
      school: "Écoles La Tour Eiffel",
      slogan1: "Planifiez leur demain,",
      slogan2: "dès",
      slogan3: "maintenant.",
      button: "Inscrivez-vous maintenant"
    },
    en: {
      school: "La Tour Eiffel Schools",
      slogan1: "Plan their tomorrow,",
      slogan2: "starting ",
      slogan3: "today.",
      button: "Register now"
    },
    ar: {
      school: "مدارس برج إيفل",
      slogan1: "خطط للغدهم،",
      slogan2: "ابتداءً من .",
      slogan2: "اليوم.",
      button: "سجل الآن"
    }
  };
  

export default function InscriptionFirstInterface() {
  const language = useSelector((state) => state.presntion.language);
  const schoolYear = (d => `${d.getMonth()<3?d.getFullYear()-1:d.getFullYear()}-${(d.getMonth()<3?d.getFullYear():d.getFullYear()+1)}`)(new Date());
  const t = texts[language] || texts.fr; // fallback to French

  return (
    <>
     <div className="w-full
      flex flex-col items-center justify-center">
     <Etel />
      <div dir={language === "ar" ? "rtl" : "ltr"} className={`w-full 2xl:py-10 py-5 flex justify-center items-center text-center`}>
        <div className={`w-[95%] lg:w-[90%] flex justify-center items-center flex-col`}>
            <motion.p initial={{opacity:0,scale:0.7,y:-80}} whileInView={{opacity:1,scale:1,y:0}} transition={{type:"spring",delay:0.2}} className={`text-apple-dark font-semibold text-base lg:text-xl mb-4`}>
            {t.school} {schoolYear}
            </motion.p>
            <motion.h1 initial={{opacity:0,scale:0.7,y:-75}} whileInView={{opacity:1,scale:1,y:0}} transition={{type:"spring",delay:0.25}} className={`2xl:w-[80%] text-apple-title  ${language==="ar"?"text-4xl sm:text-6xl md:text-7xl font-semibold lg:text-8xl 2xl:text-9xl":"text-3xl sm:text-5xl md:text-6xl font-bold lg:text-7xl 2xl:text-8xl"}`}>
            {t.slogan1}
            </motion.h1>
            <div className=" flex gap-4">
            <motion.h1 initial={{opacity:0,scale:0.7,y:-70}} whileInView={{opacity:1,scale:1,y:0}} transition={{type:"spring",delay:0.3}} className={` text-apple-title font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl ${language==="ar"&&"text-5xl sm:text-6xl md:text-7xl font-semibold lg:text-8xl 2xl:text-9xl"}`}>
            {t.slogan2}
            </motion.h1>
            <motion.h1 initial={{opacity:0,scale:0.7,y:-65}} whileInView={{opacity:1,scale:1,y:0}} transition={{type:"spring",delay:0.35}} className={`relative flex items-center justify-center text-apple-title font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl ${language==="ar"&&"text-5xl sm:text-6xl md:text-7xl font-semibold lg:text-8xl 2xl:text-9xl"}`}>
            {t.slogan3}
            </motion.h1>
            </div>
            <motion.button initial={{opacity:0}} whileInView={{opacity:1}} transition={{type:"spring",delay:0.3}} className={`bg-blue-500 px-6 py-3 rounded-full mt-10 text-white font-semibold hover:bg-blue-500/80 ease-in-out duration-300`}>
            {t.button}
            </motion.button>
        </div>
    </div>
     </div>

    </>
  );
}