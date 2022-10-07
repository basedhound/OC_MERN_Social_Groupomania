import express from "express";
import {
   getUsers,
   getUser,
   updateUser,
   deleteUser,
} from "../controllers/user_controller.js";

import authtoken from "../middleware/auth_middleware.js";

const router = express.Router();
// router.get('/', async (req, res) => {
//    res.send("User Router : Success ")
// })

// router.use(requireAuth);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", /* authtoken, */ updateUser);
router.delete("/:id", /* authtoken, */ deleteUser);

export default router;
