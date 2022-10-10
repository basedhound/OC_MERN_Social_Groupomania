import { useAuthContext } from "../../hooks/useAuthContext";

import "./profilepicturemodal.css";
import { dp, fileIcon } from "../../assets";
import { Modal, useMantineTheme } from "@mantine/core";
import { useRef, useState } from "react";
import axios from "axios";

function ProfilePictureModal({ modalPicture, setModalPicture, data }) {
   const theme = useMantineTheme();
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;


   const imageRef = useRef();

   const { user: auth } = useAuthContext();
   const { password, ...other } = data;
   // console.log(data)
   const [formData, setFormData] = useState(other);

   // //? Update Pictures
   const [profilePicture, setprofilePicture] = useState(null);
   const handleImages = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setprofilePicture(img);
      }
   };

   //? Submit : Update Confirmation
   const handleSubmit = async (e) => {
      e.preventDefault();
      let UserData = formData;
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      UserData.profilePicture = fileName;
      try {
         const res = await axios.put(
            "/api/users/" + `${auth.user._id}`,
            UserData,
            {
               headers: {
                  Authorization: `Bearer ${auth.token}`,
               },
            }
         );
         console.log(res.data.user);
         // dispatch({ type: "UPDATE", payload: res.data.user });
         setModalPicture(false);
         // window.location.reload();
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
         opened={modalPicture}
         onClose={() => setModalPicture(false)}>
         <form action="" className="modal-details">
            <img
               src={auth.user.profilePicture ? PF + auth.user.profilePicture : dp}
               alt="profile_image"
               className="modal-picture roundimage"
            />

            <div>
               <label htmlFor={"image"} aria-label="select file">
                  <div>
                     <img
                        src={fileIcon}
                        alt="select file"
                        onClick={() => imageRef.current.click()}
                     />
                  </div>
               </label>

               <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  name="profilePicture"
                  ref={imageRef}
                  onChange={handleImages}
               />
            </div>

            <button type="submit" onClick={handleSubmit}>
               Confirmer
            </button>
         </form>
      </Modal>
   );
}

export default ProfilePictureModal;
