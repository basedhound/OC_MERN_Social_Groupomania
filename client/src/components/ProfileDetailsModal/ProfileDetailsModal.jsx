import "./profiledetailsmodal.css";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ProfileDetailsModal({ modalDetails, setModalDetails, data }) {
   const theme = useMantineTheme();
   //? Dependencies
   const { user: auth } = useAuthContext();
   const { dispatch } = useAuthContext();

//? Handle user's details
   const handleDetails = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
   };

   //? Submit : Update Confirmation
   const { email, password, profilePicture, ...userDetails } = data;
   const [userData, setUserData] = useState(userDetails);
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
         // console.log(res.data.user);
         dispatch({ type: "UPDATE", payload: res.data });
         setModalDetails(false);
         // window.location.reload();
      } catch (error) {
         console.log({ message: error.message });
   };
   };

   return (
      <Modal
         overlayColor={
            theme.colorScheme === "dark"
               ? theme.colors.dark[7]
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
            <button onClick={handleSubmit}>Confirmer</button>
         </form>
      </Modal>
   );
}

export default ProfileDetailsModal;
