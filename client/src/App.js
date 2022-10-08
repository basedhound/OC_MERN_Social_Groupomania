import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import Router from "./routes";
import Auth from "./pages/Auth/Auth";
import { MantineProvider } from '@mantine/core';


function App() {
   const { user } = useAuthContext();
 
   return (
      <div className="app">
         <div className="container">
            {user == null ?  <Auth /> : <Router />}
            </div>
      </div>
   );
}

export default App;
