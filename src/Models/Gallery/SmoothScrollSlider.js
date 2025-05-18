import { useEffect, useRef, useState } from 'react';
export default function SmoothScrollSlider (){
    const containerRefs = {
      one: useRef(null),
      two: useRef(null),
      three: useRef(null),
    };
  
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Use Intersection Observer to detect visibility
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.3, // Trigger when 30% of the section is visible
        }
      );
  
      if (sectionRef.current) observer.observe(sectionRef.current);
  
      return () => observer.disconnect();
    }, []);
  
    useEffect(() => {
      if (!isVisible) return;
  
      const initialOffsetTwo = -1200;
      const speedOne = 0.45;
      const speedTwo = 0.55;
      const speedThree = 0.5;
      let ticking = false;
  
      const updateScroll = () => {
        const scrollY = window.scrollY;
        const offsetOne = scrollY * speedOne;
  const offsetTwo = scrollY * speedTwo;
  const offsetThree = scrollY * speedThree;
  
        if (containerRefs.one.current)
          containerRefs.one.current.style.transform = `translateX(${-offsetOne}px)`;
  
        if (containerRefs.two.current)
          containerRefs.two.current.style.transform = `translateX(${initialOffsetTwo + offsetTwo}px)`;
  
        if (containerRefs.three.current)
          containerRefs.three.current.style.transform = `translateX(${180-offsetThree}px)`;
  
        ticking = false;
      };
  
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };
  
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, [isVisible]);
  
    const renderSlide = (gal) =>
      Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-[10%] h-full rounded-2xl   flex items-center justify-center overflow-hidden relative opacity-95 `}
        >
          <img className="w-full h-full object-cover" src={process.env.PUBLIC_URL+`/gallery/gal${gal}/${i}.webp`}/>
        </div>
      ));
  
    return (
      <div
        ref={sectionRef}
        className="w-full py-2 flex flex-col gap-2 lg:gap-3.5 mt-6 text-white text-7xl flashy"
      >
        {/* Slide 1 */}
        <div className="w-full h-[110px] sm:h-[120px] md:h-[150px] lg:h-[200px] overflow-hidden">
          <div
            ref={containerRefs.one}
            className="w-[600%] sm:w-[400%] md:w-[320%] lg:w-[350%] xl:w-[220%] h-full flex gap-x-2 lg:gap-x-3.5"
            style={{ willChange: 'transform' }}
            
          >
            {renderSlide(1)}
          </div>
        </div>
  
        {/* Slide 2 */}
        <div className="w-full h-[110px] sm:h-[120px] md:h-[150px] lg:h-[200px] overflow-hidden">
          <div
            ref={containerRefs.two}
            className="w-[600%] sm:w-[400%] md:w-[320%] lg:w-[350%] xl:w-[220%] h-full flex gap-x-2 lg:gap-x-3.5"
            style={{
              transform: 'translateX(-1200px)',
              willChange: 'transform',
            }}
          >
            {renderSlide(2)}
          </div>
        </div>
  
        {/* Slide 3 */}
        <div className="w-full h-[110px] sm:h-[120px] md:h-[150px] lg:h-[200px] overflow-hidden">
          <div
            ref={containerRefs.three}
            className="w-[600%] sm:w-[400%] md:w-[320%] lg:w-[350%] xl:w-[220%] h-full flex gap-x-2 lg:gap-x-3.5"
            style={{ willChange: 'transform',transform:"translateX(-150px)" }}
          >
            {renderSlide(3)}
          </div>
        </div>
      </div>
    );
  };
  