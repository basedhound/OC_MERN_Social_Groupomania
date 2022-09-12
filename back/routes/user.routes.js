const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const userController = require("../controllers/user.controller");

// Test
// userRouter.get("/", (req, res) => {
//    res.send("hey its user route");
// });

//? Signup
userRouter.post("/api/auth/signup", userController.signup);

//? Login
userRouter.post("/api/auth/login", userController.login);

//? Update
userRouter.put("/api/users/:id", userController.updateUser);

//? Delete
userRouter.delete("/api/users/:id", userController.deleteUser);

//? Get a user's details
userRouter.get("/api/users/:id", userController.getUser);

module.exports = userRouter;
