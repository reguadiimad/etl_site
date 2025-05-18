import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState, useEffect,useMemo,useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
export default function NewsSecondeInterface() {
  const language = useSelector((state) => state.presntion.language);
  const activitiesPart1 = [
    {
      fr: "Parlons Anglais",
      en: "Let's Speak English",
      ar: "لنتحدث الإنجليزية",
      font: language === "ar" ? "" : "",
      id: 3,
      imageIndex: 0
    },
    {
      fr: "Heure du Jeu",
      en: "Playtime",
      ar: "وقت اللعب",
      font: language === "ar" ? "arfa1" : "fa1",
      id: 2,
      imageIndex: 1
    },
    {
      fr: "Fête des Neiges",
      en: "Snow Party",
      ar: "حفلة ثلجية",
      font: language === "ar" ? "" : "",
      id: 1,
      imageIndex: 2
    },
    {
      fr: "Sourires Sains",
      en: "Healthy Smiles",
      ar: "ابتسامات صحية",
      font: language === "ar" ? "arfa3" : "fa3",
      id: 3,
      imageIndex: 3
    },
    {
      fr: "Aventure Plein Air",
      en: "Outdoor Adventure",
      ar: "مغامرات في الهواء الطلق",
      font: language === "ar" ? "arfa4" : "fa4",
      id: 2,
      imageIndex: 4
    },
    {
      fr: "Trésors Islamiques",
      en: "Islamic Treasures",
      ar: "كنوز إسلامية",
      font: language === "ar" ? "arfa1" : "fa5",
      id: 1,
      imageIndex: 5
    }
  ];
  
  const activitiesPart2 = [
    {
      fr: "Voyage Galactique",
      en: "Space Journey",
      ar: "رحلة فضائية",
      font: language === "ar" ? "arfa6" : "fa6",
      id: 1,
      imageIndex: 6
    },
    {
      fr: "Débat Passionné",
      en: "Passionate Debate",
      ar: "مناظرة حماسية",
      font: language === "ar" ? "arfa2" : "fa2",
      id: 2,
      imageIndex: 7
    },
    {
      fr: "Succès Sportifs",
      en: "Sports Achievements",
      ar: "إنجازات رياضية",
      font: language === "ar" ? "arfa4" : "fa4",
      id: 3,
      imageIndex: 8
    },
    {
      fr: "Chef en Herbe",
      en: "Young Chef",
      ar: "طاهٍ صغير",
      font: language === "ar" ? "arfa1" : "fa1",
      id: 1,
      imageIndex: 9
    },
    {
      fr: "Marche Verte",
      en: "Green March",
      ar: "المسيرة الخضراء",
      font: language === "ar" ? "arfa3" : "fa3",
      id: 2,
      imageIndex: 10
    },
    {
      fr: "Ère des Dinos",
      en: "Dino Era",
      ar: "عصر الديناصورات",
      font: language === "ar" ? "arfa2" : "fa2",
      id: 3,
      imageIndex: 11
    }
  ];
  
  const { title1, title2, paragraph } = content[language];
  const thresholds = Array.from({ length: 100 }, (_, i) => i / 99);
  const { ref, entry } = useInView({ threshold: thresholds });

  // vertical-only ratio: how much of the div's height is visible
  const ratioY = entry
    ? entry.intersectionRect.height / entry.boundingClientRect.height
    : 0;

  // ignore first 30% of height, then remap [0.3…1] → [0…1]
  const startTrigger = 0.3;
  const triggeredY = Math.min(
    Math.max((ratioY - startTrigger) / (1 - startTrigger), 0),
    1
  );

  // split that remapped 0→1 into 4 equal segments
  function getSegments() {
    const width = window.innerWidth;
    if (width < 640) return 2;         // small screens (phones)
    else if (width < 1024) return 4;   // medium screens (tablets)
    else return 5;                     // large screens (laptops and up)
  }
  const segments = getSegments();
  function getOpacity(idx) {
    const segmentSize = 1 / segments;         // 0.25
    const segStart = (idx - 1) * segmentSize; // 0, 0.25, 0.5, 0.75
    const local = (triggeredY - segStart) / segmentSize;
    return Math.min(Math.max(local, 0), 1);
  }
   return (
    <>
   

  
    <div className={`w-screen flex flex-col items-center justify-center relative py-20 lg:py-32 mt-20 bg-apple-light/50`}>
      <div className={`w-full flex flex-col items-center justify-center text-center text-neutral-900`}>
        <motion.h1 initial={{y:-40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0}} className={`font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl  2xl:text-7xl  ${language==="ar"&&"text-4xl sm:text-5xl md:text-6xl lg:text-7xl  2xl:text-8xl"}`}>{title1}</motion.h1>
        <motion.h1 initial={{y:-40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0.1}} className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl  2xl:text-8xl ${language==="ar"&&"text-5xl sm:text-6xl md:text-7xl lg:text-8xl  2xl:text-9xl"}`}>{title2}</motion.h1>
        <motion.p initial={{y:-90,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring"}} className={`mt-8 font-semibold w-[90%] leading-5 lg:leading-snug lg:w-[50%] text-neutral-700`}>
          {paragraph}
        </motion.p>
        <div  ref={ref} className={`w-full flex mt-10 items-stretch`}>
          <div className={`flex-1`}>
            <div className={`w-full h-full flex items-center`}>
              <div className={`w-full h-[68%] md:h-[64%]`}>
              <div  className={`w-[500%] lg:w-[300%]  2xl:w-[134%] h-full grid grid-cols-3   -translate-x-[80%]  lg:-translate-x-[67%] 2xl:-translate-x-[26%] gap-3`}>
                {[3, 2, 1].map(id => (
                  <div key={id} className={`flex flex-col gap-2 lg:gap-3`}>
                    {activitiesPart1
                      .filter(act => act.id === id)
                      .map((act, index) => (
                        <div
                          id={`nws${id}`}
                          key={index}
                          style={{ opacity: getOpacity(id) }}
                          className={`flex-1 h-full rounded-lg 2xl:rounded-3xl relative overflow-hidden  transition-opacity duration-500 ease-in-out`}
                        >
                          <img
                            className={`w-full rounded-lg 2xl:rounded-3xl object-cover`}
                            src={process.env.PUBLIC_URL + `/images/news/news${act.imageIndex}.webp`}
                            alt={act[language]}
                          />
                          <div
                            className={`absolute bottom-0 w-full flex flex-col items-center justify-end pb-3 bg-gradient-to-t from-black to-transparent h-[50%] text-white font-bold text-2xl text-center ${act.font}`}
                          >
                            <p className={`w-[80%] text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-3xl font-extrabold ${act.font}`}>
                              {act[language]}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              </div>
            </div>
          </div>
          <div className={`w-[70%] lg:w-[60%] 2xl:w-[38%]`}>
            <img src={process.env.PUBLIC_URL + `/images/ipadFed${language}.webp`} className={`w-full`} />
          </div>
          <div className={`flex-1`}>
            <div className={`w-full h-full flex items-center`}>
              <div className={`w-full h-[68%] md:h-[64%]`}>
                <div ref={ref} className={`w-[500%] lg:w-[300%] 2xl:w-[134%] h-full grid grid-cols-3 gap-1 lg:gap-3`}>
                {[1, 2, 3].map(id => (
                  <div key={id} className={`flex flex-col gap-2 lg:gap-3`}>
                    {activitiesPart2
                      .filter(act => act.id === id)
                      .map((act, index) => (
                        <div
                        id={`nws${id}`}
                        key={index}
                        style={{ opacity: getOpacity(id) }}
                        className={`flex-1 h-full rounded-lg 2xl:rounded-3xl relative overflow-hidden  transition-opacity duration-500 ease-in-out`}
                      >
                          <img
                            className={`w-full h-full object-cover`}
                            src={process.env.PUBLIC_URL + `/images/news/news${act.imageIndex}.webp`}
                            alt={act[language]}
                          />
                          <div
                            className={`absolute bottom-0 w-full flex flex-col items-center justify-end pb-3 bg-gradient-to-t from-black to-transparent h-[50%] text-white font-bold text-2xl text-center ${act.font}`}
                          >
                            <p className={`w-[80%]  text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-3xl font-extrabold ${act.font}`}>
                              {act[language]}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.button initial={{y:-90,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring"}} className="px-6 py-3 rounded-full bg-red-500 text-white mt-10">
          {content[language].button}
        </motion.button>
      </div>
    </div>
  </>
  
  );
}
const content = {
  fr: {
    title1: "Une nouvelle façon",
    title2: "de rester informé",
    paragraph: `Des annonces importantes aux événements à venir, restez informés en temps réel grâce à notre page Actualités.
Parents et élèves reçoivent les mêmes informations, au bon moment.
Avant chaque activité, nous vous préparons. Après chaque événement, nous vous partageons l’essentiel.
Une communication claire, continue et pensée pour vous. Parce que chaque moment de la vie scolaire compte.`,
    button: "Explorer toutes les publications"
  },
  en: {
    title1: "A new way",
    title2: "to stay informed",
    paragraph: `From important announcements to upcoming events, stay up-to-date in real time through our News page.
Both parents and students receive the same information, at the right moment.
Before each activity, we prepare you. After every event, we share the highlights.
Clear, consistent communication made just for you — because every school moment matters.`,
    button: "Explore all posts"
  },
  ar: {
    title1: "طرق جديدة",
    title2: "للبقاء على اطلاع",
    paragraph: `من الإعلانات المهمة إلى الفعاليات القادمة، ابقَ على اطلاع في الوقت الفعلي عبر صفحة الأخبار الخاصة بنا.
يتلقى الآباء والطلاب نفس المعلومات، في الوقت المناسب.
قبل كل نشاط، نقوم بتحضيركم. وبعد كل فعالية، نشارككم الأهم.
تواصل واضح، مستمر، ومُعدّ خصيصًا لكم. لأن كل لحظة في الحياة المدرسية لها قيمتها.`,
    button: "استكشف جميع المنشورات"
  }
};

  