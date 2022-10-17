import express from "express";
import {
   createPost,
   updatePost,
   deletePost,
   likePost,
   getPost,
   getPosts,
   getUserPosts,
} from "../controllers/post_controller.js";
import auth from "../middleware/auth_mw.js";

const router = express.Router();

//? Routes
// router.use(auth);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/from/:id", getUserPosts);

export default router;







