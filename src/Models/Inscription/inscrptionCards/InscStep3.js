import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmationModal, TheInput, TheSelect } from "./InsCard";
import { useSelector } from "react-redux";
import translations from "../InscData/step3Data.json";

export function InscStep3({ isActive, refProp, onNext }) {
  const [hasRead, setHasRead] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { language } = useSelector((state) => state.presntion);
  const t = translations[language].step3;

  return (
    <div
      className={
        "flex-none w-full lg:w-[60%] h-[600px] lg:h-[750px] my-10 flex items-center justify-center " +
        (isActive
          ? "scale-100 blur-0 transition-transform duration-500"
          : "scale-90 blur-sm transition-transform duration-500")
      }
      ref={refProp}
    >
      <div dir={language==="ar"&&"rtl"} className="bg-white w-full h-[95%] flex justify-center lg:p-8 rounded-[20px] shadow-xl overflow-y-scroll text-apple-title">
        <div className="w-[90%] relative h-full flex flex-col items-center justify-center text-center">

          <img
            className="h-14 lg:h-16 -mr-2 -mt-10"
            src={process.env.PUBLIC_URL + "/images/prvc1.webp"}
            alt="logo"
          />

          <p className="text-xl lg:text-2xl font-semibold">
            <span className="text-blue-500 font-semibold">
              {t.heading}
            </span>
          </p>

          <p className="lg:text-base text-apple-dark w-[85%]">
            {t.subheading}
          </p>

          <div dir={language==="ar"&&"rtl"}  className={`w-full h-[50%] lg:h-[65%] rounded-lg bg-apple-light mt-4 p-2 text-apple-dark  text-xs space-y-4 ${language==="ar"?"text-right":"text-left"}`}>
            <div dir={language==="ar"&&"rtl"}  className="w-full h-full overflow-y-scroll">

              <h3 className="font-semibold text-sm lg:text-base">
                {t.important}
              </h3>
              <p>{t.importantText}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section1Title}
              </h3>
              <p>{t.section1Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section2Title}
              </h3>
              <p>{t.section2Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section3Title}
              </h3>
              <p>{t.section3Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section4Title}
              </h3>
              <p>{t.section4Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section5Title}
              </h3>
              <p>{t.section5Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section6Title}
              </h3>
              <p>{t.section6Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section7Title}
              </h3>
              <p>{t.section7Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section8Title}
              </h3>
              <p className="whitespace-pre-line">{t.section8Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section9Title}
              </h3>
              <p>{t.section9Text}</p>

              <h3 className="font-semibold lg:text-sm mt-4">
                {t.section10Title}
              </h3>
              <p>{t.section10Text}</p>

            </div>
          </div>

          <div className="w-full flex items-center justify-center mt-5">
            <div className="flex-1 flex items-center text-apple-dark gap-2">
              <input
                onChange={(e) => setHasRead(e.target.checked)}
                className="cursor-pointer"
                type="checkbox"
              />
              <p className="lg:text-sm text-left">{t.checkboxLabel}</p>
            </div>

            <div className="w-[70%] flex items-center justify-end gap-2">
              <div
                onClick={() => {
                  setAccepted(false);
                  window.location.reload();
                }}
                disabled={!hasRead}
                className={
                  "p-1.5 lg:p-3 rounded-lg cursor-pointer font-semibold text-apple-dark " +
                  (hasRead ? "bg-apple-light" : "bg-apple-light opacity-25")
                }
              >
                {t.btnReject}
              </div>
              <div
                onClick={() => {
                  setAccepted(true);
                  onNext();
                }}
                disabled={!hasRead}
                className={
                  "p-1.5 lg:p-3 rounded-lg cursor-pointer font-semibold text-white " +
                  (hasRead ? "bg-blue-500" : "bg-blue-500 opacity-25")
                }
              >
                {t.btnAccept}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
