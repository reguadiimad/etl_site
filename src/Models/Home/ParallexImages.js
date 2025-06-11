import React, { useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import { useSelector } from 'react-redux';

const ParallaxImage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  const handleMouseMove = e => setMousePosition({x: e.clientX, y: e.clientY,});

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const animationProps = (x=0,y=0,delay,sacled=true) => ({
    initial: { opacity: 0,x:x, y: x, scale: sacled?0.5:1 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring', stiffness: 150, damping: 20, delay },
    viewport: { once: false, amount: "some" },
  });
  const costumeAnimtion = () =>{
    return {
        initial: { opacity:0 },
        whileInView: { opacity:1  },   
        transition: { type: "spring", stiffness: 100, damping: 15, },
    }
}
const { language } = useSelector((state) => state.presntion); 

  return (
    <motion.div {...costumeAnimtion('-100%')} className="hidden lg:block w-[41.1%] h-[96%] absolute top-0 right-0">
      <div className="w-full h-full relative">
        <motion.div layout  {...animationProps()}  className={`w-full -ml-2 ${language==="ar"&&"w-[104%] -ml-[5%]"}   rounded-[50px] m-4  h-[87.2%] bg-blue-500 relative overflow-hidden`}>
          <img
            className="h-[40%] left-[55%] absolute bottom-40"
            alt="shape1"
            src={process.env.PUBLIC_URL + '/parallex/shape1.webp'}
            style={{
              
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            }}
          />
          <img
            className="h-[70%] left-[10%] absolute -bottom-10 scale-110"
            alt="shape2"
            src={process.env.PUBLIC_URL + '/parallex/shape2.webp'}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
        </motion.div>
      </div>
      <img className="h-[30%] -left-[2%] absolute bottom-10 scale-110 text-shadow-xl"
        alt="shape3"
        src={process.env.PUBLIC_URL + '/parallex/shape3.webp'}
        style={{
          transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
        }}
      />
      <img
        className="h-[75%] -left-[2%] absolute -bottom-10 text-shadow-xl"
        alt="shape4"
        src={process.env.PUBLIC_URL + '/parallex/shape4.webp'}
        style={{
          transform: `translate(${mousePosition.x * 0.014}px, ${mousePosition.y * 0.012}px)`,
        }}
      />
      <img
        className="h-[15%] left-[20%] absolute top-[30%] text-shadow-xl"
        alt="shape5"
        src={process.env.PUBLIC_URL + '/parallex/shape5.webp'}
        style={{
          transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
        }}
      />

      <img
        className="lg:h-[75%] xl:h-[83%] left-[30%] xl:left-[36%] absolute bottom-0"
        alt="girl"
        src={process.env.PUBLIC_URL + `/parallex/${language==='ar'?'girlar.webp':(language==='en'?'girleng.webp':'girl.webp')}`}
        style={{
            transform: `translate(${mousePosition.x * 0.013}px)`,
          }}
      />
      <img
        className="lg:h-[53%] xl:h-[58%] w-auto theBoy left-[5%] absolute bottom-20 scale-125"
        alt="boy"
        src={process.env.PUBLIC_URL + '/parallex/boy.webp'}
        style={{
            transform: `translateY(${mousePosition.y * 0.01}px)`,
            scale: '125%'
          }}
      />
    </motion.div>
  );
};

export default ParallaxImage;
