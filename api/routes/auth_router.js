import express from "express";
import validPassword from "../middleware/password_middleware.js";
import validEmail from "../middleware/email_middleware.js";
import { login, register } from "../controllers/auth_controller.js";

const router = express.Router();
// router.get('/', async (req, rs) => {
//    resizeBy.send("Auth Router : Success")
// })

router.post("/register", register);
router.post("/login", login);

export default router;
