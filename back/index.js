//? Imports from Library
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors")
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//? Imports from Code
const { port, errorHandler } = require("./config/port");

const userRouter = require("./routes/user.routes")
// const postRouter = require("./routes/post.routes");

//? Config
dotenv.config();

//? Express
const app = express();
app.on("error", errorHandler);
app.on("listening", () => {
   const address = app.address();
   const bind =
      typeof address === "string" ? "pipe " + address : "port " + port;
   console.log("Listening on " + bind);
});


//? Database
mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log("Connected to MongoDB !"))
   .catch((err) => console.error("Connection to MongoDB failed !", err));


//? Middleware
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(morgan("common"));


// Paramétrage des headers HTTP :
// app.use(cors())
app.use((req, res, next) => {
   // Accéder à notre API depuis n'importe quelle origine
   res.setHeader("Access-Control-Allow-Origin", "*");
   // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   // Envoyer des requêtes avec les méthodes mentionnées
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
});

//? Routes
app.use(userRouter);
// app.use("/api/posts", postRouter);

app.use(
   "/public/images",
   express.static(path.join(__dirname, "/public/images"))
);




//? Server
app.listen(port, () => {
   console.log(`Backend server is running on port ${port} !`);
});
