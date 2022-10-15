import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./../../hooks/useAuthContext";
// Style
import Online from "../Online/Online";

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
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();

   //? Get current user details
   const [user, setUser] = useState({});
   useEffect(() => {
      const getUser = async () => {
         const res = await axios.get(`/api/users/${auth.user._id}`, {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         });
         setUser(res.data);
      };
      getUser();
   }, [auth.user._id, auth.token]);

   //? Back to top of the page
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);

   //? Sidebar
   const [sidebar, setSidebar] = useState(null);
   const showSidebar = () => [setSidebar(!sidebar)];

   return (
      <div className="appbar--container">
         <img src={logo} alt="logo" />
         <header className="appbar topZ">
            <div className="hamburger" onClick={showSidebar}>
               <img
                  src={sidebar ? closeIcon : hamburger}
                  alt="Utilisateurs"
                  title="Utilisateurs"
               />
            </div>
            <div className={sidebar ? "sidebar visible" : "sidebar"}>
               <Online />
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
