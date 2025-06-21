import { faCirclePlus, faClose, faImage, faLandMineOn, faPlusCircle, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import MoreNews from "../../Models/News/MoreNews";
import axios from 'axios';
import { useSelector } from "react-redux";



export default function NewsDash({addNw}) {
  const [showForm, setShowForm] = useState(addNw);
  const [modifiedNews, setModifiedNews] = useState(null);
  const handleAddClick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  

  return (
    <div className="w-full min-h-screen p-1 md:p-4 bg-apple-light/20 rounded-3xl text-apple-dark">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      <h1 className="font-bold text-3xl text-center md:text-4xl text-blue-500 mt-6">Annonces</h1>

      <div className="p-4 max-w-xs w-full mx-auto my-4 rounded-2xl bg-apple-light cursor-pointer hover:scale-105 transition-transform"  onClick={handleAddClick}>
        <div className="flex items-center justify-between">
          <p className="text-apple-dark font-medium text-lg">Ajouter une Annonce</p>
          <FontAwesomeIcon icon={faCirclePlus} className="text-apple-dark text-2xl" />
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center w-full">
        <p className="mb-6 text-apple-dark">Voir ou Modifier chaque Annonce que vous voulez</p>
        <MoreNews dash={true} onModify={md=>setModifiedNews(md)} refresh={showForm } />
      </div>

      <AnimatePresence>
        {showForm && <AddNews onClose={handleClose}  />}
        {modifiedNews && <AddNews onClose={()=>{handleClose();setModifiedNews(null)}}  modifiedNews={modifiedNews}/>}
      </AnimatePresence>
    </div>
  );
}

function AddNews({ onClose,modifiedNews }) {
  const admin = useSelector(state => state.admin.admin);
  const language = 'fr'; 
  const getSchoolYearFromDate = (newsDateStr) => { const d = new Date(newsDateStr); return `${d.getFullYear() - (d.getMonth() + 1 < 8 ? 1 : 0)}-${d.getFullYear() + (d.getMonth() + 1 >= 8 ? 1 : 0)}`; }
  const genres = ['Sport', 'Général', 'Santé', 'Science', 'Éducation', 'Culture', 'Technologie', 'Événements', 'Parascolaire', 'Vie Scolaire', 'Orientation', 'Carrières', 'Bourses', 'Aides', 'Concours', 'Olympiades', 'Sorties', 'Environnement', 'Citoyenneté', 'Sciences', 'Littérature', 'ArtsPlastiques', 'Musique', 'Théâtre', 'Langues', 'Histoire', 'Patrimoine', 'Pédagogie', 'TravauxÉlèves', 'Projets', 'Alimentation', 'Cantine', 'BienÊtre', 'Conseils', 'Sécurité', 'Règlement', 'ParentsÉcole', 'TIC', 'Numérique', 'Inclusion', 'Diversité', 'Handicap', 'Partenariats', 'Sponsors', 'Clubs', 'Associations', 'VieÉtudiante', 'Examens', 'Évaluations', 'Calendrier', 'Vacances', 'AnnoncesAdmin', 'Alertes', 'Témoignages', 'Alumni', 'DéveloppementPerso', 'LeadershipÉtudiant', 'Civisme', 'JusticeScolaire', 'Jeux', 'Loisirs', 'Psychologie', 'Maths', 'Physique', 'Chimie', 'Biologie', 'Philo', 'Éco', 'Géo', 'Robotique', 'Codage', 'Débats', 'Photo', 'Cinéma', 'Danse', 'Entrepreneuriat', 'Bénévolat', 'SantéMentale', 'Nutrition', 'Écologie', 'International', 'Échanges', 'Journalisme', 'Bibliothèque', 'Diplômes', 'Inscriptions', 'Transport', 'Restauration', 'Réunions', 'Festivals', 'Conférences', 'Ateliers', 'Finances', 'PolitiqueScolaire', 'Éthique', 'Technique', 'Formation', 'Recherche', 'Innovation', 'Gala', 'Excursions', 'Mentorat', 'Compétences', 'Multimédia', 'RéseauxSociaux', 'HarcèlementPrévention', 'SécuritéRoutière', 'Solidarité', 'DéveloppementDurable', 'ArtOratoire', 'Égalité', 'Laïcité', 'MédiasÉducation', 'Stages', 'Philanthropie', 'CyberSécurité', 'Climat', 'PatrimoineLocal', 'Poésie', 'Cuisine', 'Jardinage', 'PremiersSecours', 'OrientationPro', 'VoyagesScolaires', 'EngagementCivique', 'DroitsHumains', 'Musée', 'Astronomie', 'ThéâtreForum', 'Autre'];
  const generateSchoolYears = () => {
    const start = 2008;
    const current = new Date().getFullYear();
    const years = [];
    for (let y = start; y <= current + 2; y++) {
      years.push(`${y}-${y + 1}`);
    }
    return years;
  };
  const yearOptions = generateSchoolYears();
  const initialForm = {
    published_by: admin.civilite+'. '+admin.nom+' '+admin.prenom ,
    news_date: new Date().toISOString().slice(0, 10),
    tag: modifiedNews ? modifiedNews.tag["fr"] : "",
    title: modifiedNews? modifiedNews.title["fr"] : "",
    description: modifiedNews ? modifiedNews.description["fr"] : "",
    article: modifiedNews ? modifiedNews.article["fr"] : "",
    school_year: modifiedNews?modifiedNews.schoolYear:getSchoolYearFromDate(new Date()),
    is_pinned: modifiedNews?modifiedNews.isPinned:false,
    img_url: modifiedNews?modifiedNews.imgSrc:""
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // Populate form when editing an existing news
  

  // Handler to update form fields
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Generate list of school years
  

  // Reset form to initial (or repopulate if editing)
  const handleReset = () => {
   
      setForm(initialForm);
    
  };

  // Submit new or updated news
 const handleSubmit = async () => {
  setLoading(true)
  try {
    await axios.post('http://macbook-pro-2.local:8000/api/news/create/', form)
    onClose(true)
  } catch (err) {
    console.error('Axios error:', err)
    if (err.response) {
      console.error('DRF response data:', err.response.data)
      alert(JSON.stringify(err.response.data, null, 2))
    } else {
      alert('Erreur réseau ou CORS')
    }
  } finally {
    setLoading(false)
  }
}

  const showConfirmation = form.title && form.description && form.article && form.img_url && form.tag && form.school_year && form.news_date;

  const handleUpdate = async () => {
  if (!modifiedNews || !modifiedNews.id) {
    alert("News ID is missing. Cannot update.");
    return;
  }

  setLoading(true);
  try {
    await axios.put(`http://macbook-pro-2.local:8000/api/news/${modifiedNews.id}/update/`, form);
    onClose(true);
  } catch (err) {
    console.error('Axios error:', err);
    if (err.response) {
      console.error('DRF response data:', err.response.data);
      alert(JSON.stringify(err.response.data, null, 2));
    } else {
      alert('Erreur réseau ou CORS');
    }
  } finally {
    setLoading(false);
  }
};

const handleDelete = async () => {
  if (!modifiedNews || !modifiedNews.id) {
    alert("L'identifiant de la news est manquant. Suppression impossible.");
    return;
  }

  const confirmDelete = window.confirm("Êtes-vous sûr(e) de vouloir supprimer cette actualité ?");
  if (!confirmDelete) return;

  setLoading(true);
  try {
    await axios.delete(`http://macbook-pro-2.local:8000/api/news/${modifiedNews.id}/delete/`);
    onClose(true);
  } catch (err) {
    console.error('Erreur Axios:', err);
    if (err.response) {
      console.error('Réponse DRF:', err.response.data);
      alert(JSON.stringify(err.response.data, null, 2));
    } else {
      alert('Erreur réseau ou problème de CORS');
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <motion.div
      className="fixed inset-0 h-screen pt-10 overflow-y-scroll flex-col flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg blurey z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full lg:w-[90%] bg-white/90 rounded-[70px] flex items-center justify-between mb-3 lg:mb-6 pr-2 lg:pr-4">
        <div className="lg:p-4 p-2 rounded-[70px] flex items-center justify-center gap-2 font-bold">
          <img
            className="w-14 bg-apple-light p-2 rounded-[40px]"
            src={`${process.env.PUBLIC_URL}/images/mgcNews.png`}
          />
          <p className="font-bold">
            {modifiedNews ? `Modifier l’annonce « ${modifiedNews.title["fr"]} » créée par ${modifiedNews.published_by}` : 'Créer une nouvelle annonce'}

          </p>
        </div>
        <div
          className="w-10 h-10 bg-apple-light rounded-full flex items-center justify-center cursor-pointer hover:bg-apple-light/70 transition-all duration-300"
          onClick={() => onClose(false)}
        >
          <FontAwesomeIcon icon={faClose} className="text-apple-dark" />
        </div>
      </div>

      <motion.div
        className="lg:p-[40px] p-[10px] rounded-[40px] lg:rounded-[70px] bg-white/90 w-full lg:w-[90%]"
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="w-full items-center justify-center">
            <div className="w-full flex flex-col lg:flex-row  items-stretch gap-6 h-auto">
              <div className="lg:w-[40%] w-full lg:h-full">
                <div className="w-full rounded-[30px] h-[200px] lg:h-[460px] bg-apple-light mb-6 flex items-center justify-center overflow-hidden">
                  {form.img_url ? (
                    <img
                      className="max-h-full w-full h-full object-cover"
                      src={form.img_url}
                      alt="Preview"
                    />
                  ) : (
                    <img
                      className="w-24"
                      src={`${process.env.PUBLIC_URL}/images/imgIcon.png`}
                    />
                  )}
                </div>
                <TheInput
                  name="Lien de l'image de l'annonce"
                  value={form.img_url}
                  onValueChange={value => handleChange('img_url', value)}
                />
              </div>

              <div className="lg:w-[60%] w-full flex flex-col items-stretch flex-grow gap-6">
                <h1 className="text-xl font-bold text-apple-dark">
                  Identifier l'annonce
                </h1>
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6">
                  <TheSelect
                    name="Genre de l'annonce"
                    data={genres}
                    value={form.tag}
                    onValueChange={value => handleChange('tag', value)}
                  />
                  <TheInput
                    name="Date de publication"
                    type="date"
                    value={form.news_date}
                    onValueChange={value => handleChange('news_date', value)}
                  />
                  <TheSelect
                    name="Année scolaire"
                    data={yearOptions}
                    value={form.school_year}
                    onValueChange={value => handleChange('school_year', value)}
                  />
                </div>

                <h1 className="text-xl font-bold text-apple-dark">Contenu de l'annonce</h1>
                <TheInput
                  name="Titre"
                  value={form.title}
                  onValueChange={value => handleChange('title', value)}
                />
                <TheInput
                  name="Description courte"
                  value={form.description}
                  onValueChange={value => handleChange('description', value)}
                />
                <textarea
                  value={form.article}
                  onChange={e => handleChange('article', e.target.value)}
                  placeholder="Contenu"
                  className="w-full flex-grow rounded-[30px] p-4 bg-apple-light focus:outline-apple-dark"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>






      <AnimatePresence>
        {/* Assuming this outer div also animates in. If not, remove AnimatePresence here or adjust */}
      <div className={`flex flex-col-reverse lg:flex-row  items-center justify-between ${modifiedNews&&"w-[90%]"}`}>
        {
          modifiedNews && (
              <motion.div
          className={`bg-white/90 rounded-[70px] flex items-center justify-between mt-6 p-2 lg:p-4 gap-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
         
          <AnimatePresence>

         <div onClick={handleDelete} className="flex items-center p-2 lg:p-4 text-apple-dark bg-apple-light rounded-full cursor-pointer gap-2">
          <FontAwesomeIcon icon={faTrash}/>
          <p className=" font-bold">Supprimer l'annonce</p>
         </div>
          
          </AnimatePresence>
        </motion.div>

          )
        }












          <motion.div
          className={`bg-white/90 rounded-[70px] flex items-center justify-between mt-6 p-4 gap-4`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <p className="underline cursor-pointer" onClick={handleReset}>
            {modifiedNews?"Réinitialiser":"Vider"}
          </p>
          <AnimatePresence>
          {showConfirmation && (
            <motion.div
              // Concept: "Grow & Reveal" - like a bloom or quick inflation
              initial={{
                opacity: 0,
                scale: 0.3,        // Start small
                width: '50px',     // Start very narrow (or a fixed small width)
                // rotate: -90,    // Optional: start rotated
              }}
              animate={{
                opacity: 1,
                scale: 1,
                width: 'auto',     // Expand to content width
                // rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  opacity: { duration: 0.2, ease: 'easeOut' }, // Faster opacity
                  scale: { type: 'spring', stiffness: 300, damping: 15, delay: 0.1 },
                  width: { type: 'spring', stiffness: 400, damping: 25, delay: 0.05 }, // Width animates slightly differently
                  // rotate: { type: 'spring', stiffness: 200, damping: 20, delay: 0.05 }
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                width: '50px',
                transition: {
                  duration: 0.2,
                  ease: 'easeIn',
                  width: { duration: 0.2, ease: 'easeIn' },
                },
              }}
              className={`p-4 rounded-[50px] font-bold flex items-center justify-center gap-2 cursor-pointer ${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-500/70'
              } text-white`}
             onClick={modifiedNews ? handleUpdate : handleSubmit}

              // To make children animate after the parent is mostly there
              // You could also use variants and staggerChildren if the children's animations are complex
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.3 }} // Delay icon
              >
                <FontAwesomeIcon icon={modifiedNews?faRefresh:faPlusCircle} />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.35 }} // Delay text slightly more
                className="whitespace-nowrap" // Prevents text wrapping during animation
              >
                {modifiedNews ? 'Mettre à jour' : 'Créer'}
              </motion.span>
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </div>


      </AnimatePresence>
    </motion.div>
  );

}












const TheInput = ({ value, onValueChange, name, error, type = "text", required, disabled = false,dealy=0 }) => {
  const [clicked, setClicked] = useState(false);
  const { language } = useSelector((state) => state.presntion);
  
  return (
    <div dir={language==="ar"&&"rtl"} className="w-full flex flex-col gap-1">
      <div onFocus={() => setClicked(true)} onBlur={() => setClicked(false)} className="w-full h-full flex items-center inp relative">
        <input
          disabled={disabled}
          required
          type={type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={`w-full  bg-apple-light rounded-[30px] lg:px-4 px-3 py-7 pb-2 outline-none duration-300  ${disabled && "opacity-20"} ${error ? "border-red-500 bg-red-100 focus:outline-red-500" : " focus:outline-apple-dark"}`}
        />
        <motion.span
          layout
          transition={{ type: "spring",dealy:dealy }}
          className={`absolute w-full pointer-events-none flex lg:px-4 px-3 ${error ? "text-red-500" : "text-apple-dark/80"} ${disabled && "opacity-20"} ${value !== "" || clicked ? "text-[10px] top-1 lg:top-0" : ""}`}
        >
          {name}
        </motion.span>
      </div>
      
    </div>
  );

};



const TheSelect = ({ value = "", onValueChange, name, error, required, data, disabled = false,displayed,isMonth=false }) => {
  const [clicked, setClicked] = useState(false);
  const { language } = useSelector((state) => state.presntion);

  return (
    <div className="w-full flex flex-col gap-1">
      
      <div dir={language==="ar"&&"rtl"} className={`w-full px-4 rounded-[30px] focus:outline-apple-dark bg-apple-light relative cursor-pointer ease-in-out duration-300 ${disabled ? "opacity-20" : ""} ${error ? "border-red-500  bg-red-100" : " "}`}>
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={`w-full appearance-none bg-transparent border-none outline-none ${value === "" ? "pt-4 pb-5 text-apple-dark/80" : "pt-7 pb-2"} ${(error && value === "") && "text-red-500 bg-red-100"} rounded-2xl cursor-pointer`}
        >
          <option value="" disabled>
            {name}
          </option>
          {data.map((item, i) => (
            <option key={i} value={isMonth?i+1:item}>
              {displayed?displayed[i]:item}
            </option>
          ))}
        </select>
        <motion.span
          layout
          transition={{ type: "spring" }}
          className={`absolute w-full pointer-events-none flex ease-in-out duration-300 ${value === "" ? "opacity-0 top-3" : "opacity-100 top-0.5 lg:top-1.5 text-[10px] lg:text-xs"} ${error ? "text-red-500" : "text-apple-dark"}`}
        >
          {name}
        </motion.span>
      </div>
    </div>
  );
};