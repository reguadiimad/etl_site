import { leftAnimation,rightAnimation } from "./animation";
import data from "./Datas/NavigationData.json";
import { useSelector } from "react-redux";
import{AnimatePresence, motion} from "framer-motion";

const NavigationCyc = ({ selected = 0, onClick }) => {
  const { language } = useSelector((state) => state.presntion);

  return (
    <AnimatePresence>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-[90%]  mx-auto py-10 mt-10 md:mt-20 bg-blue-500 rounded-[40px] md:rounded-[60px] flex flex-col md:flex-row items-center justify-center border border-white px-5 md:px-10">
      <div className={`w-full md:w-[96%] flex flex-col md:flex-row items-center ${language === "ar" ? "md:flex-row-reverse" : ""}`}>
        <div className={`flex-1 text-center md:text-left ${language === "ar" ? "md:text-right" : ""}`}>
          <motion.p {...leftAnimation()} className="text-white/70 text-lg md:text-xl">{data.explore_details[language]}</motion.p>
          <motion.h1 {...leftAnimation(0.12)} className="text-white text-4xl md:text-6xl lg:text-8xl font-bold mt-2 md:mt-4">{data.our_cycles[language]}</motion.h1>
        </div>
        <div className={`flex-1 flex flex-wrap flex-col lg:flex-row  justify-center md:justify-end gap-3 mt-6 md:mt-0 ${language === "ar" ? "md:justify-start" : ""}`}>
          {data.button_labels[language].map((label, index) => (
            <motion.button {...rightAnimation(index*0.14)}
              key={index}
              onClick={() => onClick(index)}
              className={`px-4 md:px-6 py-2 md:py-3 text-lg md:text-2xl border border-white/0 font-bold rounded-3xl lp transition-all duration-300 ease-in-out ${
                index === selected
                  ? "bg-white/95 shadow-2xl border-white/90 text-blue-500"
                  : "text-white/95 hover:animate-pulse "
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};

export default NavigationCyc;
