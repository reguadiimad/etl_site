import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import content from "./Datas/footerData.json"

import { useSelector,useDispatch } from "react-redux";
import { setScrollVal } from '../redux(toolKit)/slices/scrollSlice';
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


export default function BottomPage() {
  const { language } = useSelector((state) => state.presntion); 
  const dispatch = useDispatch();
  const scrollValue = useSelector((state) => state.scrollVal);
  const { ref: motherRef, inView } = useInView({
      threshold: 0.2, // Trigger when 50% of the component is visible
    });
        useEffect(() => {
      inView && dispatch(setScrollVal(null))
    },  [inView,dispatch,scrollValue]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(`${content.copy_alert[language]} : ${text}`);
      })
      .catch(() => {
        alert("Échec de la copie du numéro.");
      });
  };
  const isWebGLSupported = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  };
  const webGLSupported = isWebGLSupported();

  return (
    
    <div ref={motherRef} className="w-full flex items-center relative justify-center flex-col pt-5 links ">
      <div className='lg:h-[600px] md:h-[500px] h-[300px]  w-full absolute bottom-0 left-0 lg:scale-x-125 z-0 '>

      </div>
      <div className='w-full h-full absolute top-0 left-0 '></div>
      <div className='lg:w-[95%] w-full pt-2 h-full bg-gradient-to-t from-white/0  to-white/5  blurey backdrop-blur-3xl md:p-10 rounded-t-[40px] galCover'>
      <div className="opacity-65 mb-4 ml-2">
        <div className="w-full flex md:text-base text-[10px] items-end">
          <div className="w-[20%] lg:mr-40 mr-6 -mb-1">
            <img
              src={`${process.env.PUBLIC_URL}/logos/${language==='ar'?'logo1ar.webp':(language==='fr'?'logo1.webp':'logo1eng.webp')}`}
              alt="Logo"
              className="lg:h-20  filter invert mb-2 "
            />
          </div>
          <h1 className="w-[20%] font-extrabold">{content.school_name[language]}</h1>
          <h1 className="w-[20%] font-extrabold">{content.pedagogy[language]}</h1>
          <h1 className="w-[20%] font-extrabold">{content.prenote[language]}</h1>
          <h1 className="w-[20%] font-extrabold">{content.social[language]}</h1>
        </div>
      </div>

      {/* Deuxième section */}
      <div className="opacity-80 border-b ml-2 border-black/15 pb-14">
        <div className="w-full flex">
          <div className="w-[20%] mr-6 lg:mr-40" />

          <div className="w-[20%] flex flex-col font-semibold gap-y-1 md:text-base text-[10px]">
            <Link to="/">{content.home[language]}</Link>
            <Link to="/a-propos">{content.about[language]}</Link>
            <Link to="/mot-du-fondateur">{content.founder_message[language]}</Link>
            <Link to="/nos-valeurs">{content.values[language]}</Link>
            <Link to="/vie-scolaire">{content.school_life[language]}</Link>
            <Link to="/admission">{content.admission[language]}</Link>
          </div>

          <div className="w-[20%] flex flex-col font-semibold gap-y-1 md:text-base text-[10px]">
            <Link to="/maternelle">{content.kindergarten[language]}</Link>
            <Link to="/primaire">{content.primary[language]}</Link>
            <Link to="/college">{content.college[language]}</Link>
            <Link to="/lycee">{content.high_school[language]}</Link>
            <Link to="/conditions-generales">{content.general_conditions[language]}</Link>
            <Link to="/contact">{content.contact[language]}</Link>
            <Link to="/actualites">{content.news_events[language]}</Link>
          </div>

          <div className="w-[20%] flex flex-col font-semibold gap-y-1 md:text-base text-[10px]">
            <Link to="/cantine">{content.canteen[language]}</Link>
            <Link to="/transport">{content.transport[language]}</Link>
            <Link to="/clubs">{content.clubs[language]}</Link>
            <Link to="/garderie">{content.nursery[language]}</Link>
            <Link to="/galerie">{content.gallery[language]}</Link>
          </div>

          <div className="w-[20%] flex flex-col font-semibold gap-y-1 lg:text-xs xl:text-base text-[10px]">
            <div className="flex items-center md:gap-x-3">
              <FontAwesomeIcon className="md:text-xl text-[10px]" icon={faFacebook} />
              <a
                href="https://web.facebook.com/lesecoleslatoureiffel/photos?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className='lg:block hidden'>Écoles La Tour Eiffel</p>
              </a>
            </div>
            <div className="flex items-center md:gap-x-3">
              <FontAwesomeIcon className="md:text-xl text-[10px]" icon={faInstagram} />
              <a
                href="https://www.instagram.com/lesecoleslatoureiffel2/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className='lg:block hidden'>lesecoleslatoureiffel2</p>
              </a>
            </div>
            <div className="flex items-center ">
              <FontAwesomeIcon className="md:text-xl text-[10px] mr-3" icon={faWhatsapp} />
              <span
                className="cursor-pointer hover:text-black/70 mr-1 hidden xl:block"
                onClick={() => copyToClipboard("05 22 70 58 58")}
              >
                05 22 70 58 58 /
              </span>   <span
                className="cursor-pointer hover:text-black/70 md:ml-1 hidden lg:block"
                onClick={() => copyToClipboard("06 61 05 89 77")}
              >
                0661058977
              </span>
            </div>
            <div className="flex items-center md:gap-x-3">
              <FontAwesomeIcon className="md:text-xl text-[10px]" icon={faEnvelope} />
             
              <a href="mailto:ecoleslatoureiffel@gmail.com"><p className='lg:block hidden'>ecoleslatoureiffel@gmail.com</p></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex md:mt-10 m-2 md:m-0 opacity-80 md:text-base text-[10px] items-center justify-center">
        <div className="md:flex-1 w-[80%] gap-x-2 mb-2">
          <FontAwesomeIcon className="text-lg mr-2" icon={faLanguage} />
          <select
            id="language-selector"
            className="outline-none bg-transparent cursor-pointer"
            aria-label="Language Selector">
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
          <p>
            <b>{content.copyright[language]} </b> {new Date().getFullYear()} {content.all_rights_reserved[language]}
          </p>
        </div>
        <div className="flex-1 flex flex-row-reverse opacity-85" />
        <img
          src={`${process.env.PUBLIC_URL}/logos/logo2.webp`}
          alt="Logo 2"
          className="md:h-20 h-10 filter invert mb-2 opacity-85"
        />
      </div>
      </div>
  
     
    </div>
  );
}
