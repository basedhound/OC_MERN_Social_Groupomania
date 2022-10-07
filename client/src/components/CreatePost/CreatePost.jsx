import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";
//Style
import { sendIcon, fileIcon } from "../../assets";
import { closeIcon } from "../../assets/index";
import "./createpost.css";

const CreatePost = (/* { post, id, close } */) => {
   //? Context
   const { dispatch } = usePostsContext();
   const { user } = useAuthContext();
   //? Post
   const imageRef = useRef();
   const [desc, setDesc] = useState("");
   const [file, setFile] = useState(null);

   //? Preview image
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setFile(img);
      }
   };

   //? Submit post
   const handleSubmit = async (e) => {
      e.preventDefault();
      // const newPost = new FormData()
      // newPost.append("userId", user.user._id)
      // newPost.append("desc", desc)
      const newPost = {
         userId: user.user._id,
         desc: desc,
      };
      if (file) {
         const data = new FormData();
         const fileName = Date.now() + file.name;
         data.append("name", fileName);
         data.append("file", file);
         newPost.image = fileName;
         // console.log(newPost);
         try {
            await axios.post("/api/upload", data, {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            });
         } catch (err) {}
      }
      try {
         await axios.post("/api/posts", newPost, {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         });
            window.location.reload();
         
      } catch (err) {}
   };
   // // console.log(newPost.entries()[0])
   // const response = await fetch("/api/posts", {
   //    method: "POST",
   //    // body: JSON.stringify(newPost),
   //    body: newPost,
   //    headers: {
   //       // "Content-Type": "application/json",
   //       // "Content-Type": "multipart/form-data",
   //       'Authorization': `Bearer ${user.token}`
   //    },
   // });
   // const json = await response.json();

   //    if(response.ok) {
   //       setDesc('')
   //       setImage(null)
   //       dispatch({type: 'CREATE_POST', payload:json})
   //    }
   // };




   
   return (
      <article className="createpost gradient-border">
         <form onSubmit={handleSubmit}>
            <textarea
               type="text"
               placeholder="Ecrire un message..."
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
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
   );
};

export default CreatePost;
