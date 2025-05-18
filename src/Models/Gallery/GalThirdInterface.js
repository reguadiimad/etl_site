import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import TheGallery from "./TheGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function GalThirdInterface({visibleNav}) {
    const language = useSelector((state) => state.presntion.language);
    const translations = {
        fr: {
            fb:"Continuer avec Facebook",
            inst:"Continuer avec Instagram",
            
            subtitle: "La Galrie",
            title: "Moments Vivants",
            description:
                "Découvrez à travers cette galerie une collection d’albums uniques capturant les instants forts de la vie scolaire. Visages rayonnants, souvenirs inoubliables",
        },
        en: {
            fb:"Continue with Facebook",
            inst:"Continue with Instagram",
            subtitle: "The Gallery",
            title: "Living Moments",
            description:
                "Explore this gallery to discover a collection of unique albums capturing key moments of school life. Radiant faces, unforgettable memories.",
        },
        ar: {
            fb:"متابعة عبر فيسبوك",
            inst:"متابعة عبر انستغرام",
            subtitle: "المعرض",
            title: "لحظات حية",
            description:
                "اكتشف من خلال هذا المعرض مجموعة من الألبومات الفريدة التي تخلد اللحظات القوية من الحياة المدرسية. وجوه مشرقة وذكريات لا تُنسى.",
        },
    }   
    const { subtitle, title, description,fb,inst } = translations[language] || translations.fr;

   
    

    return (
        <>
            <div className={`w-[90%] mt-16 lg:mt-40 flex text-center lg:text-left flex-col lg:flex-row ${language=="ar"&&'lg:flex-row-reverse lg:text-right'} items-center justify-center gap-1 lg:gap-4`}>
                <div className={`lg:w-[60%]`}>
                    <p className={`text-neutral-500 font-semibold`}>{subtitle}</p>
                    <h1 className={`text-blue-500 ${language==="ar"?"text-5xl sm:text-6xl md:text-7xl xl:text-8xl":"text-4xl sm:text-5xl md:text-6xl xl:text-7xl"} font-bold`}><b>{title}</b></h1>
                </div>
                <div className={`lg:w-[40%] flex ${language=="ar"?"lg:text-left":"lg:text-right"} text-neutral-500`}>
                    <p>{description}</p>
                </div>
            </div>
            <TheGallery visibleNav={visibleNav}/>
            <div className="w-[90%]  flex flex-col md:flex-row  items-center justify-center gap-x-2">
                {/* Facebook Button */}
                <motion.a initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}
                    href="https://web.facebook.com/lesecoleslatoureiffel/photos_by?locale=fr_FR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-[#1877F2] text-white flex items-center justify-center border border-[#1877F2] rounded-xl mt-4 gap-x-2 shadow-sm cursor-pointer transition-shadow hover:shadow-md ${language=="ar"?"flex-row-reverse":""}`}
                >
                    <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                    <p className="font-semibold">{fb}</p>
                </motion.a>

                {/* Instagram Button */}
                <motion.a initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring",delay:0.15 }}
                    href="https://www.instagram.com/lesecoleslatoureiffel2/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white border border-[#E4405F]/50 flex items-center justify-center rounded-xl mt-4 gap-x-2 shadow-sm cursor-pointer transition-shadow hover:shadow-md ${language=="ar"?"flex-row-reverse":""}`}
                >
                    <FontAwesomeIcon icon={faInstagram} className="text-xl text-[#E4405F]" />
                    <p className="font-semibold">{inst}</p>
                </motion.a>
</div>



      </>
      
    );
}




