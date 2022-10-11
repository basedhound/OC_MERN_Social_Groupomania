import { useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
// Style
import { Modal, useMantineTheme } from "@mantine/core";
import "./profilepicturemodal.css";
import { dp, fileIcon } from "../../assets";

function ProfilePictureModal({ userPictureModal, setUserPictureModal, data }) {
   //? Utilities
   const theme = useMantineTheme();
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();

   // //? Update Pictures
   const imageRef = useRef();
   const [profilePicture, setprofilePicture] = useState(null);
   const handleImages = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setprofilePicture(img);
      }
   };

   //? Submit : Update Confirmation
   const { password, ...userDetails } = data;
   const [formData, setFormData] = useState(userDetails);
   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      formData.profilePicture = fileName;
      try {
         const res = await axios.put(
            "/api/users/" + `${auth.user._id}`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${auth.token}`,
               },
            }
         );
         console.log(res.data.user);
         // dispatch({ type: "UPDATE", payload: res.data.user });
         setUserPictureModal(false);
         // window.location.reload();
      } catch (error) {
         console.log({ message: error.message });
      }
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
         opened={userPictureModal}
         onClose={() => setUserPictureModal(false)}>
         <form action="" className="modal-details">
            <img
               src={
                  auth.user.profilePicture ? PF + auth.user.profilePicture : dp
               }
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
