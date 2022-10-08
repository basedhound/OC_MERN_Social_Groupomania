import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Style
import { dp } from "../../assets";
import "./online.css";
import axios from "axios";

const Online = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const getUsers = async () => {
         try {
            const allUsers = await axios.get("api/users");
            setUsers(allUsers.data);
            // console.log(allUsers.data);
         } catch (err) {
            console.log(err);
         }
      };
      getUsers();
   }, []);

   return (
      <section className="online">
         <h2>Utilisateurs ({users.length})</h2>
         {users &&
            users.map((user)  => (
               <Link to="/" key={user._id} >
                  <div className="user">
                     <div>
                        <img
                           src={dp}
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
