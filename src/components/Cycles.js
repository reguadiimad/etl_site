import CyclInterface from "../Models/Cycles/CyclInterface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsHome } from '../redux(toolKit)/slices/isHomeSlice';

import CycleDetails from "../Models/Cycles/CycleDetais";
import maternelleContent from "../Models/Cycles/Datas/MaternelleData.json";
import PrimaireContent from "../Models/Cycles/Datas/PrimaireData.json";
import CollegeContent from "../Models/Cycles/Datas/CollegeData.json";
import LyceeContent from "../Models/Cycles/Datas/LyceeData.json";
import NavigationCyc from "../Models/Cycles/NavigationCyc";
import CycleConclusion from "../Models/Cycles/CyclesConclusion";
import BottomNavigation from "../Models/Cycles/BottomNavigation";
import { useInView } from "react-intersection-observer";
import { useSelector } from 'react-redux';
import { setPageIndex } from '../redux(toolKit)/slices/pageIndexSlice';



  
const Cycles = () => {
  const { ref: motherRef, inView } = useInView({
    threshold: 0.4, // Trigger when 50% of the component is visible
  });

    const {pageIndex}=useSelector((state)=>state.pageIndex);
    useEffect(() => {
      dispatch(setPageIndex(2));
    }, [pageIndex]);

    const dispatch = useDispatch();
    const [selectedCyc,setSelectedCyc]=useState(3);
    const theCycles = [maternelleContent,PrimaireContent,CollegeContent,LyceeContent]
    const theCyclesImages = [{"pc":'/images/mateernel.webp',"phn":'/images/m2.webp'},{"pc":'/images/primaire.webp',"phn":'/images/primaire1.webp'},{"pc":'/images/college.webp',"phn":'/images/college1.webp'},{"pc":'/images/lycee.webp',"phn":'/images/lycee1.webp'}]

  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
  const menuList = {
    fr: ["Maternelle", "Primaire", "Collège", "Lycée"], // Corrected French
    ar: ["روضة", "ابتدائي", "إعدادي", "ثانوي"], // Arabic translations
    en: ["Preschool", "Primary", "Middle School", "High School"], // English translations
};
 const mtImages = Array.from({ length: 12 }, (_, i) => `/images/mt/mt${i}.webp`);
 const prImages = Array.from({ length: 12 }, (_, i) => `/images/pr/p${i}.webp`);
 const clImages = Array.from({ length: 12 }, (_, i) => `/images/col/col${i}.webp`);
 const lyImages = Array.from({ length: 13 }, (_, i) => `/images/lyc/lyc${i}.webp`);
 const handeleSelect = selected => {
  setSelectedCyc(selected);
  document.getElementById("det").scrollIntoView({ behavior: "smooth", block: "start" })
 }
 const cycImage = [mtImages,prImages,clImages,lyImages] 

    return(
        <div className='w-screen py-20 mb-40 flex flex-col items-center justify-center  z-0 overflow-hidden relative'>
            <div className='w-full lg:h-[30px]'></div>
            <CyclInterface  selectedCyc={selectedCyc} handelSelect={selected=>handeleSelect(selected)} />
            <NavigationCyc  selected={selectedCyc} onClick={i=>setSelectedCyc(i)}/>
            <div id="det" ref={motherRef} className="w-[90%] p-[40px] rounded-[80px] flex items-center justify-center flex-col border z-10 border-black/5 shadow-sm mt-10 relative">
              <CycleDetails  key={selectedCyc} content={theCycles[selectedCyc]} cycImages={cycImage[selectedCyc]} coverImage={theCyclesImages[selectedCyc]} />
            </div>
            <CycleConclusion/>
            <BottomNavigation show={inView} selected={selectedCyc} handelSelect={s=>setSelectedCyc(s)}/>
            
        </div>
    )
}
export default Cycles;