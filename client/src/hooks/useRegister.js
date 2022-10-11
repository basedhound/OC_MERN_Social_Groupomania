import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(null);
   const { dispatch } = useAuthContext();

   const register = async (firstname, lastname, email, password) => {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/register', {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({firstname, lastname, email, password}),
      });
      const json = await response.json();
      if (!response.ok) {
         setIsLoading(false);
         setError(json.error);
      }
      if (response.ok) {
         // save the user to local storage
         localStorage.setItem("user", JSON.stringify(json));

         // update auth context
         dispatch({type: 'LOGIN', payload: json})

         setIsLoading(false)
      }
   };
   return {register, isLoading, error} 
};
