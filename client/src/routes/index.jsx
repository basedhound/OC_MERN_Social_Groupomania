import { Routes, Route } from "react-router-dom";
// Components
import AppBar from "../components/AppBar/AppBar";
// Pages
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const Router = () => {

   return (
      <>
         <AppBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};

export default Router;


