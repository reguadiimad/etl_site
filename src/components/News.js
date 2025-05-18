import React, { useEffect, useState,useRef} from "react";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";
import NewsFirstInterface from "../Models/News/NewsFisrtInterface";
import NewsSecondeInterface from "../Models/News/NewsSecondeInterfcae";
import Latestnews from "../Models/News/LatestNews";




const News = () => {
  const dispatch = useDispatch();
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(setPageIndex(4));
  }, [pageIndex]);




  return (
    <>
        <NewsFirstInterface/>
        <NewsSecondeInterface/> 
        <Latestnews/>  
    </>
  );
};

export default News;
