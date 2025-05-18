import React, { useEffect, useState,useRef} from "react";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";
import CntFirstInterface from "../Models/Conatct/CntFirstInterface";
import CntMapInterface from "../Models/Conatct/CntMapInterface";
import CntMessageInterface from "../Models/Conatct/CntMessagInterface";




const Contact = () => {
  const dispatch = useDispatch();
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(setPageIndex(6));
  }, [pageIndex]);

  
  
  return (
    <>
        <CntFirstInterface/>
        <CntMapInterface/>
        <CntMessageInterface/>
    </>
  );
};

export default Contact;
