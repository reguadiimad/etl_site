import React, { useEffect, useState,useRef} from "react";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";
import GalFirstInterface from "../Models/Gallery/GalFirstInterface";
import GalSecondeInterface from "../Models/Gallery/GalSecondInterface";
import GalThirdInterface from "../Models/Gallery/GalThirdInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";


const Gallery = () => {
  const dispatch = useDispatch();
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(setPageIndex(5));
  }, [pageIndex]);

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              setIsVisible(entry.isIntersecting);
          },
          {
              threshold: 0.2, // trigger when 30% of the component is visible
          }
      );

      if (containerRef.current) {
          observer.observe(containerRef.current);
      }

      return () => {
          if (containerRef.current) {
              observer.unobserve(containerRef.current);
          }
      };
  }, []);
  

  return (
    <>
        <div className="w-full flex flex-col items-center justify-center h-screen  pt-0 px-1 md:px-2 lg:px-4 pb-24 md:pb-20 xl:pb-4">
            <GalFirstInterface/>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 pb-0 lg:overflow-hidden">
            <GalSecondeInterface/>
        </div>
        <div ref={containerRef} className="w-full flex flex-col items-center justify-center ">
            <GalThirdInterface visibleNav={isVisible}/>
            
        </div>
    </>
  );
};

export default Gallery;
