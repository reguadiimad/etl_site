import { useEffect, useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faClose, faHome, faLock, faNewspaper, faUser, faUserGraduate, faUsers } from "@fortawesome/free-solid-svg-icons";
import HomeDash from "../Models/HomeDash";
import NewsDash from "../Models/NewsDash";
import InscriptionDash from "../Models/InscreptionDash";
import CondidatsDash from "../Models/CondidatsDash";
import ProfileDash from "../Models/Profiledash";
import AdminsDash from "../Models/AdminsDash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux(toolKit)/slices/adminSlice";

const AdminHome = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
     useEffect(() => {
  if (!isAuthenticated) {
    navigate("/adminETL");
  }
}, [isAuthenticated, navigate]);
    if(isAuthenticated===false){
        navigate("/adminETL");
        
    }else{
    return(<AdminHomeChiled/>)}
}

const AdminHomeChiled = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
     useEffect(() => {
  if (!isAuthenticated) {
    navigate("/adminETL");
  }
}, [isAuthenticated, navigate]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showMobDash, setShowMobDash] = useState(false);
    const [addNw,setAddNw] = useState(false);
    const Dashs = [<HomeDash onSelect={a=>setSelectedIndex(a)}  addNwToggle={p=>setAddNw(p)} />,<NewsDash addNw={addNw} />,<InscriptionDash/>,<CondidatsDash/>,<ProfileDash/>,<AdminsDash/>]
    const [now, setNow] = useState(new Date());
    const admin = useSelector(state => state.admin.admin);

    
      useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
      }, []);
    
      const date = now.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
       const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    let timerId;

    // whenever admin.must_change_password turns true,
    // show the banner and schedule it to hide in 25s
    if (admin.must_change_password) {
      setShowBanner(true);
      timerId = setTimeout(() => {
        setShowBanner(false);
      }, 25_000);
    }
else{setShowBanner(false);}
    // cleanup on unmount or if admin.must_change_password changes
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [admin.must_change_password,dispatch]);
  
  
     return(
        <>
        <div className="w-full mt-10 flex flex-col items-center pb-10">
            <div className="w-[95%]  flex   md:overflow-y-scroll ">
                    
                <SideControle selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

                <div className="flex-1  text-center md:text-left md:p-10 md:h-[850px]">
                    <div className="w-full flex items-center justify-center text-left py-10">
                    <div className="text-left w-full">
                        <p className="text-apple-dark">{time}</p>
                        <h1 className="text-apple-title text-4xl font-bold">{date}</h1>
                    </div>
                    <div onClick={()=>setShowMobDash(true)} className="flex-1 flex relative text-right w-24 text-2xl text-apple-dark  lg:hidden">
                        <div  className="w-16 h-16 rounded-[26px] bg-apple-light flex items-center justify-center overflow-hidden">
                            {admin.picture?<img className="w-full h-full object-cover " src={admin.picture}/>:<FontAwesomeIcon className="text-apple-dark " icon={faUser}/>}
                            {admin.must_change_password&&<span className="w-2 h-2 animate-pulse rounded-full bg-blue-500 absolute top-1  right-1"></span>}
                        </div>
                    </div>
                    </div>
                    {Dashs[selectedIndex]}
                </div>
            </div>
            <AnimatePresence>
                {showMobDash&&<MobDashControle selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} onClose={()=>setShowMobDash(false)}/>}
            </AnimatePresence>
            <AnimatePresence>
           {showBanner && (
        <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{type:"spring"}} exit={{y:50,opacity:0}} className="fixed bottom-10 lg:right-10 p-4 rounded-3xl flex items-center justify-center bg-black/5 backdrop-blur-lg border border-white/20 shadow-lg">
          <FontAwesomeIcon className="text-blue-500 text-2xl lg:text-4xl mr-6" icon={faLock} />
          <div>
            <h1 className="text-lg lg:text-xl text-blue-500 font-bold">
              Changement de mot de passe
            </h1>
            <p className="max-w-96 text-apple-dark text-xs">
              Vous utilisez pour l’instant un mot de passe généré par le système. Il vaut mieux le changer.
            </p>
            <button
              onClick={() => navigate("/adminETL/changePassword")}
              className="underline text-apple-dark text-xs text-right"
            >
              Changer le mot de passe
            </button>
          </div>
        </motion.div>

      )}
      </AnimatePresence>
    </div>
  
        </>
    )
   }



export default AdminHome;

const menuItems = [
    { label: 'Accueil', icon: faHome },
    { label: 'Annonces', icon: faNewspaper },
    { label: 'Inscriptions', icon: faClipboardList },
    { label: 'Candidats', icon: faUserGraduate },
    { label: 'Mon Profil', icon: faUser },
    { label: 'Admins ETL', icon: faUsers },
];

const MobDashControle = ({selectedIndex,setSelectedIndex,onClose}) => {
    const admin = useSelector(state => state.admin.admin);

    return (
        <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ease:"circInOut"}} className="fixed inset-0 h-full backdrop-blur-lg bg-opacity-10  flex items-end justify-center z-50">
            <motion.div initial={{y:90,opacity:0}} animate={{y:0,opacity:1}} exit={{y:90,opacity:0}} transition={{ease:"easeInOut", type:"spring",bounce:0.35}}  className="w-[95%] z-50 h-[95%] overflow-y-auto  right-0 bg-apple-light/80  flex flex-col items-center justify-between p-4 backdrop-blur-lg blurey rounded-t-3xl shadow-lg ">
                <FontAwesomeIcon  icon={faClose} className="text-xl absolute top-0 left-0 m-4  text-apple-dark cursor-pointer" onClick={() => {onClose()}}/>
                <div className="flex flex-col relative items-center justify-end">
                    <div className="w-28 h-28 bg-apple-dark overflow-hidden rounded-[60px] border-2 border-white shadow-xl flex justify-center items-center">
                       
                        {admin.picture?<img className="w-full h-full object-cover" src={admin.picture}/>:  <FontAwesomeIcon icon={faUser} className="text-5xl text-apple-light"/>}
                    </div>
                    <div className="absolute p-4 py-2 bg-white/70 backdrop-blur-lg blurey -bottom-4 text-blue-500 shadow-lg  rounded-2xl font-bold">Fondateur</div>
                </div>
                <p className=" mt-8 font-bold">{admin.civilite+'. '+admin.nom+' '+admin.prenom }</p>
                <p className="underline opacity-55">{admin.email}</p>
                <div className="w-[80%] h-full flex flex-col  items-center justify-center rounded-3xl">
                        {menuItems.map((item, index) => (
                            <motion.div layout transition={{ease:"backInOut"}}
                            key={index}
                            onClick={() => {setSelectedIndex(index);onClose()}}
                            className={`w-full flex items-center justify-center relative ${
                                selectedIndex === index
                                ? 'bg-white text-blue-500 shadow-sm rounded-2xl p-4 my-2 '
                                : 'px-4 text-apple-dark my-4'
                            } cursor-pointer`}
                            
                            >
                            <div className="w-[20%]">
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <div className={`flex-1  ${ selectedIndex === index&&"font-bold"}`}>{item.label}</div>
                            {index===4&&admin.must_change_password&&<span className="w-2 h-2 animate-pulse rounded-full bg-blue-500 absolute  right-1"></span>}

                            </motion.div>
                        ))}
                    </div>

                <p className="underline opacity-55 my-4">Déconixion</p>
            </motion.div>
            </motion.div>
        </>

    )
}
const SideControle = ({selectedIndex,setSelectedIndex}) => {
     const admin = useSelector(state => state.admin.admin);

   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmed) {
      // Clear Redux and localStorage
    
      // Redirect to login
      navigate("/adminETL");
    }
  };

    return (
        <div className="w-[26%] hidden sticky  bg-apple-light bg-opacity-80 h-[850px] rounded-[40px]  top-0 left-0 lg:flex flex-col items-center  p-4 text-apple-dark">
           <div className="w-40 h-40 flex flex-col relative items-center justify-end">
                {admin.picture?<img src={admin.picture} className="w-40 h-40 bg-apple-dark rounded-full object-cover border-white border-4 shadow-xl"/>:<div className="w-28 h-28 bg-apple-dark rounded-[50px] flex items-center justify-center"><FontAwesomeIcon className="text-5xl text-apple-light" icon={faUser}/></div>}     
                <div className="absolute p-4 py-2 bg-white/70 backdrop-blur-md blurey -bottom-2 text-blue-500 shadow-lg  rounded-2xl font-bold">{admin.role}</div>
           </div>
           <p className=" mt-8 font-bold">{admin.civilite+'. '+admin.nom+' '+admin.prenom }</p>
           <p className="underline opacity-55">{admin.email}</p>
           <div className="w-[80%] h-full flex flex-col  items-center justify-center  rounded-3xl gap-8">
                {menuItems.map((item, index) => (
                    <motion.div layout transition={{ease:"backInOut"}}
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-center relative ${
                        selectedIndex === index
                        ? 'bg-white text-blue-500 shadow-sm rounded-2xl p-4 '
                        : 'px-4 text-apple-dark'
                    } cursor-pointer`}
                    >
                    <div className="w-[20%]">
                        <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className={`flex-1  ${ selectedIndex === index&&"font-bold"}`}>{item.label}</div>
                    {index===4&&admin.must_change_password&&<span className="w-2 h-2 animate-pulse rounded-full bg-blue-500 absolute  -left-1"></span>}
                    </motion.div>
                ))}
            </div>

           <p onClick={()=>{handleLogout()}} className="underline opacity-55 cursor-pointer mb-4">Déconixion</p>


        </div>
    )
}




