import React, {useState} from "react";
import { useLogout } from "../../hooks/useLogout";
import {
   dp,
   clockIcon,
   cakeIcon,
   locationIcon,
   mailIcon,
   cameraIcon,
} from "../../assets";
import "./profilecard.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";


const ProfileCard = () => {
   const {user : currentUser} = useAuthContext();
   // console.log(user.user)

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
            <h1>{currentUser?.user?.firstname + " " + currentUser?.user?.lastname }</h1>
            <h2>{currentUser?.user?.about}</h2>
         </header>
         <article>
            <div className="profilecard__info">
               <img src={clockIcon} alt="join date" />
               <h3>{formatDistanceToNow(new Date(currentUser?.user?.createdAt), {
                     addSuffix: true,
                  })}</h3>
            </div>
            <div className="profilecard__info">
               <img src={mailIcon} alt="mail" />
               <h3>{currentUser?.user?.email}</h3>
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
