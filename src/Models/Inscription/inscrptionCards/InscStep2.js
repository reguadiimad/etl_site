import { useState,useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ConfirmationModal, TheInput, TheSelect } from "./InsCard"
import { useSelector } from "react-redux"

export function InscStep2({ isActive, refProp,onNext,onDataChange,otherKid }) {
    const [eleveFName, setEleveFName] = useState("")
    const [eleveLName, setEleveLName] = useState("")
    const [eleveYear,setEleveYear] = useState("");
    const [eleveMonth,setEleveMonth] = useState("");
    const [eleveDay,setEleveDay] = useState("");
    const [nivSco,setNivSco] = useState("");
    const [classActual,setClassActual] = useState("");
    const [branch,setBranch] = useState("");
    const [institut,setInstitut] = useState("");
    const [errors, setErrors] = useState({ prenom: "", nom: "", year: 0, month: 0, day:0, nivSco:"", classAct:" ", institut:""})
    const [touched, setTouched] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { language } = useSelector((state) => state.presntion); 
    const t = translations[language];

    useEffect(() => { 
      if(otherKid){
        setEleveFName("");
        setEleveLName("");
        setEleveYear("");
        setEleveMonth("");
        setEleveDay("");
        setNivSco("");
        setClassActual("");
        setInstitut("");}
     },[otherKid])

    const currentYear = new Date().getFullYear();
    const yearData = Array.from({ length: 25 }, (_, i) => (currentYear - 1) - i);
    const monthsFr = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const monthss = {
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      ar: ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"]
    };
    
    const nivScoDataa = {
      fr: ["Pas Encore", "Maternelle", "Élemontaire", "Collège", "Lycée"],
      en: ["Not Yet", "Preschool", "Elementary", "Middle School", "High School"],
      ar: ["ليس بعد", "الروض ", "الابتدائي", "الإعدادي", "الثانوي"]
    };

    const classActualDataa = {
      fr: [
        [""],
        ["Petite section", "Moyenne section", "Grande section"],
        ["CP", "CE1", "CE2", "CM1", "CM2", "CE6"],
        ["1AC", "2AC", "3AC"],
        ["Tronc Commun", "1ère année Bac", "2éme année Bac"]
      ],
      en: [
        [""],
        ["Pre-K", "Junior Kindergarten", "Senior Kindergarten"],
        ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade"],
        ["7th Grade", "8th Grade", "9th Grade"],
        ["Common Core", "1st Year Baccalaureate", "2nd Year Baccalaureate"]
      ],
      ar: [
        [""],
        ["القسم الصغير", "القسم المتوسط", "القسم الكبير"],
        ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة", "السنة الخامسة", "السنة السادسة"],
        ["الأولى إعدادي", "الثانية إعدادي", "الثالثة إعدادي"],
        ["الجذع المشترك", "الأولى باكالوريا", "الثانية باكالوريا"]
      ]
    };
    const branchData = {
      fr:["Sciences Mathématiques","Sciences Physiques","Sciences Économiques","Autres"],
      en:["Mathematical Sciences","Physical Sciences","Economic Sciences","Others"],
      ar:["العلوم الرياضية","العلوم الفيزيائية","العلوم الاقتصادية","أخرى"]
    }
    
    

   const getDaysInMonth = (year, month) => {
  if (!year || !month) return [];

  const monthIndex = month - 1; // JavaScript months are 0-based
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};


    const daysData = getDaysInMonth(eleveYear, eleveMonth);
    const nivScoData = ["Pas Encore","Maternelle","Élemontaire","Collège","Lycée"];
    const classActualData = [[""],["Petite section","Moyenne section","Grande section"],["CP","CE1","CE2","CM1","CM2","CE6"],["1AC","2AC","3AC"],["Tronc Commun","1ère année Bac","2éme année Bac"]]
    const getClassOptions = (nivSco) => {
      switch (nivSco) {
        case "Pas Encore":
          return classActualData[0]; 
        case "Maternelle":
          return classActualData[1];
        case "Élemontaire":
          return classActualData[2];
        case "Collège":
          return classActualData[3];
        case "Lycée":
          return classActualData[4];
        default:
          return classActualData[0];
      }
    };


    function validateField(field, value) {
      const msgs = validationMessages[language];

      const currentYear = new Date().getFullYear();
      const minYear = currentYear - 24;
      const maxYear = currentYear;
      const monthsFr = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ];
    
      switch (field) {
        case "prenom":
          return value.trim() === "" ? msgs.prenom : "";
    
        case "nom":
          return value.trim() === "" ? msgs.nom : "";
    
        case "year":
          if (value.trim() === "") return msgs.yearRequired;
          if (isNaN(value) || value < minYear || value > maxYear) {
            return msgs.yearInvalid({ min: minYear, max: maxYear });
          }
          return ""; 
    
        case "month":
          if (value.trim() === "") return msgs.monthRequired;
         
          return "";
    
        case "day":
          if (value.trim() === "") return msgs.dayRequired;
          if (isNaN(value) || value < 1 || value > 31) return msgs.dayInvalid;
          return "";
    
        case "nivSco":
          return value.trim() === "" ? msgs.nivSco : "";
    
        case "classAct":
          if (nivSco !== nivScoData[0] && value.trim() === "")
            return msgs.classActRequired;
          return "";
    
        case "institut":
          if (nivSco !== nivScoData[0] && value.trim() === "")
            return msgs.institutRequired;
          return "";


        case "branch":
      if (nivSco !== nivScoData[0] && value.trim() === "")
          return msgs.classActRequired; 
    
        default:
          return "";
      }
    }

    const handleChange = (field, value) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));

    switch (field) {
        case "prenom":
        setEleveFName(value);
        break;
        case "nom":
        setEleveLName(value);
        break;
        case "year":
        setEleveYear(value);
        break;
        case "month":
        setEleveMonth(value);
        break;
        case "day":
        setEleveDay(value);
        break;
        case "nivSco":
        setNivSco(value);
        break;
        case "classAct":
        setClassActual(value);
        break;
        case "institut":
        setInstitut(value);
        break;
        case "branch":
        setBranch(value);
        default:
        break;
    }
    };


    function validateForm() {
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 24;
        const maxYear = currentYear;
      
        const isNivScoFirst = nivSco === nivScoData[0]; // This is your special case
      
        const newErrors = {
          prenom: validateField("prenom", eleveFName),
          nom: validateField("nom", eleveLName),
          year: validateField("year", eleveYear),
          month: validateField("month", eleveMonth),
          day: validateField("day", eleveDay),
          nivSco: validateField("nivSco", nivSco),
          classAct: isNivScoFirst ? "" : validateField("classAct", classActual),
          institut: isNivScoFirst ? "" : validateField("institut", institut),
          branch: isNivScoFirst ? "" : validateField("branch", branch)
        }
      
        setErrors(newErrors)
        return Object.values(newErrors).every(e => e === "")
    }
      
    const clearForm = () => {
    setEleveFName("");
    setEleveLName("");
    setEleveYear("");
    setEleveMonth("");
    setEleveDay("");
    setNivSco("");
    setClassActual("");
    setInstitut("");
    setBranch("");
    setErrors({
        prenom: "",
        nom: "",
        year: "",
        month: "",
        day: "",
        nivSco: "",
        classAct: "",
        institut: ""
    });
    };
      

    const countFilledFields = () => {
        const fields = [
          eleveFName,
          eleveLName,
          eleveYear,
          eleveMonth,
          eleveDay,
          nivSco,
          classActual,
          branch,
          institut
        ];
      
        return fields.filter(field => field !== "").length; // Count non-empty fields
    };

  
    const handleClear = () => {
      if (countFilledFields() > 2) {
        setIsModalVisible(true); // Show the modal if more than two fields are filled
      } else {
        clearForm(); // Otherwise, clear the form without confirmation
      }
    };
    const handleCloseModal = () => {
      setIsModalVisible(false); // Close the modal without clearing the form
    };
    const confirmClearForm = () => {
      clearForm(); // Call clear form function if the user confirms
      setIsModalVisible(false); // Close the modal after confirming
    };

    useEffect(() => {
      onDataChange({
        eleveFName: eleveFName,
        eleveLName: eleveLName,
        eleveYear: eleveYear,
        eleveMonth: eleveMonth,
        eleveDay: eleveDay,
        nivSco,
        classActual,
        institut,
        branch
      });
    }, [eleveFName, eleveLName, eleveYear, eleveMonth, eleveDay, nivSco, classActual, institut, branch]);
                  
    
    
    
  
  
    return (
      <div className={`flex-none w-full lg:w-[60%] h-[600px] lg:h-[750px] my-10 flex items-center justify-center transition-transform duration-500 ${isActive ? "scale-100 blur-0" : "scale-90 blur-sm"}`} ref={refProp}>
      
      <div className="bg-white w-full h-[95%] flex justify-center lg:p-8 rounded-[20px] shadow-xl overflow-y-scroll text-apple-title">
        <div className="w-[90%] relative h-full flex flex-col items-center justify-center text-center">
          <img className="h-14 lg:h-16 -mr-2 -mt-10" src={process.env.PUBLIC_URL + "/images/eleve1.webp"} alt="logo" />
          
          <p className="text-xl lg:text-2xl font-semibold">
            {t.title}<span className="text-blue-500 font-semibold">{t.student}</span>
          </p>
    
          <p className="lg:text-base text-apple-dark w-[85%]">{t.subtitle}</p>
    
          <div className="w-full flex items-center justify-center mt-4 lg:mt-8 lg:gap-5 gap-2">
            <div className="flex-1">
              <TheInput name={t.firstName} value={eleveFName} onValueChange={(val) => handleChange("prenom", val)} error={errors.prenom} />
            </div>
            <div className="flex-1">
              <TheInput name={t.lastName} value={eleveLName} onValueChange={(val) => handleChange("nom", val)} error={errors.nom} />
            </div>
          </div>
    
          <p dir={language==="ar"&&"rtl"} className={`text-apple-title w-full  font-semibold mt-2  ${language==="ar"?'text-right':'text-left'}`}>{t.birthDate}</p>
    
          <div className={`w-full flex items-center justify-center gap-2 lg:gap-5 mt-2 ${language==="ar"&&"flex-row-reverse"}`}>
            <div className="flex-1">
              <TheSelect name={t.year} value={eleveYear} data={yearData} onValueChange={(val) => handleChange("year", val)} error={errors.year} />
            </div>
            <div className="flex-1">
              <TheSelect name={t.month} value={eleveMonth} data={monthsFr} displayed={monthss[language]} disabled={eleveYear === ""} onValueChange={(val) => handleChange("month", val)} error={errors.month} isMonth={true} />
            </div>
            <div className="flex-1">
              <TheSelect name={t.day} value={eleveDay} data={daysData} disabled={eleveMonth === ""} onValueChange={(val) => handleChange("day", val)} error={errors.day} />
            </div>
          </div>
    
          <div className="lg:my-6 my-2 w-[95%] h-[2px] bg-apple-light rounded-full"></div>
    
          <p dir={language==="ar"&&"rtl"} className={`text-apple-title w-full  font-semibold ${language==="ar"?'text-right':'text-left'}`}>{t.level}</p>
    
          <div className={`w-full flex items-center justify-center lg:gap-5 gap-2 mt-2 ${language==="ar"&&"flex-row-reverse"}`}>
            <div className="flex-1">
              <TheSelect name={t.schoolLevel} value={nivSco} displayed={nivScoDataa[language]}  data={nivScoData} onValueChange={(val) => handleChange("nivSco", val)} error={errors.nivSco} />
            </div>
            <div className="flex-1">
              <TheSelect   name={t.class} value={classActual} displayed={classActualDataa[language][nivSco]}  data={getClassOptions(nivSco)} disabled={nivSco === "" || nivSco === nivScoData[0]} onValueChange={(val) => handleChange("classAct", val)} error={touched.classAct ? errors.classAct : ""} />
            </div>
          </div>
    
          <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:mt-5 gap-5">
            <div className="flex-1">
              <TheInput name={t.institute} disabled={nivSco === nivScoData[0]} value={institut} onValueChange={(val) => handleChange("institut", val)} error={errors.institut} />
            </div>
            <AnimatePresence>
              {classActual === "1ère année Bac" || classActual === "2éme année Bac" ? (
                 <motion.div initial={{x:-50,y:50,opacity:0,scale:"0%"}} animate={{x:0,y:0,opacity:1,scale:"100%"}} transition={{type:"spring"}}  className="flex-1">
              
              <TheSelect   name={t.branch} value={branch}  data={branchData[language]} disabled={nivSco === "" || nivSco === nivScoData[0]} onValueChange={(val) => handleChange("branch", val)} error={touched.branch ? errors.branch : ""} />
            </motion.div>
              ):("")}
            </AnimatePresence>
          </div>
    
          <div className="flex absolute bottom-3 lg:-bottom-3 items-center justify-center gap-4 cursor-pointer">
            <div onClick={handleClear} className="text-apple-dark underline">{t.clear}</div>
            <div onClick={() => { if (validateForm()) { onNext(); }}} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">{t.continue}</div>
          </div>
        </div>
      </div>
    
      <ConfirmationModal isVisible={isModalVisible} onClose={handleCloseModal} onConfirm={confirmClearForm} />
    </div>
    
    )
  }

  // translations.js
const translations = {
  fr: {
    title: "Remplir les informations de l’",
    subtitle: "Identifiez et informez-nous sur l’élève pour finaliser l’inscription.",
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: "Date de naissance",
    year: "Année",
    month: "Mois",
    day: "Jour",
    level: "Niveau Scolaire Actuelle",
    schoolLevel: "Niveau Scolaire",
    class: "Classe",
    institute: "Institut de Province",
    branch:"Branche",
    clear: "Vider",
    continue: "Continuer",
    student: "Élève",
  },
  ar: {
    title: "معلومات ",
    subtitle: "حدد واملأ معلومات التلميذ لإتمام التسجيل.",
    firstName: "الاسم",
    lastName: "النسب",
    birthDate: "تاريخ الازدياد",
    year: "السنة",
    month: "الشهر",
    day: "اليوم",
    level: "المستوى الدراسي الحالي",
    schoolLevel: "المستوى الدراسي",
    class: "القسم",
    branch: "الشعبة",
    institute: "المؤسسة",
    clear: "مسح",
    continue: "متابعة",
    student: "التلميذ",
  },
  en: {
    title: "Fill in the information of the ",
    subtitle: "Identify and tell us about the student to complete the registration.",
    firstName: "First Name",
    lastName: "Last Name",
    birthDate: "Date of Birth",
    year: "Year",
    month: "Month",
    day: "Day",
    level: "Current School Level",
    schoolLevel: "School Level",
    class: "Class",
    branch: "Branch",
    institute: "Institute",
    clear: "Clear",
    continue: "Continue",
    student: "Student",
  }
};

export default translations;


// validation.js
 const validationMessages = {
  fr: {
    prenom: "Prénom est requis.",
    nom: "Nom est requis.",
    yearRequired: "Année est requise.",
    yearInvalid: ({ min, max }) => `Année invalide. Entre ${min} et ${max}.`,
    monthRequired: "Mois est requis.",
    monthInvalid: "Mois invalide.",
    dayRequired: "Jour est requis.",
    dayInvalid: "Jour invalide.",
    nivSco: "Niveau scolaire requis.",
    classActRequired: "Classe actuelle requise.",
    institutRequired: "Institut requis."
  },
  en: {
    prenom: "First name is required.",
    nom: "Last name is required.",
    yearRequired: "Year is required.",
    yearInvalid: ({ min, max }) => `Invalid year. Between ${min} and ${max}.`,
    monthRequired: "Month is required.",
    monthInvalid: "Invalid month.",
    dayRequired: "Day is required.",
    dayInvalid: "Invalid day.",
    nivSco: "School level is required.",
    classActRequired: "Current class is required.",
    institutRequired: "Institution is required."
  },
  ar: {
    prenom: "الاسم الشخصي مطلوب.",
    nom: "اسم العائلة مطلوب.",
    yearRequired: "السنة مطلوبة.",
    yearInvalid: ({ min, max }) => `سنة غير صالحة. بين ${min} و${max}.`,
    monthRequired: "الشهر مطلوب.",
    monthInvalid: "شهر غير صالح.",
    dayRequired: "اليوم مطلوب.",
    dayInvalid: "يوم غير صالح.",
    nivSco: "المستوى الدراسي مطلوب.",
    classActRequired: "الفصل الحالي مطلوب.",
    institutRequired: "المؤسسة مطلوبة."
  }
};
