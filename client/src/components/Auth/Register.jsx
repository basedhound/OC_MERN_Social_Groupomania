import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import { logo } from "../../assets";

const Register = ({ setIsRegistering }) => {
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirm, setPasswordConfirm] = useState("");
   // console.log({ firstname, lastname, email, password, passwordConfirm });

   const { register, error, isLoading } = useRegister();

   const handleSubmit = async (e) => {
      e.preventDefault();

      await register(firstname, lastname, email, password);
   };

   return (
      <form onSubmit={handleSubmit} className="register">
         <img src={logo} alt="logo" className="auth-logo" />

         <div className="firstname-lastname-container">
            <div className="name-wrapper">
               <label htmlFor="firstname">Prénom</label>
               <input
                  required
                  type="text"
                  placeholder="James"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  // pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
               />
            </div>
            <div>
               <label htmlFor="lastname">Nom</label>
               <input
                  required
                  type="text"
                  placeholder="Bond"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  pattern="^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$"
               />
            </div>
         </div>

         <label htmlFor="email">Email</label>
         <input
            required
            type="email"
            placeholder="jamesbond@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"            
            />

         <label htmlFor="password">Mot de passe</label>
         <input
            required
            type="password"
            placeholder="Mix de 8 chiffres & lettres minimum"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

         />
         <label htmlFor="password">Confirmer mot de passe</label>
         <input
            required
            type="password"
            placeholder="Mix de 8 chiffres & lettres minimum"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            pattern={password}
         />
         <button type="submit" disabled={isLoading}>
            S'inscrire
         </button>
         {error && <div className="error">{error}</div>}
         <p>
            <span onClick={() => setIsRegistering(false)}>Se connecter</span>
         </p>
      </form>
   );
};

export default Register;
