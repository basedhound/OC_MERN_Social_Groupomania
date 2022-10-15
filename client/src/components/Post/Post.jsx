import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Hooks
import { useAuthContext } from "./../../hooks/useAuthContext";
import { usePostsContext } from "../../hooks/usePostsContext";
// Components
import Comments from "../Comments/Comments";
import PostOptionsModal from "../PostOptionsModal/PostOptionsModal";
import PostUpdateModal from "../PostUpdateModal/PostUpdateModal";
//Style
import { format, /*formatDistanceToNow,*/ } from "date-fns";
import { dp, likeIcon, likeOutlined } from "../../assets";
import "./post.css";
import axios from "axios";

const Post = ({ post }) => {
   //? Dependencies
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const { user: auth } = useAuthContext();
   const { dispatch } = usePostsContext();
   const [updatePostModal, setUpdatePostModal] = useState(false);

   //? Get user
   const [user, setUser] = useState({});
   useEffect(() => {
      const getUser = async () => {
         const res = await axios.get(`/api/users/${post.userId}`, {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         });
         setUser(res.data);
      };
      getUser();
   }, [post.userId, auth.token]);

   //? Like system
   const [liked, setLiked] = useState(false);
   const [like, setLike] = useState(post.likes.length);
   useEffect(() => {
      setLiked(post.likes.includes(auth.user._id));
   }, [auth.user._id, post.likes]);
   const handleLikes = () => {
      axios.put(
         "/api/posts/" + post._id + "/like",
         { userId: auth.user._id },
         {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         }
      );
      setLike(liked ? like - 1 : like + 1);
      setLiked(!liked);
      // dispatch({ type: "UPDATE_POST", payload: res.data });
   };

     //? Delete Post
   const handleDelete = async () => {
      const req = {
         userId: auth.user._id,
         admin: auth.user.admin,
      };
      if (auth.user.admin || auth.user._id === post.userId) {
      try {
            const res = await axios.delete(
               `/api/posts/${post._id}`,

               {
                  data: req,
                  headers: {
                     Authorization: `Bearer ${auth.token}`,
                  },
               }
            );
            dispatch({ type: "DELETE_POST", payload: res.data });
         } catch (error) {
            console.log({ message: error.message });
         }
      }
   };

   //? Update Post
   const handleUpdate = () => {
      if (auth.user.admin || auth.user._id === post.userId) {
         setUpdatePostModal(true);
      }
   };

   //? Delete/Update Modal
   const options = {
      Supprimer: handleDelete,
      Modifier: handleUpdate,
   };

   return (
      <article className="post halfborder single" /*"gradient-border"*/>
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
               <PostOptionsModal options={options} />
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
                  onClick={handleLikes}
                  title="Aimer ce message"
               />
               <p>{like}</p>
            </div>
            <Comments />
         </div>
      </article>
   );
};

export default Post;
