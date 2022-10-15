import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Style
import { dp } from "../../assets";
import "./online.css";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const Online = () => {
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [users, setUsers] = useState([]);
   const { user: auth } = useAuthContext();

   //? Get every user
   useEffect(() => {
      const getUsers = async () => {
         try {
            const res = await axios.get("api/users", {
               headers: {
                  Authorization: `Bearer ${auth.token}`,
               },
            });
            setUsers(res.data);
         } catch (error) {
            console.log({ message: error.message });
         }
      };
      getUsers();
   }, [auth.token]);

   return (
      <section className="online">
         <h2>Utilisateurs ({users.length})</h2>
         {users &&
            users.map((user) => (
               <Link to="/" key={user._id}>
                  <div className="user">
                     <div>
                        <img
                           src={
                              user.profilePicture
                                 ? PF + user.profilePicture
                                 : dp
                           }
                           alt="utilisateur"
                           className="roundimage"
                        />
                     </div>
                     <h3>{user.firstname + " " + user.lastname}</h3>
                  </div>
               </Link>
            ))}
      </section>
   );
};

export default Online;
