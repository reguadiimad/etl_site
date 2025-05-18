import { faClose, faPause, faPlay, faRefresh, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence} from "framer-motion";
import { useSelector,useDispatch } from 'react-redux';


const PresentationVideo = ({onClose,prsntation}) => {
    useEffect(() => {
        if (prsntation) {
            window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [prsntation]);
    const { language, presntion: content } = useSelector((state) => state.presntion);
    const [isPlay,setIsPlay]=useState(true);
    const [isMute,setIsMute]=useState(false);
    const videoRef = useRef(null);
    const handlePlayPause = () => {
        isPlay? videoRef.current.pause():videoRef.current.play();
        setIsPlay(!isPlay); 
    };
    const skipTime = seconds => videoRef.current && (videoRef.current.currentTime += seconds);
    const replay = () => {videoRef.current && (videoRef.current.currentTime = 0);videoRef.current.play();setIsPlay(true)};
    const mute = () => {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted; // Toggle the mute state
        }
        setIsMute(!isMute)
      };

      useEffect(() => {
        const video = videoRef.current;
      
        if (video) {
          const handlePlay = () => setIsPlay(true);
          const handlePause = () => setIsPlay(false);
          const handleMuteChange = () => setIsMute(video.muted);
      
          // Add event listeners
          video.addEventListener("play", handlePlay);
          
          video.addEventListener("pause", handlePause);
          video.addEventListener("volumechange", handleMuteChange);
      
          // Cleanup function
          return () => {
            if (video) {
              video.removeEventListener("play", handlePlay);
              video.removeEventListener("pause", handlePause);
              video.removeEventListener("volumechange", handleMuteChange);
            }
          };
        }
      }, []);
     
    return (
        <>
        <AnimatePresence mode="wait">
        {prsntation && (
            <motion.section  className="w-screen h-screen  bg-gradient-to-b from-black/85  to-black/60 absolute top-0 left-0 flex items-center justify-center z-50 overflow-hidden flex-col "
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1}} // Animation target (fully visible and in position)
            exit={{ opacity: 0, }} // Exit animation (invisible and slightly above)
           duration={{type:'spring',delay:0.5}}>

                <motion.div exit={{y:'-100%'}}  transition={{type: "spring", stiffness: 100, damping: 15} } className="lg:w-[85%] w-[95%] text-white/70 text-sm md:text-2xl lg:text-3xl font-semibold flex items-center justify-center relative mb-3">
                    <span className="w-[15%] flex">
                    <div className="text-center blurey border-white/20 roundedd border bg-white/10 shadow-lg/10 blurey backdrop-blur-xl text-sm  md:text-lg flex items-center justify-center p-1 md:p-2 text-white/70">
                        <FontAwesomeIcon className=" hover:animate-pulse cursor-pointer w-8" icon={!isMute?faVolumeHigh:faVolumeMute} onClick={mute}/>
                        </div>
                    </span>
                    <h1 className="w-[70%] text-center">{content?.videoTitle?.[language] || 'Loading...'}</h1>
                    <span className="w-[15%]  flex flex-row-reverse">
                        <div className="text-center blurey border-white/20 roundedd border bg-white/10 shadow-lg/10 blurey backdrop-blur-xl md:text-lg flex items-center justify-center p-1 md:p-2 text-white/70">
                            <FontAwesomeIcon onClick={()=>replay()} className="mr-4 text-sm md:text-xl hover:animate-pulse cursor-pointer" icon={faRefresh}/>
                            <FontAwesomeIcon className="hover:animate-pulse cursor-pointer text-sm md:text-xl" icon={faClose} onClick={onClose}/>
                        </div>
                    </span>
                </motion.div>

                <motion.div initial={{opacity:0,y:50,scale:0.5}} animate={{opacity:1,y:0,scale:1}} exit={{y:'100%'}}  transition={{type: "spring", stiffness: 100, damping: 15} }  style={{padding:'20px'}} className="lg:w-[85%] w-[98%] md:w-[95%] lg:h-[75%] h-[40%]  roundedd blurey backdrop-blur-xl bg-white/10 shadow-lg/10 border border-white/20 flex items-center justify-center overflow-hidden blurey ">
                    <div style={{borderRadius:'20px'}} className="w-full h-full overflow-hidden">
                        <video  className="w-full h-full object-cover outline-none" ref={videoRef} autoPlay controls loop>
                            <source src={"https://res.cloudinary.com/dukid4ptc/video/upload/v1746807491/dpzitf9vsypkfm3qmzon.mp4"} type="video/mp4" />
                        </video>
                    </div>
                </motion.div>

                <motion.div initial={{y:100,scale:0.5}} animate={{y:0,scale:1}} exit={{y:'-100%'}}  transition={{type: "spring", stiffness: 100, damping: 15} }  className=" px-6 p-2 roundedd blurey backdrop-blur-xl bg-white/10 shadow-lg/10 mt-4 border border-white/20 flex items-center justify-center">
                    <img alt='img'  onClick={()=>skipTime(-10)} className="md:h-7 h-5 opacity-70 hover:opacity-100 hover:animate-pulse cursor-pointer" src={process.env.PUBLIC_URL+'/images/-10.webp'}/>
                    <FontAwesomeIcon icon={isPlay?faPause:faPlay} className="text-center w-16 text-2xl md:text-5xl text-white/70 md:mx-7 cursor-pointer hover:text-white hover:animate-pulse" onClick={handlePlayPause}/>
                    <img alt='img' onClick={()=>skipTime(10)} className="md:h-7 h-5  opacity-70 hover:opacity-100 hover:animate-pulse cursor-pointer" src={process.env.PUBLIC_URL+'/images/+10.webp'}/>
                </motion.div>

            </motion.section>)
        }
        </AnimatePresence>
        </>
    );
};

export default PresentationVideo;
