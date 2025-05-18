import {motion} from "framer-motion";
import { useSelector } from "react-redux";


export default function GalExplain() {
    const language = useSelector((state) => state.presntion.language); 
    const content = {
        fr: (
          <>
            <span className="text-neutral-900 font-bold">Une galerie magique</span>, où chaque image révèle des instants inoubliables et des émotions vibrantes.
            Laissez-vous transporter par une aventure artistique qui capte l'essence de notre école.
            <span className="text-neutral-900 font-bold">Vivez l'expérience visuelle</span> et partagez la magie de chaque photo.
          </>
        ),
        en: (
          <>
            <span className="text-neutral-900 font-bold">A magical gallery</span>, where each image reveals unforgettable moments and vibrant emotions.
            Let yourself be transported on an artistic journey that captures the essence of our school.
            <span className="text-neutral-900 font-bold">Live the visual experience</span> and share the magic of every photo.
          </>
        ),
        ar: (
            <>
              <span className="text-neutral-900 font-bold">معرض ساحر</span>، حيث تكشف كل صورة عن لحظات لا تُنسى ومشاعر نابضة.
              دع نفسك تنغمس في رحلة فنية تلتقط جوهر مجتمعنا وتعكس تنوع مدرستنا وثراءها.
              <span className="text-neutral-900 font-bold">عِش التجربة البصرية</span> بكل تفاصيلها، وتأمل الجمال الكامن في كل لقطة.
              من ضحكة عابرة إلى نظرة صامتة، كل صورة تحكي حكاية، وكل لحظة تحمل معنى.
              شارك السحر، وكن جزءاً من قصة تُروى بالضوء واللون.
            </>
          ),
          
    };

    
    return(
        <>
        <div className={`w-[90%] flex flex-col lg:flex-row ${language==="ar"&&'lg:flex-row-reverse'} items-center justify-center`}>
        <motion.div
      className={`lg:w-[40%] w-full h-full  text-lg lg:text-xl ${language === "ar" && "text-xl lg:text-2xl text-right lg:text-left"} mt-10 lg:-mb-24 text-neutral-500 font-semibold`}
      initial={{ opacity: 0,scaleX:0.9, x: (language==="ar"?-100:-100) }}
      whileInView={{ opacity: 1, x: 0,scaleX:1 }}
      transition={{ duration: 0.7,type: "spring",delay: 0.2 }}

    >
      {content[language] || content.fr}
    </motion.div>
  
          <div className={` hidden lg:flex lg:w-[60%] 2xl:w-[50%]  items-end justify-center pb-0 relative h-[550px] lg:h-[700px] 2xl:h-[750px] gap-2`}>
            {
              [...Array(4).keys()].reverse().map((index) => (
                <motion.img
                  initial={{ y: 600, opacity: 1 }}
                  whileInView={{ y: 0, opacity: 1, duration: 0.25 }}
                  exit={{ y: 0 }}
                  transition={{ type: "spring", bounce: 0, delay: 0.11 * index }}
                  viewport={{ amount: 0.1, once: true }}
                  key={'gali' + index}
                  className={`absolute h-full bottom-0 `}
                  src={process.env.PUBLIC_URL + `/gallery/gali${index + 1}.webp`}
                />
              ))
            }
          </div>

          <div className={` flex lg:hidden w-full  items-end justify-center pb-0 relative h-[400px] md:h-[550px] gap-2`}>
            {
              [...Array(4).keys()].reverse().map((index) => (
                <motion.img
                  initial={{ y: 300, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1, duration: 0.25 }}
                  exit={{ y: 0 }}
                  transition={{ type: "spring", bounce: 0, delay: 0.11 * index }}
                  viewport={{ amount: 0.1, once: true }}
                  key={'gali' + index}
                  className={`absolute h-full bottom-0`}
                  src={process.env.PUBLIC_URL + `/gallery/gali${index + 1}.webp`}
                />
              ))
            }
          </div>
        </div>
      </>
      
    )
}