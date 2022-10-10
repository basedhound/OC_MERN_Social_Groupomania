import "./profiledetailsmodal.css";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ProfileDetailsModal({ modalDetails, setModalDetails, data }) {
   const theme = useMantineTheme();
   const { user: auth } = useAuthContext();
   const { dispatch } = useAuthContext();
   const { password, ...other } = data;
   // console.log("data:", data);
   const [userData, setUserData] = useState(other);
   // console.log("other :", other);
   // const [profilePicture, setProfilePicture] = useState(null)
   // const dispatch = useDispatch()
   // const params = useParams()

   const handleDetails = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.put(
            "/api/users/" + `${auth.user._id}`,
            userData,
            {
               headers: {
                  Authorization: `Bearer ${auth.token}`,
               },
            }
         );
         console.log(res.data.user);
         // dispatch({ type: "UPDATE", payload: res.data.user });
         setModalDetails(false);
         window.location.reload();
      } catch (err) {}
   };

   return (
      <Modal
         overlayColor={
            theme.colorScheme === "dark"
               ? theme.colors.dark[6]
               : theme.colors.gray[2]
         }
         overlayOpacity={0.55}
         overlayBlur={3}
         background-color="white"
         opened={modalDetails}
         onClose={() => setModalDetails(false)}>
         <form className="modal-details">
            <input
               type="text"
               className="modal-details__input"
               name="firstname"
               placeholder="Prénom"
               onChange={handleDetails}
               value={userData.firstname}
            />
            <input
               type="text"
               className="modal-details__input"
               name="lastname"
               placeholder="Nom"
               onChange={handleDetails}
               value={userData.lastname}
            />
            <input
               type="text"
               className="modal-details__input"
               name="about"
               placeholder="Secteur"
               onChange={handleDetails}
               value={userData.about}
            />
            <input
               type="text"
               className="modal-details__input"
               name="email"
               placeholder="Email"
               onChange={handleDetails}
               value={userData.email}
            />
            <button onClick={handleSubmit}>Confirmer</button>
         </form>
      </Modal>
   );
}

export default ProfileDetailsModal;
