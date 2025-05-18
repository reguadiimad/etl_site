import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoreNews from "../../Models/News/MoreNews";
import axios from 'axios';
import dayjs from 'dayjs';



export default function NewsDash({addNw}) {
  const [showForm, setShowForm] = useState(addNw);
  const [modifiedNews, setModifiedNews] = useState(null);
  const handleAddClick = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  
  const handleSubmit = async (form) => {
    try {
      // Convert your date (YYYY-MM-DD) into full ISO timestamp if needed
      const publishDate = dayjs(form.date).toISOString();
      
      const payload = {
        genre: form.genre,            // → category
        date: publishDate,            // → publish_date
        title: form.title,
        description: form.description,
        imgLink: form.imgLink,        // → img_url
        content: form.content,        // → article
      };
      
      const response = await axios.post(
        'http://127.0.0.1:8000/api/news/', // replace with your API endpoint
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            // add Authorization here if your API requires it
          }
        }
      );
      
      console.log('News created:', response.data);
      setShowForm(false);
      // You can forward the created item up to state or close your modal:
      // onSuccess(response.data);
    } catch (err) {
      console.error('Failed to create news:', err.response?.data || err.message);
      // Optionally surface validation errors:
      // setFormErrors(err.response?.data);
    }
  };




  
  return (
    <div className="w-full min-h-screen p-1 md:p-4 bg-apple-light/20 rounded-3xl text-apple-dark">
       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
    </div>
      <h1 className="font-bold text-3xl text-center md:text-4xl text-blue-500 mt-6">Annonces</h1>
      <div
        className="p-4 max-w-xs w-full mx-auto my-4 rounded-2xl bg-apple-light cursor-pointer hover:scale-105 transition-transform"
        onClick={handleAddClick}
      >

        <div className="flex items-center justify-between">
          <p className="text-apple-dark font-medium text-lg">Ajouter une Annonce</p>
          <FontAwesomeIcon icon={faCirclePlus} className="text-apple-dark text-2xl" />
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center w-full">
        <p className="mb-6 text-apple-dark">Voir ou Modifier chaque Annonce que vous voulez</p>
        <MoreNews dash={true} onModify={md=>setModifiedNews(md)} />
      </div>

      <AnimatePresence>
        {showForm && <AddNews onClose={handleClose} onSubmit={handleSubmit} />}
        {modifiedNews && <AddNews onClose={()=>{handleClose();setModifiedNews(null)}} onSubmit={handleSubmit} modifiedNews={modifiedNews}/>}
      </AnimatePresence>
    </div>
  );
}

function AddNews({ onClose, onSubmit,modifiedNews }) {
  const language = 'fr'; 
  const [form, setForm] = useState({
    genre: (modifiedNews?modifiedNews.tag.tagName.fr:""), date: new Date().toISOString().slice(0, 10),
    title: (modifiedNews?modifiedNews.title[language]:""), description: (modifiedNews?modifiedNews.description[language]:""), imgLink: (modifiedNews?modifiedNews.imgSrc:""), content: (modifiedNews?modifiedNews.article[language]:"")
  });
  const genres = ['Sport', 'Générale', 'Santé', 'Éducation', 'Culture', 'Technologie'];
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFormSubmit = (e) => { e.preventDefault(); onSubmit(form); };


  const inputClass = "w-full p-3  rounded-xl bg-apple-light/50 backdrop-blur-sm placeholder-gray-400 focus:bg-apple-light/70 focus:scale-105 transition-all duration-300";

  return (
    <motion.div
      className="fixed inset-0 h-screen pt-10 overflow-y-scroll  bg-black bg-opacity-15 backdrop-blur-lg blurey z-50 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-apple-light/80 backdrop-blur-lg  mx-auto  rounded-3xl p-6 w-full max-w-xl sm:max-w-lg  shadow-xl"
        initial={{y: 100, opacity: 0,scale:0.8}} animate={{y: 0, opacity: 1,scale:1}} exit={{y: 100, opacity: 0,scale:0.8}}

      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-apple-dark text-center">Nouvelle Annonce</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Genre</label>
            <select name="genre" value={form.genre} onChange={handleChange} className={inputClass} required>
              <option value="" disabled>Choisir un genre</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Titre</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Titre de l'annonce" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Description Courte</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} placeholder="Description courte" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Image (URL)</label>
            <input type="url" name="imgLink" value={form.imgLink} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm mb-1">Contenu</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={4} placeholder="Contenu détaillé" className={inputClass} required />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 ">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-400 hover:bg-white/10 transition">Annuler</button>
            <button type="submit" className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-500 text-white/90 hover:scale-105 font-bold transition-transform">Enregistrer</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
