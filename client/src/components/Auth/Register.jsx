import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import { logo } from "../../assets";

const Register = ({ setIsRegistering }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const { register, error, isLoading } = useRegister();

   const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(email, password, firstname, lastname);

      await register(email, password, firstname, lastname);
   };

   return (
      <form onSubmit={handleSubmit} className="register">
         <img src={logo} alt="logo" className="auth-logo" />

         <label htmlFor="name">Prénom</label>
         <input
            required
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
         />
         <label htmlFor="name">Nom</label>
         <input
            required
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
         />
         <label htmlFor="email">Email</label>
         <input
            required
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />

         <label htmlFor="password">Mot de passe</label>
         <input
            required
            type="password"
            placeholder="6 caractères minimum"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button type="submit" disabled={isLoading}>S'inscrire</button>
         {error && <div className="error">{error}</div>}
         <p>
            <span onClick={() => setIsRegistering(false)}>Se connecter</span>
         </p>
      </form>
   );
};

export default Register;
