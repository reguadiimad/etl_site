// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';


import BottomPage from './components/BottomPage'
import { useSelector } from 'react-redux'
import './resources/style/home.scss'
import Cycles from './components/Cycles';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import News from './components/News';
import Inscription from './components/Inscription';
import { useEffect } from 'react';
import Postuler from './components/Postuler';




function App() {
  const { language } = useSelector((state) => state.presntion);
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  
  useEffect(() => {
    window.scrollTo(0, 0); // 👈 Scroll to top left corner
  },[pageIndex])
  
  return (
    <div  className={`overflow-hidden  ${language==='ar'?'arabic text-sm md:text-base lg:text-sm xl:text-xl 3xl:text-3xl':'text-xs md:text-sm lg:text-sm xl:text-lg 3xl:text-2xl'}`}>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cycles"} element={<Cycles />} />
          <Route path={"/services"} element={<Services />} />
          <Route path={"/news"} element={<News />} />
          <Route path={"/gallery"} element={<Gallery/>} />
          <Route path={"/contact"} element={<Contact/>} />
          <Route path={"/registration"} element={<Inscription/>} />
          <Route path={"/postuler"} element={<Postuler/>} />
        </Routes>
        <Navbar />
        <BottomPage/>
      </Router>
    </div>
  );
}

export default App;
