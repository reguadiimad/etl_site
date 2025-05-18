import { faCirclePlus, faFileSignature, faFolderOpen, faList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";



export default function HomeDash({onSelect, addNwToggle}) {
    const navigate = useNavigate();
  

  return (
    <div className="w-full text-apple-dark">
       <div className="w-full flex text-left items-end ">
           
       </div>
        <p className="text-justify mt-10">
            Bienvenue sur la page d’accueil. Ici, vous pouvez consulter et interagir avec tous les éléments importants : les dernières annonces de l'équipe École La Tour Eiffel, les inscriptions récentes pour l’année scolaire, les personnes ayant déjà envoyé leur CV pour rejoindre notre école, et bien plus encore. Faites défiler la page pour tout découvrir.
        </p>
        <h1 className="font-bold text-2xl mt-10 text-blue-500">Annonces</h1>
        <div className="w-full items-center mt-4 flex flex-col sm:flex-row  bg-apple-light/80 rounded-[20px] p-[5px] gap-[5px] md:rounded-[40px]  md:h-[200px] md:p-[20px] md:gap-[20px] ">

            <div className="w-full sm:flex-1 h-full rounded-[15px]  md:rounded-[20px] bg-white bg-red items-center justify-center flex  flex-row  p-4 cursor-pointer">
                <div onClick={()=>onSelect(1)} className="w-full md:w-[80%] text-left">
                <h1 className="text-blue-500 font-bold">Liste des Annonces</h1>
                <p>Cliquez pour voir ou modifier toutes les annonces</p>
                </div>
                <div className="w-[20%] text-xl md:text-4xl text-blue-500 text-center">
                <FontAwesomeIcon icon={faList} />
                </div>
            </div>

            <div className="w-full flex-1 h-full rounded-[15px]  md:rounded-[20px] bg-white items-center justify-center flex flex-row  p-4 cursor-pointer">
                <div onClick={()=>{onSelect(1);addNwToggle(true)}}  className="w-full sm:w-[80% ]  text-left">
                <h1 className="text-blue-500 font-bold">Ajouter une nouvelle annonce</h1>
                <p>Cliquez ici pour ajouter une annonce d’un prochain événement ou passé</p>
                </div>
                <div className="w-[20%] text-xl md:text-4xl text-blue-500 text-center">
                <FontAwesomeIcon icon={faCirclePlus} />
                </div>
            </div>

            
        </div>
        <h1 className="font-bold text-2xl mt-10 text-blue-500">Inscriptions</h1>
        <div className="w-full items-center mt-4 flex flex-col sm:flex-row bg-apple-light/80 rounded-[20px] p-[5px] gap-[5px] md:rounded-[40px] md:h-[200px] md:p-[20px] md:gap-[20px]">
            
            <div className="w-full flex-1 h-full rounded-[15px]  md:rounded-[20px] bg-white items-center justify-center flex  md:flex-row  p-4 cursor-pointer">
                <div onClick={()=>onSelect(2)} className="w-[80%] text-left">
                <h1 className="text-blue-500 font-bold">Toutes les inscriptions</h1>
                <p>Cliquez pour consulter ou modifier les inscriptions existantes</p>
                </div>
                <div className="w-[20%] text-xl md:text-4xl text-blue-500 text-center">
                <FontAwesomeIcon icon={faUsers} />
                </div>
            </div>


            <div className="w-full flex-1 h-full rounded-[15px]  md:rounded-[20px] bg-white items-center justify-center flex md:flex-row p-4 cursor-pointer">
                <div onClick={() =>  {window.location.href = '/registration';}} className="w-[80%] text-left">
                <h1 className="text-blue-500 font-bold">Nouvelle inscription</h1>
                <p>Cliquez ici pour ajouter une nouvelle inscription scolaire</p>
                </div>
                <div className="w-[20%] text-xl md:text-4xl text-blue-500 text-center">
                <FontAwesomeIcon icon={faFileSignature} />
                </div>
            </div>
        
        </div>
        <h1 className="font-bold text-2xl mt-10 text-bule-500">Candidatures</h1>
        <div className="w-full items-center mt-4 flex bg-apple-light/80 rounded-[20px] p-[5px] gap-[5px] md:rounded-[40px] h-[180px] md:h-[200px] md:p-[20px] md:gap-[20px]">
        {/* Voir toutes les candidatures */}
        <div className="flex-1 h-full rounded-[15px]  md:rounded-[20px] bg-white items-center justify-center flex flex-col-reverse md:flex-row  md:p-4 cursor-pointer">
            <div onClick={()=>onSelect(3)} className="w-[80%]">
            <h1 className="text-blue-500 font-bold">Toutes les candidatures</h1>
            <p>Cliquez pour consulter les CV reçus pour rejoindre notre équipe</p>
            </div>
            <div className="w-[20%] text-4xl text-blue-500 text-center">
            <FontAwesomeIcon icon={faFolderOpen} />
            </div>
        </div>

    
        </div>


       </div>
  );
}
