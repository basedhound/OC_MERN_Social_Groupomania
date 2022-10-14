// React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Features
import { toggleSidebar } from "../../features/modalSlice";
// Style
import {
   dp,
   closeIcon,
   searchIcon,
   hamburger,
   chatIcon,
   homeIcon,
   logo,
} from "../../assets";
import "./appbar.css";
import { useAuthContext } from "./../../hooks/useAuthContext";


const AppBar = () => {
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();
   const dispatch = useDispatch();

   //? Get current user's details
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
      setUser(json);
   };
   fetchUser();
}, [auth.user._id, auth.token]);

   //? Online panel
   const {
      // user: { id, profileImage },
      modal: { isSidebarVisible },
   } = useSelector((state) => state);

   //? Top of the page
   useEffect(() => {
      // 👇️ scroll to top on page load
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);

   return (
      <div className="appbar--container">
         
         <img src={logo} alt="logo" />
         <header className="appbar topZ">
            <div
               className="hamburger"
               onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}>
               <img
                  src={isSidebarVisible ? closeIcon : hamburger}
                  alt="Utilisateurs"
                  title="Utilisateurs"
               />
            </div>
            <Link to="/">
               <img
                  src={homeIcon}
                  alt="home"
                  title="Accueil"
                  className="home-icon"
               />
            </Link>
            <form /* onSubmit={} */ className="searchform">
               <button disabled type="submit" aria-label="search">
                  <img src={searchIcon} alt="search" />
               </button>
               <input               
                  type="text"
                  placeholder="Rechercher..." /* value={} */ /* onChange={} */
               />
               <button /* onClick={}*/ type="button" aria-label="clear search">
                  {/* <img src={closeIcon} alt="close" className="close" /> */}
               </button>
            </form>
            <nav className="appbar__profile">
               <Link to="/">
                  <img
                     src={user.profilePicture ? PF + user.profilePicture : dp}
                     alt="profileImage"
                     className="appbar__profile__dp"
                     title="Profil"
                     onClick={() => {
                        window.scrollTo({
                           top: 0,
                           left: 0,
                           behavior: "smooth",
                        });
                     }}
                  />
               </Link>
               <Link to="/">
                  <img
                     src={chatIcon}
                     alt="chat"
                     className="chat"
                     title="Chat"
                  />
               </Link>
            </nav>
         </header>
      </div>
   );
};

export default AppBar;
