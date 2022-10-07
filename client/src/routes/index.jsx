// Utilities
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthContext } from "./../hooks/useAuthContext";

// Components
import AppBar from "../components/AppBar/AppBar";
import Online from "./../components/Online/Online";
// Pages
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => {
   const { user } = useAuthContext();

   const {
      modal: { isSidebarVisible },
      // post: { editingPost },
   } = useSelector((state) => state);

   return (
      <>
         <div className={isSidebarVisible ? "sidebar visible" : "sidebar"}>
            <Online />
         </div>
         <AppBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route
               path="/user/:id"
               element={<Profile />}
            />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default Router;
