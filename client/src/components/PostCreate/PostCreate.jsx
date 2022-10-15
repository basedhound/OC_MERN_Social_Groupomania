import { useRef, useState } from "react";
import axios from "axios";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
//Style
import { sendIcon, fileIcon, closeIcon } from "../../assets";
import "./postcreate.css";

const CreatePost = () => {
   //? Context
   const { dispatch } = usePostsContext();
   const { user: auth } = useAuthContext();
   //? Post
   const imageRef = useRef();
   const [desc, setDesc] = useState("");
   const [file, setFile] = useState(null);

   //? Preview image
   const onImageChange = (event) => {
      console.log(event);
      if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setFile(img);
      }
   };

   //? Submit post
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (desc === "" && file === null) {
         return;
      }

      const newPost = {
         userId: auth.user._id,
         desc: desc,
      };

      if (file) {
         const data = new FormData();
         const fileName = Date.now() + file.name;
         data.append("name", fileName);
         data.append("file", file);
         newPost.image = fileName;
         console.log("test", file);
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
      try {
         const res = await axios.post("/api/posts", newPost, {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         });
         setDesc("");
         setFile(null);
         dispatch({ type: "CREATE_POST", payload: res.data });
      } catch (error) {
         console.log({ message: error.message });
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
                  // onClick={this.value= null}
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
