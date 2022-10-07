import React, { useEffect, useRef, useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";

//assets
import { sendIcon, fileIcon } from "../../assets";
import { closeIcon } from "../../assets/index";
import "./createpost.css";

const CreatePost = ({ post, id, close }) => {
   const { dispatch } = usePostsContext();
   const { user } = useAuthContext();
   // console.log(user)
   
   //? Post
   const [desc, setDesc] = useState("");
   const [image, setImage] = useState(null);
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields] = useState([])

   //? Frontend image preview
/*        const imageRef = useRef();
   const loadImage = async (e) => {
      if (e.target.files && e.target.files[0]) {
         let img = e.target.files[0];
         setImage({
            image: URL.createObjectURL(img),
         });
      }
   } */

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!user) {
         setError('You must be logged in !')
         return
      }

      const newPost = new FormData() 
      newPost.append("userId", user.user._id)
      newPost.append("desc", desc)

      // const newPost = {
      //    userId: user.user._id,
      //    desc: desc,
      // };

      console.log(newPost.entries()[0])
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

            <div className="uploaded-image">
               {/* <img src="" alt="uploaded file" /> */}
               <div className="close-icon" /* onClick={} */>
                  {/* <img src={closeIcon} alt="remove" /> */}
               </div>
            </div>

            <div className="btns">
               <label htmlFor={"image"} aria-label="select file">
                  <div>
                     <img src={fileIcon} alt="select file" />
                  </div>
               </label>

               <input
                  type="file"
                  /* id={} */
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  /* ref={imageRef}
                  onChange={loadImage} */
               />
               <button type="submit" aria-label="submit">
                  <img src={sendIcon} alt="send" />
               </button>
            </div>
            {image && (
               <div className="uploaded-image">
                  <img src={image.image} alt="remove" />
               </div>
            )}
         </form>
      </article>
   );
};

export default CreatePost;
