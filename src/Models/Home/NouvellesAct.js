import { faArrowRight, faBell, faCircleNodes, faGear, faGlobe} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react";
import lesServices from './Datas/services.json'
import { useInView } from "react-intersection-observer";
import { motion,AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import texts from "./Datas/nouvellesActData.json";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";




const NouvellesAct = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [activestyle, setActiveStyle] = useState({text:'text-neutral-900/40 ',title:'text-neutral-900',image:''});
    const [startAnimation, setStartAnimation] = useState(false);
    const { language } = useSelector((state) => state.presntion); 
    const [popupVisible, setPopupVisible] = useState(false);

    const { ref: motherRef, inView } = useInView({
      threshold: 0.4, // Trigger when 50% of the component is visible
    });
        useEffect(() => {
      setPopupVisible(inView);
    }, [inView]);

    


    const { ref, } = useInView({
        triggerOnce: false, // Allow the inView state to update when visibility changes
        threshold: 0.5, // Adjust threshold based on your needs
        onChange: (isInView) => {
            setStartAnimation(isInView); // Start or stop animation based on visibility
        },
    });

    const handleClick = (index) => {
        if (index===activeIndex) return;
        setActiveStyle({ title: 'text-neutral-100  opacity-0 translate-y-30',text: 'text-neutral-100  opacity-50 translate-y-20',image:'translate-y-72 scale-90 opacity-0 ' });
        setTimeout(() => {
            setActiveStyle({ title: 'text-neutral-900 text-base md:text-2xl opacity-1 ',text: 'text-neutral-900/40 opacity-1', image: 'scale-1 opacity-1 ' });
            setActiveIndex(index); 
        }, 200); 
    };
    
    useEffect(() => {
        if (!startAnimation) return; // Ensure animation starts only when `startAnimation` is true
    
        const interval = setInterval(() => {
            setActiveStyle({ title: 'text-neutral-100  opacity-0 translate-y-30',text: 'text-neutral-100  opacity-50 translate-y-20',image:' scale-90 opacity-0 ' });
            setTimeout(() => {
                setActiveStyle({ title: 'text-neutral-900 text-base md:text-2xl opacity-1 ',text: 'text-neutral-900/40 opacity-1', image: 'scale-1 opacity-1 ' });
                setActiveIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));

            }, 200);
        }, 6000);
    
        return () => clearInterval(interval);
    }, [startAnimation]);

    const costumeAnimtion = (x=0,y=0,s=150,dm=15) =>{
        return {
            initial: { x: x,y: y },
            whileInView: { x: 0, y:0  },   
            transition: { type: "spring", stiffness: 150, damping: 15 },
        }
    }

    
    const navigate = useNavigate()
    return (
      <>  <div ref={motherRef} className="w-[90%] md:-scroll-my-10 lg:my-20  flex-col flex  justify-center  text-neutral-900">

      <div className={`w-full lg:w-full lg:ml-0 flex flex-col lg:flex-row items-center mb-10`}>
          <motion.div {...costumeAnimtion('-100%')} className={`flex-1 lg:w-[54%] lg:mr-[3%]  text-5xl md:text-[110px]  lg:text-7xl xl:text-8xl 2xl:text-9xl ${language==='ar'&&'text-right 2xl:text-[130px]'}`}>
              <span className={`flex ${language==='ar'&&'flex-row-reverse '}`}>
                  <h1 className="font-normal  m-0 p-0 md:mr-4 md:mb-2"><b>{texts.texts.header1[language]}</b></h1>
                  <motion.span {...costumeAnimtion('200%')} className=" text-center flex-1 flex items-center justify-center ">
                      <p className="bg-neutral-100 md:text-2xl lg:text-sm xl:text-xl 3xl:text-2xl text-[12px] lg:py-4 xl:py-6 md:py-6 py-3 w-full md:px-10 rounded-full font-semibold">{texts.texts.header2[language]}</p>
                  </motion.span>
              </span>
              <h1 className="font-normal mb-2"><b>{texts.texts.header3[language]}</b></h1>
              <h1 className={`font-normal w-full ${language==="ar"?'':'md:tracking-wider lg:text-wide'} mb-2`}><b>{texts.texts.header4[language]}</b></h1>
              <span className={`flex ${language==='ar'&&'flex-row-reverse'}`}>
                  <span className="flex-1 flex items-center  justify-center overflow-hidden">
                      <motion.div onClick={()=>navigate('/services')} {...costumeAnimtion('-100%')} className={` bg-blue-500 w-full rounded-full flex items-center justify-center md:px-4 md:py-4 px-1 py-3 ds cursor-pointer ${language==='ar'?'flex-row-reverse ':'md:pl-8 '}`}>
                          <p className="w-[85%] font-semibold lg:text-sm xl:text-2xl md:text-2xl text-[12px] text-white">{texts.texts.connect_button[language]}</p>
                          <span className={`h-full text-6xl rounded-full bg-white shadow-lg flex justify-center items-center overflow-hidden  mr-1 md:mr-0 ${language==='ar'&&'rotate-180'}`}>
                              <FontAwesomeIcon className="md:w-10 md:h-10 lg:w-6 lg:h-6 xl:w-10 xl:h-10 text-[12px]  rounded-full text-blue-500 p-2  " icon={faArrowRight}/>
                          </span>
                      </motion.div>
                  </span>
                  <h1 className={`flex-1 font-normal text-right ${language==='ar'?' xl:mr-4':' xl:ml-4'}`}><b>{texts.texts.header5[language]}</b></h1>
              </span>
              <p className={`w-full text-neutral-900/40 mt-3 text-[10px] lg:text-sm xl:text-base md:text-base md:mb-10 lg:mb-0 text-justify ${language==="ar"&&' w-full '}`}>{texts.texts.description[language]}</p>
          </motion.div>

          <motion.div {...costumeAnimtion('70%')} className="flex-1 lg:flex-1 overflow-hidden rounded-b-[50px] z-0 iphone  relative scale-[0.7] md:scale-[1] -mt-10  md:mt-0">
              <div className="absolute rounded-[50px] w-[100%]  h-[86%] bg-neutral-100 bottom-0 left-0 z-0"></div>
              <div className="absolute rounded-[50px] w-[87%] h-full bg-neutral-100 top-0 left-0 z-0"></div>
              <div className="absolute rounded-full w-40 h-40 bg-neutral-100 top-[9%] right-[9%] z-0"></div>
              <div className="absolute top-0 scale-[0.85] md:scale-[1] -right-1 md:right-0 bg-blue-500 text-white rounded-full w-1 h-1 p-9 text-3xl flex items-center justify-center"><FontAwesomeIcon icon={faCircleNodes}/></div>
              <div className=" w-full  top-0 left-0 z-20 p-10 lg:pt-7 xl:pt-16 pt-16 relative"> 
                  <motion.img initial={{x:70,scale:0.1,y:70}} whileInView={{x:0,scale:1,y:0}} transition={{type:"spring"}}  alt='img' src={process.env.PUBLIC_URL+`/images/${language==="ar"?'phoneAr.webp':(language==="fr"?'phoneFr.webp':'phoneEng.webp')}`} className="h-96 lg:h-60 xl:h-96 w-auto  absolute md:-bottom-6 bottom-0 -right-40  lg:-right-24 xl:-right-40 z-0"/>
                  <p className="w-[80%] text-neutral-900/50 lg:text-xs text-base xl:text-base font-semibold">{texts.texts.real_time_connect[language]}</p>
                  <h1 className={`text-6xl lg:text-4xl mt-5 ${language==="ar"?'xl:text-8xl':'xl:text-6xl'}`}><b>{texts.texts.free_header[language]}</b></h1>
                  <p className="text-neutral-900/50 font-semibold w-full lg:text-xs text-base xl:text-base">{texts.texts.free_description[language]}</p> 
                  <ul className="xl:mt-14 lg:mt-6 mt-14 text-neutral-900/40 ">
                      <li className="font-semibold text-blue-500 text-xl lg:text-lg xl:text-xl"><FontAwesomeIcon className="text-blue-500 text-xl mr-2 " icon={faBell}/>{texts.texts.stay_informed[language]}</li>
                      <li className="text-sm lg:text-xs xl:text-sm">{texts.texts.stay_informed_detail[language]}</li>
                      <li className="font-semibold text-red-500 text-xl lg:text-lg xl:text-xl mt-9 lg:mt-6 xl:mt-9"><FontAwesomeIcon className="text-red-500 text-xl mr-2" icon={faGlobe}/>{texts.texts.always_connected[language]}</li>
                      <li className="text-sm lg:text-xs xl:text-sm">{texts.texts.always_connected_detail[language]}</li>
                      <li className="font-semibold text-blue-500 text-xl lg:text-lg xl:text-xl mt-9 lg:mt-6 xl:mt-9"><FontAwesomeIcon className="text-blue-500 text-xl mr-2" icon={faGear}/>{texts.texts.at_your_service[language]}</li>
                      <li className="text-sm lg:text-xs xl:text-sm w-[60%] md:w-full">{texts.texts.at_your_service_detail[language]}</li>
                  </ul>
                  <p className="text-neutral-900/20 text-[10px] lg:text-[6px] xl:text-[10px] mt-10 lg:mt-2 xl:mt-10 -mb-8">{texts.texts.visit_us[language]}</p>  
              </div>
          </motion.div>
      </div>

      <motion.div {...costumeAnimtion('0%','50%',100,10)} ref={ref} className="w-full flex flex-col md:flex-row overflow-hidden md:bg-neutral-100  py-12 rounded-[50px] -mt-20 md:mt-2 text-center md:text-left ez relative">
          <div className=" w-full h-full absolute top-0 left-0 z-0 flex items-center justify-center md:hidden">
              <img alt='img' className={` h-80 transition-all ease-in-out duration-200  ${activestyle.image}`} src={process.env.PUBLIC_URL+lesServices[activeIndex].images}></img>
          </div>
          <div className=" w-full h-full absolute top-0 left-0 z-0 blurey backdrop-blur-[3px] bg-black/5 md:hidden">
      
          </div>
          <div className="flex-1 px-10 overflow-hidden text-base md:text-sm lg:text-xl z-10 h-full md:pt-0 pt-10">
              <h1>
                  <b>{lesServices[activeIndex].title1[language]}</b>
              </h1>
              <h1 className={`transition-all ease-in-out duration-200 lg:h-10`}>
                  <b>
                  {lesServices[activeIndex].title2[language]}{" "}
                  <b>{lesServices[activeIndex].boldTitle[language]}</b>
                  </b>
              </h1>
              <p className={`lg:text-sm text-[10px] w-full mt-4 transition-all ease-in-out duration-200 md:h-20 ${activestyle.text}`}>
                  {lesServices[activeIndex].paragraph[language]}
              </p>
              <div className="flex mt-6 md:mt-0 lg:mt-6">
                  <span className="pr-10 border-gray-900/20 border-r">
                      <p className="text-neutral-900/40 md:text-sm text-[10px] mb-2">
                          {lesServices[activeIndex].metrics.totalSessions[language]}
                      </p>
                      <h1 className="text-3xl text-blue-500"><b>{lesServices[activeIndex].metrics.totalSessions.value}</b></h1>
                  </span>
                  <span className="pl-10">
                      <p className="text-neutral-900/40 md:text-sm text-[10px] mb-2">
                          {lesServices[activeIndex].metrics.totalHours[language]}
                      </p>
                      <h1 className="text-3xl text-red-500"><b>{lesServices[activeIndex].metrics.totalHours.value}</b></h1>
                  </span>
              </div>
          </div>

      
      <div className="flex-1 md:flex hidden">
          <div className="flex-1 relative ">
          <img alt='img' className={`opacity-90 h-80 md:h-64 lg:h-80 scale-125 absolute -bottom-20 transition-all ease-in-out duration-200  ${activestyle.image}`} src={process.env.PUBLIC_URL+lesServices[activeIndex].images}></img>
          </div>
          <div className="flex-1 relative">
              <span className="flex items-end w-full float-right flex-row-reverse -mt-3 pr-10 text-neutral-900/40 tracking-tighter cursor-pointer text-base">

                  {[1, 2, 3, 4].map((item, index) => (
                      <div key={index} onClick={() => handleClick(index)} className={`cursor-pointer px-2 yt h-[40px] flex items-end justify-end ${activeIndex === index ? "font-semibold text-3xl text-neutral-900" : "hover:animate-pulse text-neutral-900/50"}`}>
                          {item}
                      </div>
                  ))}

              </span> 
              <div onClick={()=>navigate('/cycles')} className="p-5 py-3 cursor-pointer bg-red-500 text-center absolute bottom-0 rounded-full text-white right-0 mr-10 font-semibold">
                {texts.texts.read_more[language]}
              </div>
          </div>
      </div>
      </motion.div>
      <AnimatePresence>
      {
        popupVisible&&<PopUp ar={language==="ar"} navTo={'services'}  text={texts.popUp[language]}/>
      }
      </AnimatePresence>
        
  </div>
  </>
    )
}
export default NouvellesAct
