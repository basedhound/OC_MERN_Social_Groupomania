import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import fs, { unlink } from "fs";

//? Get every user
export const getUsers = async (req, res) => {
   try {
      let users = await User.find();
      users = users.map((user) => {
         const { password, ...details } = user._doc;
         return details;
      });
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json(error);
   }
};

//? Get user
export const getUser = async (req, res) => {
   const id = req.params.id;
   try {
      const user = await User.findById(id);
      if (user) {
         const { password, ...details } = user._doc;
         res.status(200).json(details);
      } else {
         res.status(404).json("No such user exists");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Update user
export const updateUser = async (req, res) => {
   const id = req.params.id;
   const { _id, admin } = req.body;

   if (id === _id || admin) {
      try {
         const user = await User.findById(id);

         if (req.body.profilePicture) {
            const filename = user.profilePicture.split("public/images/")[0];
            fs.unlink(`public/images/${filename}`, () => {});
         }

         await user.updateOne({ $set: req.body });

         const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_TIME }
         );
         res.status(200).json({ user, token });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   } else {
      res.status(403).json(
         "Access Denied : You can only update your own profile !"
      );
   }
};

//? Delete user
export const deleteUser = async (req, res) => {
   const id = req.params.id;
   const { _id, admin } = req.body;
   try {
      const user = await User.findById(id);
      if (admin || _id === id) {
         if (user.profilePicture) {
            const filename = user.profilePicture.split("public/images/")[0];
            fs.unlink(`public/images/${filename}`, () => {
               user.deleteOne();
               res.status(200).json("User deleted successfully");
            });
         } else {
            user.deleteOne();
            res.status(200).json("User deleted successfully");
         }
      } else {
         res.status(403).json(
            "Access Denied : You can only delete your own profile !"
         );
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
