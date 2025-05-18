import React, { useEffect, useState, useRef, useCallback } from "react";
import ServicesFirstInterface from "../Models/Services/ServicesFirstInterface";
import { setIsHome } from "../redux(toolKit)/slices/isHomeSlice";
import { useDispatch } from "react-redux";
import SerrvicesShorts from "../Models/Services/ServicesShorts";
import ServicesDetails from "../Models/Services/ServicesDetails";
import ServicesConlusion from "../Models/Services/ServiceConclusion";
import BottomNavigation from "../Models/Services/BottomNavigation";
import { useSelector } from "react-redux";
import { setPageIndex } from "../redux(toolKit)/slices/pageIndexSlice";


const Services = () => {
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState(0);
  const [theY, setTheY] = useState(1);
  const [showBtmNav, setShowBtmNav] = useState(false);
  const detailsRef = useRef(null);

  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);

  // Intersection Observer to update showBtmNav when container enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBtmNav(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    return () => {
      if (detailsRef.current) {
        observer.unobserve(detailsRef.current);
      }
    };
  }, []);

  const handelSelect = useCallback(
    (x) => {
      setTheY(x > selectedService ? -1 : 1);
      setSelectedService(x);
    },
    [selectedService]
  );
  const {pageIndex}=useSelector((state)=>state.pageIndex);
  useEffect(() => {
    dispatch(setPageIndex(3));
  }, [pageIndex]);
  return (
    <>
  
      <BottomNavigation
        selected={selectedService}
        handelSelect={handelSelect}
        show={showBtmNav}
      />
      <div className="w-screen lg:pt-20  flex flex-col items-center justify-center z-0 overflow-hidden relative">
       
      
        <ServicesFirstInterface />
        <SerrvicesShorts
          selectedService={selectedService}
          theY={theY}
          onSelect={handelSelect}
        />
        {/* Container with ref for Intersection Observer */}
        <div
          ref={detailsRef}
          className="w-screen 2xl:py-20 2xl:mb-40 flex flex-col items-center justify-center z-0 overflow-hidden relative"
        >  
          <ServicesDetails
            selectedCyc={selectedService}
            onSelect={handelSelect}
          />
          <ServicesConlusion />
        </div>
      </div>
    </>
  );
};

export default Services;
