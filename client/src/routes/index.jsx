// Utilities
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./../hooks/useAuthContext";
// Components
import AppBar from "../components/AppBar/AppBar";
// Pages
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => {
   const { user } = useAuthContext();

   return (
      <>
         <AppBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default Router;
