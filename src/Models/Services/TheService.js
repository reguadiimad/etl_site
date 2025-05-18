import { faBell, faBookOpen,faComments, faLock, faShieldAlt, faTachometerAlt, faBus, faUsers, faAppleAlt,faUtensils, faLeaf, faBroom, faFutbol, faTheaterMasks, faPalette, faRobot, faUserNurse, faBriefcaseMedical,faSyringe ,faAmbulance,faBabyCarriage,faChalkboardTeacher,faCalculator,faUserTie,faBook,faSuperscript } from "@fortawesome/free-solid-svg-icons";
import {spring,motion,AnimatePresence} from 'framer-motion';
import { useSelector } from "react-redux";
import { useRef,useEffect } from "react";


    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TheService = ({selectedCyc,srvData,lang,isOther,textt}) => {
  const { language } = useSelector((state) => state.presntion);
  const prevSelectedCyc = useRef(selectedCyc);

  // Determine direction (right for increase, left for decrease)
  const direction = prevSelectedCyc.current < selectedCyc ? 1 : -1;

  // Update previous value
  useEffect(() => {
    prevSelectedCyc.current = selectedCyc;
  }, [selectedCyc]);



    const iconMap = {
        faBell: faBell,
        faBookOpen: faBookOpen,
        faLock: faLock,
        faComments: faComments,
        faShieldAlt: faShieldAlt,
        faTachometerAlt: faTachometerAlt,
        faBus: faBus,
        faUsers: faUsers,
        faAppleAlt: faAppleAlt,
        faUtensils: faUtensils,
        faLeaf: faLeaf,
        faBroom: faBroom,
        faFutbol: faFutbol,
        faTheaterMasks: faTheaterMasks,
        faPalette: faPalette,
        faRobot: faRobot,
        faUserNurse:faUserNurse,
        faBriefcaseMedical:faBriefcaseMedical,
        faSyringe:faSyringe,
        faAmbulance:faAmbulance,
        faBabyCarriage: faBabyCarriage,
        faChalkboardTeacher: faChalkboardTeacher,
        faCalculator: faCalculator,
        faUserTie: faUserTie,
        faBook:faBook,
        faSuperscript: faSuperscript
       

      };
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      };
      
      // Item variants with spring animations for entry and a quick exit
      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
      };
  
      if (isOther) {
        return (
          <AnimatePresence>
            <motion.div
              className="w-full   flex flex-col items-center justify-center mt-10 text-neutral-500 px-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Header Section */}
              <motion.div
                className="w-full pt-32 flex flex-col items-center justify-center"
                variants={itemVariants}
              >
                <motion.p
                  className={`font-bold text-xl md:text-2xl mb-6 ${lang === "ar" ? "text-2xl" : ""}`}
                  variants={itemVariants}
                >
                  {srvData.other_services[lang]}
                </motion.p>
                <motion.h1
                  className={`text-4xl md:text-7xl lg:text-5xl xl:text-8xl w-full  text-center text-blue-500 mb-2 ${lang === "ar" ? "text-6xl md:text-8xl" : ""}`}
                  variants={itemVariants}
                >
                  <b>{srvData.heading[lang]}</b>
                </motion.h1>
              </motion.div>
      
              {/* Services Grid */}
              <motion.div
                className="w-full flex items-center justify-center mt-16 text-neutral-500"
                variants={itemVariants}
              >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                  variants={containerVariants}
                >
                  {srvData.services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="w-full border-4 border-dashed border-neutral-200 rounded-[40px] p-4 flex flex-col items-center justify-center transition-transform duration-200"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div className="flex w-full items-center gap-4" variants={itemVariants}>
                        <motion.div
                          className={`w-20 h-20 rounded-[25px] flex items-center justify-center text-white text-4xl font-bold ${
                            index % 2 === 0 ? "bg-blue-500 md:text-blue-500 md:bg-transparent xl:bg-blue-500 xl:text-white" : "bg-red-500 md:text-red-500 md:bg-transparent xl:bg-red-500 xl:text-white"
                          }`}
                          variants={itemVariants}
                        >
                          <FontAwesomeIcon icon={iconMap[service.icon]} />
                        </motion.div>
      
                        <motion.div variants={itemVariants}>
                          <motion.p
                            className={`text-sm md:text-base lg:text-xs xl:${lang === "ar" ? "text-base" : ""}`}
                            variants={itemVariants}
                          >
                            {service.subtitle[lang]}
                          </motion.p>
                          <motion.h1
                            className={`font-bold text-2xl md:text-3xl lg:text-2xl xl:${lang === "ar" ? "text-3xl md:text-4xl" : ""}`}
                            variants={itemVariants}
                          >
                            {service.title[lang] || "Title not found"}
                          </motion.h1>
                        </motion.div>
                      </motion.div>
                      <motion.p
                        className={`pt-3 text-sm md:text-sm ${lang === "ar" ? "text-base" : ""}`}
                        variants={itemVariants}
                      >
                        {service.article[lang]}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
      
              {/* Summary */}
              <motion.p
                className={`w-full max-w-4xl mt-14 text-center text-sm md:text-base ${lang === "ar" ? "text-base" : ""}`}
                variants={itemVariants}
              >
                {srvData.summary[lang]}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        );
      }
      
  const shrtsImages=[{"ar":"srvAppArb.webp","fr":"srvAppFrc.webp","en":"srvAppEng.webp"},{"ar":"srvTrnsArb.webp","fr":"srvTrnsFrc.webp","en":"srvTrnsEng.webp"},"srvCantine.webp",{"fr":"srvClubs.webp","en":"srvClubsEng.webp","ar":"srvClubsArb.webp"},"srvInfermerie.webp",];
  
    
    return(
        <>
        <AnimatePresence>
            <p className={` lg:hidden flex text-justify mt-5`}>
                  {textt}
                </p>
            <div key={selectedCyc}  className="w-full lg:flex items-center justify-center flex-col lg:mt-10 text-neutral-500 hidden ">
                <div className="w-full lg:pt-32 2xl:mt-10 flex flex-col items-center justify-center">
                    <motion.p initial={{opacity:0,y:-24}} whileInView={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:0.9}}  transition={{type: "ease",visualDuration: 0.14}} className={`font-bold text-xl origin-bottom mb-6 ${lang === 'ar' && 'text-2xl'}`}>{srvData.title[lang]}</motion.p>
                    <motion.h1 initial={{opacity:0,y:-10}} whileInView={{opacity:1,y:0}} exit={{opacity:0,y:-1}} transition={{type: "ease",visualDuration: 0.14}} className={`2xl:text-7xl lg:text-5xl xl:text-6xl   origin-bottom w-[80%] text-center text-blue-500 lg:mb-20 2xl:mb-4 ${lang === 'ar' && 'text-8xl'}`}><b> {srvData.subtitle[lang]}</b></motion.h1>
                </div>

                <div className="w-full flex items-center justify-center 2xl:mt-10">
                    <div className="h-full flex flex-col gap-16 w-[25%] pr-6">
                        <div className="w-full h-[280px] flex-col items-end justify-center flex text-right">
                            <motion.div initial={{x:-10,opacity:0}}  whileInView={{rotate:0, x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="xl:w-20 xl:h-20 w-16 h-16 text-3xl xl:text-4xl rounded-3xl text-center flex items-center justify-center bg-blue-500 text-white  font-bold">
                                <FontAwesomeIcon icon={iconMap[srvData.features[0].icon]}/>
                            </motion.div>
                            <motion.p initial={{x:-15,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: 3, opacity: 0 }} transition={{ duration: 0.2 }} className={`text-blue-500 font-bold mt-2 text-2xl ${lang === 'ar' && 'text-3xl'}`}>{srvData.features[0].title[lang]}</motion.p>
                            <motion.p initial={{x:-12,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: 21, opacity: 0 }} transition={{ duration: 0.2 }} className={`w-[90%] text-xs xl:text-sm ${lang === 'ar' && 'text-base'}`}>{srvData.features[0].description[lang]}</motion.p>
                        </div>

                        <div className="w-full  h-[280px] flex-col items-end justify-center flex text-right">
                            <motion.div initial={{x:-10,opacity:0}}  whileInView={{rotate:0, x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="xl:w-20 xl:h-20 w-16 h-16 text-3xl xl:text-4xl rounded-3xl text-center flex items-center justify-center bg-blue-500 text-white  font-bold">
                                <FontAwesomeIcon icon={iconMap[srvData.features[1].icon]}/>
                            </motion.div>
                            <motion.p initial={{x:-15,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: 3, opacity: 0 }} transition={{ duration: 0.2,delay:0.2 }} className={`text-blue-500 font-bold mt-2 text-2xl ${lang === 'ar' && 'text-3xl'}`}>{srvData.features[1].title[lang]}</motion.p>
                            <motion.p initial={{x:-12,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: 21, opacity: 0 }} transition={{ duration: 0.2,delay:0.2 }} className={`w-[90%] text-xs xl:text-sm ${lang === 'ar' && 'text-base'}`}>{srvData.features[1].description[lang]}</motion.p>
                        </div>
                    </div>

                    <div className="h-full w-[60%] flex items-center justify-center">
                        <motion.img  initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}  className="w-full"
                        src={process.env.PUBLIC_URL + '/images/' + 
                          ([0, 1,3].includes(selectedCyc) ? shrtsImages[selectedCyc][language] : shrtsImages[selectedCyc])
                      } 
                        />
                    </div>

                    <div className="h-full flex flex-col gap-16 w-[25%] pl-6">
                        <div className="w-full  h-[280px] flex-col justify-center items-start flex">
                        <motion.div initial={{x:-10,opacity:0}}  whileInView={{rotate:0, x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="xl:w-20 xl:h-20 w-16 h-16 text-3xl xl:text-4xl rounded-3xl text-center flex items-center justify-center bg-blue-500 text-white  font-bold">
                                <FontAwesomeIcon icon={iconMap[srvData.features[2].icon]}/>
                            </motion.div>
                            <motion.p initial={{x:15,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: -3, opacity: 0 }} transition={{ duration: 0.2,delay:0.1 }} className={`text-blue-500 font-bold mt-2 text-2xl ${lang === 'ar' && 'text-3xl'}`}>{srvData.features[2].title[lang]}</motion.p>
                            <motion.p initial={{x:12,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: -21, opacity: 0 }} transition={{ duration: 0.2,delay:0.1 }}  className={`w-[90%] text-xs xl:text-sm ${lang === 'ar' && 'text-base'}`}>{srvData.features[2].description[lang]}</motion.p>
                        </div>

                        <div className="w-full  h-[280px] flex-col justify-center  items-start flex">
                        <motion.div initial={{x:-10,opacity:0}}  whileInView={{rotate:0, x: 0, opacity: 1 }} exit={{ x: 10, opacity: 0 }} transition={{ duration: 0.2,delay:0.1 }}  className="xl:w-20 xl:h-20 w-16 h-16 text-3xl xl:text-4xl rounded-3xl text-center flex items-center justify-center bg-blue-500 text-white  font-bold">
                                <FontAwesomeIcon icon={iconMap[srvData.features[3].icon]}/>
                            </motion.div>
                            <motion.p initial={{x:15,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: -3, opacity: 0 }} transition={{ duration: 0.2,delay:0.4 }} className={`text-blue-500 font-bold mt-2 text-2xl ${lang === 'ar' && 'text-3xl'}`}>{srvData.features[3].title[lang]}</motion.p>
                            <motion.p initial={{x:12,opacity:0}}  whileInView={{ x: 0, opacity: 1 }} exit={{ x: -21, opacity: 0 }} transition={{ duration: 0.2,delay:0.4 }}  className={`w-[90%] text-xs xl:text-sm ${lang === 'ar' && 'text-base'}`}>{srvData.features[3].description[lang]}</motion.p>
                        </div>
                    </div>
                </div>

                <p className={`w-[80%] text-center mt-10 text-sm ${lang === 'ar' && 'text-base'}`}>{srvData.footer[lang]}</p>
            </div>


            <div key={'mb-' + selectedCyc} className="w-full flex flex-col  items-center lg:hidden mt-20 text-center">

      <motion.p 
        initial={{ x: 100 * direction, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {srvData.title[lang]}
      </motion.p>

      <motion.h1 
        className="text-blue-500 text-4xl"
        initial={{ x: 100 * direction, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <b>{srvData.subtitle[lang]}</b>
      </motion.h1>

      <motion.img
        key={'img-' + selectedCyc}
        className="w-full mb-8 sm:w-auto sm:h-96 md:h-[500px]"
        src={
          process.env.PUBLIC_URL +
          '/images/' +
          ([0, 1, 3].includes(selectedCyc)
            ? shrtsImages[selectedCyc][language]
            : shrtsImages[selectedCyc])
        }
        initial={{ x: 100 * direction, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      />

      {srvData.features.map((feature, index) => (
        <>
        <motion.div
          key={index}
          className={`w-full flex items-center justify-center gap-4 ${
            lang === 'ar' ? 'flex-row-reverse text-right' : 'text-left'
          }`}
          initial={{ x: 100 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div
            className={`w-20 h-20 rounded-3xl text-center flex items-center justify-center ${
              index % 2 === 0 ? 'text-blue-500' : 'text-red-500'
            } text-4xl font-bold`}
          >
            <FontAwesomeIcon icon={iconMap[feature.icon]} />
          </div>

          <div className="w-[77%] md:w-full">
            <p className={`${index % 2 === 0 ? 'text-blue-500' : 'text-red-500'} font-bold mt-2 text-xl`}>
              {feature.title[lang]}
            </p>
            <p>{feature.description[lang]}</p>
          </div>

        </motion.div>
        {index !== srvData.features.length - 1 && <hr className="w-[90%] h-[1px] bg-black/10 my-4" />}

        </>
      ))}
    </div>
        </AnimatePresence>
        </>
    )

}

export default TheService;