import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export const TheInput = ({ value, onValueChange, name, error, type = "text", required, disabled = false,dealy=0 }) => {
  const [clicked, setClicked] = useState(false);
  const { language } = useSelector((state) => state.presntion);
  
  return (
    <div dir={language==="ar"&&"rtl"} className="w-full h-full flex flex-col gap-1">
      <div onFocus={() => setClicked(true)} onBlur={() => setClicked(false)} className="w-full h-full flex items-center inp relative">
        <input
          disabled={disabled}
          required
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={`w-full border rounded-xl lg:rounded-2xl lg:px-4 px-3 py-5 pb-2 outline-none duration-300 ${disabled && "opacity-20"} ${error ? "border-red-500 bg-red-100 focus:outline-red-500" : "border-apple-dark focus:outline-blue-500"}`}
        />
        <motion.span
          layout
          transition={{ type: "spring",dealy:dealy }}
          className={`absolute w-full pointer-events-none flex lg:px-4 px-3 ${error ? "text-red-500" : "text-apple-dark/80"} ${disabled && "opacity-20"} ${value !== "" || clicked ? "text-[10px] top-1 lg:top-0" : ""}`}
        >
          {name}
        </motion.span>
      </div>
      <span dir={language==="ar"&&"rtl"} className={`text-xs h-2 w-full ${language==="ar"?"text-right":"text-left"} text-red-500 px-2`}>{error}</span>
      <div className="bg-red-400 text-blue-500" value="jjj"/>
    </div>
  );

};

export const TheSelect = ({ value = "", onValueChange, name, error, required, data, disabled = false,displayed,isMonth=false }) => {
  const [clicked, setClicked] = useState(false);
  const { language } = useSelector((state) => state.presntion);

  return (
    <div className="w-full flex flex-col gap-1">
      
      <div dir={language==="ar"&&"rtl"} className={`w-full px-4 rounded-xl lg:rounded-2xl relative cursor-pointer ease-in-out duration-300 ${disabled ? "opacity-20" : ""} ${error ? "border-red-500 border bg-red-100" : "border border-apple-dark bg-white"}`}>
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={`w-full appearance-none bg-transparent border-none outline-none ${value === "" ? "pt-3.5 pb-3.5 text-apple-dark/80" : "pt-5 pb-2"} ${(error && value === "") && "text-red-500 bg-red-100"} rounded-2xl cursor-pointer`}
        >
          <option value="" disabled>
            {name}
          </option>
          {data.map((item, i) => (
            <option key={i} value={isMonth?i+1:item}>
              {displayed?displayed[i]:item}
            </option>
          ))}
        </select>
        <motion.span
          layout
          transition={{ type: "spring" }}
          className={`absolute w-full pointer-events-none flex ease-in-out duration-300 ${value === "" ? "opacity-0 top-3" : "opacity-100 top-0.5 lg:top-1 text-[10px] lg:text-xs"} ${error ? "text-red-500" : "text-apple-dark"}`}
        >
          {name}
        </motion.span>
      </div>
      <span dir={language==="ar"&&"rtl"} className={`text-xs h-2 w-full ${language==="ar"?"text-right":"text-left"} text-red-500 px-2`}>{error === 0 ? "" : error}</span>
    </div>
  );
};

export const ConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  const { language } = useSelector((state) => state.presntion);

  // In-component translations
  const messages = {
    fr: {
      question: "Êtes-vous sûr de vouloir effacer toutes les données saisies ?",
      cancel: "Retourner",
      confirm: "Vider"
    },
    en: {
      question: "Are you sure you want to clear all entered data?",
      cancel: "Go back",
      confirm: "Clear"
    },
    ar: {
      question: "هل أنت متأكد من رغبتك في مسح جميع البيانات المدخلة؟",
      cancel: "رجوع",
      confirm: "مسح"
    }
  };

  const t = messages[language] || messages.fr; // fallback to French

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 180, scale: 0.7, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 180, scale: 0, opacity: 0 }}
          transition={{ type: "spring" }}
          className="absolute w-[50%] p-5 bg-white border-apple-dark/50 border flex-col rounded-3xl shadow-2xl flex items-center justify-center"
        >
          <p className="text-center">{t.question}</p>
          <div className="flex w-full items-center justify-center mt-5">
            <div
              onClick={onClose}
              className="flex-1 cursor-pointer text-apple-dark text-left underline"
            >
              {t.cancel}
            </div>
            <div
              onClick={onConfirm}
              className="flex-1 cursor-pointer text-red-500 text-right underline"
            >
              {t.confirm}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ValidateModal = ({
  isVisible,
  onClose,
  msg = "Merci d'avoir complété l'inscription de votre enfant.",
  isErr=false,
  onErrClick,
  onOtherKid,ui
}) => {
  const { language } = useSelector((state) => state.presntion)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 180, scale: 0.7, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 180, scale: 0, opacity: 0 }}
          transition={{ type: "spring" }}
          className="absolute w-full h-full p-5 gap-5 bg-white/40 backdrop-blur-lg border flex-col rounded-3xl shadow-2xl flex items-center justify-center"
        >
          <p className="text-center">{msg}</p>
         {!isErr&& <FontAwesomeIcon icon={faCheck} className="text-blue-500 text-7xl py-5"/>}
          <div className="flex w-full items-center justify-center mt-5">
            <div
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
            >
              {{
                fr: "Fermer",
                en: "Close",
                ar: "إغلاق"
              }[language]}
              
            </div>

            {
              isErr &&  <div onClick={onErrClick}
  
              className="px-4 py-2 bg-blue-500 text-white ml-4 rounded cursor-pointer"
            >
              {{
                fr: "Modifier",
                en: "Edit",
                ar: "تعديل"
              }[language]}</div>
            }
          </div>
         {(!isErr&&ui)&& <p onClick={onOtherKid} className="underline text-apple-dark/60 mt-4 cursor-pointer ">{otherChildText[language]}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}


const otherChildText = {
  fr: "Vous avez un autre enfant ? Cliquez ici",
  en: "Do you have another child? Click here",
  ar: "هل لديك طفل آخر؟ انقر هنا"
}