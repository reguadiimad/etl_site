import {motion} from "framer-motion";

import { useNavigate } from "react-router-dom";

const PopUp = ({white=false,text,ar=false,navTo}) => {
    const navigate = useNavigate();
    
    return(
        <>
            <div className="fixed bottom-0 left-0 w-full flex items-center cursor-pointer justify-center pb-5 z-[999] ">
                <motion.div onClick={()=>navigate(navTo)}
                initial={{opacity:0,y:50,scale:0.4}}
                animate={{opacity:1,y:0,scale:1}}
                exit={{opacity:0,y:50,scale:0.5}}
                transition={{type:'spring',stiffness: 200, damping:13}}

                className="rounded-full flex lg:h-16   lg:py-3 blurey backdrop-blur-lg lg:pl-6 lg:pr-2 p-2 bg-apple-light/80 border border-white/10 shadow-lg z-50 gap-x-2 ">
                    
                    <motion.div initial={{opacity:0,scale:0.8,y:15}} animate={{y:0,scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{type:"spring",delay:0.2}}  className={`items-center  z-50 mix-blend-difference flex justify-center font-semibold  lg:px-2 pl-2 text-apple-dark`}>
                    {text}
                    </motion.div>
                    <motion.div className="">
                        <motion.div initial={{opacity:0.8}} animate={{opacity:1}} exit={{opacity:0.8}} transition={{type:'spring'}} className="w-10 h-10 bg-blue-500 flex items-center z-50 justify-center  rounded-full text-white/80 text-xl lg:text-3xl  font-semibold relative"><p className="w-full h-full flex items-center justify-center absolute top-0 text-center ">+</p></motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
export default PopUp