import { faArrowLeft, faArrowRight,faPaintBrush, faFutbol, faLandmark, faBookOpen, faMountain,faUtensils,faMousePointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState,useEffect} from "react";
import {motion,AnimatePresence} from "framer-motion";
import texts from './Datas/newsEventsData.json';
import slides from './Datas/slides.json'
import { useSelector } from "react-redux";
import PopUp from "./PopUp";
import { useInView } from "react-intersection-observer";

const iconMap = {
  faMountain,
  faPaintBrush,
  faBookOpen,
  faLandmark,
  faFutbol,
  faUtensils
};

const NewsEvents = () => {
  const { language } = useSelector((state) => state.presntion); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const currentDate = new Date();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [popupVisible, setPopupVisible] = useState(false);

    const { ref: motherRef, inView } = useInView({
      threshold: 0.6, // Trigger when 50% of the component is visible
    });
      useEffect(() => {
        setPopupVisible(inView);
      }, [inView]);

  const filteredSlides = slides[language].filter(
    (slide) => selectedCategory === "Tous" || slide.category === selectedCategory
  );
  
  const upcomingEvents = filteredSlides.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  });
  
  const pastEvents = filteredSlides.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
  });
  const totalSlides = [...upcomingEvents, ...pastEvents].length + 1;

  useEffect(() => {
    const prevSlide = () => {
      setCurrentIndex((prev) => {
        const newIndex = prev === 0 ? totalSlides - 1 : prev - 1;
        ensureVisible(newIndex);
        return newIndex;
      });
    };
    
    const nextSlide = () => {
      setCurrentIndex((prev) => {
        const newIndex = prev === totalSlides - 1 ? 0 : prev + 1;
        ensureVisible(newIndex);
        return newIndex;
      });
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };
  
    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [totalSlides]); // Include totalSlides if it might change
  


  const prevSlide = () => {
  setCurrentIndex((prev) => {
    const newIndex = prev === 0 ? totalSlides - 1 : prev - 1;
    ensureVisible(newIndex);
    return newIndex;
  });
};

const nextSlide = () => {
  setCurrentIndex((prev) => {
    const newIndex = prev === totalSlides - 1 ? 0 : prev + 1;
    ensureVisible(newIndex);
    return newIndex;
  });
};
  const ensureVisible = (index) => {
    const container = containerRef.current;
    const child = container?.children[index];

    if (container && child) {
      const containerRect = container.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();
      if (
        childRect.left < containerRect.left ||
        childRect.right > containerRect.right
      ) {
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };
  const custumAnimation = (op=0,x,y,delay) => {
    return {
        initial:{opacity:op,x:x,y:y},
        whileInView:{opacity:1,x:0,y:0},
        transition:{type: "spring", stiffness: 100, damping: 15,delay:delay},
    }
  }


  return (
    <>
    <section ref={motherRef} className="w-[90.3%] flex justify-center pt-20 items-center flex-col rounded-[60px] md:my-10 md:mb-20">
      <div className="w-full">
        <motion.p {...custumAnimation(0,'-80%',0,0)} className="text-neutral-400 text-sm md:text-lg xl:text-2xl">{texts.stay_informed[language]}</motion.p>
        <div className="w-full flex mb-10">
          <motion.h1  {...custumAnimation(0,'-100%',0,0)} className="text-4xl md:text-7xl xl:text-8xl w-[80%] text-blue-500 mt-3">
            <b>{texts.dont_miss_news[language]}</b>
          </motion.h1>
          <div className="flex-1 flex-row-reverse flex items-end mb-2.5">

            <motion.button  {...custumAnimation(0,'100%',0,0)} onClick={nextSlide} className={`w-10 h-10 text-lg md:w-20 md:h-20 bg-red-500 ml-2 text-white rounded-lg md:rounded-[30px] md:text-2xl hover:animate-pulse`}>
              <FontAwesomeIcon icon={faArrowRight} />
            </motion.button>

            <motion.button  {...custumAnimation(0,'100%',0,0.25)} onClick={prevSlide} className="w-10 h-10 text-lg  md:w-20 md:h-20 bg-red-500 text-white rounded-lg md:rounded-[30px] md:text-2xl hover:animate-pulse">
              <FontAwesomeIcon icon={faArrowLeft} />
            </motion.button>

          </div>
        </div>
        <div className="w-full flex gap-1 md:gap-3 -mt-2 dots">
  
        {texts.categories[language].map((category,i) => (
          <motion.button
          {...custumAnimation(0,'-100%',0,0.15*i)}
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentIndex(0);
            }}
            className={
              selectedCategory === category
                ? "py-2 px-2 md:py-3 rounded-xl md:px-8 border-2 border-blue-500 text-white bg-blue-500 text-center md:rounded-3xl font-semibold"
                : "py-2 px-2 md:py-3 rounded-xl md:px-8 border-2 border-blue-500 text-blue-500 text-center md:rounded-3xl font-semibold"
            }
          >
            {category}
          </motion.button>
        ))}
          
        </div>
        <motion.div {...custumAnimation(0)} ref={containerRef} className="cards relative h-[660px]   w-full flex items-center dots overflow-x-scroll scrollbar-hide">

          {
            upcomingEvents.map((slide, index=0) => <Card language={language} id={slide.id}  isNew={true} isActive={index === currentIndex} title={slide.title} description={slide.description} category={slide.category} image={slide.image} icon={slide.icon} date={slide.date} readMore={texts.read_more[language]} onClick={()=>setCurrentIndex(index)}/>)
          }

          <div className={`h-[600px] flex items-center justify-center flex-col -mx-8 text-neutral-300 text-sm ${pastEvents.length>0?'scale-1':'opacity-0 scale-50'}`}>
            <span className="w-[2px] h-[20%] rounded-full bg-neutral-300 mb-2"></span>
            <FontAwesomeIcon icon={faArrowRight}/>
            <span className="  my-10  -rotate-90">récemment</span>
            <span className=" mb-7 mt-5  -rotate-90">Survenu</span>
            <FontAwesomeIcon  icon={faArrowRight}/>
            <span className="w-[2px] h-[20%] mt-2 rounded-full bg-neutral-300"></span>
          </div>

          {
            pastEvents.map((slide, index) => {
              const adjustedIndex = index + upcomingEvents.length; 
              return <Card language={language} i={index} id={slide.id}  isActive={adjustedIndex === currentIndex} title={slide.title} description={slide.description} category={slide.category} image={slide.image} icon={slide.icon} date={slide.date} readMore={texts.read_more[language]} onClick={() => setCurrentIndex(adjustedIndex)}/>  
            })
          }

          <div onClick={()=>setCurrentIndex(totalSlides-1)} key="static-final" className={`relative cursor-pointer w-[300px] dots dotds h-[90%] flex-shrink-0 flex items-center justify-center rounded-[40px] overflow-hidden ${currentIndex !== totalSlides - 1 ? "scale-90 scale-y-85 opacity-80" : ""}`}>
            <img alt='img' src={process.env.PUBLIC_URL + "/images/madrasa.webp"} className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/5 blurey backdrop-blur-md flex items-center justify-center flex-col text-white/80 text-base">
            <FontAwesomeIcon className={`text-6xl text-white ${ currentIndex === totalSlides - 1 ? "scale-1" : "scale-50 opacity-10"}`} icon={faMousePointer}/>
            <p className={`mt-3 ${ currentIndex !== totalSlides - 1 ? "opacity-10" : "opacity-100"}`}>{texts.more[language]}</p>
          </div>
          <span className=" absolute bottom-3 text-[8px] w-[90%] text-center text-white/50">
            {texts.click_to_see_more[language]}
          </span>
        </div>
        </motion.div>

      </div>
    </section>
     <AnimatePresence>
     {
       popupVisible&&<PopUp ar={language==="ar"} navTo={'/news'} text={texts.popUp[language]}/>
     }
     </AnimatePresence></>
       
  );
};

const Card = ({id, isActive, title, description, category, image, icon, date, onClick, isNew=false,i,language,readMore }) => {
  const icn=iconMap[icon];
  
  return (

      <motion.div  key={id}  onClick={onClick} className={` w-[300px] h-[90%] dots cursor-pointer ${ isActive ? "opacity-100 shadow-xl  bg-red-500 text-white" : " bg-black/10 text-black scale-90 scale-y-85 opacity-80 shadow-sm blur-[0.1px]"} flex-shrink-0 rounded-[40px]  relative overflow-hidden `}>

      <span className={`absolute ${isNew?'top-9':'top-7'}  left-7 rounded-full text-neutral-600 h-10 px-4 bg-white text-sm flex items-center justify-center font-semibold`}>
        {category}
      </span>
      
      { isNew && <span className="absolute top-1.5 left-0 w-full text-center animate-pulse text-sm font-semibold">{texts.new[language]}</span>}

      <span className={`absolute ${isNew?'top-9':'top-7'} right-7 rounded-full text-neutral-600 h-10 w-10 flex items-center justify-center bg-white text-sm font-semibold`}>
        <FontAwesomeIcon icon={icn} />
      </span>

      <div className={`w-full h-[48%] ${isNew?'pt-24':'pt-20'}  px-7`}>
        <p className={`msc text-sm  ${isActive?'text-white/70':'text-neutral-900/70'} mt-2 opacity-70 `}>{date}</p>
        <h1 className="msc text-4xl  "><b>{title}</b></h1>
        <p className="msc text-sm mt-3   opacity-70">{description}</p>
      </div>

      <img src={process.env.PUBLIC_URL + image} className={`w-full h-[52%] bottom-0 left-0 absolute object-cover rounded-[40px] ${!isActive&&'blur-[0.5px]'} `} alt={title} />

      <span className={`absolute bottom-5 -left-3 flex items-center justify-center dots blurey backdrop-blur-md bg-black/30 text-white pl-5 py-2 pr-2 rounded-full gap-x-4 text-base ${ isActive ? "opacity-100 shadow-2xl scale-100 translate-x-8" : "opacity-0  translate-x-20 "}`}>
         {readMore}
        <div className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full text-blue-500">
          <FontAwesomeIcon icon={faArrowRight} />

         
        </div>
      </span>

    </motion.div>

  );
};

export default NewsEvents;
