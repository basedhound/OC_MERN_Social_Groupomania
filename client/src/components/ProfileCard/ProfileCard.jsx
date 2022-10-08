import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { format } from "date-fns";
// Style
import {
   dp,
   clockIcon,
   /* cakeIcon, */
   /* locationIcon, */
   mailIcon,
   cameraIcon,
} from "../../assets";
import "./profilecard.css";
import { useRef, useState } from "react";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";

const ProfileCard = () => {
   //? Context
   const { user: auth } = useAuthContext();
   const imageRef = useRef();

   //? Modals
   const [modalDetails, setModalDetails] = useState(false);

   //? Logout Button
   const { logout } = useLogout();
   const handleLogout = () => {
      logout();
   };

   //? Profile Picture
   const handleProfilePicture = () => {};

   return (
      <section className="profilecard gradient-border">
         <header>
            <div>
               <img
                  src={auth.user.profilePicture ? auth.user.profilePicture : dp}
                  alt="Photo de profil"
                  className="profilecard__dp roundimage"
               />

               <div className="pp-upload">
                  <label htmlFor={"image"} aria-label="select file">
                     <img
                        className="pp-icon"
                        src={cameraIcon}
                        alt="Modifier photo de profil"
                        onClick={() => imageRef.current.click()}
                     />
                  </label>
                  <input
                     type="file"
                     accept="image/png, image/jpeg, image/jpg, image/webp"
                     ref={imageRef}
                     onChange={handleProfilePicture}
                  />
               </div>
            </div>
            <h1>
               {auth.user.firstname && auth.user.lastname
                  ? auth.user.firstname + " " + auth.user.lastname
                  : ""}
            </h1>
            <h2>{auth.user.about ? auth.user.about : ""}</h2>
         </header>
         <article>
            <div className="profilecard__info">
               <img src={clockIcon} alt="join date" />
               <h3>
                  Inscrit le{" "}
                  {format(
                     new Date(auth.user.createdAt ? auth.user.createdAt : ""),
                     "dd/MM/yyyy",
                     {
                        addSuffix: true,
                     }
                  )}
               </h3>
            </div>
            <div className="profilecard__info">
               <img src={mailIcon} alt="mail" />
               <h3>{auth.user.email ? auth.user.email : ""}</h3>
            </div>
         </article>

         <div className="btn-group">
            <button onClick={handleLogout}>Déconnexion</button>
            <button onClick={() => setModalDetails(true)}>Modifier</button>
            <ProfileDetailsModal
               modalDetails={modalDetails}
               setModalDetails={setModalDetails}
            />
         </div>
      </section>
   );
};

export default ProfileCard;
