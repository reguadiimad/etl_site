import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TheService from "./TheService";
import appMobileData from "./ServicesDatas/appMobileData.json";
import transportData from "./ServicesDatas/transportdata.json";
import CantineData from "./ServicesDatas/CantineData.json";
import clubesDatas from "./ServicesDatas/clubsDatas.json";
import infermriDatas from "./ServicesDatas/infermrieData.json";
import autreServicesData from "./ServicesDatas/AutreServcesData.json";
import translations from "./ServicesDatas/servicesDetialsData.json"; // translations

const ServicesDetails = memo(({ selectedCyc, onSelect, handelBtm }) => {
  const { language } = useSelector((state) => state.presntion);
  const servsData = [
    appMobileData,
    transportData,
    CantineData,
    clubesDatas,
    infermriDatas,
    autreServicesData,
  ];
  const services = {
    en: ["Mobile App", "Transport", "Canteen", "Clubs", "Infirmary", "Other"],
    fr: ["App Mobile", "Transport", "Cantine", "Clubs", "Infirmerie", "Autre"],
    ar: ["تطبيق الهاتف", "النقل", "المقصف", "الأندية", "العيادة", "أخرى"],
  };

  // Example of image paths (adjust as needed)
  const appImages = Array.from({ length: 5 }, (_, i) => `/images/app/app${i + language}.webp`);
  const trnsImages = Array.from({ length: 5 }, (_, i) => `/images/trans/trns${i + language}.webp`);
  const cntImages = Array.from({ length: 5 }, (_, i) => `/images/cant/cnt${i + language}.webp`);
  const clubImages = Array.from({ length: 5 }, (_, i) => `/images/club/clb${i + language}.webp`);
  const infrImages = Array.from({ length: 5 }, (_, i) => `/images/infr/inf${i + language}.webp`);
  const moreImages = Array.from({ length: 5 }, (_, i) => `/images/more/more${i + language}.webp`);
  const sellImages = [appImages, trnsImages, cntImages, clubImages, infrImages, moreImages];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(1);

  const getTextSize = (baseSize, increasedSize) =>
    language === "ar" ? increasedSize : baseSize;

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleNext = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev + 1) % sellImages[selectedCyc].length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setSelectedIndex((prev) =>
      (prev - 1 + sellImages[selectedCyc].length) % sellImages[selectedCyc].length
    );
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowLeft") {
          handlePrev();
        } else if (event.key === "ArrowRight") {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="w-[90%] flex flex-col items-center text-neutral-500/50 lg:mt-20 relative  ">
      {/* Intro Text */}
      <p className={`${language === "ar" ? "text-lg" : "text-base"} w-[90%] hidden lg:flex text-center`}>
        {translations[language].intro}
      </p>

      <div className={`w-full flex justify-center mt-20 ${language === "ar" && "flex-row-reverse"}`}>
        <div className={`w-[50%] lg:w-[47%] xl:w-[50%] items-center flex ${language === "ar" && " justify-end"}`}>
          <h1 className={`lg:text-6xl xl:${getTextSize("text-7xl", "text-8xl")}   2xl:${getTextSize("text-8xl", "text-9xl")} text-2xl md:text-4xl mb-0 text-blue-500`}>
            <b>{translations[language].servicesTitle}</b>
          </h1>
        </div>
        <div className="lg:w-[53%] xl flex flex-col items-end justify-end">
          <p className={`2xl:${language === "ar" ? "lg:text-xl" : "lg:text-lg"} text-right lg:p-4  mb-3 lg:mb-0`}>
            {translations[language].servicesSubTitle}
          </p>

          <div className="w-full bg-neutral-100 rounded-[35px]  border border-white hidden p-[15px] lg:flex items-center justify-center relative overflow-hidden">
            <div className="w-[100%] flex items-center justify-between relative ">
              <motion.span
                layout
                transition={{ type: "spring", visualDuration: 0.14, bounce: 0.2 }}
                style={{
                  width: 100 / services[language].length + "%",
                  left: selectedCyc * (100 / services[language].length) + "%",
                }}
                className="absolute bg-blue-500 shadow-md h-full rounded-[20px]"
              />
              {services[language].map((text, index) => (
                <div
                  key={index}
                  style={{ width: 100 / services[language].length + "%" }}
                  className={`py-4 text-center z-10 cursor-pointer ${
                    selectedCyc === index
                      ? "text-white xl:text-lg font-semibold"
                      : "text-neutral-500 hover:animate-pulse"
                  }`}
                  onClick={() => onSelect(index)}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service content */}
      <TheService textt={translations[language].intro} selectedCyc={selectedCyc} srvData={servsData[selectedCyc]} lang={language} isOther={selectedCyc === 5} />

      {/* Gallery section */}
      <div className="w-full flex  lg:p-[20px]  pl-0  lg:mt-20 mt-8 overflow-x-scroll">
        <div>
          <div className="flex lg:gap-x-8 gap-x-3 pr-[20px]">
            {sellImages[selectedCyc].map((image, index) => (
              <motion.img
                key={index}
                initial={{ x: -index * 10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                src={process.env.PUBLIC_URL + image}
                className="xl:h-[650px] w-[240px] md:w-auto md:h-[450px] lg:w-auto border border-black/10 rounded-[40px] cursor-pointer hover:shadow-lg duration-100 ease-linear hover:border-black/25"
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                {...handlers}
                className="fixed top-0 left-0 w-full h-full p-5 md:p-0 bg-black/50 flex items-center justify-center flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              >
                <motion.div
                  initial={{ x: 70 }}
                  animate={{ x: 0 }}
                  exit={{ x: 100 }}
                  className="border border-white/40 bg-white/20 blurey backdrop-blur-2xl rounded-[50px] p-[25px] z-50"
                >
                  <motion.img
                    key={selectedIndex}
                    src={process.env.PUBLIC_URL + sellImages[selectedCyc][selectedIndex]}
                    className="rounded-[25px] 2xl:h-[700px] md:h-[700px] sm:h-44 border border-white/60"
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -direction * 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    alt={translations[language].selectedImageAlt}
                  />
                </motion.div>
                <button
                  className="absolute bottom-0 md:bottom-4 lg:bottom-auto left-10 text-white/70 text-3xl bg-white/5 w-20 h-20 p-3 rounded-[20px] border border-white/10 blurey backdrop-blur-2xl ease-in-out duration-200 hover:bg-white/10 hover:text-white shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                >
                  <FontAwesomeIcon className="hover:animate-pulse" icon={faChevronLeft} />
                </button>
                <button
                  className="absolute bottom-0 md:bottom-4 lg:bottom-auto right-10 text-white/70 text-3xl bg-white/5 w-20 h-20 p-3 rounded-[20px] border border-white/10 blurey backdrop-blur-2xl ease-in-out duration-200 hover:bg-white/10 hover:text-white shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="transform rotate-180" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

export default ServicesDetails;
