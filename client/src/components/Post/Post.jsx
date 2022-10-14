import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Hooks
import { useAuthContext } from "./../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
// Components
import Comment from "../Comment/Comment";
import PostOptions from "../PostOptions/PostOptions";
import PostUpdateModal from "../PostUpdateModal/PostUpdateModal";
// Utilities
import { format /* formatDistanceToNow, */ } from "date-fns";
//Style
import { dp, likeIcon, likeOutlined } from "../../assets";
import "./post.css";
import axios from "axios";

const Post = ({ post }) => {
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();
   const { dispatch } = usePostsContext();
   const [updatePostModal, setUpdatePostModal] = useState(false);

   //? Get post's user details
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
      };
      fetchUser();
   }, [post.userId, auth.token]);

   //? Likes
   const [liked, setLiked] = useState(false);
   const [like, setLike] = useState(post.likes.length);
   const data = auth.user._id;
   const handleLike = async () => {
      await axios.put("/api/posts/" + post._id + "/like", data, {
         headers: {
            Authorization: `Bearer ${auth.token}`,
         },
      });
      setLiked(!liked);
      setLike(liked ? like - 1 : like + 1);
      // const json = await likeRes.json();
      // dispatch({ type: "UPDATE_POST", payload: json });
   };

   useEffect(() => {
      // Already liked ?
      setLiked(post.likes.includes(auth.user._id));
   }, [auth.user._id, post.likes]);

   //? Post Option : DELETE
   const handleDelete = async () => {
      const deleteReq = {
         userId: auth.user._id,
         admin: auth.user.admin,
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
         }
      } catch (error) {
         console.log({ message: error.message });
      }
   };

   //? Post Option : UPDATE
   const handleUpdate = () => {
      if (auth.user.admin || auth.user._id === post.userId) {
         setUpdatePostModal(true);
      }
   };

   //? Post Options : Modal
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
                  {user.firstname || user.lastname
                     ? user.firstname + " " + user.lastname
                     : ""}
               </h3>
               <p>
                  {format(new Date(post?.createdAt), "dd/MM/yyyy 'à' H:mm", {
                     hour24: true,
                     addSuffix: false,
                  })}
               </p>
            </div>
            {auth.user.admin || auth.user._id === post.userId ? (
               <PostOptions options={options} />
            ) : null}
            <PostUpdateModal
               updatePostModal={updatePostModal}
               setUpdatePostModal={setUpdatePostModal}
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
                  title="Aimer ce message"
               />
               <p>{like}</p>
            </div>
            <Comment />
         </div>
      </article>
   );
};

export default Post;
