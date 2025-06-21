import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import React,{ useEffect, useState,} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faCaretDown, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import FullNews from "./FullNews";
import { setShowTopMenu } from "../../redux(toolKit)/slices/showTopMenu";
import { fetchNews } from "../../redux(toolKit)/slices/newsSlice";
export const categoryColorMap = {
    'Sport': "bg-red-500",
    'Général': "bg-blue-500",
    'Santé': "bg-green-500",
    'Science': "bg-yellow-500",
    'Éducation': "bg-purple-500",
    'Culture': "bg-pink-500",
    'Technologie': "bg-indigo-500",
    'Événements': "bg-teal-500",
    'Parascolaire': "bg-orange-500",
    'VieScolaire': "bg-red-400",
    'Orientation': "bg-blue-400",
    'Carrières': "bg-green-400",
    'Bourses': "bg-yellow-400",
    'Aides': "bg-purple-400",
    'Concours': "bg-pink-400",
    'Olympiades': "bg-indigo-400",
    'Sorties': "bg-teal-400",
    'Environnement': "bg-orange-400",
    'Citoyenneté': "bg-red-300",
    'Sciences': "bg-blue-300",
    'Littérature': "bg-green-300",
    'ArtsPlastiques': "bg-yellow-300",
    'Musique': "bg-purple-300",
    'Théâtre': "bg-pink-300",
    'Langues': "bg-indigo-300",
    'Histoire': "bg-teal-300",
    'Patrimoine': "bg-orange-300",
    'Pédagogie': "bg-red-200",
    'TravauxÉlèves': "bg-blue-200",
    'Projets': "bg-green-200",
    'Alimentation': "bg-yellow-200",
    'Cantine': "bg-purple-200",
    'BienÊtre': "bg-pink-200",
    'Conseils': "bg-indigo-200",
    'Sécurité': "bg-teal-200",
    'Règlement': "bg-orange-200",
    'ParentsÉcole': "bg-red-100",
    'TIC': "bg-blue-100",
    'Numérique': "bg-green-100",
    'Inclusion': "bg-yellow-100",
    'Diversité': "bg-purple-100",
    'Handicap': "bg-pink-100",
    'Partenariats': "bg-indigo-100",
    'Sponsors': "bg-teal-100",
    'Clubs': "bg-orange-100",
    'Associations': "bg-gray-500",
    'VieÉtudiante': "bg-gray-400",
    'Examens': "bg-gray-300",
    'Évaluations': "bg-gray-200",
    'Calendrier': "bg-red-600",
    'Vacances': "bg-blue-600",
    'AnnoncesAdmin': "bg-green-600",
    'Alertes': "bg-yellow-600",
    'Témoignages': "bg-purple-600",
    'Alumni': "bg-pink-600",
    'DéveloppementPerso': "bg-indigo-600",
    'LeadershipÉtudiant': "bg-teal-600",
    'Civisme': "bg-orange-600",
    'JusticeScolaire': "bg-red-700",
    'Jeux': "bg-blue-700",
    'Loisirs': "bg-green-700",
    'Psychologie': "bg-yellow-700",
    'Maths': "bg-purple-700",
    'Physique': "bg-pink-700",
    'Chimie': "bg-indigo-700",
    'Biologie': "bg-teal-700",
    'Philo': "bg-orange-700",
    'Éco': "bg-red-800",
    'Géo': "bg-blue-800",
    'Robotique': "bg-green-800",
    'Codage': "bg-yellow-800",
    'Débats': "bg-purple-800",
    'Photo': "bg-pink-800",
    'Cinéma': "bg-indigo-800",
    'Danse': "bg-teal-800",
    'Entrepreneuriat': "bg-orange-800",
    'Bénévolat': "bg-red-900",
    'SantéMentale': "bg-blue-900",
    'Nutrition': "bg-green-900",
    'Écologie': "bg-yellow-900",
    'International': "bg-purple-900",
    'Échanges': "bg-pink-900",
    'Journalisme': "bg-indigo-900",
    'Bibliothèque': "bg-teal-900",
    'Diplômes': "bg-orange-900",
    'Inscriptions': "bg-lime-500",
    'Transport': "bg-lime-400",
    'Restauration': "bg-lime-300",
    'Réunions': "bg-lime-200",
    'Festivals': "bg-lime-100",
    'Conférences': "bg-emerald-500",
    'Ateliers': "bg-emerald-400",
    'Finances': "bg-emerald-300",
    'PolitiqueScolaire': "bg-emerald-200",
    'Éthique': "bg-emerald-100",
    'Technique': "bg-cyan-500",
    'Formation': "bg-cyan-400",
    'Recherche': "bg-cyan-300",
    'Innovation': "bg-cyan-200",
    'Gala': "bg-cyan-100",
    'Excursions': "bg-sky-500",
    'Mentorat': "bg-sky-400",
    'Compétences': "bg-sky-300",
    'Multimédia': "bg-sky-200",
    'RéseauxSociaux': "bg-sky-100",
    'HarcèlementPrévention': "bg-violet-500",
    'SécuritéRoutière': "bg-violet-400",
    'Solidarité': "bg-violet-300",
    'DéveloppementDurable': "bg-violet-200",
    'ArtOratoire': "bg-violet-100",
    'Égalité': "bg-fuchsia-500",
    'Laïcité': "bg-fuchsia-400",
    'MédiasÉducation': "bg-fuchsia-300",
    'Stages': "bg-fuchsia-200",
    'Philanthropie': "bg-fuchsia-100",
    'CyberSécurité': "bg-rose-500",
    'Climat': "bg-rose-400",
    'PatrimoineLocal': "bg-rose-300",
    'Poésie': "bg-rose-200",
    'Cuisine': "bg-rose-100",
    'Jardinage': "bg-amber-500",
    'PremiersSecours': "bg-amber-400",
    'OrientationPro': "bg-amber-300",
    'VoyagesScolaires': "bg-amber-200",
    'EngagementCivique': "bg-amber-100",
    'DroitsHumains': "bg-yellow-50",
    'Musée': "bg-lime-50",
    'Astronomie': "bg-green-50",
    'ThéâtreForum': "bg-emerald-50",
    'Autre': "bg-gray-100"
};

export function getTailwindColor(category) {
    const trimmedCategory = category.trim(); // Trim whitespace from input

    // Attempt to get the background color class from the map.
    // This version uses the trimmedCategory directly, assuming its casing matches the map keys.
    const mappedBgClass = categoryColorMap[trimmedCategory];

    let finalBgClass;
    let finalTextClass;

    if (mappedBgClass) {
        // Category was found in the map. mappedBgClass is like "bg-red-500".
        finalBgClass = mappedBgClass; // This is already a correct bg class.

        // Determine a contrasting text color.
        // Extract color name (e.g., "red") and shade (e.g., "500")
        const parts = mappedBgClass.split('-'); // ["bg", "colorName", "shade"]
        const colorName = parts[1];
        const shade = parseInt(parts[2], 10);

        // Simple heuristic for contrast:
        // Light backgrounds (shade < 500) or specific light colors (yellows, limes, ambers) get dark text.
        // Darker backgrounds (shade >= 500) get light text.
        if (shade < 500 || 
            (colorName === 'yellow' && shade < 600) || 
            (colorName === 'lime' && shade < 400) || // Lime is very bright, needs dark text up to 300
            (colorName === 'amber' && shade < 400) ||
            (colorName === 'cyan' && shade < 500) ||
            (colorName === 'sky' && shade < 500) ||
            (colorName === 'emerald' && shade < 400) || // emerald-50 needs dark text
            (colorName === 'teal' && shade < 400) ) {
            
            // For very light grays, specific yellows, limes, emeralds in your map
            if ((colorName === 'gray' && shade <= 200) || 
                colorName === 'yellow-50' || mappedBgClass === 'bg-yellow-50' || // check full string for -50
                mappedBgClass === 'bg-lime-50' || 
                mappedBgClass === 'bg-emerald-50' ||
                mappedBgClass === 'bg-rose-100' || // specific light colors from your map
                mappedBgClass === 'bg-fuchsia-100' ||
                mappedBgClass === 'bg-violet-100' ||
                mappedBgClass === 'bg-cyan-100' ||
                mappedBgClass === 'bg-sky-100' ||
                mappedBgClass === 'bg-orange-100' ||
                mappedBgClass === 'bg-pink-100' ||
                mappedBgClass === 'bg-purple-100' ||
                mappedBgClass === 'bg-indigo-100' ||
                mappedBgClass === 'bg-teal-100' ||
                mappedBgClass === 'bg-green-100' ||
                mappedBgClass === 'bg-blue-100' ||
                mappedBgClass === 'bg-red-100'
                ) {
                finalTextClass = "text-gray-800"; // A dark gray for better readability on very light colors
            } else {
                finalTextClass = "text-black"; // General dark text for light backgrounds
            }
        } else {
            finalTextClass = "text-white"; // General light text for dark backgrounds
        }

        // Override for 'Autre' if it's bg-gray-100 to ensure good contrast
        if (trimmedCategory === 'Autre' && mappedBgClass === 'bg-gray-100') {
            finalTextClass = "text-gray-800";
        }

    } else {
        // Category not found in the map, use a default.
        finalBgClass = "bg-neutral-200";    // Corrected: A valid Tailwind class for light gray background
        finalTextClass = "text-neutral-700"; // A contrasting darker gray text
    }

    return {
      bg: finalBgClass,
      text: finalTextClass
    };
}

export default function MoreNews({dash=false,onModify,refresh}) {
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


  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch, refresh, isFull]);

 
  const pinned = {
      "en": "Pinned",
      "fr": "Épinglé",
      "ar": "مثبت"
  }


  const genres = ['Sport', 'Général', 'Santé', 'Science', 'Éducation', 'Culture', 'Technologie', 'Événements', 'Parascolaire', 'VieScolaire', 'Orientation', 'Carrières', 'Bourses', 'Aides', 'Concours', 'Olympiades', 'Sorties', 'Environnement', 'Citoyenneté', 'Sciences', 'Littérature', 'ArtsPlastiques', 'Musique', 'Théâtre', 'Langues', 'Histoire', 'Patrimoine', 'Pédagogie', 'TravauxÉlèves', 'Projets', 'Alimentation', 'Cantine', 'BienÊtre', 'Conseils', 'Sécurité', 'Règlement', 'ParentsÉcole', 'TIC', 'Numérique', 'Inclusion', 'Diversité', 'Handicap', 'Partenariats', 'Sponsors', 'Clubs', 'Associations', 'VieÉtudiante', 'Examens', 'Évaluations', 'Calendrier', 'Vacances', 'AnnoncesAdmin', 'Alertes', 'Témoignages', 'Alumni', 'DéveloppementPerso', 'LeadershipÉtudiant', 'Civisme', 'JusticeScolaire', 'Jeux', 'Loisirs', 'Psychologie', 'Maths', 'Physique', 'Chimie', 'Biologie', 'Philo', 'Éco', 'Géo', 'Robotique', 'Codage', 'Débats', 'Photo', 'Cinéma', 'Danse', 'Entrepreneuriat', 'Bénévolat', 'SantéMentale', 'Nutrition', 'Écologie', 'International', 'Échanges', 'Journalisme', 'Bibliothèque', 'Diplômes', 'Inscriptions', 'Transport', 'Restauration', 'Réunions', 'Festivals', 'Conférences', 'Ateliers', 'Finances', 'PolitiqueScolaire', 'Éthique', 'Technique', 'Formation', 'Recherche', 'Innovation', 'Gala', 'Excursions', 'Mentorat', 'Compétences', 'Multimédia', 'RéseauxSociaux', 'HarcèlementPrévention', 'SécuritéRoutière', 'Solidarité', 'DéveloppementDurable', 'ArtOratoire', 'Égalité', 'Laïcité', 'MédiasÉducation', 'Stages', 'Philanthropie', 'CyberSécurité', 'Climat', 'PatrimoineLocal', 'Poésie', 'Cuisine', 'Jardinage', 'PremiersSecours', 'OrientationPro', 'VoyagesScolaires', 'EngagementCivique', 'DroitsHumains', 'Musée', 'Astronomie', 'ThéâtreForum', 'Autre'];

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
 
  const filteredNews = news.filter(item =>
    (selectedCat[language] === allCategories[language] || item.tag[language] === selectedCat[language]) &&
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
                  {[...new Set(news.map(item => item.tag))].map((name, index) => (
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
        {[...new Set(news.map((item) => item.schoolYear))].map((year, index) => (
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


        {
  loading?'chargement...':filteredNews.length > 0 ? (
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
                    className={`w-2 h-2 rounded-full ${getTailwindColor(content.tag["fr"]).bg}`}
                  ></span>
                  <p dir={language === "ar" ? "rtl" : "ltr"} className="text-apple-dark">
                    {content.tag[language]}
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
                  {content.news_date[language]}
                </p>
              </div>
              {dash && <p onClick={()=>{onModify(content);setIsFull(false)}} className="underline pr-2">Modifier</p>}
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
        {isFull&& <FullNews content={selectedConetnt} catColor={getTailwindColor(selectedConetnt.tag["fr"]).bg} onClose={()=>setIsFull(false)}/>}
      </AnimatePresence>
    </>

   );
}


  


{/**

   
  */}