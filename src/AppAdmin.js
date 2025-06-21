// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import { useSelector,useDispatch } from 'react-redux'
import './resources/style/home.scss'

import { useEffect } from 'react';
import AdminLogin from './Admin/Components/AdminLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {AnimatePresence, motion} from "framer-motion";
import AdminHome from './Admin/Components/AdminHome';
import { fetchNews } from './redux(toolKit)/slices/newsSlice';






function AppAdmin() {
  const { language } = useSelector((state) => state.presntion);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchNews);
    }, [dispatch]);    
  return (
    <div  className={`overflow-hidden   min-h-screen lg:h-auto relative mb-0 pb-0 ${language==='ar'?'arabic text-sm md:text-base lg:text-sm xl:text-xl 3xl:text-3xl':'text-xs md:text-sm lg:text-sm xl:text-lg 3xl:text-2xl'}`}>
      <Header/>
      <Router>
        <Routes>
         <Route path={'/adminETL'} element={<AdminLogin/>} />
         <Route path={'/adminETL/home'} element={<AdminHome/>} />
        </Routes>
      </Router>
     <Footer/>
    </div>
  );
}

export default AppAdmin;





const Header = () =>{
  const [guid,setGuid]=useState(false);
  return(
    <div className='w-full flex items-center justify-center '>
    <div className='w-[95%] flex items-center justify-center'>
      <motion.div initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} transition={{type:"spring"}} className='flex-1'>
        <img className="w-32 sm:w-40 lg:w-44 xl:w-48" src={process.env.PUBLIC_URL+'/images/etlAdminLogo.webp'}/> 
      </motion.div>
      <div className='flex-1 flex justify-end'>
        <div onClick={() => setGuid(!guid)} className={`flex items-center relative justify-center bg-apple-light rounded-xl cursor-pointer hover:bg-opacity-100 ease-in-out duration-300 p-3 gap-1.5 ${guid ? "bg-opacity-100" : "bg-opacity-0"}`}>
        <motion.div initial={{ x: 10, scale: 0.4, opacity: 0 }} whileInView={{ x: 0, scale: 1, opacity: 1 }} transition={{ type: "spring" }} className='md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-apple-title'></motion.div>
        <motion.div initial={{ x: 10, scale: 0.1, opacity: 0 }} whileInView={{ x: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.15 }} className='md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-apple-title'></motion.div>
        <motion.div initial={{ x: 10, scale: 0, opacity: 0 }} whileInView={{ x: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.3 }} className='md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-apple-title'></motion.div>
        <AnimatePresence>
        {guid && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: -40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.4, opacity: 0, y: -40 }}
            transition={{ type: "spring", }}
            className='w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] blurey absolute top-full mt-2 right-0 origin-top-right bg-apple-light rounded-xl p-4 shadow-md backdrop-blur-xl h-[250px] overflow-y-scroll bg-opacity-80 z-50 text-sm text-apple-dark leading-relaxed'
          >
            <h3 className='font-semibold text-base mb-2'>Rôles des administrateurs</h3>
            <p className='mb-2'>
              <strong>Administrateur :</strong> Peut se connecter avec son email ou numéro de téléphone et son mot de passe. En cas d'oubli, un email est envoyé avec un lien pour réinitialiser le mot de passe.
            </p>
            <p className='mb-2'>
              Une fois connecté, l'administrateur accède à son tableau de bord, où il peut :
              <ul className='list-disc list-inside ml-4'>
                <li>Publier des actualités ou des événements à venir</li>
                <li>Consulter les inscriptions de l'année scolaire</li>
                <li>Modifier ses informations personnelles (email, mot de passe...)</li>
              </ul>
            </p>
            <p className='mb-2'>
              <strong>Super Administrateur :</strong> Dispose de tous les droits de l’administrateur, et peut en plus :
              <ul className='list-disc list-inside ml-4'>
                <li>Modifier ou supprimer toute actualité ou événement</li>
                <li>Consulter les CV des candidats postulant à un emploi à Écoles La Tour Eiffel</li>
              </ul>
            </p>
          </motion.div>
        )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
  )
}
const Footer = () => (
  <div className='pt-10 w-full'>
      <div className='md:py-10 py-6 w-full flex items-center justify-center text-apple-dark'>
        <p className='md:w-[80%] w-[95%]  text-center text-[10px] sm:text-xs'>Copyright © 2025 Ecoles La Tour Eiffel. All rights reserved.</p>
      </div>
     </div>
)
