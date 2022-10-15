import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
// Modal
import ProfileDetailsModal from "../ProfileDetailsModal/ProfileDetailsModal";
import ProfilePictureModal from "./../ProfilePictureModal/ProfilePictureModal";
// Style
import {
   dp,
   clockIcon,
   cameraIcon,
   /* mailIcon, */
   /* cakeIcon, */
   /* locationIcon, */
} from "../../assets";
import "./profilecard.css";

const ProfileCard = () => {
   //? Utilities
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();
   //? Modals
   const [modalDetails, setModalDetails] = useState(false);
   const [userPictureModal, setUserPictureModal] = useState(false);

   //? Get current user
   const [user, setUser] = useState({});
   useEffect(() => {
      const fetchUser = async () => {
         const res = await axios.get(`/api/users/${auth.user._id}`, {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         });
         setUser(res.data);
      };
      fetchUser();
   }, [auth.user._id, auth.token]);

   //? Logout
   const { logout } = useLogout();
   const handleLogout = () => {
      logout();
   };

   return (
      <section className="profilecard gradient-border">
         <header>
            <div>
               <img
                  src={user.profilePicture ? PF + user.profilePicture : dp}
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
                        onClick={() => setUserPictureModal(true)}
                     />
                  </label>
                  <ProfilePictureModal
                     userPictureModal={userPictureModal}
                     setUserPictureModal={setUserPictureModal}
                     data={auth.user}
                  />
               </div>
            </div>
            <h1>
               {user.firstname || user.lastname
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
                  {format(new Date(auth.user?.createdAt), "dd/MM/yyyy")}
               </h3>
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
