import {motion} from "framer-motion"
import content from './Datas/emailUsData.json';
import { useSelector } from "react-redux";
const EmailUs = () => {
  const { language } = useSelector((state) => state.presntion); 

    const custumAnimation = (op=0,x,y,delay) => {
        return {
            initial:{opacity:op,x:x,y:y},
            whileInView:{opacity:1,x:0,y:0},
            transition:{type: "spring", stiffness: 100, damping: 15,delay:delay},
        }
    }
    return (
        <>
            <div className="w-[90%] h-[250px] md:h-[350px] lg:h-[400px]  md:mb-20 md:mt-20">

                <motion.div {...custumAnimation(0,0,'100%')} className="w-full lg:rounded-[50px] rounded-3xl bg-red-500 h-full  flex flex-col md:p-20 p-5 text-white relative overflow-hidden">
                    <motion.img {...custumAnimation(0,0,'100%',0.4)} className="absolute bottom-0 -right-[40%] md:-right-[22%] lg:right-0  h-full  w-auto z-0" alt='img' src={process.env.PUBLIC_URL+'/images/eco.webp'}/>
                    <motion.div className="h-[50%] w-full">
                        <h1 className="lg:w-[45%] w-[65%] text-xl md:text-4xl font-bold">{content.headline[language]}</h1>
                    </motion.div>

                    <div className="h-[50%] flex items-end z-10">
                        <motion.div {...custumAnimation(0,0,'100%',0.3)} className="lg:w-[60%] w-[75%] md:pl-8 h-[60%] pl-1 flex items-center justify-center bg-white rounded-2xl lg:rounded-[30px]">
                            <input  className="w-[80%] placeholder:text-neutral-300 text-[9px] md:text-sm outline-none text-neutral-900" placeholder={content.placeholder[language]}/>
                            <div className="w-[20%] flex items-center justify-end pr-2 h-full py-2">
                                <motion.button {...custumAnimation(0,0,'100%',0.5)} className="bg-red-500 h-full lg:rounded-[23px] rounded-xl text-[10px] md:text-base px-2 md:px-4">{content.subscribeButton[language]}</motion.button>
                            </div>
                        </motion.div>
                    </div>
                    <p className="w-full bottom-2 md:absolute left-0 text-white/40 text-[10px] text-center hidden  ">
                    {content.footerText[language]}</p>
                </motion.div>


            </div>
        </>
    )
}
export default EmailUs