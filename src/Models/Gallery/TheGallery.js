import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faSchool,faUsers, faUserGraduate, faCalendarAlt, faArrowLeft, faArrowRight, faClose  } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setShowLang } from "../../redux(toolKit)/slices/showLang";
import ecolesImages from "./GalImagesLinks/EcoleImagesLinks.json";
import eventsImages from "./GalImagesLinks/EventsImagesLinks.json";
import equipeImages from "./GalImagesLinks/EquipeImagesLinks.json";
import elevesImages from "./GalImagesLinks/ElevesImagesLinks.json";
import { setShowMenu } from "../../redux(toolKit)/slices/showMenu";


export default function TheGallery({visibleNav}) {
    const language = useSelector((state) => state.presntion.language);
    const stopRef = useRef(null);
    const [isFixed, setIsFixed] = useState(true);
    const [selectedGal,setSelectedGal] = useState(2);
    const [fullScreen,setFullScreen] = useState(false);
    useEffect(() => {
        if (fullScreen) {
          document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
          document.body.style.overflow = 'auto'; // Enable scrolling
        }
    
        // Cleanup when component unmounts
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [fullScreen]);


    const ecolesImg = useMemo(()=>{return [...ecolesImages].sort(() => Math.random() - 0.5);},[ecolesImages]);
    const eventsImg = useMemo(()=>{return [...eventsImages].sort(() => Math.random() - 0.5);},[eventsImages]);
    const equipeImg = useMemo(()=>{return [...equipeImages].sort(() => Math.random() - 0.5);},[equipeImages]);
    const elevesImg = useMemo(()=>{return [...elevesImages].sort(() => Math.random() - 0.5);},[elevesImages]);
    const allImg = useMemo(()=>{return [...ecolesImg,...eventsImg,...equipeImg,...elevesImg].sort(() => Math.random() - 0.5);},[ecolesImg,eventsImg,equipeImg,elevesImg]);

    const currentGallery = [ecolesImg,eventsImg,allImg,equipeImg,elevesImg];

    useEffect(() => {
        if(fullScreen){dispatch(setShowMenu(false));}
        else{dispatch(setShowMenu(true));}
    }, [fullScreen]);

  

    useEffect(() => {
        const handleScroll = () => {
        const stopDiv = stopRef.current;
        if (!stopDiv) return;

        const rect = stopDiv.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            setIsFixed(false); // Stop fixing
        } else {
            setIsFixed(true); // Keep fixed
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleSelectedGal = (index) => {setSelectedGal(index);};
     const dispatch = useDispatch();
        useEffect(() => {
            if(visibleNav){
                dispatch(setShowLang(false))
            }else{
                dispatch(setShowLang(true))
            }
        },[visibleNav])
    
    

    return (
        <>
            <div className="w-[96%] xl:w-[94%]  flex items-center justify-center mt-10 border lg:border-2 border-black/20   lg:rounded-[35px]   rounded-[20px] 2xl:rounded-[80px] overflow-hidden  relative">

                <GalConetnt fullScreen={fullScreen} onClick={()=>setFullScreen(!fullScreen)} images={currentGallery[selectedGal]}/>

                <div ref={stopRef} className="w-full left-0 bottom-0 absolute z-50 h-20"></div>
                <AnimatePresence>
                    {(visibleNav&&!fullScreen)&&<Navigition isFixed={isFixed} selectedGal={selectedGal} language={language} onSelect={handleSelectedGal}/>}
                </AnimatePresence>
                <AnimatePresence>
                    <motion.div key={selectedGal} initial={{opacity:1}} animate={{opacity:0}} exit={{opacity:1}} transition={{type:"ease"}}  className="w-full bg-white/10 h-full absolute pointer-events-none z-40 backdrop-blur-2xl top-0 left-0"></motion.div>
                </AnimatePresence>
               
            </div>

        </>
      
    );
}


const GalConetnt = ({images,fullScreen,onClick}) => {
    const chunkSize = images.length / 4;
    const arr1 = images.slice(0, chunkSize);
    const arr2 = images.slice(chunkSize, chunkSize * 2);
    const arr3 = images.slice(chunkSize * 2, chunkSize * 3);
    const arr4 = images.slice(chunkSize * 3, chunkSize * 4);
    const [selectedImg,setSelectedImg] = useState(0);

    const handleNext = () => {
        setSelectedImg((prev) => (prev + 1) % images.length);
    };
    
    const handlePrev = () => {
        setSelectedImg((prev) => (prev - 1 + images.length) % images.length);
    };
    
    return(
        <div className="w-full grid grid-cols-2   sm:grid-cols-4  gap-[3px] lg:gap-[5px] 2xl:gap-x-[10px] 2xl:p-[10px] p-[3px] lg:p-[5px]">


            <div className="flex-1  h-screen grid gap-[3px] 2xl:gap-[10px] overflow-y-scroll rounded-[5px]  rounded-tl-[17px] rounded-bl-[17px] 2xl:rounded-[10px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] 2xl:rounded-tl-[70px] 2xl:rounded-bl-[70px]  ">
                {arr1.map((src,index)=><img onClick={()=>{onClick();setSelectedImg(index)}} key={index} alt={src} src={src} className="w-full bg-slate-50 flash rounded-[5px] 2xl:rounded-[10px]  duration-200 ease-in-out cursor-pointer hover:animate-pulse "/>)}
            </div>

            <div className="flex-1 h-screen grid gap-[3px] 2xl:gap-[10px] overflow-y-scroll rounded-[5px] 2xl:rounded-[10px]">
                {arr2.map((src,index)=><img  onClick={()=>{onClick();setSelectedImg(index+(chunkSize))}} key={index} src={src} className="w-full bg-slate-50 flash rounded-[5px] 2xl:rounded-[10px]  duration-200 ease-in-out cursor-pointer hover:animate-pulse "/>)}
            </div>

            <div className="flex-1 h-screen grid  gap-[3px] 2xl:gap-[10px] overflow-y-scroll rounded-[5px] 2xl:rounded-[10px]   ">
                {arr3.map((src,index)=><img onClick={()=>{onClick();setSelectedImg(index+(chunkSize*2))}} key={index} src={src} className="w-full bg-slate-50 flash rounded-[5px] 2xl:rounded-[10px]  duration-200 ease-in-out cursor-pointer hover:animate-pulse "/>)}
            </div>

            <div className="flex-1 h-screen grid gap-[3px] 2xl:gap-[10px] overflow-y-scroll rounded-[5px]  rounded-tr-[17px] rounded-br-[17px] 2xl:rounded-[10px] 2xl:rounded-tr-[70px] 2xl:rounded-br-[70px] lg:rounded-tr-[30px] lg:rounded-br-[30px] ">
                {arr4.map((src,index)=><img onClick={()=>{onClick();setSelectedImg(index+(chunkSize*3))}} key={index} src={src} className="w-full bg-slate-50 flash rounded-[5px] 2xl:rounded-[10px]  duration-200 ease-in-out cursor-pointer hover:animate-pulse "/>)}
            </div>
            <AnimatePresence>
            {fullScreen&&
            <motion.div  initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} exit={{opacity:0,y:100}} className="w-screen h-screen flex flex-col items-center justify-center fixed top-0 left-0 bg-black/40  z-50">
                <img  src={process.env.PUBLIC_URL+'/images/gridss.webp'} className="w-full h-full object-cover absolute top-0 left-0 z-0 cursor-pointer" onClick={()=>onClick()}></img>
                <motion.div  drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(event, info) => {
                    if (info.offset.x < -100) {
                    handleNext(); // swipe left
                    } else if (info.offset.x > 100) {
                    handlePrev(); // swipe right
                    }
                    }} onClick={()=>onClick()} className="h-full w-[98%] sm:max-w-[80%] flex-col flex items-center justify-center  z-10">
                        
                    <div className="h-[8%] lg:h-[15%] w-auto "></div>
                    <motion.div   className="  sm:h-[80%] flex items-center justify-center bg-white/10 border border-white/60 backdrop-blur-lg flash rounded-[25px] p-[15px] blurey">
                    
                        <motion.img  src={images[selectedImg]} alt={images[selectedImg]} className="h-full flash rounded-[10px] shadow-xl blurey"/>
                    </motion.div>
                    <div className=" h-[5%] "></div>
                </motion.div>
                <div className="w-full  p-5 xl:p-10 absolute hidden lg:flex items-center justify-between z-20 text-white/70 text-3xl mt-[5%]">
                    <div className="w-[50%] flex ">
                        <button onClick={handlePrev} className="active:scale-90 focus:scale-1 hover:text-white blurey  ease-in-out xl:w-20 xl:h-20 w-16 h-16 bg-white/10 border border-white/60 shadow-xl text-center rounded-3xl backdrop-blur-lg flex items-center justify-center hover:bg-white/20 duration-200 ">
                            <FontAwesomeIcon icon={faArrowLeft} className="duration-200 ease-in-out" />
                        </button>
                    </div>
                    <div className="w-[50%] flex justify-end ">
                        <button onClick={handleNext} className="active:scale-90 focus:scale-1 hover:text-white  blurey  ease-in-out xl:w-20 xl:h-20 w-16 h-16 bg-white/10 border border-white/60 shadow-xl text-center rounded-3xl backdrop-blur-lg flex items-center justify-center hover:bg-white/20 duration-200 ">
                            <FontAwesomeIcon icon={faArrowRight} className=" duration-200 ease-in-out" />
                        </button>
                    </div>
                </div>
                <div className=" w-[95%] py-5  px-5 rounded-xl  z-50  fixed lg:hidden bottom-2  flex items-center justify-center text-xl ">
                    <div onClick={handlePrev} className="w-[50%] flex  ">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-white/70 w-6 h-6 bg-white/10 p-2 backdrop-blur-lg blurey border border-white/60 rounded-full" />
                    </div>
                    <div onClick={handlePrev} className="w-[50%] flex justify-end  ">
                        <FontAwesomeIcon icon={faArrowRight} className="text-white/70 w-6 h-6 bg-white/10 p-2 backdrop-blur-lg blurey border border-white/60 rounded-full" />
                    </div>
                </div>
            </motion.div>
            }
            </AnimatePresence>

        </div>
    )
}

const Navigition = ({isFixed,selectedGal,language,onSelect}) => {

    const icons = [
        faSchool,         // L'école
        faUserGraduate,   // Élèves
        faLayerGroup,     // Tous
        faUsers,          // Équipe
        faCalendarAlt     // Événement
      ];
   
    const labels = [
        { ar: "المدرسة", fr: "L'école", en: "School" },
        { ar: "التلاميذ", fr: "Élèves", en: "Students" },
        { ar: "الكل", fr: "Tous", en: "All" },
        { ar: "الفريق", fr: "Équipe", en: "Team" },
        { ar: "الأحداث", fr: "Événements", en: "Events" }
    ];

    return (
        <>
            <motion.div
                layout
                transition={{ type: "spring" }}
                className={`${isFixed ? "fixed bottom-0 w-[95%] lg:w-[80%] 2xl:w-[60%] 2xl:px-[40px]" : "absolute bottom-0 w-full "} z-50 p-[10px] 2xl:p-[30px] ease-in-out duration-300`}
            >
                <motion.div
                    initial={{ y: 120, opacity: 0, scaleX: 0.9 }}
                    animate={{ y: 0, opacity: 1, scaleX: 1 }}
                    exit={{ y: 200, scaleX: 0.9, opacity: 0 }}
                    layout
                    transition={{ type: "spring", }}
                    className={`w-full ${isFixed ? "rounded-[40px]" : "rounded-[10px] lg:rounded-[25px] 2xl:rounded-[50px]"} blurey shadow-2xl border border-white/80 bg-black/15 backdrop-blur-lg p-4 lg:p-6 2xl:p-8`}
                >
                    <div className={`w-full relative flex items-center justify-between ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                        <motion.div
                            style={language === "ar" ? { right: `${selectedGal * 20}%` } : { left: `${selectedGal * 20}%` }}
                            layout
                            initial={{ y: 90, scale: 0, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ y: 90, scale: 0, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.54 }}
                            className={`w-[20%] items-center justify-center flex h-2 absolute -bottom-2 lg:-bottom-3 xl:-bottom-4 `}
                        >
                            <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2 bg-blue-500 rounded-full shadow-2xl"></span>
                        </motion.div>
                        { 
                            icons.map((icon, index) => (
                                <motion.div
                                    onClick={() => onSelect(index)}
                                    key={index}
                                    layout
                                    transition={{ type: "spring" }}
                                    className={`w-full flex flex-col lg:flex-row items-center justify-center text-center relative cursor-pointer transition-colors duration-300 ${language==="ar"&&"lg:flex-row-reverse"} ${selectedGal === index ? "text-blue-500 " : "text-white/70 hover:text-white/55"} gap-x-4 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    <FontAwesomeIcon icon={icon} className={`text-lg lg:text-3xl ${!isFixed && "text-4xl"}`} />
                                    <p className={`font-semibold text-[11px] mt-1 lg:mt-0 md:text-base lg:text-lg xl:text-xl`}>{labels[index][language]}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
    
}




