import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { format } from "date-fns";
import Auth from "../../pages/Auth/Auth";
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
import { Navigate } from "react-router-dom";

const ProfileCard = () => {
   //? Context
   const { user: auth } = useAuthContext();
   // console.log(user.user)

   //? Logout Button
   const { logout } = useLogout();
   const handleClick = () => {
      logout();
   };

   return (
      <section className="profilecard gradient-border">
         <header>
            <div>
               <img
                  src={dp}
                  alt="profile_image"
                  className="profilecard__dp roundimage"
               />

               <div className="dp-upload">
                  <img src={cameraIcon} alt="change_profile_image" />
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
                  Inscription :{" "}
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
            <button onClick={handleClick}>Déconnexion</button>
            <button>Modifier</button>
         </div>
      </section>
   );
};

export default ProfileCard;
