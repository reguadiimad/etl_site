import { faAward, faComments, faGraduationCap, faHandHoldingHeart, faQuoteLeft, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer";
import { useSelector,useDispatch } from "react-redux";
import { setScrollVal } from "../../redux(toolKit)/slices/scrollSlice";
import { useEffect } from "react";
import texts from "./Datas/motDeFondateur.json"
import {motion} from "framer-motion"
import { leftAnimation,rightAnimation,topAnimation,scaleAnimation,bottomAnimation } from "./animation";


const MotDeFondateur = ({id}) =>{
    const dispatch = useDispatch();
    const scrollValue = useSelector((state) => state.scrollVal); // Assuming this is correctly defined in your Redux store
    const { ref: motherRef, inView } = useInView({
      threshold: 0.5, // Trigger when 50% of the component is visible
    });
    const { language } = useSelector((state) => state.presntion); 
    
    
    useEffect(() => {
      if (inView) {
        dispatch(setScrollVal(id)); // Ensure `id` is defined correctly
      }
    }, [inView, dispatch]);

    return (
        <>
          <div
            ref={motherRef}
            id={id}
            className={`w-[90%] rounded-[40px] items-center justify-center flex flex-col lg:flex-row gap-x-3 my-5 lg:my-20`}
          >
            {/* Main Left Section */}
          
            <motion.div {...leftAnimation(0.25)} className={`lg:w-[70%] md:py-20 lg:py-0 w-full   md:h-[740px] lg:h-[690px] bg-red-500/50  lg:bg-red-500 rounded-[40px] flex items-center relative`}>
            <img
                  className={`rounded-[40px] w-full h-full object-cover object-top -z-10 absolute top-0 lg:hidden origin-top `}
                  src={process.env.PUBLIC_URL + "/images/founder.webp"}
                  alt="Founder"
                />
              <motion.div {...leftAnimation(0.45)}  className={`w-[48%]  hidden lg:block pl-2 h-full relative`}>
                <img
                  className={`absolute w-auto hidden lg:block  lg:h-[120%] 2xl:h-[135%] scale-x-[1.12] xl:scale-x-110 bottom-0 -left-5`}
                  src={process.env.PUBLIC_URL + "/images/fondateur.webp"}
                  alt="Founder"
                />
                <motion.div {...leftAnimation(0.5)} className={`absolute hidden lg:w-52 bg-gradient-to-tr from-black/10 to-white/10 blurey backdrop-blur-xl drop-shadow-2xl -bottom-8 -left-5 rounded-[40px]  font-semibold text-white/70 border border-white/10 text-center lg:flex items-center flex-col justify-center gap-y-2 px-10 py-6 shadow-md`}>
                  <FontAwesomeIcon className={`drop-shadow-md` } icon={faGraduationCap} />
                  <p className={`text-white/70 text-base drop-shadow-md font-bold`}>
                    {texts.educateForFuture[language]}
                  </p>
                </motion.div>
              </motion.div>
              <motion.div {...leftAnimation(0.51)}  className={`lg:flex-1 w-full ${language==="ar"&&"flex flex-col items-end"}  h-full p-4 lg:p-0 pr-5 lg:pr-10 ${language==="ar"?'text-base':'text-base'} text-white text-justify py-4`}>
                <FontAwesomeIcon 
                  icon={faQuoteLeft}
                  className={`2xl:text-9xl lg:text-7xl md:text-6xl text-2xl text-shadow-xl w-full lg:w-auto text-white ${language==="ar"&&'-scale-x-100'}`}
                />
                <motion.p {...bottomAnimation(0.20)} className={`p-2 md:text-base lg:text-sm xl:text-base text-[10px]`}>{texts.paragraph1[language]}</motion.p>
                <motion.p {...bottomAnimation(0.30)} className={`my-1 2xl:my-2 p-2 md:text-base lg:text-sm xl:text-base text-[10px]`}>{texts.paragraph2[language]}</motion.p>
                <motion.p {...bottomAnimation(0.20)} className={`text-red-500 bg-white font-bold p-2 rounded-xl text-center`}>
                  {texts.welcome[language]}
                </motion.p>
                <motion.p {...bottomAnimation(0.1)} className={`text-sm mt-2 text-right p-2`}>
                  <b className={`text-2xl`}>{texts.founder[language]}</b>
                  <br />
                  {texts.founderTitle[language]}
                </motion.p>
              </motion.div>
            </motion.div>
      
            {/* Main Right Section */}
            <motion.div {...rightAnimation()} className={`lg:w-[30%] w-full  mt-20 h-[500px] flex items-center flex-col bg-red-500 rounded-[40px] py-10 relative`}>
              <motion.h1 {...scaleAnimation(0.2)} className={`text-blue-500 text-9xl font-extrabold -mt-24`}>4</motion.h1>
              <motion.div {...scaleAnimation(0.4)} className={`w-[90%] text-center text-white ${language==="ar"?'text-4xl':'text-2xl'}`}>
                <b>{texts.promisesOfFounder[language]}</b>
              </motion.div>
              <div className={`w-[90%] h-full mt-10 grid grid-cols-2 grid-rows-2 text-white/80 text-center`}>
                {texts.promises[language].map((promise, index) => (
                  <motion.div {...scaleAnimation(0.25*index)} key={index} className={`flex items-center justify-center flex-col text-sm gap-4`}>
                    <FontAwesomeIcon
                      icon={
                        [
                          faAward,
                          faUserGraduate,
                          faHandHoldingHeart,
                          faComments,
                        ][index]
                      }
                      className={`text-white/95 text-6xl md:text-7xl lg:text-6xl`}
                    />
                    <p className={`px-4 text-[12px] lg:text-sm xl:text-base ${language==="ar"&&'text-xl'}`}>{promise}</p>
                  </motion.div>
                ))}
                <p className={`absolute w-[90%] left-[5%] text-center bottom-2 text-white/60 text-[10px] ${language==="ar"&&'text-sm bottom-4'}`}>
                  {texts.principles[language]}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      );}
      
export default MotDeFondateur; 