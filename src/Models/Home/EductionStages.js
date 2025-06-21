
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import texts from './Datas/eductioStageData.json'
import PopUp from './PopUp';
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';

export default function EducationStages() {
    const navigate = useNavigate();
    const { language } = useSelector((state) => state.presntion); 
    const [lastScrollY, setLastScrollY] = useState(0);
    const [direction, setDirection] = useState(0);
    const [popupVisible, setPopupVisible] = useState(false);

    const { ref: motherRef, inView } = useInView({
      threshold: 0.5, // Trigger when 50% of the component is visible
    });

    const animationProps = (delay,sacled=true) => ({
      initial: { opacity: 0, y: -50, scale: sacled?0.5:1 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      transition: { type: 'spring', stiffness: 150, damping: 20, delay },
      viewport: { once: false, amount: "some" },
    });
    
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 0.7 : -0.7; // Determine scroll direction
        setDirection(scrollDirection);
        setLastScrollY(currentScrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [lastScrollY]);
    

    useEffect(() => {
      setPopupVisible(inView);
    }, [inView]);

    
    return (
     <>
    
      <motion.div ref={motherRef} initial={{opacity:0}} whileInView={{opacity:1}} transition={{ type: 'spring' }} className='w-[90%] relative flex items-center flex-col  py-5 md:py-28 mb-10  bg-red-500 rounded-[50px] roundedd'>
      <div className='w-full flex p-3 items-center flex-col'>
          <motion.h1 className='text-lg md:text-2xl text-blue-500' {...animationProps(0.1)}>
            <b>{texts.texts.title[language]}</b>
          </motion.h1>

          <motion.h1 className='text-3xl md:text-7xl text-center text-white mb-4' {...animationProps(0.2)}>
            <b>{texts.texts.subtitle[language]}</b>
          </motion.h1>

          <motion.p className='md:w-[70%] md:text-lg lg:text-2xl text-center text-white/90' {...animationProps(0.3)}>
          {texts.texts.description[language]}
          </motion.p>

          <motion.p className='md:block hidden md:w-[85%] tiny text-center text-white/60 lg:text-base' {...animationProps(0.5)}>
          {texts.texts.secondary_description[language]}
          </motion.p>
        </div>

        <motion.div className=' grid grid-cols-2 grid-rows-2  md:w-full lg:w-[85%] md:flex md:items-center md:justify-center lg:p-4 mt-10 text-neutral-900/50' {...animationProps(0.3,false)}>

          <span onClick={() => navigate('/cycles')} style={{transform: `translateY(${direction * (0.8 + 1) * 10}px)`}} className='md:flex-1 w-[90%] mx-2 md:mx h-72 md:h-[450px] lg:h-[600px] roundedd  lg:mx-3 overflow-hidden relative boxyy '>
            <img className='object-cover h-full w-full' src={process.env.PUBLIC_URL + '/images/imk1.webp'} alt='Maternelle' />
            <div  className='w-[90%] py-4 lg:py-0 lg:h-[40%] absolute bottom-4 left-[5%] bg-white/50 blurey backdrop-blur-lg rounded-3xl z-20 flex items-center justify-center flex-col boxy'>
              <span className='px-4 py-1 bg-black/10 rounded-3xl text-white'>{texts.texts.stages[0].name[language]}</span>
              <h1 className='lg:text-5xl md:text-4xl text-3xl text-blue-500 md:my-2 font-semibold flex flex-col justify-center items-center'>3-5<p className='lg:text-xl text-lg -mt-2 font-bold text-white'>{texts.texts.stages[0].age[language]}</p></h1>
              <p className='w-[90%] hidden lg:block  text-center  xl:text-base'>
              {texts.texts.stages[0].goal[language]}
              </p>
              <h5 className="w-[90%] hidden opacity-0 text-center tiny lg:text-base">{texts.texts.stages[0].more[language]}</h5>
              <button className="underline text-white/90 hidden">{texts.btn[language]}</button>
            </div>
          </span>
  
          <span onClick={() => navigate('/cycles')}  className='md:flex-1 w-[90%] mx-2 h-72 md:h-[450px] lg:h-[600px]  roundedd md:mx-3 overflow-hidden relative boxyy'>
            <div style={{transform: `translateY(${direction * (1.3 + 1) * 10}px)`}} className='w-full mb-5 h-[50%] overflow-hidden relative'>
              <div  className='w-[90%] lg:h-[80%] py-4 lg:py-0  absolute bottom-4 left-[5%] bg-white/50 blurey backdrop-blur-lg rounded-3xl z-20 flex items-center justify-center flex-col boxy'>
                <span className='px-4 py-1 bg-black/10 rounded-3xl text-white'>{texts.texts.stages[1].name[language]}</span>
                <h1 className='lg:text-5xl md:text-4xl text-3xl text-blue-500 my-2 font-semibold flex flex-col justify-center items-center'>6-10<p className='md:text-xl text-lg -mt-2 text-white font-bold'>{texts.texts.stages[0].age[language]}</p></h1>
                <p className='w-[90%] hidden lg:block text-center text-neutral-900/50 text-base'>
                {texts.texts.stages[1].goal[language]}

                </p>
              </div>
              <img className='object-cover h-full' src={process.env.PUBLIC_URL + '/images/imk22.webp'} alt='Primaire' />
            </div>
            <div style={{transform: `translateY(${direction * (1.5 + 1) * 10}px)`}} className='w-full mt-5 bg-white h-[50%] overflow-hidden'>
              <img className='object-cover w-full' src={process.env.PUBLIC_URL + '/images/imk2.webp'} alt='Primaire Details' />
            </div>
          </span>
  
          <span onClick={() => navigate('/cycles')} style={{transform: `translateY(${direction * (2 + 1) * 10}px)`}} className='md:flex-1 mt-4  w-[90%] mx-2 h-72 md:h-[450px] lg:h-[600px]  roundedd md:mx-3 overflow-hidden relative boxyy'>
            <img className='object-cover h-full w-full' src={process.env.PUBLIC_URL + '/images/imk3.webp'} alt='Collège' />
            <div className='w-[90%] py-4 lg:py-0 lg:h-[40%] absolute bottom-4 left-[5%] bg-white/50 blurey backdrop-blur-lg rounded-3xl z-20 flex items-center justify-center flex-col boxy'>
              <span className='px-4 py-1 bg-black/10 rounded-3xl text-white'>{texts.texts.stages[2].name[language]}</span>
              <h1 className='lg:text-5xl md:text-4xl text-3xl text-blue-500 my-2 font-semibold flex flex-col justify-center items-center'>11-14<p className='md:text-xl text-lg -mt-2 text-white font-bold'>{texts.texts.stages[0].age[language]}</p></h1>
              <p className='w-[90%] hidden lg:block text-center text-neutral-900/50 text-base'>
              {texts.texts.stages[2].goal[language]}

              </p>
              <h5 className="w-[90%] hidden opacity-0 text-center tiny xl:text-base">{texts.texts.stages[2].more[language]}</h5>
              <button className="underline text-white hidden">{texts.btn[language]}</button>
            </div>
          </span>
  
          <span onClick={() => navigate('/cycles')} style={{transform: `translateY(${direction * -(1.7 + 1) * 10}px)`}} className='md:flex-1 mt-4 w-[90%] mx-2 h-72 md:h-[450px] lg:h-[600px]  roundedd md:mx-3  overflow-hidden relative boxyy'>
            <img className='object-cover h-full w-full' src={process.env.PUBLIC_URL + '/images/imk4.webp'} alt='Lycée' />
            <div className='w-[90%] py-4 lg:py-0 lg:h-[40%] absolute bottom-3 lg:bottom-4 left-[5%] bg-white/50 blurey backdrop-blur-lg rounded-3xl z-20 flex items-center justify-center flex-col boxy'>
              <span className='px-4 py-1 bg-black/10 rounded-3xl text-white'>{texts.texts.stages[3].name[language]}</span>
              <h1 className='lg:text-5xl md:text-4xl text-3xl text-blue-500 my-2 font-semibold flex flex-col justify-center items-center'>15-18<p className='md:text-xl text-lg -mt-2 text-white font-bold'>{texts.texts.stages[0].age[language]}</p></h1>
              <span className='text-center text-xs font-bold animate-pulse text-white'>{texts.texts.new[language]}</span>

              <p className='w-[90%]  block text-center text-neutral-900/50 lg:text-base text-[9px] sm:text-xs'>
              {texts.texts.stages[3].goal[language]}

              </p>
              <h5 className="w-[90%] hidden opacity-0 text-center tiny xl:text-base">{texts.texts.stages[3].more[language]}</h5>
              <button className="underline text-white/90 hidden">{texts.btn[language]}</button>
            </div>
          </span>
        </motion.div>

        <motion.section {...animationProps(0.3,false)} className='flex flex-col justify-center items-center mt-4 md:mt-12 text-white/60 text-justify text-base'>
        <p className={`w-[89%] md:mb-2 mt-4 text-[9px] ${language==="ar"?'md:text-xl text-right':'md:text-base'}`}><b>{texts.pidagogie[language].name}</b>{texts.pidagogie[language].description}</p>
            <img className='md:h-32 h-12 w-[90%] object-cover opacity-70 md:-mb-12  lg:-mb-12 md:mt-5 lg:mt-10  overflow-auto' alt='img' src={process.env.PUBLIC_URL+'/images/portonariat.webp'}/>
        </motion.section>
  
      </motion.div>
      <AnimatePresence>
      {
        popupVisible&&<PopUp navTo={'cycles'} white={true} ar={language==="ar"} text={texts.popUp[language]}/>
      }
      </AnimatePresence>
        

     </>
    )
}
