// Dependencies
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
// Security
import helmet from "helmet";
import cors from "cors";
// Routes
import auth_router from "./routes/auth_router.js";
import user_router from "./routes/user_router.js";
import post_router from "./routes/post_router.js";


//? App initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
/* app.get("/", (req, res) => {
      res.status(200).json({ message: "API is running" }); // Test
});
 */

//? Middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());

//? Serve images
app.use(express.static("public"));
app.use("/images", express.static("images"));

// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(
//    "/public/images",
//    express.static(path.join(__dirname, "/public/images"))
// );

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images");
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name);
   },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
   try {
      return res.status(200).json("File uploaded successfully");
   } catch (error) {
      console.log({ message: error.message });
   }
});






//? Routes
app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/posts", post_router);



//? Server launch
const connectDB = (uri) => {
   return mongoose.connect(uri);
};
const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
         console.log(`Server is listening on port ${PORT}`)
      );
   } catch (error) {
      console.log({ message: error.message });
   }
};
start();
