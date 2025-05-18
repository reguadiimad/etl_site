import '../resources/style/home.scss';
import { useDispatch,useSelector } from 'react-redux';
import { setIsHome } from '../redux(toolKit)/slices/isHomeSlice';
import { useEffect } from 'react';
import FirstInterface from '../Models/About/FirstInterface';
import MotDeFondateur from '../Models/About/MotDeFondateur';
import TeamWork from '../Models/About/TeamWork';
import Education from '../Models/About/ِEducation';
import ParentEleve from '../Models/About/ParentEleve';
import Navigation from '../Models/Globe/Navigation';
import { setPageIndex } from '../redux(toolKit)/slices/pageIndexSlice';


const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsHome(false));
  }, [dispatch]);
    const {pageIndex}=useSelector((state)=>state.pageIndex);
    useEffect(() => {
      dispatch(setPageIndex(1));
    }, [pageIndex]);
  
  const scrollValue = useSelector((state) => state.scrollVal);
  const menuList = {
          fr: ["Mot de fondateur", "Equipe Pédagogique", "Enseignement", "Parents Eleve"],
          ar: ["كلمة المؤسس", "الفريق التعليمي", "التعليم", "الآباء و التلاميذ"],
          en: ["Founder’s Word", "Teaching Team", "Teaching", "Parents & Students"],
      };
  return (
    <>
    <div className='w-screen py-20 mb-40 flex flex-col items-center justify-center  z-0 overflow-hidden relative'>
      <div className='w-full lg:h-[100px]'></div>
      <FirstInterface/>
      <Navigation menuList={menuList}/>
      <MotDeFondateur id={0}/>
      <TeamWork id={1}/>
      <Education id={2}/>
      <ParentEleve id={3}/>
    </div>
    </>
  );
};

export default About;

