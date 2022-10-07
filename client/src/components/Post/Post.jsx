// React
import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "../Input/Input";
import Options from "../Options/Options";
// Context
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";
//Style
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { dp, likeIcon, likeOutlined } from "../../assets";
import "./post.css";

const Post = ({ post }) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   // Context
   const { dispatch } = usePostsContext();
   const { user: currentUser } = useAuthContext();
   // Errors
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields] = useState([])

   //? Fetch user
   const [user, setUser] = useState({});
   useEffect(() => {
      const fetchUser = async () => {
      const response = await fetch(`/api/users/${post.userId}`, {
         method: "GET",
         body: JSON.stringify(),
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser.token}`
         },
      });
      const json = await response.json()
      setUser(json);
      // console.log(json)
   };
   fetchUser();
}, [post.userId]);

/*    //? Fetch user (axios)
   const [user, setUser] = useState({});
   useEffect(() => {
      const fetchUser = async () => {
         const res = await axios.get(`/api/users/${post.userId}`);
         // console.log(res.data)
         setUser(res.data);
      };
      fetchUser();
   }, [post.userId]);
 */


   //? Likes
   const [like, setLike] = useState(post.likes.length);
   const [liked, setLiked] = useState(post.likes.includes(currentUser.user._id)); 
   // fetch 
   const handleLike = async () => {

      const likeReq = {
         userId: currentUser.user._id,
      };

      const likeRes = await fetch("/api/posts/" + post._id + "/like", {
         method: "PUT",
         body: JSON.stringify(likeReq),
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser.token}`
         },
      });
      // const json = await likeRes.json();

      setLike(liked ? like - 1 : like + 1);
      setLiked(!liked);
   };
   //? Already liked ?
   useEffect(() => {
      setLiked(post.likes.includes(currentUser.user._id));
   }, [currentUser.user._id, post.likes]);




   //? Options : DELETE / UPDATE
   // Delete
   const handleDelete = async () => {
      if (!currentUser) {
         return;
      }

      const deleteReq = {
         userId: currentUser.user._id,
         admin: false
      };

      const deleteRes = await fetch("/api/posts/" + post._id, {
         method: "DELETE",
         body: JSON.stringify(deleteReq),
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser.token}`
         },
      });
      const json = await deleteRes.json();

      if (!deleteRes.ok) {
         setError(json.error);
         setEmptyFields();
      }

      if (deleteRes.ok) {
         dispatch({ type: "DELETE_POST", payload: json });
      }
   };
   // Update
   // const editHandler = () => {
   // 	dispatch(setEditingPost(post));
   // };
   const options = {
      Supprimer: handleDelete,
      Modifier: "",
   };   

   return (
      <article
         className="post halfborder single" /* or "post gradient-border" */
      >
         <header>
            {/* <Link to={`/profile/${user.username}`}> */}
               <img
                  src={dp}
                  alt="profileImage"
                  className="post__dp roundimage"
               />
            {/* </Link> */}
            <div>
               <h3>{user.firstname + " " + user.lastname || "Username"}</h3>
               <p>
                  {formatDistanceToNow(new Date(post?.createdAt), {
                     addSuffix: true,
                  })}
               </p>
            </div>
            <Options options={options} />
         </header>
         <div className="post__details">
            {post.desc}

            <div className="post__details">
            <img className="post__image" src={PF + post.image} alt="" />
            </div>
         </div>
         <div className="post__footer">
            <div className="post__reactions">
               <img src={liked ? likeIcon : likeOutlined} 
               alt="like" 
               onClick={handleLike} />
               <p>{like}</p>
            </div>
            <Input />
         </div>
      </article>
   );
};

export default Post;
