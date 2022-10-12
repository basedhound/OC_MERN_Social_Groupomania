import "./postupdatemodal.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";

import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

import { sendIcon, fileIcon, closeIcon } from "../../assets";

function PostUpdateModal({ updatePostModal, setUpdatePostModal, data }) {
   const theme = useMantineTheme();
   //? Post
   const imageRef = useRef();
   const [file, setFile] = useState(null);
   const { dispatch } = usePostsContext();

   const { user: auth } = useAuthContext();
   const [updatePost, setUpdatePost] = useState(data);

   const handleDetails = (e) => {
      setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
   };

   //? Handle Image
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setFile(img); //! tester plus bas
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (auth.user.admin || auth.user._id === data.userId) {
         try {
            if (file) {
               const data = new FormData();
               const fileName = Date.now() + file.name;
               data.append("name", fileName);
               data.append("file", file);
               updatePost.image = fileName;
               // setUpdatePost({ ...updatePost, image:fileName });
               try {
                  await axios.post("/api/upload", data, {
                     headers: {
                        Authorization: `Bearer ${auth.token}`,
                     },
                  });
               } catch (error) {
                  console.log({ message: error.message });
               }
            } else {
               updatePost.image = null;
            }

            const res = await axios.put(
               "/api/posts/" + `${data._id}`,
               updatePost,
               {
                  headers: {
                     Authorization: `Bearer ${auth.token}`,
                  },
               }
            );
            // console.log(res);
            console.log(res.data);
            dispatch({ type: "UPDATE_POST", payload: res.data });
            setUpdatePostModal(false);
            setFile(null);
            // window.location.reload();
         } catch (error) {
            console.log({ message: error.message });
         }
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
         background-color="white"
         opened={updatePostModal}
         onClose={() => setUpdatePostModal(false)}>
         <article className="createpost gradient-border">
            <form onSubmit={handleSubmit}>
               <textarea
                  type="text"
                  placeholder="Ecrire un message..."
                  name="desc"
                  onChange={handleDetails}
                  value={updatePost.desc}
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
