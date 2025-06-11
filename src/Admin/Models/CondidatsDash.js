import { faCirclePlus, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import condidats from "./data/condidats.json";
import axios from "axios";
import { useEffect } from "react";

export default function CondidatsDash() {
  const [fullInscriptions, setFullInscription] = useState(null);
  const [filterYear, setFilterYear] = useState("all");
  const navigate = useNavigate();

 const [condidats, setCondidats] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  const fetchCondidats = async () => {
    try {
      const response = await axios.get("http://macbook-pro-2.local:8000/api/condidats/");
      setCondidats(response.data);
    } catch (err) {
      setError("Failed to load condidats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCondidats();
}, []);
  return (
    <div className="w-full min-h-screen p-6 bg-apple-light/20 rounded-3xl text-apple-dark">
      <h1 className="font-bold text-3xl text-center md:text-4xl apple-title mt-6 text-blue-500">
        Lists des Condidats
      </h1>

      <div
        className="p-4  mx-auto my-4 rounded-2xl bg-apple-light cursor-pointer hover:scale-105 transition-transform shadow text-center"
      >
      Voir chaque Condidat que vous voulez
      </div>

      <div className="flex justify-center gap-4 mt-4">
       
          <button

            className={`px-4 py-2 rounded-full transition bg-apple-light text-apple-dark`}
           
          >
          Touts
          </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
  <p>Loading...</p>
) : error ? (
  <p>{error}</p>
) : (condidats.map((condidat) => (
          <motion.div
            key={condidat.id}
            layoutId={`card-${condidat.id}`}
            onClick={() => setFullInscription(condidat)}
            className="p-4 bg-apple-light rounded-2xl cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
          >
            <p className="font-semibold apple-title">
              {condidat.prenom} {condidat.nom}
            </p>
            <p className="text-sm text-gray-500">{condidat.dateApply}</p>
            <p className="text-sm mt-2">Téléphone: {condidat.telephone}</p>
          </motion.div>
        )))}
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
      className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-lg blurey flex items-center justify-center z-50 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClose()}
    >
      <motion.div
        layoutId={`card-${fullInscriptions.id}`}
        className="bg-apple-light/80 rounded-3xl p-8 2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] w-full mx-auto shadow-2xl apple-dark-text overflow-x-scroll"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex py-2 justify-between items-center text-sm">
          <p>Le : <span className="text-blue-500">{fullInscriptions.dateApply}</span></p>
        </div>
        <div className="w-full text-left">
          <p className="opacity-25 mt-5 mb-2 text-left">Infos personnelles</p>
          <p>Nom: <span className="font-bold">{fullInscriptions.nom}</span></p>
          <p>Prénom: <span className="font-bold">{fullInscriptions.prenom}</span></p>
          <p className="opacity-25 mt-5 mb-2">Outils de contacts </p>

          <a href={`tel:${fullInscriptions.telephone}`} className="flex items-center gap-2 font-bold cursor-pointer"><FontAwesomeIcon icon={faPhone} className="text-blue-500"/> {fullInscriptions.telephone} </a>
          <a href={`mailto:${fullInscriptions.email}`} className="flex items-center gap-2 font-bold cursor-pointer"><FontAwesomeIcon icon={faEnvelope} className="text-blue-500"/> {fullInscriptions.email} </a>
        </div>

        <a className=" mt-6 w-full flex items-center justify-center cursor-pointer" href={fullInscriptions.cvLink} target="_blank" rel="noopener noreferrer">
          <div className=" border border-apple-dark rounded-3xl p-3 md:px-6 py-3 hover:bg-white/10 backdrop-blur-lg blurey transition-all hover:scale-110 duration-300 flex items-center gap-2">
            <p className="text-center md:text-sm font-bold ">Voir le CV</p>
          </div>
        </a>
     
        <button onClick={onClose} className="text-right w-full mt-2">Fermer</button>
      </motion.div>
    </motion.div>
  );
};