import React, { useEffect, useState,useRef} from "react";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";
import InscriptionFirstInterface from "../Models/Inscription/InscriptionFirstInterface";
import InscriptionSecondInterface from "../Models/Inscription/InscreptionSecondInterface";





const Inscription = () => {
  const dispatch = useDispatch();
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(setPageIndex(7));
  }, [pageIndex]);




  return (
    <>
      <div className="w-screen bg-gradient-to-b from-white to-apple-light">
        <InscriptionFirstInterface/>
        <InscriptionSecondInterface/>

      </div>
    </>
  );
};

export default Inscription;
