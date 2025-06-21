import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {ResponsableSlide1, ResponsableSlide2, ValidateModal} from "./inscrptionCards/InsCard";
import { InscStep1 } from "./inscrptionCards/InscStep1";
import { InscStep2 } from "./inscrptionCards/InscStep2";
import { InscStep3 } from "./inscrptionCards/InscStep3";
import { InscStep4 } from "./inscrptionCards/InscStep4";
import inscriptionTexts from "./InscData/inscFirstInterface.json";
import axios from "axios"



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
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const handelClearError = () => {setShowValidateModal(false);setServerError("")};
  const [isotherKid, setIsOtherKid] = useState(false);



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
      institut: "",
      branch: "",
    }
  });
  const handelOtherKid = () => {
    setIsOtherKid(true);
    setFormData(prev => ({
      ...prev,
      eleve: {
        ...prev.eleve,
        eleveFName: "",
        eleveLName: "",
        eleveYear: "",
        eleveMonth: "",
        eleveDay: "",
        nivSco: "",
        classActual: "",
        institut: "",
        branch: "",
      }
    }));
    setCurrentStep(2);
    setShowValidateModal(false);
  }

  const handleDataChange = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data
      }
    }));
  };
const submitInscription = async e => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setServerError("")

    const today = new Date()
    const date = today.toISOString().slice(0, 10)
    
    const schoolYear = `${today.getMonth() < 3
      ? today.getFullYear() - 1
      : today.getFullYear()}-${
      today.getMonth() < 3
        ? today.getFullYear()
        : today.getFullYear() + 1
    }`

    const payload = {
      date,
      school_year: schoolYear,
      confirmed: false,
      confirmed_by: null,
      responsable: {
        nom: formData.responsable.responsableLName,
        prenom: formData.responsable.responsableFName,
        lien: formData.responsable.responsableType,
        email: formData.responsable.responsableEmail,
        telephone: formData.responsable.responsablePhone
      },
      eleve: {
        nom: formData.eleve.eleveLName,
        prenom: formData.eleve.eleveFName,
        dateNaissance: {
          annee: formData.eleve.eleveYear,
          mois:   formData.eleve.eleveMonth,
          jour:   formData.eleve.eleveDay
        },
        niveauScolaire: formData.eleve.nivSco,
        classe:         formData.eleve.classActual,
        institut:       formData.eleve.institut,
        branch:        formData.eleve.branch,
        province:       "Casablanca"
      }
    }

    try {
      await axios.post(
        "http://macbook-pro-2.local:8000/api/inscriptions/create/",
        payload
      )
      setShowValidateModal(true)
    } catch (err) {
      const errs = err.response?.data?.non_field_errors
      if (Array.isArray(errs) && errs.length) {
        setServerError(errs[0])
        setShowValidateModal(true)
      } else {
        setServerError("Une erreur est survenue, veuillez réessayer.")
      }
      setShowValidateModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }
 

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
      {formData.eleve.branch}
<p className="flex text-center items-center justify-center gap-2">
  <span className={`w-2 h-2 rounded-full ${["bg-apple-light","bg-red-500","bg-the-gray","bg-blue-500"][currentStep-1]}`}></span>
  {getStepLabel()} {currentStep}
</p><h1 className="text-3xl 2xl:text-6xl text-apple-title font-bold">{getTitle(currentStep-1)}</h1>   <div className="flex justify-between  mt-6 px-4 w-[70%]">
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
            <InscStep2 isActive={currentStep === 2} onDataChange={(data) => handleDataChange("eleve", data)}  onNext={()=>setCurrentStep(3)} data={formData} otherKid={isotherKid} />
            <InscStep3 isActive={currentStep === 3} onNext={()=>setCurrentStep(4)}/>
            <InscStep4 isActive={currentStep === 4}  showValidateModal={showValidateModal} values={formData} onSubmit={submitInscription} isSubmitting={isSubmitting}  onBackToStep={(step) => setCurrentStep(step)} serverError={serverError} clearErr={handelClearError} onOtherKid={handelOtherKid} />
           
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
