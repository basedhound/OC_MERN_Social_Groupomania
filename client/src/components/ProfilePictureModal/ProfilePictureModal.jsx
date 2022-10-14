import { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
// Style
import { Modal, useMantineTheme } from "@mantine/core";
import "./profilepicturemodal.css";
import { dp, fileIcon } from "../../assets";

function ProfilePictureModal({ userPictureModal, setUserPictureModal, data }) {
   const theme = useMantineTheme();
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();
   const { dispatch } = useAuthContext();

//? Get current user's details
const [user, setUser] = useState({});
useEffect(() => {
   const fetchUser = async () => {
      const response = await fetch(`/api/users/${auth.user._id}`, {
         method: "GET",
         body: JSON.stringify(),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
         },
      });
      const json = await response.json();
      setUser(json);
   };
   fetchUser();
}, [auth.user._id, auth.token]);


   //? Handle user's image
   const imageRef = useRef();
   const [file, setFile] = useState(null);

   const handleImages = (e) => {
      if (e.target.files && e.target.files[0]) {
         let img = e.target.files[0];
         setFile(img);
      }
   };

   //? Submit : Update Confirmation
   const { password, email, firstname, lastname, about, ...userDetails } = data;
   const [formData, setFormData] = useState(userDetails);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            formData.profilePicture = fileName;
            try {
               await axios.post("/api/upload", data, {
                  headers: {
                     Authorization: `Bearer ${auth.token}`,
                  },
               });
            } catch (error) {
               console.log({ message: error.message });
            }
         }
         const res = await axios.put(
            "/api/users/" + `${auth.user._id}`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${auth.token}`,
               },
            }
         );
         console.log(res.data);
         dispatch({ type: "UPDATE", payload: res.data });
         setUserPictureModal(false);
         setFile(null);
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
            {file === null ? (
               <img
                  src={user.profilePicture ? PF + user.profilePicture : {dp}}
                  alt="profile_image"
                  className="modal-picture roundimage"
               />
            ) : (
               <img
                  src={URL.createObjectURL(file)}
                  alt="profile_image"
                  className="modal-picture roundimage"
               />
            )}

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
                  accept="image/png, image/jpeg, image/webp"
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
