import { faCirclePlus, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function InscriptionDash() {
  const [fullInscriptions, setFullInscription] = useState(null);
  const [filterYear, setFilterYear] = useState("tout");
  const [inscriptions, setInscriptions] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const admin = useSelector(state => state.admin.admin);
  

  useEffect(() => {
    axios.get('http://macbook-pro-2.local:8000/api/inscriptions/')
      .then(response => {
        setInscriptions(response.data);
          const uniqueYears = [
        ...new Set(response.data.map(item => item.school_year).filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date)))
      ];
      setSchoolYears(uniqueYears);
      })
      .catch(error => {
        console.error('Failed to fetch inscriptions:', error);
      });
  }, [fullInscriptions]);
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href = '/registration';
  };

const filtered = (filterYear === "tout"
  ? inscriptions
  : inscriptions.filter(insc => insc.school_year === filterYear)
);

const sorted = filtered.sort((a, b) => {
  // First sort by confirmed (false before true)
  if (a.confirmed !== b.confirmed) {
    return a.confirmed ? 1 : -1;
  }

  // Then sort by date descending (latest first)
  return new Date(b.date) - new Date(a.date);
});

  return (
    <div className="w-full min-h-screen p-6 bg-apple-light/20 rounded-3xl text-apple-dark">
      <h1 className="font-bold text-3xl text-center md:text-4xl apple-title mt-6 text-blue-500">
        Inscriptions
      </h1>

      <div
        onClick={() => navigate('/registration')}
        className="p-4 max-w-xs w-full mx-auto my-4 rounded-2xl bg-apple-light cursor-pointer hover:scale-105 transition-transform shadow"
      >
        <div onClick={handleClick} className="flex items-center justify-between">
          <p className="apple-title font-medium text-lg">Ajouter une inscription</p>
          <FontAwesomeIcon icon={faCirclePlus} className="text-2xl" />
        </div>
      </div>

      <div className=" justify-center gap-4 max-w-full mt-4 flex flex-wrap">
        {['tout',...schoolYears].map((year) => (
          <button
            key={year}
            onClick={() => setFilterYear(year)}
            className={`px-4 py-2 rounded-full transition ${
              filterYear === year
                ? 'bg-apple-dark text-white'
                : 'bg-apple-light text-apple-dark'
            }`}
          >
            {year === 'all' ? 'Toutes' : year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sorted.map((insc) => (
          <motion.div
            key={insc.id}
            transition={{ type: "spring" }}
            layoutId={`card-${insc.id}`}
            onClick={() => setFullInscription(insc)}
            className={`p-4 bg-apple-light rounded-2xl cursor-pointer hover:shadow-lg hover:scale-105 transition-transform ${insc.confirmed ? "bg-apple-dark/40 opacity-80" : "bg-apple-light"}`}
          >
            <p className="font-semibold apple-title">
              {insc.eleve.prenom} {insc.eleve.nom}
            </p>
            <p className="text-sm text-gray-500">{insc.schoolYear}</p>
            <p className="text-sm mt-2">Responsable: {insc.responsable.prenom} {insc.responsable.nom}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>

        {fullInscriptions && <FullInscriptions fullInscriptions={fullInscriptions} onClose={()=>setFullInscription(null)} />}
       
      </AnimatePresence>
    </div>
  );
}


const FullInscriptions = ({ fullInscriptions, onClose }) => {
  const admin = useSelector(state => state.admin.admin);
const handleConfirm = async (inscriptionId) => {
  try {
    const response = await fetch(`http://macbook-pro-2.local:8000/api/inscriptions/${inscriptionId}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmed: true,
        confirmed_by: admin.prenom + " " + admin.nom,
      }),
      
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error details:', errorData);
      throw new Error('Failed to confirm inscription');
    }

    const updatedInscription = await response.json();
    console.log('Inscription confirmed:', updatedInscription);
    onClose();

    
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred while confirming the inscription.');
  }
};


  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-lg blurey flex items-center justify-center z-50 px-2 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring" }}
      onClick={() => onClose()}
    >
      <motion.div
        layoutId={`card-${fullInscriptions.id}`}
        className="bg-apple-light/80 rounded-3xl ahah p-8 2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] w-full mx-auto shadow-2xl apple-dark-text overflow-x-scroll"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex py-2 justify-between items-center text-xs md:text-sm text-left">
          <p>Le : <span className="text-blue-500">{fullInscriptions.date}</span></p>
          <p className="text-right">Pour l'année scolaire <b>{fullInscriptions.school_year}</b></p>
        </div>
        <div className="w-full justify-center flex flex-col sm:flex-row mt-5 gap-y-5 sm:mt-10">
          <div className="flex-1 flex flex-col items-center">
            <img src={process.env.PUBLIC_URL + "/images/fu0.webp"} className="w-8 md:w-14" alt="Responsable"/>
            <h1>Infos du <span className="font-bold text-blue-500">Responsable</span></h1>
            <div className="w-[90%] mt-5 sm:mt-10 text-left">
              <p>Nom : <b>{fullInscriptions.responsable.nom}</b></p>
              <p>Prénom : <b>{fullInscriptions.responsable.prenom}</b></p>
              <p>Lien avec l'élève : <b>{fullInscriptions.responsable.lien}</b></p>
            </div>
            <p className="md:py-10 py-4 opacity-30">Outils de contact</p>
            <div className="w-[90%] text-left flex flex-col  gap-x-4">
              <p className="flex items-center gap-2 sm:gap-4">
                <FontAwesomeIcon className="text-blue-500" icon={faPhone} />
                <a href={`tel:${fullInscriptions.responsable.telephone}`} className="hover:underline">
                  <b>{fullInscriptions.responsable.telephone}</b>
                </a>
              </p>
              <p className="flex items-center gap-3 sm:gap-4">
                <FontAwesomeIcon className="text-blue-500" icon={faEnvelope} />
                <a href={`mailto:${fullInscriptions.responsable.email}`} className="hover:underline">
                  <b>{fullInscriptions.responsable.email}</b>
                </a>
              </p>
            </div>

          </div>
          <div className="flex-1 flex flex-col items-center border-t-[2px] sm:border-l-[2px] pt-5 sm:pt-0 sm:border-t-transparent border-apple-dark/40">
            <img src={process.env.PUBLIC_URL + "/images/fu1.webp"} className="w-8 md:w-14" alt="Élève"/>
            <h1>Infos sur l'<span className="font-bold text-blue-500">élève</span></h1>
            <div className="w-[90%] mt-5 sm:mt-10 text-left">
              <p>Nom : <b>{fullInscriptions.eleve.nom}</b></p>
              <p>Prénom : <b>{fullInscriptions.eleve.prenom}</b></p>
              <p>Date de naissance : <b>{fullInscriptions.eleve.dateNaissance.annee + "/" + fullInscriptions.eleve.dateNaissance.mois + "/" + fullInscriptions.eleve.dateNaissance.jour}</b></p>
            </div>
            <p className="md:py-10 py-5 opacity-30">Infos scolaires</p>
            <div className="w-[90%] text-left">
              <p>Niveau scolaire actuel : <b>{fullInscriptions.eleve.niveauScolaire}</b></p>
              <p>Classe : <b>{fullInscriptions.eleve.classe}</b></p>
              <p>Institut : <b>{fullInscriptions.eleve.institut}</b></p>

            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
        <button onClick={onClose} className="text-left w-full">Fermer</button>
        {
          fullInscriptions.confirmed ? (
            <p className="text-apple-dark/80 text-xs w-full  text-right  ">Inscription confirmée par <b>{fullInscriptions.confirmed_by}</b></p>
          ) : (
            <button onClick={() => handleConfirm(fullInscriptions.id)} className="bg-blue-500 px-4 py-2 rounded-2xl text-white mt-4 md:mt-10">Confirmer</button>
          )
        }

        </div>
      </motion.div>
    </motion.div>
  );
};