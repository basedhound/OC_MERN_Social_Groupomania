import { useState } from "react";
import { useLogin } from "./../../hooks/useLogin";
import { logo } from "../../assets";

const Login = ({ setIsRegistering }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login, error, isLoading } = useLogin();

   const handleSubmit = async (e) => {
      e.preventDefault();

      await login(email, password);
      // window.location.reload()

      // console.log(email, password);
   };

   return (
      <form onSubmit={handleSubmit} className="login">
         <img src={logo} alt="logo" className="auth-logo" />

         <label htmlFor="login-email">Email</label>
         <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            
         />

         <label htmlFor="login-password">Mot de passe</label>
         <input
            required
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button disabled={isLoading} type="submit">
            Se connecter
         </button>
         {error && <div classNme="error">{error}</div>}
         <p>
            <span onClick={() => setIsRegistering(true)}>S'inscrire</span>
         </p>
      </form>
   );
};

export default Login;
