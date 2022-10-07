import express from "express";
import { login, register } from "../controllers/auth_controller.js";

const router = express.Router();
// router.get('/', async (req, rs) => {
//    resizeBy.send("Auth Router : Success")
// })

router.post("/register", register);
router.post("/login", login);

export default router;
