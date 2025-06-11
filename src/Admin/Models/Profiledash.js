import { useState,useRef,useEffect, act } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faTimes, faEnvelope, faPhone, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { updateAdminData } from "../../redux(toolKit)/slices/adminSlice";
import { useDispatch } from "react-redux";

export default function ProfileDash() {
  const admin = useSelector(state => state.admin.admin);
  const dispatch = useDispatch();



  const [isEditing, setIsEditing] = useState(false);
 
  const [isCompleted, setIsCompleted] = useState({active: false, message: ""});
  



  const editFormRef = useRef(null);
  const pswdFormRef = useRef(null);
  const [formData, setFormData] = useState({
    nom: admin.nom,
    prenom: admin.prenom,
    email: admin.email,
    telephone: admin.telephone,
    adresse: admin.adresse,
    birthday: admin.birthday,
    picture:admin.picture,
    role: admin.role,
    civilite: admin.civilite,
  });

  const toggleEdit = () => {setIsEditing(!isEditing);setIsEditPassword(false)};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
  e.preventDefault();
  try {
    // Make the PUT request and get the updated admin data in the response
    const response = await axios.put(`http://macbook-pro-2.local:8000/api/update/${admin.admin_id}/`, formData);

    // Dispatch the updated admin data to Redux and update localStorage
    dispatch(updateAdminData(response.data));  // Assuming the response contains the updated admin data
  setIsCompleted({active: true, message: "Vos données ont été mises à jour avec succès."});
    
  } catch (error) {
    console.error(error);
    setIsCompleted({active: true, message: "Échec de la mise à jour des données."});
   
  }

  toggleEdit();
  };  

  // ─── at the top of ProfileDash, alongside your other useState’s ───
const [passwordData, setPasswordData] = useState({
  current_password: "",
  new_password: "",
  confirm_password: ""
});

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData(prev => ({ ...prev, [name]: value }));
};

const handleChangePassword = async (e) => {
  e.preventDefault();

  if (passwordData.new_password !== passwordData.confirm_password) {
    setIsCompleted({active: true, message: "Les mots de passe ne correspondent pas."});
  }

  try {
    const payload = {
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
    };

    const res = await axios.put(
      `http://macbook-pro-2.local:8000/api/change-password/${admin.admin_id}/`,
      payload
    );

    setIsCompleted({active: true, message: "Mot de passe mis à jour avec succès."});
    setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    setIsEditPassword(false);

    // ✅ Update Redux admin state manually (Option 1)
    dispatch(updateAdminData({ ...admin, must_change_password: false }));

  } catch (err) {
    const detail =
      err.response?.data?.detail ||
      err.response?.data?.non_field_errors?.[0] ||
      "Échec de la mise à jour du mot de passe.";
    console.error(err);
    setIsCompleted({active: true, message: detail});
  }
};

  const [isEditPassword, setIsEditPassword] = useState(false);
  const togglePasswordEdit = () => {setIsEditPassword(prev => !prev);setIsEditing(false)};

     useEffect(() => {
    if (isEditing && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
     if (isEditPassword && pswdFormRef.current) {
      pswdFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }}, [isEditing, isEditPassword]);


  return (
    <div className="w-full min-h-full  bg-apple-light/20 rounded-b-3xl flex flex-col items-center rounded-t-[60px] text-apple-dark relative">
        <img className={`w-full rounded-t-[60px] object-cover ${admin.picture?"h-[400px]":"h-[100px]"} bg-apple-light blur-xl`} src={admin.picture}/>
        {admin.picture? 
        <img className="w-[400px] h-[300px] rounded-[40px] object-cover  -mt-[23%] shadow-2xl z-30" src={admin.picture}/>
        :<FontAwesomeIcon className="text-9xl z-30  text-apple-dark/70" icon={faUser}/>}     

      <div className="w-[90%] mx-auto  rounded-2xl flex flex-col items-center overflow-hidden">
          
          <div className="p-[30px] w-[90%] rounded-[50px] flex items-center justify-center  gap-4 ">
            <div className="flex flex-col items-center">
              <h1 className="text-apple-dark text-3xl font-bold">{admin.civilite+'. '+admin.nom+' '+admin.prenom } {admin.isSuperAdmin&&<span className="text-sm">(super admin)</span>}</h1>
              <p className="text-blue-500 mt-2 mb-5">{admin.role}</p>
              <div className="flex gap-5">
                <div className="flex items-center justify-center gap-2"><FontAwesomeIcon className="text-blue-500" icon={faEnvelope}/><p>{admin.email}</p></div>
                <div className="flex items-center justify-center gap-2"><FontAwesomeIcon className="text-blue-500" icon={faPhone}/><p>{admin.telephone}</p></div>
              </div>
              <div className="p-3 rounded-2xl text-apple-dark -mt-2 mb-4">{admin.adresse} • {admin.birthday}</div>
              <div className="flex gap-4">
              <div onClick={toggleEdit} className="p-3 rounded-2xl bg-black/5 text-apple-dark mt-4 cursor-pointer"><FontAwesomeIcon className="mr-3" icon={faUserEdit}/>Modifier mon profil</div>
              <div onClick={togglePasswordEdit} className="p-3 rounded-2xl bg-black/5 text-apple-dark mt-4 relative cursor-pointer"><FontAwesomeIcon className="mr-3"  icon={faKey}/>Changer mot de passe {admin.must_change_password&&<span className="w-3 h-3 animate-pulse rounded-full bg-blue-500 absolute top-0 -right-1"></span>}</div>

              </div>
            </div>
            
          </div>
          <AnimatePresence>
            {
              isCompleted.active && <MessageUI message={isCompleted.message} onClose={() => setIsCompleted({active: false, message: ""})}/>
            }
          </AnimatePresence>

        <AnimatePresence>
          {isEditing && (
            <motion.div
            ref={editFormRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 border-t border-gray-200 w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Modifier mon Profil</h3>
                <button onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Prénom</span>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Nom</span>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </label>
                </div>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Téléphone</span>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Adresse</span>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Date de naissance</span>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="mt-1 w-full mx-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <label className="flex flex-col">
                 <span className="text-sm font-medium">Lien de la photo de profil</span>

                  <input
                    
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </label>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Role</span>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">civilité</span>
                   <select
                      type="text"
                      name="civilite"
                      value={formData.civilite}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Mr">Monsieur</option>
                      <option value="Mme">Madame</option>
                    </select>
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          {/* ─── inside your AnimatePresence ─── */}
{isEditPassword && (
  <motion.div 
    ref={pswdFormRef}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 border-t border-gray-200 w-full"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">Changer le mot de passe</h3>
      <button onClick={togglePasswordEdit}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
    <form onSubmit={handleChangePassword} className="space-y-4">
      <label className="flex flex-col">
        <span className="text-sm font-medium">Mot de passe actuel</span>
        <input
          type="password"
          name="current_password"
          value={passwordData.current_password}
          onChange={handlePasswordChange}
          className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-medium">Nouveau mot de passe</span>
        <input
          type="password"
          name="new_password"
          value={passwordData.new_password}
          min={8}
          onChange={handlePasswordChange}
          className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-medium">Confirmer le nouveau mot de passe</span>
        <input
          type="password"
          name="confirm_password"
          min={8}
          value={passwordData.confirm_password}
          onChange={handlePasswordChange}
          className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={togglePasswordEdit}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Enregistrer
        </button>
      </div>
    </form>
  </motion.div>
)}

        </AnimatePresence>
      </div>
    </div>
  );
}

export const MessageUI = ({ message,onClose }) => {
return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-5 backdrop-blur-lg"
    >
      <div className="bg-apple-light/80 rounded-[50px] flex flex-col items-center shadow-lg p-6 px-9">
        
        <h2 className="text-xl w-full font-semibold">{message}</h2>
        <button onClick={onClose} className="mt-4 text-blue-500">Fermer</button>
      </div>
    </motion.div>
  );
}