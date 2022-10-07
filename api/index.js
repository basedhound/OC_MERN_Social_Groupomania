// Dependencies
import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
// Security
import helmet from "helmet";
import cors from "cors";
// Routes
import auth_router from "./routes/auth_router.js";
import user_router from "./routes/user_router.js";
import post_router from "./routes/post_router.js";
// import upload_router from "./routes/upload_router.js";

//? App initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//? Middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.status(200).json({ message: "API is running" });
});

//? Serve images

//? Routes
app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/posts", post_router);
// app.use("/api/upload", upload_router);

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
      console.log(error);
   }
};

start();


