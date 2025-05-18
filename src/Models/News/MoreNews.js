import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import React,{ useEffect, useState,} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faCaretDown, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import FullNews from "./FullNews";
import { setShowTopMenu } from "../../redux(toolKit)/slices/showTopMenu";
import content from"./NewsData/LatestNewsData.json"

export default function MoreNews({dash=false,onModify}) {
  const language = useSelector((state) => state.presntion.language);
  const [isFull, setIsFull] = useState(false);
  const [selectedConetnt,setSelectedContent] = useState(null);


  const dispatch = useDispatch();
   useEffect(() => {
    if(isFull){
      dispatch(setShowTopMenu(false))
    }else{
      dispatch(setShowTopMenu(true))
    }
    }, [dispatch,isFull]);

 
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
  const allCategories = {
    en: "All Categories",
    fr: "Toutes les catégories",
    ar: "جميع الفئات"
  };
  const allYears = {
    en: "All school years",
    fr: "Toutes les années scolaires",
    ar: "كل السنوات الدراسية"
  };
  
  const [selectedCat,setSelectedCat] = useState(allCategories);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("All");

  
  
  const [openMenus, setOpenMenus] = useState({menu1: false, menu2: false, menu3: false});

  const toggleMenu = (menuKey) => {setOpenMenus((prev) => ({...prev,[menuKey]: !prev[menuKey]}));};
 
  const filteredNews = content.news.filter(item =>
    (selectedCat[language] === allCategories[language] || item.tag.tagName[language] === selectedCat[language]) &&
    (selectedSchoolYear === "All" || item.schoolYear === selectedSchoolYear)
  );
  
  const noNewsMessage = {
    ar: `لا توجذ أخبار ${selectedCat[language]} متاحة خلال السنة الدراسية`+" "+selectedSchoolYear,
    fr: `Aucune actualité ${selectedCat[language]} n'est disponible durant l'année scolaire ${selectedSchoolYear}.`,
    en: `No ${selectedCat[language]} news is available during the ${selectedSchoolYear} school year.`
  };
  
   return (
    <>
      <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"100vh"}} exit={{opacity:0,height:0}} transition={{ease:"circInOut"}} className={` h-screen  mt-10 gap-10 relative overflow-y-auto rounded-3xl ${dash?"w-full":"w-[90%] 2xl:w-[60%]"}`}>

        <div dir={language==="ar"&&"rtl"} className="w-full sticky top-0 left-0 py-4 font-semibold bg-apple-light/90 backdrop-blur-lg text-apple-dark gap-2  border-b border-apple-light blurey  flex items-center px-4">
        <p  className="font-semibold hidden sm:flex">{ { en: "Filter:", fr: "Filtre:", ar: "تصفية:" }[language] }</p>

          <div onClick={()=>toggleMenu("menu1")} className={`flex-1 py-4 ease-in-out duration-500  flex items-center ${openMenus.menu1?"bg-white rounded-t-[15px]   ":"bg-white/80 rounded-[15px] "}  relative  text-apple-dark font-semibold cursor-pointer`}>
          <p className="w-full font-semibold text-[10px] sm:text-xs lg:text-base mx-2">{selectedCat[language]}</p>
            <FontAwesomeIcon className={`ease-in-out duration-300 ${openMenus.menu1&&"rotate-180"} mx-2`} icon={faCaretDown}/>
            <AnimatePresence>
              {
                openMenus.menu1 &&
                <motion.div initial={{height:0}} animate={{height:"250px"}} exit={{height:0}} transition={{ease:"circInOut"}} className="w-full h-[200px] overflow-y-scroll rounded-b-[15px] p-10px bg-white absolute top-[100%]  p-[10px] shadow-2xl border-t border-apple-light ">
                  <p onClick={()=>setSelectedCat(allCategories)} className={`w-full p-2  ${selectedCat[language]===allCategories[language]&&" bg-apple-light font-semibold"} rounded-[5px] text-[10px] sm:text-xs md:text-sm`}>{allCategories[language]}</p>
                  {[...new Set(content.news.map(item => item.tag.tagName))].map((name, index) => (
                    <p onClick={()=>{setSelectedCat(name)}} key={index} className={`w-full p-2 my-1 ${selectedCat[language]===name[language]&&" bg-apple-light font-semibold"} rounded-[5px] text-[10px] sm:text-xs md:text-sm`}>{name[language]}</p>
                  ))}
                </motion.div>
              }
            </AnimatePresence>
          </div>

          <div
            onClick={() => toggleMenu("menu2")}
            className={`flex-1 py-2  ease-in-out duration-500 flex items-center ${
              openMenus.menu2 ? "bg-white rounded-t-[15px]" : "bg-white/80 rounded-[15px]"
            } relative text-apple-dark font-semibold cursor-pointer`}
          >
           <p className="w-full font-semibold text-[8px] py-2 sm:text-xs lg:text-base mx-2">
  {selectedSchoolYear === "All" ? allYears[language] : selectedSchoolYear}
</p>

            <FontAwesomeIcon className={`ease-in-out duration-300 ${openMenus.menu2 && "rotate-180"} mx-2`} icon={faCaretDown} />
            <AnimatePresence>
              {openMenus.menu2 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ ease: "circInOut" }}
                  className="w-full max-h-[250px] overflow-y-scroll rounded-b-[15px] p-10px bg-white absolute top-[100%] p-[10px] shadow-2xl border-t border-apple-light"
                >
  <p
    onClick={() => setSelectedSchoolYear("All")}
    className={`w-full p-2 ${
      selectedSchoolYear === "All" && "bg-apple-light font-semibold"
    } rounded-[5px] text-[10px] sm:text-xs md:text-sm`}
  >
    {allYears[language]}
  </p>
        {[...new Set(content.news.map((item) => item.schoolYear))].map((year, index) => (
                    <p
                      onClick={() => setSelectedSchoolYear(year)}
                      key={index}
                      className={`w-full p-2 my-1 ${
                        selectedSchoolYear === year && "bg-apple-light font-semibold"
                      } rounded-[5px] text-[10px] sm:text-xs md:text-sm`}
                    >
                      {year}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
        </div>
        {filteredNews.length > 0 ? (
      filteredNews.map((content, index) => (
        <React.Fragment key={index}>
          <AnimatePresence>
            <motion.div
              layout
              initial={{ opacity: 0, scaleY: 0.9 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.9 }}
              transition={{ ease: "circInOut", delay: 0.1 * index }}
              onClick={() => {
                setIsFull(true);
                setSelectedContent(content);
              }}
              className={`w-full my-2 cursor-pointer py-5 lg:py-8 flex items-center justify-center ${dash&&"text-left"} ${
                language === "ar" && "flex-row-reverse text-right"
              }`}
            >
              <img
                src={process.env.PUBLIC_URL + content.imgSrc}
                className="rounded-3xl w-[40%] lg:w-[30%] h-[100px] sm:h-[160px] object-cover"
              />
              <div className={`flex-1 px-5 flex flex-col ${language === "ar" && "items-end"}`}>
                <div className={`w-full flex items-center gap-2 ${language === "ar" && "flex-row-reverse"}`}>
                  <span
                    className={`w-2 h-2 rounded-full ${getTailwindColor(content.tag.tagName["en"]).bg}`}
                  ></span>
                  <p dir={language === "ar" ? "rtl" : "ltr"} className="text-apple-dark">
                    {content.tag.tagName[language]}
                  </p>
                </div>
                <p
                  dir={language === "ar" ? "rtl" : "ltr"}
                  className={`text-apple-title/90 font-bold text-base sm:text-xl lg:text-2xl lg:w-[80%] ${
                    language === "ar" && "mb-2"
                  }`}
                >
                  {content.title[language]}
                </p>
                <p
                  dir={language === "ar" ? "rtl" : "ltr"}
                  className="text-apple-dark text-[10px] sm:text-xs lg:text-sm"
                >
                  {content.date[language]}
                </p>
              </div>
              {dash && <p onClick={()=>onModify(content)} className="underline pr-2">Modifier</p>}
            </motion.div>
          </AnimatePresence>
          <div className="w-[95%] mx-auto h-[1.5px] my-2 bg-apple-light overflow-y-scroll"></div>
        </React.Fragment>
      ))
    ) : (
      <p className="text-center text-apple-dark font-semibold text-xl py-10">{noNewsMessage[language]}</p>
    )}
      </motion.div>
      <AnimatePresence>
        {isFull&& <FullNews content={selectedConetnt} catColor={getTailwindColor(selectedConetnt.tag.tagName["en"]).bg} onClose={()=>setIsFull(false)}/>}
      </AnimatePresence>
    </>

   );
}


  


