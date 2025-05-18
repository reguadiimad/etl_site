import { useState } from "react";
import { ValidateModal } from "./InsCard";
import { useSelector } from "react-redux";
import translations from "../InscData/step4Data.json";

export function InscStep4({
  isActive,
  values,
  onSubmit,
  onBackToStep,
  showValidateModal
}) {
  const { language } = useSelector((state) => state.presntion);
  const t = translations[language];

  const responsable = values.responsable;
  const eleve = values.eleve;

  return (
    <div dir={language==="ar"&&"rtl"} 
      className={
        "flex-none w-full lg:w-[60%] h-[600px] lg:h-[750px] my-10 flex " +
        "items-center justify-center transition-transform duration-500 " +
        (isActive ? "scale-100 blur-0" : "scale-90 blur-sm")
      }
    >
      <div className="bg-white w-full h-[95%] flex justify-center lg:p-8 rounded-[20px] shadow-xl overflow-y-scroll text-apple-title">
        <div className="w-[90%] relative h-full flex flex-col items-center justify-center text-center">

          <img
            className="h-14 lg:h-16 -mr-2 -mt-10"
            src={process.env.PUBLIC_URL + "/images/share.webp"}
            alt="logo"
          />

          <p className="text-xl lg:text-2xl font-semibold">
            {t.heading.split(" ").map((word, i) =>
              word.toLowerCase() === "envoi" || word.toLowerCase() === "submit" ? (
                <span key={i} className="text-blue-500 font-bold">
                  {word}
                </span>
              ) : (
                word + " "
              )
            )}
          </p>

          <p className="lg:text-base text-apple-dark w-[85%] mt-2">
            {t.subheading}
          </p>

          {/* DISPLAY DATA */}
          <div  dir={language==="ar"&&"rtl"}  className={`w-full h-auto rounded-lg bg-apple-light mt-4 p-4 text-apple-dark  lg:text-sm space-y-6 ${language==="ar"?"text-right":"text-left"}`}>

            {/* Responsable */}
            <div>
              <h3 className="font-semibold text-blue-500 lg:text-base">
                {t.sectionResponsableTitle}
              </h3>
              <p>
                {t.responsableLName}:{" "}
                <strong>{responsable.responsableLName}</strong>
              </p>
              <p>
                {t.responsableFName}:{" "}
                <strong>{responsable.responsableFName}</strong>
              </p>
              <p>
                {t.responsableEmail}:{" "}
                <strong>{responsable.responsableEmail}</strong>
              </p>
              <p>
                {t.responsablePhone}:{" "}
                <strong>{responsable.responsablePhone}</strong>
              </p>
              <p>
                {t.responsableType}:{" "}
                <strong>{responsable.responsableType}</strong>
              </p>
              <div
                onClick={() => onBackToStep(1)}
                className="text-blue-500 underline cursor-pointer lg:text-sm mt-1"
              >
                {t.modifyLink}
              </div>
            </div>

            {/* Élève */}
            <div>
              <h3 className="font-semibold text-blue-500 lg:text-base">
                {t.sectionEleveTitle}
              </h3>
              <p>
                {t.eleveLName}: <strong>{eleve.eleveLName}</strong>
              </p>
              <p>
                {t.eleveFName}: <strong>{eleve.eleveFName}</strong>
              </p>
              <p>
                {t.eleveBirthDate}:{" "}
                <strong>
                  {eleve.eleveDay}/{eleve.eleveMonth}/{eleve.eleveYear}
                </strong>
              </p>
              <p>
                {t.eleveNiveau}: <strong>{eleve.nivSco}</strong>
              </p>
              <p>
                {t.eleveClasse}: <strong>{eleve.classActual}</strong>
              </p>
              <p>
                {t.eleveInstitut}: <strong>{eleve.institut}</strong>
              </p>
              <div
                onClick={() => onBackToStep(2)}
                className="text-blue-500 underline cursor-pointer lg:text-sm mt-1"
              >
                {t.modifyLink}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="w-full flex items-center justify-center mt-6">
            <div
              onClick={onSubmit}
              className="bg-blue-500 cursor-pointer px-6 py-2 rounded-lg text-white font-semibold"
            >
              {t.btnSubmit}
            </div>
          </div>
        </div>
      </div>

      <ValidateModal msg={thankYouMessage[language]} isVisible={showValidateModal} />
    </div>
  );
}

const thankYouMessage = {
  fr: "Merci d'avoir complété l'inscription de votre enfant.",
  en: "Thank you for completing your child’s registration.",
  ar: "شكراً لإتمام تسجيل طفلكم."
};
