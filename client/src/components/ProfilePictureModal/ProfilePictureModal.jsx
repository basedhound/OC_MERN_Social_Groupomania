import { useAuthContext } from "../../hooks/useAuthContext";

import "./profilepicturemodal.css";
import { dp, fileIcon } from "../../assets";
import { Modal, useMantineTheme } from "@mantine/core";
import { useRef } from "react";

function ProfilePictureModal({ modalPicture, setModalPicture }) {
   const { user: auth } = useAuthContext();
   const imageRef = useRef();

   const theme = useMantineTheme();

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
         opened={modalPicture}
         onClose={() => setModalPicture(false)}>
         <form className="modal-details">
            <img
               src={auth.user.profilePicture ? auth.user.profilePicture : dp}
               alt="profile_image"
               className="modal-picture roundimage"
            />
            <div className="btns">
               <label htmlFor={"image"} aria-label="select file">
                  <img
                     src={fileIcon}
                     alt="select file"
                     onClick={() => imageRef.current.click()}
                  />
               </label>
               <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  ref={imageRef}
                  // onChange={onImageChange}
               />
            </div>
            <button type="submit">Confirmer</button>
         </form>
      </Modal>
   );
}

export default ProfilePictureModal;
