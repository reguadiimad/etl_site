import { useEffect, useState } from "react";
import { TheInput } from "../../Models/Inscription/inscrptionCards/InsCard";
import { AnimatePresence,motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { loginAdmin, logoutAdmin } from "../../redux(toolKit)/slices/adminSlice";
import { fetchIpAddress } from "../../redux(toolKit)/slices/ipSlice";



const AdminLogin = () => {

    const [isForgten,setIsForgetn] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(""); 
    const dispatch = useDispatch();
   
    const admin = useSelector(state => state.admin.admin);
    useEffect (()=>{dispatch(logoutAdmin()); localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("admin_info");},[dispatch]);
     


    const leftAnimation = (d = 0,x=-40) => ({
        initial: { x: x, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { type: "spring", delay: d }
      }), rightAnimation = (d = 0) => ({
        initial: { x: 50, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { type: "spring", delay: d }
      })

    const [adminEmail,setAdminEmail] = useState("");
    const [adminPassword,setAdminPassword] = useState("");
    const handleLogin = async () => {
      setError("");  
      try {
        const response = await axios.post("http://macbook-pro-2.local:8000/api/login/", {
          email: adminEmail,
          password: adminPassword,
        });

        console.log("API Response:", response.data); // Log the full response

        const { access, refresh, admin } = response.data;

        // Check if role exists in the admin object
        console.log("Admin Role:", admin.role); // Log the role

        // Store tokens in localStorage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("admin_info", JSON.stringify(admin));

        // Dispatch login action with the full admin object
        dispatch(loginAdmin(admin)); // This stores the full admin data

        console.log("✅ Logged in:", admin);
        navigate("/adminETL/home"); // Redirect to the dashboard

      } catch (err) {
        const msg = err.response?.data?.detail === "Invalid credentials"
          ? "Email ou mot de passe incorrect."
          : "Erreur du serveur. Veuillez réessayer.";
        console.error("❌ Échec de la connexion:", msg);
        setError(msg);
      }
    };
    
    return(
        <>
  <div className="w-screen flex items-center justify-center mt-8">
    <div className="w-[95%] xl:w-[80%] h-full flex flex-col lg:flex-row items-center justify-center">
      <motion.div initial={{ y: -40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring" }} className="w-full lg:hidden flex items-center justify-end">
        <img src={process.env.PUBLIC_URL + "/images/etlAdminMob.webp"} className="rounded-[30px] mt-10 object-cover w-full h-[180px] sm:h-[200px] md:h-[250px]" />
      </motion.div>

      <div className="w-full flex flex-col items-center justify-center lg:items-start lg:justify-start lg:text-left text-center lg:w-[60%] ">
        <motion.p initial={{ y: -45, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring" }} className="text-apple-dark mt-4 mb-2">
          Bienvenue de retour
        </motion.p>

        <motion.h1 initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring" }} className="lg:w-[80%] w-full text-4xl md:text-6xl md:mb-3 mg:mb-0 xl:text-7xl text-apple-title font-bold">
        Connexion à votre compte <span className="text-blue-500 font-bold">ETL Admin</span>
        </motion.h1>

        <div  className="lg:w-[80%] w-[90%] mt-8 flex flex-col gap-3">

          <TheInput name={"Entrez votre email"} type="email" value={adminEmail} error={error} onValueChange={e => setAdminEmail(e)} />
          <TheInput name={"Entrez votre mot de passe"} value={adminPassword} error={error} onValueChange={e => setAdminPassword(e)} type="password" />

          <motion.div {...leftAnimation()} className="w-full flex justify-center items-center">
            <div onClick={() => setIsForgetn(true)} className="flex-1 cursor-pointer text-left text-apple-dark">
              <a>Mot de passe oublié ?</a>
            </div>
            <div className="flex-1 flex justify-end">
              <button onClick={handleLogin} className="bg-blue-500 text-white font-bold rounded-2xl px-6 py-3">Se connecter</button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring" }} className="w-[40%] hidden lg:flex items-center justify-end">
        <img src={process.env.PUBLIC_URL + "/images/etlAdmin.webp"} className="rounded-[40px] lg:h-[500px] 2xl:h-[800px]" />
      </motion.div>
    </div>
  </div>

  <AnimatePresence>
    {isForgten && <ForgottenPassword onClose={() => setIsForgetn(false)} />}
  </AnimatePresence>
</>

    )
}

export default AdminLogin;

const ForgottenPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true); // prevent multiple submits

  try {
    await axios.post("http://macbook-pro-2.local:8000/api/forgot-password/", {
      email: email,
    });
    setSubmitted(true);
  } catch (err) {
    const msg =
      err.response?.data?.detail ||
      "Une erreur s'est produite. Veuillez réessayer.";
    setError(msg);
  } finally {
    setIsSubmitting(false); // allow resubmit only if needed
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ ease: 'circInOut' }}
      className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-xl blurey z-50 p-4"
    >
      <motion.div
      layout
        initial={{ y: 190 }}
        animate={{ y: 0 }}
        exit={{ y: 190 }}
        transition={{ type: "spring" }}
        className="relative w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:hover:text-white"
          aria-label="Fermer"
        >
          <FontAwesomeIcon className="text-xl" icon={faClose} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 flex items-center justify-center flex-col">
            <h2 className="text-2xl flex font-semibold text-apple-title text-center">
              Mot de passe oublié ?
            </h2>
            <p className="text-sm  text-center">
              Saisissez votre adresse e-mail et nous vous enverrons un mot de passe temporaire.
            </p>

            <div className="w-full">
              <TheInput type="email" error={error} value={email} onValueChange={(e) => setEmail(e)} name={"nom@exemple.com"} />
            </div>

            

         <button
  type="submit"
  disabled={isSubmitting}
  className={`px-6 py-3 text-white rounded-lg font-medium transition ${
    isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-500/90"
  }`}
>
  {isSubmitting ? "Envoi..." : "Envoyer"}
</button>

          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 ">
              Mot de passe envoyé !
            </h2>
            <p className="text-sm text-gray-600 ">
              Vérifiez votre e-mail pour un mot de passe temporaire.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium transition"
            >
              Fermer
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
