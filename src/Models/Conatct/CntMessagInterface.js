import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { setShowLang } from "../../redux(toolKit)/slices/showLang";
import { faFacebook, faInstagram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import content from "./ConatctData/CntMsgInterfaceData.json";
import axios from "axios";
const lansgContent = {
  messages: {
    success: {
      en: "Your message has been sent to us. Our team at Les Écoles La Tour Eiffel will contact you as soon as possible.",
      fr: "Votre message a été envoyé. Notre équipe des Écoles La Tour Eiffel vous contactera dans les plus brefs délais.",
      ar: "تم إرسال رسالتك بنجاح. سيتواصل معك فريق مدارس لا تور إيفل في أقرب وقت ممكن.",
    },
    error: {
      en: "Failed to submit the form. Please try again.",
      fr: "Échec de l'envoi du formulaire. Veuillez réessayer.",
      ar: "فشل في إرسال النموذج. حاول مرة أخرى من فضلك.",
    },
  },
};


export default function CntMessageInterface() {
  const language = useSelector((state) => state.presntion.language);
  const langContent = content[language] || content.fr;
  const t = langContent.errors;


  const [isParent, setIsParent] = useState(true);
  const [formData, setFormData] = useState({
    isParent: true,
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: ""
  });
  


const validateField = (name, value) => {
  switch (name) {
    case "name":
    case "surname":
      if (value.length < 2) return langContent.errors?.nameRequired || "Required";
      if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)) return langContent.errors?.nameLettersOnly || "Letters only";
      return "";
    case "email":
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return langContent.errors?.invalidEmail || "Invalid email";
      return "";
    case "phone":
      if (value && !/^\d{6,15}$/.test(value)) return langContent.errors?.invalidPhone || "Invalid phone";
      return "";
    case "message":
      if (value.length < 5) return langContent.errors?.messageRequired || "Message too short";
      return "";
    default:
      return "";
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev, [name]: value }));

  const errorMsg = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: errorMsg }));
};




const handleSubmit = async (e) => {
  e.preventDefault();

  // Final validation check
  const newErrors = {};
  Object.entries(formData).forEach(([key, value]) => {
    const error = validateField(key, value);
    if (error) newErrors[key] = error;
  });

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error)) return;

  try {
    const response = await axios.post("http://macbook-pro-2.local:8000/api/contact/submit/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert(lansgContent.messages.success[language] );
    setFormData({
      isParent: true,
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: ""
    });
  } catch (error) {
    console.error("❌ Submission error:", error);
    alert(lansgContent.messages.error[language] || "An error occurred while submitting the form. Please try again.");
  }
};

  
const leftAnimation = (x = 0,d=0) => ({
  initial: { x: x, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { type: "spring",delay:d}
})
const upAnimation = (x = 0,d=0) => ({
  initial: { y: x, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { type: "spring",delay:d}
})


  return (
    <>
      <div className={`w-full py-5 flex items-center justify-center relative text-neutral-500`}>
        <img
          className={`lg:h-[1000px] -z-10 bottom-20 w-full scale-150 lg:scale-100 lg:w-auto   absolute lg:-top-20 ${language==="ar"?'left-0 -scale-100 ':'right-0'} `}
          src={process.env.PUBLIC_URL + `/images/msgBg.webp`}
          alt="map"
        />

        <div className={`w-[90%] flex flex-col lg:flex-row text-center lg:text-left  items-stretch ${language==="ar"&&'lg:flex-row-reverse  lg:text-right'}  justify-center relative gap-4`}>
          <div className={`lg:w-[55%] w-full flex flex-col ${language=="ar"&&" items-end"}`}>
            <motion.p {...leftAnimation(-50)} >{langContent.always_listening}</motion.p>
            <motion.h1 {...leftAnimation(-50)}  className={`text-blue-500 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-5 w-[95%] ${language==="ar"&&'mt-8 text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'}`}>
              <b>{langContent.main_heading}</b>
            </motion.h1>
            <motion.p {...leftAnimation(-50)}  className={` ${language==="ar"?'text-right':"text-justify"}`}>{langContent.description1}</motion.p>
            <motion.p {...leftAnimation(-50)}  className={` ${language==="ar"?'text-right':"text-justify"}`}>{langContent.description2}</motion.p>

            <motion.div {...upAnimation(60)} className={`w-full gap-3 flex flex-col bg-white/5 border-[0.5px] border-black/20 backdrop-blur-xl h-auto shadow-xl mt-3 rounded-[15px]  ${language==="ar"?'text-right':"text-left"} lg:rounded-[30px] p-[5px]  lg:p-[20px]  overflow-hidden relative`}>
              <a
                href="tel:0522705858"
                className={`p-2 text-blue-500 backdrop-blur-lg blurey  ${language==="ar"&&"flex-row-reverse"} px-4 rounded-[10px] border border-black/10 flex items-center hover:bg-black/5 transition`}
              >
                <div className={`w-6 lg:w-14 text-center`}>
                  <FontAwesomeIcon icon={faPhone} className={` text-2xl lg:text-4xl ${language=="ar"&&'-scale-x-100'}`} />
                </div>
                <div className={`${language==="ar"?"mr-4":"ml-4"}`}>
                  <p className={`font-bold text-base`}>{langContent.fix}</p>
                  <p className={`text-neutral-500`}>{langContent.fix_phone}</p>
                </div>
              </a>

              <a
                href="mailto:ecoleslatoureiffel@gmail.com"
                target="_blank"
                className={`p-2 text-blue-500 backdrop-blur-lg blurey  px-4 ${language==="ar"&&"flex-row-reverse"} rounded-[10px] border border-black/10 flex items-center hover:bg-black/5 transition`}
              >
                <div className={`w-6 lg:w-14 text-center`}>
                  <FontAwesomeIcon icon={faMailBulk} className={`text-xl lg:text-4xl`} />
                </div>
                <div className={`${language==="ar"?"mr-4":"ml-4"}`}>
                  <p className={`font-bold text-base`}>{langContent.mail}</p>
                  <p className="text-neutral-500">{langContent.mail_email}</p>
                </div>
              </a>

              <div className={`grid grid-cols-2 xl:flex gap-[5px]   items-center gap-x-2 text-center text-neutral-500 text-sm`}>
                <a
                  href="https://web.facebook.com/lesecoleslatoureiffel/?locale=fr_FR&_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 backdrop-blur-lg blurey  py-2 flex items-center justify-center flex-col border border-black/10 rounded-[10px] gap-2 hover:bg-black/5 transition`}
                >
                  <FontAwesomeIcon className={`text-3xl text-blue-600`} icon={faFacebook} />
                  <p className="text-xs sm:text-base">{langContent.facebook}</p>
                </a>

                <a
                  href="https://wa.me/212661058977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 backdrop-blur-lg blurey  flex items-center justify-center flex-col border border-black/10 rounded-[10px] gap-2 hover:bg-black/5 transition`}
                >
                  <FontAwesomeIcon className={`text-3xl text-green-500`} icon={faWhatsapp} />
                  <p className="text-xs sm:text-base">{langContent.whatsapp}</p>
                </a>

                <a
                  href="https://www.instagram.com/lesecoleslatoureiffel2/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 backdrop-blur-lg blurey  flex items-center justify-center flex-col border border-black/10 rounded-[10px] gap-2 hover:bg-black/5 transition`}
                >
                  <FontAwesomeIcon className={`text-3xl text-rose-600`} icon={faInstagram} />
                  <p className="text-xs sm:text-base">{langContent.instagram}</p>
                </a>

                <a
                  href="https://www.youtube.com/channel/UCVI7SJjZ-xutMt14Ov3CBqQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 flex items-center justify-center flex-col border border-black/10 rounded-[10px] gap-2 hover:bg-black/5 transition`}
                >
                  <FontAwesomeIcon className={`text-3xl text-red-500`} icon={faYoutube} />
                  <p className="text-xs sm:text-base">{langContent.youtube}</p>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div {...leftAnimation(50)}  className={`lg:w-[45%]  w-full ${language=="ar"?"text-right":"text-left"} bg-white/50 text-blue-500 rounded-[30px] p-[20px] shadow-xl border-[0.5px] border-black/20  flex relative overflow-hidden items-center flex-col justify-center`}>
            <p className={`text-neutral-300`}>{langContent.need_help}</p>
            <h1 className={`text-3xl lg:text-5xl font-bold text-center`}>{langContent.contact_us}</h1>
            <p className={`text-neutral-500 mt-5`}>{langContent.you_are}</p>
            <Nav isParent={isParent} clickHandel={(val) => setIsParent(val)} language={language} />

            <div className={`flex flex-col w-full gap-4 mt-5 relative`}>
  <div className="flex-1">
    <p className={`font-bold ${errors.surname ? "text-red-500" : "text-blue-500"}`}>{langContent.surname}*</p>
    <input
      className={`w-full py-2 px-4 bg-black/5 border ${errors.surname ? "border-red-500" : "border-white/50"} outline-none backdrop-blur-lg blurey rounded-[10px]`}
      name="surname"
      value={formData.surname}
      onChange={handleChange}
      placeholder="Adam"
    />
    {errors.surname && <p className="text-red-500 text-xs">{errors.surname}</p>}
  </div>

  <div className="flex-1">
    <p className={`font-bold ${errors.name ? "text-red-500" : "text-blue-500"}`}>{langContent.name}*</p>
    <input
      className={`w-full py-2 px-4 bg-black/5 border ${errors.name ? "border-red-500" : "border-white/50"} outline-none backdrop-blur-lg blurey rounded-[10px]`}
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Doe"
    />
    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
  </div>
</div>

<div className="w-full">
  <p className={`font-bold ${errors.email ? "text-red-500" : "text-blue-500"}`}>{langContent.email}</p>
  <input
    className={`w-full py-2 px-4 bg-black/5 border ${errors.email ? "border-red-500" : "border-white/50"} outline-none backdrop-blur-lg blurey rounded-[10px]`}
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="email@domain.com"
  />
  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
</div>

<div className="w-full">
  <p className={`font-bold ${errors.phone ? "text-red-500" : "text-blue-500"}`}>{langContent.phone}</p>
  <input
    className={`w-full py-2 px-4 bg-black/5 border ${errors.phone ? "border-red-500" : "border-white/50"} outline-none backdrop-blur-lg blurey rounded-[10px]`}
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="06XXXXXXXX"
  />
  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
</div>


<div className="w-full">
  <p className={`font-bold ${errors.message ? "text-red-500" : "text-blue-500"}`}>{langContent.message}*</p>
  <textarea
    className={`w-full h-[120px] py-2 px-4 bg-black/5 border ${errors.message ? "border-red-500" : "border-white/50"} outline-none backdrop-blur-lg blurey rounded-[10px]`}
    name="message"
    value={formData.message}
    onChange={handleChange}
    placeholder="Your message here..."
  />
  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
</div>


            <button
              onClick={handleSubmit}
              className={`bg-blue-500 text-white px-4 py-2 rounded-full font-semibold mt-3 hover:bg-blue-600 transition`}
            >
              {langContent.send}
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

const Nav = ({ isParent, clickHandel, language }) => {
  const langContent = content[language] || content.fr;

  return (
    <motion.div
      layout
      transition={{ type: "spring" }}
      className={`w-[60%] border border-white/80  rounded-full bg-black/5 backdrop-blur-lg blurey z-50 p-[5px] lg:p-[10px] shadow-inner`}
    >
      <div className={`w-full flex items-center py-4 justify-center relative rounded-[10px]`}>
        <div className={`w-full h-full absolute top-0 left-0 z-0 flex overflow-visible`}>
          <motion.div
            layout
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            style={{ left: `${isParent ? "0%" : "50%"}` }}
            className={`w-[50%] absolute top-0 bg-white rounded-full shadow-lg h-full`}
          ></motion.div>
        </div>

        <div
          className={`w-[50%] flex items-center justify-center z-10 cursor-pointer`}
          onClick={() => clickHandel(true)}
        >
          <div className={`w-full h-full flex items-center justify-center rounded-[10px] ${isParent ? "text-blue-500" : "text-neutral-500"}`}>
            <p className={`xl:text-lg font-semibold`}>{langContent.parent}</p>
          </div>
        </div>

        <div
          className={`w-[50%] flex items-center justify-center z-10 cursor-pointer`}
          onClick={() => clickHandel(false)}
        >
          <div className={`w-full h-full flex items-center justify-center rounded-[10px] ${!isParent ? "text-blue-500" : "text-neutral-500"}`}>
            <p className={`xl:text-lg font-semibold`}>{langContent.student}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
