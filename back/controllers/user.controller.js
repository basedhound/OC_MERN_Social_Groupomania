const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

//? SIGN UP
exports.signup = async (req, res) => {
   try {
      // generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = new UserModel({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
      });

      // save user to db and response
      const user = await newUser.save();
      res.status(200).json(user);
   } catch (err) {
      // console.log(err);
      res.status(500).json(err);
   }
};

//? LOGIN
exports.login = async (req, res) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
         return res.status(404).json("user not found");
      }

      const validPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );
      if (!validPassword) {
         return res.status(400).json("wrong password");
      }

      res.status(200).json(user);
   } catch (err) {
      // console.log(err);
      res.status(500).json(err);
   }
};

//? UPDATE
exports.updateUser = async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
         try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (err) {
            return res.json(err);
         }
      }
      try {
         const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
         });
         res.status(200).json("Account has been updated !");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can only update your own account !");
   }
};

//? DELETE
exports.deleteUser = async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
         await UserModel.findByIdAndDelete(req.params.id);
         res.status(200).json("Account has been deleted !");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can only delete your own account !");
   }
};

//? GET USER'S INFO
exports.getUser = async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
   } catch (err) {
      res.status(500).json(err);
   }
};
