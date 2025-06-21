import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState, useEffect,useMemo } from "react";
import { motion } from "framer-motion";
import { faClock, faFlask, faLeaf, faMusic, faPalette, faSoccerBall} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import content from "./NewsData/newsFeedData.json";





export default function NewsFirstInterface() {
  const language = useSelector((state) => state.presntion.language);
  const lang = language || "fr";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateFactor = Math.max(0, 1 - scrollY / 800);
  const translateValue = translateFactor * 80;
  const translations = {
    fr: {
      title: 'Actualitées',
      headline1: 'Ce qui compte.',
      headline2: 'Quand ça compte.',
      btn:"Explorer Maintenant",
    },
    en: {
      title: 'News',
      headline1: 'What matters.',
      headline2: 'When it matters.',
        btn:"Explore Now",
    },
    ar: {
      title: 'الأخبار',
      headline1: '‎. كل مايهم ',
      headline2: '‎. عندما يُهم',
        btn:"استكشف الآن",
    },
  };
  const contente = translations[language] || translations.fr;

  return (
    <>

      <div className={`w-screen flex flex-col items-center justify-center relative mt-56 mb-10`}>

        
       
        <div className={`w-screen lg:w-[94%] flex flex-col items-center justify-center`}>
          <motion.p initial={{y:-40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0}} className={`text-red-500`}>{contente.title}</motion.p>
          <motion.h1 initial={{y:-40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0.1}} className={`text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-7xl 2xl:text-8xl text-neutral-900 text-center font-bold`}>{contente.headline1}</motion.h1>
          <motion.h1 initial={{y:-40,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0.15}} className={`text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-7xl 2xl:text-8xl  ${language=="ar"&&"text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl"} text-neutral-900 text-center font-bold`}>{contente.headline2}</motion.h1>
          <motion.button  initial={{y:-90,opacity:0}} whileInView={{y:0,opacity:10}} transition={{type:"spring",delay:0.2}} className={`rounded-full px-6 py-3 bg-red-500 mt-10 text-white lg:mb-16`}>{contente.btn}</motion.button>
          <div className={` w-[185%] sm:w-[150%] lg:w-[140%] 2xl:w-full h-[500px] sm:h-[550px] lg:h-[620px] flex items-center justify-center gap-x-4`}>
            <div className={`w-full h-full flex items-center justify-center gap-x-6`}>
              {content.map((item, index) => (
                <NewsCard
                  key={index}
                  image={item.image}
                  title={item.title[language]}
                  genre={item.genre[language]}
                  date={item.date[language]}
                  description={item.description[language]}
                  bgColor={item.bgColor}
                  textColor={item.textCoor}
                  translateValue={index % 2 === 0 && translateValue}
                  minutes={item.minutes[language]}
                  fontIndex={index}
                  language={language}
                  hidden={index ===0 || index ===1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

const NewsCard = ({ image, title, genre, date, description, bgColor, translateValue, minutes, fontIndex, textColor,language,hidden }) => {
  const icons = [faSoccerBall, faFlask, faMusic, faLeaf, faPalette];
  const socialIcons = [
    { icon: faFacebook, name: "Facebook" },
    { icon: faInstagram, name: "Instagram" },
    { icon: faYoutube, name: "YouTube" },
    { icon: faXTwitter, name: "Twitter" }, // You can add more if needed
  ];
  
  // Function to get 2-3 random icons
  const getRandomIcons = () => {
    const shuffled = [...socialIcons].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 2) + 2; // Get 2 or 3
    return shuffled.slice(0, count);
  };
  const randomIcons = useMemo(() => getRandomIcons(), []); // ⬅ only once!

  

  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay: fontIndex === 2 ? 0 : (fontIndex === 1 || fontIndex === 3 ? 0.3 : 0.6), ease:"circInOut"}}  className={`flex-1 ${hidden&&"hidden sm:block"} h-[90%] ${language==="ar"&&"text-right"} rounded-[40px] p-[10px] flex-col gap-2 ${bgColor} feed`} style={{ transform: `translateY(${translateValue}px)` }}>
      <div className={`w-full h-[45%] bg-white rounded-[30px] relative overflow-hidden`}>
        <img className={`w-full h-full object-cover`} src={process.env.PUBLIC_URL + image} />
        <div className={`w-full h-full absolute top-0 left-0 p-[10px]`}>
          <div className={`px-4 py-2 min-w-[40%] max-w-[50%] text-center border-white/50 shadow-2xl rounded-[20px] text-white font-bold bg-white/5 backdrop-blur-md blurey flex items-center justify-center`}>
            <FontAwesomeIcon icon={icons[fontIndex]} className={`text-white mr-2`} />
            {genre}
          </div>
        </div>
        <div className={`w-full absolute h-6 -bottom-2 left-0 bg-black blur-xl`}></div>
      </div>
      <div className={`w-full h-[55%] p-[10px] md:mt-2 relative`}>
        <p className={`${textColor}/30 text-xs`}>{date}</p>
        <p className={`text-lg lg:text-2xl ${language=="ar"&&"text-3xl"} ${textColor} font-bold`}>{title}</p>
        <p className={`${textColor}/50 mt-2 text-[10px] lg:text-sm`}>{description}</p>
        <div className={`absolute w-full bottom-0 right-0 px-[10px] md:p-[10px] lg:p-[20px] ${textColor}/40 flex items-center gap-x-2`}>
        <div className={`flex-1 flex gap-x-2`}>
            {randomIcons.map((item, idx) => (
                <FontAwesomeIcon icon={item.icon} key={idx} />
            ))}
        </div>
          <FontAwesomeIcon icon={faClock} />
          <p className={`text-[10px] lg:text-xs`}>{minutes}</p>
        </div>
      </div>
    </motion.div>
  );
};
