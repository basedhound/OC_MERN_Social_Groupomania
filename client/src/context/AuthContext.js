import { createContext, useReducer, useEffect } from "react";
import Auth from "../pages/Auth/Auth";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN":
         return { user: action.payload, };
      case "LOGOUT":
         return { user: "null" }, (<Auth />);
      case "UPDATE":
         return { user: action.payload };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user: null });

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
         dispatch({ type: "LOGIN", payload: user });
      }
   }, []);

   console.log(" AuthContext state: ", state);

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};
