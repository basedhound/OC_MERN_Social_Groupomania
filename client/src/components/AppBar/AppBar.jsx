// React
import React, { useEffect } from "react";
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

const AppBar = () => {
   const dispatch = useDispatch();

   //? Online panel on leftside
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
                  alt="hamburger"
                  title="Membres"
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
               <button type="submit" aria-label="search">
                  <img src={searchIcon} alt="search" />
               </button>
               <input
                  type="text"
                  placeholder="Rechercher..." /* value={} */ /* onChange={} */
               />
               <button /* onClick={}*/ type="button" aria-label="clear search">
                  <img src={closeIcon} alt="close" className="close" />
               </button>
            </form>
            <nav className="appbar__profile">
               <Link to="/">
                  <img
                     src={dp}
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
