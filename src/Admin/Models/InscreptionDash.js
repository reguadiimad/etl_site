import { faCirclePlus, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function InscriptionDash() {
  const [fullInscriptions, setFullInscription] = useState(null);
  const [filterYear, setFilterYear] = useState("all");
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/inscriptions/')
      .then(response => {
        setInscriptions(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch inscriptions:', error);
      });
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href = '/registration';
  };

  const filtered =
    filterYear === "all"
      ? inscriptions
      : inscriptions.filter((i) => i.schoolYear === filterYear);

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

      <div className="flex justify-center gap-4 mt-4">
        {['all','2024/2025','2025/2026'].map((year) => (
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
        {filtered.map((insc) => (
          <motion.div
            key={insc.id}
            transition={{ type: "spring" }}
            layoutId={`card-${insc.id}`}
            onClick={() => setFullInscription(insc)}
            className="p-4 bg-apple-light rounded-2xl cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
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
        <button onClick={onClose} className="text-right w-full mt-4 md:mt-10">Fermer</button>
      </motion.div>
    </motion.div>
  );
};