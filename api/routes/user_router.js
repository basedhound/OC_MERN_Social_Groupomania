import express from "express";
import {
   getUsers,
   getUser,
   updateUser,
   deleteUser,
} from "../controllers/user_controller.js";

import auth from "../middleware/auth_mw.js";

const router = express.Router();

//? Test
// router.get('/', async (req, res) => {
//    res.send("User Router : Success ")
// })

//? Routes
router.use(auth); // middleware
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
