// React
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Options from "../Options/Options";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";
//Style
import { format /* formatDistanceToNow */ } from "date-fns";
import { dp, likeIcon, likeOutlined } from "../../assets";
import "./post.css";
import { Link } from "react-router-dom";
import PostUpdateModal from "../PostUpdateModal/PostUpdateModal";

const Post = ({ post }) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   // Context
   const { dispatch } = usePostsContext();
   const { user: auth } = useAuthContext();

   // Errors
   const [error, setError] = useState(null);

   const [updateModal, setUpdateModal] = useState(false);

   //? Fetch user
   const [user, setUser] = useState({});
   useEffect(() => {
      const fetchUser = async () => {
         const response = await fetch(`/api/users/${post.userId}`, {
            method: "GET",
            body: JSON.stringify(),
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${auth.token}`,
            },
         });
         const json = await response.json();
         setUser(json);
         // console.log(json)
      };
      fetchUser();
   }, [post.userId, auth.token]);

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
   const [liked, setLiked] = useState(post.likes.includes(auth.user._id));
   // fetch
   const handleLike = async () => {
      const likeReq = {
         userId: auth.user._id,
      };

      const likeRes = await fetch("/api/posts/" + post._id + "/like", {
         method: "PUT",
         body: JSON.stringify(likeReq),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
         },
      });
      // const json = await likeRes.json();

      setLike(liked ? like - 1 : like + 1);
      setLiked(!liked);
   };
   //? Already liked ?
   useEffect(() => {
      setLiked(post.likes.includes(auth.user._id));
   }, [auth.user._id, post.likes]);

   //? Options : DELETE
   // Delete
   const handleDelete = async () => {
      const deleteReq = {
         userId: auth.user._id,
         admin: false,
      };
      try {
         if (auth.user.admin || auth.user._id === post.userId) {
         const deleteRes = await fetch("/api/posts/" + post._id, {
            method: "DELETE",
            body: JSON.stringify(deleteReq),
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${auth.token}`,
            },
         });
         const json = await deleteRes.json();
         dispatch({ type: "DELETE_POST", payload: json });
      }} catch (err) {}
   };

   //? Options : UPDATE
   // Delete
   const handleUpdate = () => {
      if (auth.user.admin || auth.user._id === post.userId) {
         setUpdateModal(true);
      }
   };

   const options = {
      Supprimer: handleDelete,
      Modifier: handleUpdate,
   };

   return (
      <article
         className="post halfborder single" /* or "post gradient-border" */
      >
         <header>
            <Link to="/">
               <img
                  src={user.profilePicture ? PF + user.profilePicture : dp}
                  alt="profileImage"
                  className="post__dp roundimage"
               />
            </Link>
            <div>
               <h3>
                  {user.firstname && user.lastname
                     ? user.firstname + " " + user.lastname
                     : ""}
               </h3>
               <p>
                  {format(new Date(post?.createdAt), "dd/MM/yyyy", {
                     addSuffix: true,
                  })}
               </p>
            </div>
            {/* {auth.user.admin || auth.user._id === post.userId ? ( */}
            <Options options={options} />
            {/* ) : null} */}
            <PostUpdateModal
               updateModal={updateModal}
               setUpdateModal={setUpdateModal}
               data={post}
            />
         </header>
         <div className="post__details">
            {post.desc}

            <div className="post__details">
               <img
                  className="post__image"
                  alt=""
                  src={post.image ? PF + post.image : null}
               />
            </div>
         </div>
         <div className="post__footer">
            <div className="post__reactions">
               <img
                  src={liked ? likeIcon : likeOutlined}
                  alt="like"
                  onClick={handleLike}
               />
               <p>{like}</p>
            </div>
            <Input />
         </div>
      </article>
   );
};

export default Post;
