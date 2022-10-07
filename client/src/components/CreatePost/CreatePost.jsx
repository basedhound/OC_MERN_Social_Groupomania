import React, { useEffect, useRef, useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";

//assets
import { sendIcon, fileIcon } from "../../assets";
import { closeIcon } from "../../assets/index";
import "./createpost.css";

const CreatePost = ({ post, id, close }) => {
   //? Context
   const { dispatch } = usePostsContext();
   const { user } = useAuthContext();
   //? Post
   const imageRef = useRef();     
   const [desc, setDesc] = useState("");
   const [image, setImage] = useState(null);
   //? Error
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields] = useState([])

   //? Preview image
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setImage(img);
      }
   };

   //? Submit post
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!user) {
         setError('You must be logged in !')
         return
      }

      // (without picture)
      // const newPost = {
      //    userId: user.user._id,
      //    desc: desc,
      // };

      const newPost = new FormData() 
      newPost.append("userId", user.user._id)
      newPost.append("desc", desc)

      // console.log(newPost.entries()[0])
      const response = await fetch("/api/posts", {
         method: "POST",
         // body: JSON.stringify(newPost),
         body: newPost,
         headers: {
            // "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${user.token}`
         },
      });
      const json = await response.json();

      // if (!response.ok) {
      //    setError(json.error)
      //    setEmptyFields()
      // }
      
      if(response.ok) {
         setDesc('')
         setImage(null)
         setError(null)
         setEmptyFields([])
         dispatch({type: 'CREATE_POST', payload:json})
      }
   };

   return (
      <article className="createpost gradient-border">
         <form onSubmit={handleSubmit}>
            <textarea
               type="text"
               placeholder="Ecrire un message..."
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
            />
            {image && (
            <div className="uploaded-image">
            <img src={URL.createObjectURL(image)}/>               
               <div className="close-icon" onClick={() => setImage(null)}>
                  {<img src={closeIcon} alt="remove" />}
               </div>
            </div>)}

            <div className="btns">
               <label htmlFor={"image"} aria-label="select file">
                  <div>
                     <img src={fileIcon} alt="select file" onClick={() => imageRef.current.click()} />
                  </div>
               </label>

               <input
                  type="file"
                  name="myImage"
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
