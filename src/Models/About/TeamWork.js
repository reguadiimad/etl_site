import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,useDispatch } from "react-redux";
import { setScrollVal } from "../../redux(toolKit)/slices/scrollSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import texts from "./Datas/teamWorkData.json"
import {leftAnimation,rightAnimation,bottomAnimation } from "./animation";
import {motion} from "framer-motion";


const TeamWork = ({id}) => {
    const content = texts.teamSection;
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
        <div id={id} ref={motherRef} className={`w-[90%] lg:flex ${language==="ar"&&'flex-row-reverse text-xl text-right'} items-center justify-center gap-x-5 my-20 text-neutral-900`}>
          <div className={`lg:w-[70%] flex flex-col riri`}>
            <motion.p {...leftAnimation(0)} className={`text-neutral-500`}>{content.heading[language]}</motion.p>
            <motion.h1 {...leftAnimation(0.2)} className={`xl:text-8xl lg:text-6xl md:text-5xl text-3xl w-full   ${language==="ar"&&'xl:text-9xl lg:text-7xl md:text-6xl text-4xl '} text-blue-500`}>
              <b>{content.title[language]}</b>
            </motion.h1>
      
            <div className={`w-full flex gap-x-1 md:gap-x-4 mt-8 text-neutral-500`}>
              {content.contentBlocks.map((block, index) => (
                <motion.div {...bottomAnimation(index*0.25)}
                  key={index}
                  className={`flex-1 rounded-2xl text-[10px] lg:text-lg lg:rounded-[40px] border text-center md:text-left  ${
                    index === 1 ? "bg-blue-500 text-white/80 " : "border-black/10"
                  } md:p-5 lg:p-8 p-2`}
                >
                  <p className={`mb-8 md:text-base lg:text-sm xl:text-base`}>{block.title[language]}</p>
                  <p className={`mb-4 md:text-base lg:text-sm xl:text-base`}>
                    <b className={index === 1 ? "text-white" : "text-neutral-600"}>
                      {block.description[language]}
                    </b>
                  </p>
                </motion.div>
              ))}
            </div>
      
            <div className={`w-full flex gap-x-2`}>
              {content.additionalInfo.map((info, index) => (
                <motion.div {...bottomAnimation(index*0.22)} key={index} className={`flex-1  text-neutral-500 text-[10px] lg:text-sm xl:text-base mt-2 lg:mt-0  md:pl-5 lg:p-8 md:text-sm `}>
                  {info[language]}
                </motion.div>
              ))}
            </div>
          </div>
      
          <div className={`lg:w-[30%] w-full md:flex lg:flex-col md:gap-x-4 justify-between`}>
            <motion.div {...rightAnimation(0.2)} className={`w-full bg-red-500 text-white md:flex items-center justify-center rounded-2xl lg:rounded-[40px] text-[10px] md:text-base lg:text-sm xl:text-base mt-4 lg:mt-0 text-center p-2 md:p-5 lg:p-8`}>
              {content.sidebar[language]}
            </motion.div>

            <motion.div {...bottomAnimation(0.2)} className={`w-full lg:h-[530px] md:min-h-[400px] h-[350px] lg:rounded-[40px] flex flex-col justify-end items-center relative`}>
              <div className={`bg-red-500 rounded-2xl lg:rounded-[40px]  h-[50%] w-full`}></div>
              <img
                className={`absolute bottom-8 md:bottom-10 max-h-80 md:max-h-max -ml-6 scale-[1.2] sm:scale-x-[0.7] md:scale-x-100 md:scale-[1.25] lg:scale-[1.4] xl:scale-[1.2]  w-full`}
                src={`${process.env.PUBLIC_URL}/images/eqp1.webp`}
                alt="Team"
              />
              <div className={`bg-gradient-to-tr from-black/10 to-white/10 drop-shadow-2xl text-white/70 border border-white/10 shadow-2xl absolute -bottom-6 gap-x-4 py-6 p-4 rounded-[40px] blurey backdrop-blur-xl items-center justify-center flex`}>
                <FontAwesomeIcon className={`text-3xl`} icon={faUsers} />
                <p className={`font-bold text-base`}>{content.footer[language]}</p>
              </div>
            </motion.div>
          </div>
          
        </div>
      );
      
}

export default TeamWork;