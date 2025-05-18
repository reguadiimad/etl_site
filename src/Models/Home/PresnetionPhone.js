import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLandmark, faLocation, faLocationDot, faPhone, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from 'react';
import PresentationVideo from './PresntionVideo';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux(toolKit)/slices/contentSlice';
import { setShowTopMenu } from '../../redux(toolKit)/slices/showTopMenu';
import { useNavigate } from 'react-router-dom';



const PresontationPhone = () => {
    const [prsntation, setPresention] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(prsntation){
          dispatch(setShowTopMenu(false))
        }else{
          dispatch(setShowTopMenu(true))
        }
        }, [dispatch,prsntation]);
    const { language, presntion: content } = useSelector((state) => state.presntion);

    const customAnimation = (op = 0, x, y, delay,scale) => {
        return {
            initial: { opacity: op, x: x, y: y },
            whileInView: { opacity: 1, x: 0, y: 0 },
            transition: { type: 'spring', stiffness: 100, damping: 15, delay: delay },
        };
    };

    const handleLanguageChange = (newLanguage) => {
        dispatch(setLanguage(newLanguage));
    };
    const getYears = () => (new Date().getMonth() + 1) < 4 ? `${new Date().getFullYear()-1}-${new Date().getFullYear()}` : `${new Date().getFullYear()}-${new Date().getFullYear()+1}`;


    return (
        <>
            <div className='w-full pt-28 md:pt-48 flex flex-col items-center justify-center  lg:hidden'>

                <div className='w-[95%] flex items-center justify-center flex-col text-center  '>
                    <motion.p className="text-apple-dark w-[90%] text-xs sm:text-sm mb-1" {...customAnimation(0, '-70%', 0, 0.5)} >
                        {content?.paragraph2?.[language] || 'Loading...'}
                    </motion.p>
                    <motion.h1  className={`${language==='ar'?'text-5xl md:text-6xl ':'text-4xl md:text-5xl  '}text-apple-title `} {...customAnimation(0, '-70%', 0)}>
                        <b>{content?.heading?.[language] || 'Loading...'}</b>
                    </motion.h1>
                    <div className="flex justify-center lg:justify-start mt-5 mb-3">
                        {(content?.categories?.[language] || []).map((category, index) => (
                            <motion.span {...customAnimation(0, '-100%', 0, 0.25 * index)} key={index} className={`${index % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'} blurey backdrop-blur-lg text-white p-2 px-4 rounded-full mx-1`}>
                                {category}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex  p-2 justify-center items-center mb-4 gap-2 lg:justify-start ">
                       <motion.div  {...customAnimation(0, '-70%', 0,0)}  ><FontAwesomeIcon icon={faPhone}/></motion.div><motion.a className='cursor-pointer'  href="tel:0522705858" {...customAnimation(0, '-70%', 0, 0.2)} >05 22 70 58 58</motion.a>
                       <motion.div {...customAnimation(0, '-70%', 0, 0.4)} ><FontAwesomeIcon className='ml-2' icon={faEnvelope}/></motion.div><motion.a href='mailto:ecoleslatoureiffel@gmail.com' {...customAnimation(0, '-70%', 0, 0.6)} >ecoleslatoureiffel@gmail.com</motion.a>
                    </div>

                    <div className="flex mb-5 justify-center lg:justify-start">
                        <motion.button onClick={()=>navigate('/registration')} {...customAnimation(0, '-70%')} className="border-2 border-apple-title px-4 md:p-4 rounded-full  transition">
                        <p className="mx-2">
  {language === 'ar' ? `تسجيل ${getYears()}` : language === 'fr' ? `Inscription ${getYears()}` : `Registration ${getYears()}`}
</p>


                        </motion.button>
                        <motion.div {...customAnimation(0, '-70%', 0)} onClick={() => setPresention(true)} className="border-2 transition ease-in-out duration-200 border-neutral-900 bg-neutral-900 text-white lg:text-neutral-900 lg:bg-transparent p-1 md:p-2 rounded-full flex items-center justify-center ml-2 cursor-pointer overflow-hidden hover:bg-neutral-900 hover:text-white">
                            <FontAwesomeIcon className="bg-neutral-900 text-white rounded-full p-2 w-4 h-4 shadow-lg " icon={faPlay} />
                            <p className="mx-2">{content?.buttons?.presentation?.[language] || 'Loading...'}</p>
                        </motion.div>
                    </div>

                    <div className='w-full flex justify-center items-end    h-[330px] md:h-[380px] overflow-hidden rounded-3xl'>
                        <motion.img {...customAnimation(0, 0, '70%',0.1)}  className='h-[105%]' src={process.env.PUBLIC_URL+`/parallex/par${language}.webp`}/>
                    </div>

                    
                   
                    

                   
                </div>
                    
            </div>
            <PresentationVideo prsntation={prsntation} onClose={() => setPresention(false)} />
        </>
    );
};

export default PresontationPhone;
