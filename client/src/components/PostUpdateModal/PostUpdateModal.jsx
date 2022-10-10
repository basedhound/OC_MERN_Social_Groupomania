import "./postupdatemodal.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

import { sendIcon, fileIcon, closeIcon } from "../../assets";

function PostUpdateModal({ updateModal, setUpdateModal, data }) {
   //? Post
   const imageRef = useRef();
   const [file, setFile] = useState(null);

   const theme = useMantineTheme();
   const { user: auth } = useAuthContext();
   const [updatedPost, setUpdatedPost] = useState(data);

   const handleDetails = (e) => {
      setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         if (auth.user.admin || auth.user._id === data.userId) {
            const updateReq = {
               ...updatedPost,
            };
            const res = await axios.put(
               "/api/posts/" + `${data._id}`,
               updateReq,
               {
                  headers: {
                     Authorization: `Bearer ${auth.token}`,
                  },
               }
            );
            console.log(res);
            // dispatch({ type: "UPDATE", payload: res.data.user });
            setUpdateModal(false);
            window.location.reload();
         }
      } catch (err) {}
   };

   //? Preview image
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setFile(img);
      }
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
         opened={updateModal}
         onClose={() => setUpdateModal(false)}>
         {/*//? Composant CreatePost adapté */}
         <article className="createpost gradient-border">
            <form onSubmit={handleSubmit}>
               <textarea
                  type="text"
                  placeholder="Ecrire un message..."
                  name="desc"
                  onChange={handleDetails}
                  value={updatedPost.desc}
               />
               {file && (
                  <div className="uploaded-image">
                     <img src={URL.createObjectURL(file)} />
                     <div className="close-icon" onClick={() => setFile(null)}>
                        {<img src={closeIcon} alt="remove" />}
                     </div>
                  </div>
               )}

               <div className="btns">
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
                     ref={imageRef}
                     onChange={onImageChange}
                  />
                  <button type="submit" aria-label="submit">
                     <img src={sendIcon} alt="send" />
                  </button>
               </div>
            </form>
         </article>
      </Modal>
   );
}

export default PostUpdateModal;
