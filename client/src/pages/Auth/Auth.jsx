// React
import React, { useState } from "react";
// Components
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
// Style
import "./auth.css";


const Auth = () => {
   const [isRegistering, setIsRegistering] = useState(false);

   return (
      <div className="auth-container">
      <section className={isRegistering ? "auth signup" : "auth"}>
         <Login setIsRegistering={setIsRegistering} /> 
         <Register setIsRegistering={setIsRegistering} />
      </section>
      </div>
   );
};

export default Auth;
