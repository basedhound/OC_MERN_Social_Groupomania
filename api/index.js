// Dependencies
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// Security
import helmet from "helmet";
import cors from "cors";
// Routes
import auth_router from "./routes/auth_router.js";
import user_router from "./routes/user_router.js";
import post_router from "./routes/post_router.js";
import upload_router from "./routes/upload_router.js"

//? App initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
/* app.get("/", (req, res) => {
      res.status(200).json({ message: "API is running" }); // Test
});
 */

//? Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(cors());
app.use(express.json());

// Serve images
app.use(express.static("public"));
app.use("/images", express.static("images"));

//? Routes
app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/posts", post_router);
app.use("/api/upload", upload_router)

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
