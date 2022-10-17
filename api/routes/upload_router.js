import express from "express";
import multer from "multer";
import auth from "../middleware/auth_mw.js";

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images");
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name);
   },
});
const upload = multer({ storage });

router.post("/", auth, upload.single("file"), (req, res) => {
   try {
      return res.status(200).json("File uploaded successfully");
   } catch (error) {
      console.log({ message: error.message });
   }
});

export default router





