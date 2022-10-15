import { useEffect } from "react";
import axios from "axios";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "./../../hooks/useAuthContext";
import Post from "./Post";

const Posts = () => {
   const { posts, dispatch } = usePostsContext();
   const { user: auth } = useAuthContext();

   useEffect(() => {
      const getPosts = async () => {
         const res = await axios.get("/api/posts", {
            headers: {
               Authorization: `Bearer ${auth.token}`,
            },
         });
         dispatch({ type: "SET_POSTS", payload: res.data });
      };
      getPosts();
   }, [auth.token, dispatch]);

   return (
      <div className="posts">
         {posts && posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
   );
};

export default Posts;
