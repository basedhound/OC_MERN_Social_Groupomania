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

import requireAuth from "../middleware/auth_middleware.js";
import multer from "../middleware/multer_middleware.js"

const router = express.Router();

//? Test
// router.get('/', async(req, res) => {
//    res.send(" Post Router TEST")
// })

// Require auth for all routes
router.use(requireAuth);

router.post("/", multer, /* requireAuth, */ createPost);
router.put("/:id", /* requireAuth, */ updatePost);
router.delete("/:id", /* requireAuth, */ deletePost);
router.put("/:id/like", /* requireAuth, */ likePost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/from/:id", getUserPosts);

export default router;
