import { useState,useEffect, act } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import adminsList from "./data/admins.json";
import axios from "axios";
import { MessageUI } from "./Profiledash";
import { useSelector } from "react-redux";


export default function AdminsDash() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState({active: false, message: ""});
  const crntadmin = useSelector(state => state.admin.admin);



  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://macbook-pro-2.local:8000/api/admins/");
        setAdmins(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des admins :", error);
      }
    };

    fetchAdmins();
  }, [showForm]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  role: "",
  adresse: "",
  birthday: "",
  picture: "",
  isSuperAdmin: false,
});

const itDisabled = formData.prenom==="" || formData.nom==="" || formData.email==="" || formData.telephone==="" || formData.role==="" ||formData.password==="";

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleCheckboxChange = (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://macbook-pro-2.local:8000/api/admins/", {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      role: formData.role,
      adresse: formData.adresse,
      birthday: formData.birthday,
      picture: formData.picture,
      isSuperAdmin: formData.isSuperAdmin,
      password: formData.password,
      civilite: formData.civilite,
    });

    setIsCompleted({ active: true, message: "Administrateur ajouté avec succès !" });
    setShowForm(false);
  } catch (error) {
  if (error.response) {
    const errors = error.response.data;

    // Custom translations for known fields and errors
    const customMessages = {
      email: {
        contains: "already exists",
        message: "Cet e-mail est déjà utilisé par un autre administrateur.",
      },
      telephone: {
        contains: "already exists",
        message: "Ce numéro de téléphone est déjà utilisé.",
      },
      password: {
        contains: "This field may not be blank",
        message: "Le mot de passe est requis.",
      },
      prenom: {
        contains: "This field may not be blank",
        message: "Le prénom est requis.",
      },
      nom: {
        contains: "This field may not be blank",
        message: "Le nom est requis.",
      },
      // Add more custom messages as needed...
    };

    let translatedMessages = [];

    for (const [field, messages] of Object.entries(errors)) {
      const msgArray = Array.isArray(messages) ? messages : [messages];

      msgArray.forEach((msg) => {
        const translation = customMessages[field];
        if (translation && msg.includes(translation.contains)) {
          translatedMessages.push(translation.message);
        } else {
          // Fallback: show original message with field name
          translatedMessages.push(`${field} : ${msg}`);
        }
      });
    }

    setIsCompleted({
      active: true,
      message: `${translatedMessages.join("\n")}`,
    });

  } else {
    setIsCompleted({ active: true, message: "Erreur réseau ou serveur. Veuillez réessayer." });
  }
}
};


const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this admin?')) {
    try {
      const response = await axios.delete(`http://macbook-pro-2.local:8000/api/admins/${id}/`);
      console.log("Admin deleted:", response.data);

      // Optionally update the state to remove the admin from the frontend
      setAdmins(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  }
};


  const toggleMenu = (id) => setMenuOpen(prev => (prev === id ? null : id));

  return (
    <div className="w-full min-h-screen  md:p-8  bg-apple-light/30 rounded-3xl text-apple-dark relative">
      <h1 className="text-2xl md:text-4xl font-bold text-center apple-title text-blue-500 mb-10">
        Liste des Administrateurs ETL 
      </h1>

      <div className="flex justify-center mb-8" onClick={() => setShowForm(true)}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-5 w-full max-w-lg bg-apple-light rounded-3xl cursor-pointer flex items-center justify-between shadow-lg hover:shadow-xl transition-all"
        >
          <p className="text-apple-dark font-semibold md:text-xl">Créer un admin </p>
          <FontAwesomeIcon icon={faUserPlus} className="text-apple-dark text-xl md:text-3xl" />
        </motion.div>
      </div>

      <div className="space-y-6">
        {admins.map(admin => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
            className="relative p-6 bg-white rounded-3xl shadow-md hover:shadow-lg text-left transition-all cursor-pointer overflow-hidden"
            onClick={() => setSelectedAdmin(admin)}
          >
            <div className="flex items-center">
              {admin.picture ? (
                <img
                  src={admin.picture}
                 
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xl" />
                </div>
              )}
              <div className="ml-5 flex-1">
                <p className="font-semibold text-lg">
                  {admin.prenom} {admin.nom} {admin.isSuperAdmin && <span className="text-xs opacity-60">(Super Admin)</span>}
                </p>
                <p className=" text-blue-500 capitalize mb-1">
                  {admin.role}
                </p>
                <p className=" text-gray-600">{admin.email}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); toggleMenu(admin.id); }}
              >
                <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 hover:text-apple-dark" />
              </button>
            </div>

            {menuOpen === admin.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-12 right-6 bg-white border border-gray-200 rounded-lg shadow-md py-2"
              >
              {(admin.isSuperAdmin===false || admin.email!==crntadmin.email)&&(<button
                  onClick={() => handleDelete(admin.id)}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Supprimer 
                </button>)}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
{isCompleted.active && <MessageUI message={isCompleted.message} onClose={() => setIsCompleted({active: false, message: ""})}/>}

      <AnimatePresence>
        {selectedAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-lg blurey text-left"
            onClick={() => setSelectedAdmin(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Détails Administrateur
              </h2>
              <div className="flex items-center mb-4">
                {selectedAdmin.picture ? (
                  <img
                    src={selectedAdmin.picture}
                    alt={`${selectedAdmin.prenom} ${selectedAdmin.nom}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  </div>
                )}
                <div className="ml-4">
                  <p className="font-semibold text-xl">
                    {selectedAdmin.prenom} {selectedAdmin.nom}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {selectedAdmin.role}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>ID:</strong> {selectedAdmin.id}</li>
                <li><strong>Email:</strong> {selectedAdmin.email}</li>
                <li><strong>Téléphone:</strong> {selectedAdmin.telephone}</li>
                <li><strong>Adresse:</strong> {selectedAdmin.adresse || "-"}</li>
                <li><strong>Anniversaire:</strong> {selectedAdmin.birthday || "-"}</li>
              </ul>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedAdmin(null)}
                  className="px-4 py-2 rounded-lg font-medium "
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-lg blurey py-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md"
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">
                Nouveau Administrateur
              </h2>
             <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="prenom" placeholder="Prénom" required value={formData.prenom} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="text" name="nom" placeholder="Nom" required value={formData.nom} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="phone" name="telephone" placeholder="Téléphone" required value={formData.telephone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <select name="civilite" onChange={handleChange} required value={formData.civilite} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" ><option value={"Mr"}>Monsieur</option> <option value={"Mme"}>Madame</option></select>
              <input type="text" name="role" placeholder="Rôle" required value={formData.role} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="date" name="birthday" placeholder="Anniversaire"  value={formData.birthday} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="text" name="picture" placeholder="URL Image (optionnel)" value={formData.picture} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />
              <input type="text" name="password" required placeholder="Mot de passe" value={formData.password} onChange={handleChange} min={8} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" />

              <label className="flex items-center space-x-2">
                <input type="checkbox" name="isSuperAdmin" checked={formData.isSuperAdmin} onChange={handleCheckboxChange} />
                <span>Super Administrateur</span>
              </label>

              <div className="flex justify-end space-x-4 pt-4">
                <button type="button"onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg font-medium border border-gray-200 hover:bg-gray-50">Annuler</button>
                <button type="submit"  disabled={itDisabled}  className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-35 disabled:cursor-not-allowed">Ajouter</button>
              </div>
            </form>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
