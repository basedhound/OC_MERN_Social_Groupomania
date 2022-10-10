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
import { useRef, useState, useEffect } from "react";
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import ProfilePictureModal from './../ProfilePictureModal/ProfilePictureModal';
import axios from "axios";

const ProfileCard = () => {
   //? Context
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   const { user: auth } = useAuthContext();
   // const imageRef = useRef();

   //? Modals
   const [modalDetails, setModalDetails] = useState(false);
   const [modalPicture, setModalPicture] = useState(false);
   

   const [formData, setFormData] = useState();

   //? Logout Button
   const { logout } = useLogout();
   const handleLogout = () => {
      logout();
   };

   //? Fetch user
   const [user, setUser] = useState({});
   useEffect(() => {
      const fetchUser = async () => {
         const response = await fetch(`/api/users/${auth.user._id}`, {
            method: "GET",
            body: JSON.stringify(),
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${auth.token}`,
            },
         });
         const json = await response.json();
         console.log(json);
         setUser(json);
         // console.log(json)
      };
      fetchUser();
   }, [auth.user._id]);


   return (
      <section className="profilecard gradient-border">
         <header>
            <div>
               <img
                  src={auth.user.profilePicture ? PF + user.profilePicture : dp}
                  alt="Photo de profil"
                  name="profilePicture"
                  className="profilecard__dp roundimage"
               />

               <div className="pp-upload">
                  <label htmlFor={"image"} aria-label="select file">
                     <img
                        className="pp-icon"
                        src={cameraIcon}
                        alt="Modifier photo de profil"
                        onClick={() => setModalPicture(true)}
                     />
                  </label>
                  <ProfilePictureModal
               modalPicture={modalPicture}
               setModalPicture={setModalPicture}
               data={auth.user}
            />
               </div>
            </div>
            <h1>
               {user.firstname && user.lastname
                  ? user.firstname + " " + user.lastname
                  : ""}
            </h1>
            <h2>{user.about ? user.about : ""}</h2>
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
               <h3>{user.email ? user.email : ""}</h3>
            </div>
         </article>

         <div className="btn-group">
            <button onClick={handleLogout}>Déconnexion</button>

            <button onClick={() => setModalDetails(true)}>Modifier</button>
            <ProfileDetailsModal
               modalDetails={modalDetails}
               setModalDetails={setModalDetails}
               data={auth.user}
            />
         </div>
      </section>
   );
};

export default ProfileCard;
