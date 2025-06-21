import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faMobileAlt,
  faUtensils,
  faTheaterMasks,
  faStethoscope,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useSelector } from "react-redux";
import content from "./ServicesDatas/shortsServicesData.json"; // adjust the path as needed

import { useEffect, useRef } from 'react';





const SerrvicesShorts = ({ selectedService, onSelect, theY }) => {
  const { language } = useSelector((state) => state.presntion);
  const previousService = useRef(selectedService);
  const leftAnimation = (d = 0,x=-40) => ({
    initial: { x: x, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { type: "spring", delay: d }
  }), rightAnimation = (d = 0) => ({
    initial: { x: 50, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { type: "spring", delay: d }
  }),topAnimation = (d = 0) => ({
    initial: { y: -50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: "spring",delay: d }
  }),bottomAnimation = (d = 0) => ({
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { type: "spring",delay: d }
  }), scaleAnimation = (d = 0) => ({
    initial: { scale: 0.5, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { type: "spring",delay: d }
  });


    useEffect(() => {
        previousService.current = selectedService;
    }, [selectedService]);

    const direction = selectedService > previousService.current ? 1 : -1;

    const variants = {
        initial: { opacity: 0, x: 100 * direction },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: -100 * direction, transition: { duration: 0.5 } },
    };
  
  
  // Select the texts for the current language (defaults to French if not found)
  const texts = content[language] || content["fr"];

  // You may still need the icons separately, so merge them with the translated texts:
  const icons = [faMobileAlt, faBus, faUtensils, faTheaterMasks, faStethoscope, faEllipsis];
  const services = texts.services.map((srv, index) => ({
    ...srv,
    icon: icons[index]
  }));
  const shrtsImages=[{"ar":"shrtAppArb.webp","fr":"shrtAppFrc.webp","en":"shrtAppEng.webp"},{"ar":"shrtTrsnArb.webp","fr":"shrtTrnsFrc.webp","en":"shrtTrnsEng.webp"},"srv_cnt.webp","srv_club.webp","srv_inf.webp",{"fr":"srv_autr.webp","ar":"srvAutreArb.webp","en":"srvAutreEng.webp"}];

  // Define dynamic text size classes:
  // For each Tailwind size used, we define the next “step up” when language is Arabic.
  // For example, text-sm becomes text-base; text-base becomes text-lg; etc.
  const textSm = language === "ar" ? "text-base" : "text-sm";
  const textBase = language === "ar" ? "text-lg" : "text-base";
  const textXl = language === "ar" ? "text-2xl" : "text-xl";
  const text4xl = language === "ar" ? "text-5xl" : "text-4xl";
  const text6xl = language === "ar" ? "text-7xl" : "text-6xl";
  const text8xl = language === "ar" ? "text-9xl" : "text-8xl";

  return (
    <div className="w-[90%]  text-neutral-500 lg:mt-36 flex flex-col items-center justify-center relative z-10">
      <img
        className="absolute lg:top-10 top-32 lg:-left-[6%] lg:w-[80%] w-full scale-150 -z-10"
        src={process.env.PUBLIC_URL + "/images/blur.webp"}
        alt="blur"
      />
      {/* Apply the dynamic text size */}
      <motion.p {...topAnimation()} className={`text-xs lg:${textSm} text-center lg:text-right`}>{texts.heading.subtitle}</motion.p>
      <motion.h1 {...topAnimation()} className={`text-blue-500 text-4xl lg:text-6xl xl:${text8xl}  text-center`}>
        <b>{texts.heading.mainTitle}</b>
      </motion.h1>

      <div className="hidden w-full lg:flex  2xl:py-20 ">
        <div className="xl:w-[55%] lg:w-[60%] lg:h-[550px] 2xl:h-[650px] flex items-center justify-center p-4 z-10">
          <div className="w-[32%] bg-white/40 blurey backdrop-blur-3xl h-[80%] border-2 border-white/80 border-r-0 rounded-[50px] rounded-r-none text-neutral-900/60 flex flex-col py-10">
            {services.map((service, index) => (
              <motion.div
                onClick={() => onSelect(index)}
                key={index}
                layout
                transition={{ type: "ease", duration: 0.14 }}
                className={`cursor-pointer flex w-full items-center h-[20%] gap-x-2  ${
                  selectedService === index
                    ? `shadow-2xl  blurey bg-white/90 w-[130%] -ml-[10%] backdrop-blur-lg lg:text-lg 2xl:${textXl} gap-x-4  rounded-3xl text-blue-500 p-10`
                    : "mx-10"
                }`}
              >
                <FontAwesomeIcon icon={service.icon} /> <p><b>{service.title}</b></p>
              </motion.div>
            ))}
          </div>
          <div
            key={selectedService}
            className="w-[68%] bg-white/40 blurey flex items-center flex-col text-center shadow-sm border-white border-2 pt-8 backdrop-blur-3xl h-full z-0 rounded-[50px] relative overflow-hidden"
          >
            <AnimatePresence>
              <motion.img
                initial={{ opacity: 0, y: theY * 30, scaleX: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: theY * 30 }}
                transition={{ type: "spring" }}
                className={`w-full  absolute ${
                  selectedService === 0 ? "-bottom-[5%] -right-[20%]" : "bottom-0 left-0"
                }  `}
                src={process.env.PUBLIC_URL + '/images/' + 
                    ([0, 1, 5].includes(selectedService) ? shrtsImages[selectedService][language] : shrtsImages[selectedService])
                }
                

                alt={services[selectedService].title0}
              />
              <motion.div
                initial={{ opacity: 0, y: theY * 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: theY * 20 }}
                transition={{ type: "spring", delay: 0.1 }}
                className={`text-red-500 xl:${textBase} font-bold`}
              >
                {services[selectedService].description}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scaleX: 0.4, y: theY * 30 }}
                whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
                exit={{ opacity: 0, scaleX: 0.4, y: theY * 30 }}
                transition={{ type: "spring", delay: 0.1 }}
                key={services[selectedService].title0}
                className={`text-white lg:text-2xl xl:${text4xl} w-[80%]`}
              >
                <b>{services[selectedService].title0}</b>
              </motion.h1>

              <div
                className={`w-full absolute bottom-0 flex p-[25px] ${
                  selectedService === 0 ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`px-4 ${textXl} font-bold ease-in-out duration-150 z-0 ${
                    selectedService !== 0 ? "bg-black/25" : "bg-transparent"
                  } blur-xl rounded-[25px] absolute`}
                >
                  {texts.buttons.voir}
                </div>
                <button
                  className={`p-2 px-4 ${textXl} font-bold ease-in-out duration-150 rounded-[25px] z-10 ${
                    selectedService === 0 ? "text-neutral-900" : "text-white/90"
                  }`}
                >
                  {texts.buttons.voir}
                </button>
              </div>
            </AnimatePresence>
          </div>
        </div>
        <div className={`xl:w-[45%] lg:w-[40%] p-4 pt-10 ${language==="ar"&&"text-right flex flex-col items-end"}`}>
          <motion.p {...leftAnimation()} className={`xl:${textBase} mb-2`}>{texts.rightSection.intro}</motion.p>
          <motion.h1 {...leftAnimation(0,-50)}  className={`text-blue-500 lg:text-3xl xl:${text6xl}  mb-4`}>
            <b>{texts.rightSection.heading}</b>
          </motion.h1>
          <motion.p {...leftAnimation(0,-55)}  className={`xl:${textBase}`}>{texts.rightSection.paragraph}</motion.p>
          {texts.rightSection.points.map((point, index) => (
  <motion.div                                                   
    key={index} {...leftAnimation(0.09*index)} 
    className={`mt-${index === 0 ? '8' : '2'} flex items-center ${
      language === 'ar' ? 'flex-row-reverse' : ''
    }`}
  >
    <div
      className={`w-2 h-2 ${
        index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'
      } rounded-full ${language==="ar"?" ml-4": " mr-4"
      }`}
    ></div>
    <p className={`xl:${textBase}`}>{point}</p>
  </motion.div>
))}


          <div className="w-full flex flex-row-reverse mt-2">
            <button className="bg-red-500 text-white rounded-3xl shadow-md p-3 mt-4">
              <b>{texts.rightSection.button}</b>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:hidden flex flex-col items-center justify-center">
        <div className={`w-full flex justify-between text-white ${language==="ar"&&"flex-row-reverse"} bg-black/5 items-center text-xl sm:text-2xl shadow-lg px-6 my-2 gap-2  border border-white/50 rounded-3xl py-4 blurey backdrop-blur-xl`}>
        {services.map((service, index) => (
         <div className={`flex items-center justify-center relative ease-in-out duration-300 `} key={index} onClick={()=>onSelect(index)}>
           <FontAwesomeIcon className={`${selectedService===index&&'text-blue-500 '}`}  icon={service.icon}/>
            <AnimatePresence>
            {selectedService === index && (
              <motion.span
                initial={{ opacity: 0, scale: 0,y:10 }}
                animate={{ opacity: 1, scale: 1,y:0 }}
                exit={{ opacity: 0, scale: 0,y:20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -bottom-2 bg-blue w-1 h-1 rounded-full bg-blue-500"
              ></motion.span>
            )}
            </AnimatePresence>
         </div>
        ))}
        </div>

        <div className={`w-full relative flex flex-col text-center mt-4 items-center border overflow-hidden  border-white/50 bg-black/5 pt-4 rounded-3xl shadow-lg backdrop-blur-xl blurey `}>
        <motion.p 
                key={`p-${selectedService}`} 
                variants={variants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                duration={{delay:0.1}}

                className="text-white/60 font-semibold"
            >
                {services[selectedService].title0}
            </motion.p>
            <motion.h1 
                key={`h1-${selectedService}`} 
                variants={variants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                duration={{delay:0.3}}
                className="text-white text-xl sm:text-2xl md:text-3xl w-[90%]"
            >
                <b>{services[selectedService].description}</b>
            </motion.h1>
            <motion.img
                key={`img-${selectedService}`} 
                variants={variants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                duration={{delay:0.5}}

                className={`sm:w-auto sm:h-[420px] md:h-[500px] ${selectedService===0&&"sm:-mr-80"}  mt-4`}
                src={process.env.PUBLIC_URL + '/images/' + 
                    ([0, 1, 5].includes(selectedService) ? shrtsImages[selectedService][language] : shrtsImages[selectedService])
                }
            />
          <button className="absolute bottom-2 right-3 text-lg text-neutral-900 font-semibold">
        {texts.buttons.voir}
        </button>
        </div>

        <div className="w-full  mt-8 text-center flex flex-col items-center">
        <p className={`mb-2`}>{texts.rightSection.intro}</p>
        <h1 className={`text-blue-500 text-3xl md:text-4xl  mb-4`}>
            <b>{texts.rightSection.heading}</b>
          </h1>
          <p className={``}>{texts.rightSection.paragraph}</p>
          {texts.rightSection.points.map((point, index) => (
  <div
    key={index}
    className={`mt-${index === 0 ? '8' : '2'} flex w-full items-center text-left  ${
      language === 'ar' ? 'flex-row-reverse' : ''
    }`}
  >
    <div
      className={`w-2 h-2 ${
        index % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'
      } rounded-full ${language==="ar"?" ml-4": " mr-4"
      }`}
    ></div>
    <p className={`${language==='ar'&&'text-right'}`}>{point}</p>
  </div>
))}

        </div>

       

      </div>
    </div>
  );
};

export default SerrvicesShorts;
