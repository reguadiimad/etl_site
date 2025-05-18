import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {ResponsableSlide1, ResponsableSlide2, ValidateModal} from "./inscrptionCards/InsCard";
import { InscStep1 } from "./inscrptionCards/InscStep1";
import { InscStep2 } from "./inscrptionCards/InscStep2";
import { InscStep3 } from "./inscrptionCards/InscStep3";
import { InscStep4 } from "./inscrptionCards/InscStep4";
import inscriptionTexts from "./InscData/inscFirstInterface.json";


export default function InscriptionSecondInterface() {
  const language = useSelector((state) => state.presntion.language);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const viewportRef = useRef(null);
  const slideRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [showValidateModal, setShowValidateModal] = useState(false);

  const getTitle = (index) => inscriptionTexts.titles[index][language];
  const getPrevButton = (index) => inscriptionTexts.previousButtons[index][language];
  const getDescription = () => inscriptionTexts.description[language];
  const getStepLabel = () => inscriptionTexts.step.label[language];

  const gapSize = 16;

  

  const [formData, setFormData] = useState({
    responsable: {
      responsableFName: "",
      responsableLName: "",
      responsableEmail: "",
      responsablePhone: "",
      responsableType: "Pére"
    },
    eleve: {
      eleveFName: "",
      eleveLName: "",
      eleveYear: "",
      eleveMonth: "",
      eleveDay: "",
      nivSco: "",
      classActual: "",
      institut: ""
    }
  });


  const handleDataChange = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("📝 Full form data:", formData);
    setShowValidateModal(true); // this will show the modal
  };
  

  useEffect(() => {
    function measure() {
      if (viewportRef.current && slideRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
        setSlideWidth(slideRef.current.offsetWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const centerOffset = (viewportWidth - slideWidth) / 2;
  const x = -((currentStep - 1) * (slideWidth + gapSize)) + centerOffset;
  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1));
  const nextStep = () => {
    setCurrentStep((s) => {
      const next = Math.min(totalSteps, s + 1);
      if (next > maxStepReached) {
        setMaxStepReached(next);
        console.log("🔥 Max step updated to:", next);
      }
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col items-center text-apple-dark 2xl:py-20">
<p className="flex text-center items-center justify-center gap-2">
  <span className={`w-2 h-2 rounded-full ${["bg-apple-light","bg-red-500","bg-the-gray","bg-blue-500"][currentStep-1]}`}></span>
  {getStepLabel()} {currentStep}
</p>

<h1 className="text-3xl 2xl:text-6xl text-apple-title font-bold">{getTitle(currentStep-1)}</h1>   <div className="flex justify-between  mt-6 px-4 w-[70%]">
      <AnimatePresence>
        {!showValidateModal &&currentStep > 1 && (
          <motion.button className="flex items-center gap-2 text-sm  bg-apple-light text-apple-dark font-semibold p-3  rounded-lg " layout initial={{y:80,scale:0.5,opacity:0}} animate={{y:0,scale:1,opacity:1}} exit={{y:60,scale:0,opacity:0}} transition={{type:"spring"}}onClick={prevStep}>
            ← {currentStep === 2 ? getPrevButton(0) : currentStep === 3 ? getPrevButton(1) : currentStep === 4 ? getPrevButton(2) : ""}
          </motion.button>
        )}
      </AnimatePresence>

    </div>

    <p dir={language=="ar"&&"rtl"} className="text-center 2xl:w-[60%] 2xl:mt-4">{getDescription()}</p>
      <div className="relative w-[95%] xl:w-[70%] ">

        <form ref={viewportRef} className="overflow-x-hidden overflow-y-visible w-full h-full">
        <motion.div className="flex items-center h-full" style={{ gap: `${gapSize}px` }} animate={{ x }} transition={{ type: "spring", bounce: 0.2 }}>
            <InscStep1 isActive={currentStep === 1} onDataChange={(data) => handleDataChange("responsable", data)} onNext={()=>setCurrentStep(2)} refProp={slideRef} />
            <InscStep2 isActive={currentStep === 2} onDataChange={(data) => handleDataChange("eleve", data)}  onNext={()=>setCurrentStep(3)} />
            <InscStep3 isActive={currentStep === 3} onNext={()=>setCurrentStep(4)}/>
            <InscStep4 isActive={currentStep === 4} showValidateModal={showValidateModal} values={formData} onSubmit={handleSubmit}  onBackToStep={(step) => setCurrentStep(step)} />
           
        </motion.div>
        </form>
        <div className="w-full flex items-center justify-center flex-col">

        </div>

      
       <div className="absolute  hidden -left-10 top-1/2 transform -translate-y-1/2 lg:flex flex-col w-4 gap-4">
       {["bg-apple-dark/60","bg-red-500","bg-the-gray","bg-blue-500"].map((c,i)=><motion.span onClick={()=>setCurrentStep(i+1)} layout transition={{type:"spring"}} className={`w-2 h-2  rounded-full shadow-sm  ${i===currentStep-1?" bg-blue-500 w-4 h-4":"bg-the-gray"} `}/>)}

       </div>
       

      </div>
    </div>
  );
}
