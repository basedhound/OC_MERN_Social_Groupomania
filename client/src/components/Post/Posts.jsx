import React, { useEffect } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";
import Post from "./Post";

const Posts = () => {
   const { posts, dispatch } = usePostsContext();
   const { user } = useAuthContext();

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch("/api/posts", {
            method: "GET",
            body: JSON.stringify(),
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         });
         const json = await response.json();
         // console.log(json)

         if (response.ok) {
            dispatch({ type: "SET_POSTS", payload: json });
         }
      };
      if (user) {
         fetchPosts();
      }
   }, [user, dispatch]);

   return (
      <div className="posts">
         {posts && posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
   );
};

export default Posts;
