import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLandmark, faLocation, faLocationDot, faPhone, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from 'react';
import PresentationVideo from './PresntionVideo';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux(toolKit)/slices/contentSlice';
import { setShowTopMenu } from '../../redux(toolKit)/slices/showTopMenu';
import { useNavigate } from 'react-router-dom';



const Presontation = () => {
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

    const customAnimation = (op = 0, x, y, delay) => {
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
            <div className={`w-full pt-10 md:pt-0 hidden lg:w-[60%] lg:flex items-center justify-center ${language==='ar'&&'arabic'}` }>
                <div className="md:w-[90%] text-center lg:text-left">
                    {/* Title */}
                    <motion.h1 {...customAnimation(0, '-70%', 0)} className={`  text-neutral-900 md:text-5xl lg:text-5xl  font-semibold  mb-5 ${language==='ar'?'xl:text-8xl text-5xl ':'xl:text-5xl 2xl:text-7xl text-4xl '}`}>
                        <b>{content?.heading?.[language] || 'Loading...'}</b>
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p {...customAnimation(0, '-70%', 0, 0.5)} className="ml-2 text-neutral-900/80 mb-5">
                        {content?.paragraph?.[language] || 'Loading...'}
                    </motion.p>

                    {/* Categories */}
                    <div className="flex justify-center lg:justify-start mb-3">
                        {(content?.categories?.[language] || []).map((category, index) => (
                            <motion.span {...customAnimation(0, '-100%', 0, 0.25 * index)} key={index} className={`${index % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'} blurey backdrop-blur-lg text-white p-2 px-4 rounded-full mx-1`}>
                                {category}
                            </motion.span>
                        ))}
                    </div>

                    {/* Language Change Buttons */}
                    <div className="flex  p-2 justify-center items-center gap-2 lg:justify-start ">
                       <motion.div {...customAnimation(0, '-70%', 0,0)}  ><FontAwesomeIcon icon={faPhone}/></motion.div><motion.p className='cursor-pointer'  href="tel:0522705858" {...customAnimation(0, '-70%', 0, 0.2)} >05 22 70 58 58</motion.p>
                       <motion.div {...customAnimation(0, '-70%', 0, 0.4)} ><FontAwesomeIcon className='ml-2' icon={faEnvelope}/></motion.div><motion.p {...customAnimation(0, '-70%', 0, 0.6)} >ecoleslatoureiffel@gmail.com</motion.p>
                    </div>
                    <div className="flex mb-4 p-2 justify-center items-center gap-2 lg:justify-start ">
                    <motion.div {...customAnimation(0, '-70%', 0,0)}  ><FontAwesomeIcon icon={faLocationDot}/></motion.div>
                    <motion.p  {...customAnimation(0, '-70%', 0,0.4)} className="mx-2">
                        {language === 'ar' 
                            ? "تجزئة الحديقة، حي الولاء – سيدي مومن، الدار البيضاء، 20402" 
                            : language === 'fr' 
                            ? "Lotissement Al Hadika, Hay Al Walaa – Sidi Moumen, Casablanca, 20402" 
                            : "Lotissement Al Hadika, Hay Al Walaa – Sidi Moumen, Casablanca, 20402"}
                    </motion.p>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex mb-5 justify-center lg:justify-start">
                        <motion.button onClick={()=>navigate('/registration')} {...customAnimation(0, '-70%')} className="bg-neutral-900 text-white px-4 md:p-4 rounded-full hidden md:block shadow-lg hover:bg-neutral-900/90 transition">
                        <p className="mx-2">
  {language === 'ar' ? `تسجيل ${getYears()}` : language === 'fr' ? `Inscription ${getYears()}` : `Registration ${getYears()}`}
</p>


                        </motion.button>
                        <motion.div {...customAnimation(0, '-70%', 0)} onClick={() => setPresention(true)} className="border-2 transition ease-in-out duration-200 border-neutral-900 bg-neutral-900 text-white lg:text-neutral-900 lg:bg-transparent p-1 md:p-2 rounded-full flex items-center justify-center ml-2 cursor-pointer overflow-hidden hover:bg-neutral-900 hover:text-white">
                            <FontAwesomeIcon className="bg-neutral-900 text-white rounded-full p-2 w-4 h-4 shadow-lg " icon={faPlay} />
                            <p className="mx-2">{content?.buttons?.presentation?.[language] || 'Loading...'}</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video Presentation Component */}
            <PresentationVideo prsntation={prsntation} onClose={() => setPresention(false)} />
        </>
    );
};

export default Presontation;
