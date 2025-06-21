import {motion} from "framer-motion";
import { useSelector } from "react-redux";
export default function GlobeNotification ({msg,onConfirme,onClose}) {
  const { language } = useSelector((state) => state.presntion);

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed z-[999] bg-black/20 w-screen h-screen top-0 left-0  flex items-center justify-center px-2">
            <motion.div  initial={{opacity:0,y:80,scale:0.87}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:90,scale:0.8}} transition={{type:"spring", delay:0.08}} className=" w-[350px] md:w-[500px] rounded-[40px] md:rounded-[50px] bg-white/90 backdrop-blur-xl blurey border border-white/80 shadow-2xl p-[25px] md:p-[30px] flex flex-col items-center justify-between">
                <div dir={language==="ar"&&"rtl"} className={`w-full mb-8 md:mb-14 text-apple-title `}>
                    <p className={`font-bold text-xl mb-4 ${language=="ar"&&"text-2xl"}`} >{msg.title}</p>
                    <p className="">{msg.discrption}</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-[10px]">
                    <div onClick={()=>onConfirme()} className="w-full py-4 rounded-full bg-blue-500 text-center text-white font-bold cursor-pointer">
                        {msg.btn}
                    </div>
                    <div onClick={()=>onClose()} className="w-full py-4 rounded-full bg-apple-light text-center text-apple-dark font-bold cursor-pointer">
                        {{ar:"إغلاق", fr:"Fermer", en:"Close"}[language]}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}