import React, { useEffect, useState } from "react";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";
import {
  TheInput,
  TheSelect,
  ValidateModal,
  ConfirmationModal,
} from "../Models/Inscription/inscrptionCards/InsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Postuler = () => {
  const dispatch = useDispatch();
  const { pageIndex } = useSelector((state) => state.pageIndex);
  const [isSend,setIsSend] = useState(false);
  const { language } = useSelector((state) => state.presntion); 
  const t = translations[language] || translations.fr; 
  

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  const [errors, setErrors] = useState({
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    cvUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPageIndex(8));
  }, [pageIndex]);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleChange = (field, value) => {
    const trimmed = value.trim();
  
    let error = "";
  
    if (trimmed === "") {
      error = `${field === "cvUrl" ? "URL du CV" : capitalize(field)} requis`;
    } else {
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          error = "Format d'email invalide";
        }
      }
  
      if (field === "phone") {
        const phoneRegex = /^(05|06|07)\d{8}$/;
        if (!phoneRegex.test(trimmed)) {
          error = "Téléphone invalide (ex: 0612345678)";
        }
      }
    }
  
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  
    // Update value
    switch (field) {
      case "prenom":
        setPrenom(value);
        break;
      case "nom":
        setNom(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "cvUrl":
        setCvUrl(value);
        break;
      default:
        break;
    }
  };
  

  const handleClear = () => {
    setPrenom("");
    setNom("");
    setEmail("");
    setPhone("");
    setCvUrl("");
    setErrors({
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      cvUrl: "",
    });
  };
  const handleSubmit = () => {
    const phoneRegex = /^(05|06|07)\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const newErrors = {
      prenom: prenom.trim() === "" ? "Prénom requis" : "",
      nom: nom.trim() === "" ? "Nom requis" : "",
      email:
        email.trim() === ""
          ? "Email requis"
          : !emailRegex.test(email.trim())
          ? "Format d'email invalide"
          : "",
      phone:
        phone.trim() === ""
          ? "Téléphone requis"
          : !phoneRegex.test(phone.trim())
          ? "Téléphone invalide (ex: 0612345678)"
          : "",
      cvUrl: cvUrl.trim() === "" ? "URL du CV requis" : "",
    };
  
    setErrors(newErrors);
  
    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;
    
  
    // Submit logic here
    setIsSend(true);
  };
  
  return (
<form className="w-screen relative flex flex-col items-center justify-center py-32 text-apple-dark bg-gradient-to-b text-center">
  <img
    className="h-24 lg:h-48"
    src={process.env.PUBLIC_URL + "/logos/hh.webp"}
    alt="Logo"
  />
  <p className="lg:-mt-5">{t.heading}</p>

  <div className="w-[95%] md:w-[90%] lg:w-[80%] xl:w-[65%]  2xl:w-[50%] flex flex-col items-center mt-10 gap-4">
    <div className="w-full flex items-center justify-start gap-4">
      <div className="flex-1 ">
        <TheInput
          value={prenom}
          onValueChange={(e) => handleChange("prenom", e)}
          name={t.firstName}
          error={errors.prenom}
        />
      </div>
      <div className="flex-1 ">
        <TheInput
          value={nom}
          onValueChange={(e) => handleChange("nom", e)}
          name={t.lastName}
          error={errors.nom}
        />
      </div>
    </div>

    <div className="w-full ">
      <TheInput
        value={email}
        type="email"
        onValueChange={(e) => handleChange("email", e)}
        name={t.email}
        error={errors.email}
      />
    </div>

    <div className="w-full ">
      <TheInput
        value={phone}
        onValueChange={(e) => handleChange("phone", e)}
        name={t.phone}
        error={errors.phone}
      />
    </div>

    <div className="w-full ">
      <TheInput
        value={cvUrl}
        onValueChange={(e) => handleChange("cvUrl", e)}
        name={t.cvUrl}
        error={errors.cvUrl}
      />
    </div>

    <div className="w-full flex items-center justify-center gap-4">
      <div
        onClick={() => navigate("/about")}
        className="flex-1 flex items-center gap-3 text-apple-light cursor-pointer hover:text-apple-dark/50 duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faCircleInfo} className="text-xl" />
        <p>{t.moreInfo}</p>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <div
          onClick={handleClear}
          className="underline cursor-pointer hover:text-red-600"
        >
          {t.clear}
        </div>
        <div
          onClick={handleSubmit}
          className="px-4 py-2 cursor-pointer bg-blue-500 text-white font-semibold rounded-xl"
        >
          {t.submit}
        </div>
      </div>
    </div>
    <p dir={language==="ar"&&"rtl"} className="mt-6 text-apple-dark/50">{t.cvInstructions}</p>

  </div>

  <ValidateModal isVisible={isSend} msg={t.modalMsg} />

</form>
  );
};

export default Postuler;
 // translations.js
const translations = {
  fr: {
    heading: "Se connecter aux offres d'emploi chez Écoles La Tour Eiffel",
    firstName: "Prénom",
    lastName: "Nom",
    email: "nom@example.com",
    phone: "Téléphone",
    cvUrl: "CV url: drive.google.com/file/xxx/CV.pdf",
    moreInfo: "Plus d'info sur Écoles La Tour Eiffel",
    clear: "Vider",
    submit: "Postuler",
    modalMsg: "Votre demande a été envoyée. Merci",
    cvInstructions: " Pour postuler, vous devez héberger votre CV sur un service cloud (Google Drive, Dropbox...). Rendez le fichier accessible à tous puis collez le lien ici.",
  },
  ar: {
    heading: "تسجيل الدخول إلى عروض العمل لدى مدارس برج إيفل",
    firstName: "الاسم الشخصي",
    lastName: "الاسم العائلي",
    email: "nom@example.com",
    phone: "رقم الهاتف",
    cvUrl: "رابط السيرة الذاتية: drive.google.com/file/xxx/CV.pdf",
    moreInfo: "مزيد من المعلومات حول مدارس برج إيفل",
    clear: "مسح",
    submit: "قدّم",
    modalMsg: "تم إرسال طلبك. شكرا",
    cvInstructions: " للتقديم يجب عليك رفع سيرتك الذاتية في ... Google Drive أو Dropbox، ثم جعل الملف متاحًا للجميع ولصق الرابط هنا.",

  },
  en: {
    heading: "Sign in to job offers at Écoles La Tour Eiffel",
    firstName: "First Name",
    lastName: "Last Name",
    email: "name@example.com",
    phone: "Phone",
    cvUrl: "CV url: drive.google.com/file/xxx/CV.pdf",
    moreInfo: "More info about Écoles La Tour Eiffel",
    clear: "Clear",
    submit: "Apply",
    modalMsg: "Your request has been sent. Thank you",
    cvInstructions: " To apply, you need to host your CV on a cloud service (Google Drive, Dropbox...). Make the file accessible to anyone and paste the link here. Click here for help if needed.",


  },
};

