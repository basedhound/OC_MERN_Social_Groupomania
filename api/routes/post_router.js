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


// import {upload} from "../middleware/multer_middleware.js"



const router = express.Router();

//? Test
// router.get('/', async(req, res) => {
//    res.send(" Post Router TEST")
// })

// Require auth for all routes
router.use(requireAuth);

router.post("/", /* upload,  */createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/from/:id", getUserPosts);

export default router;
