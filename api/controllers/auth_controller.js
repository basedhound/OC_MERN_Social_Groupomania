import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cjs from "crypto-js";
// import validator from "validator";

//? Register
export const register = async (req, res) => {
   // const { email, password } = req.body;

   // email
   const cryptedMail = cjs.HmacSHA256(req.body.email, process.env.CJS_KEY);
   req.body.email = cryptedMail;

   // password
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.password, salt);
   req.body.password = hashedPass;

   try {
      let user = await User.findOne({ email: cryptedMail.toString() });
      if (user) {
         return res.status(400).json({ message: "Email already in use" });
      }
      user = await User.create({ ...req.body });

      // token
      const token = jwt.sign(
         {
            email: user.email,
            id: user._id,
         },
         process.env.JWT_KEY,
         { expiresIn: process.env.JWT_TIME }
      );
      res.status(200).json({ user, token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Login
export const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
   } else {
      const cryptedMail = cjs.HmacSHA256(req.body.email, process.env.CJS_KEY);
      try {
         const user = await User.findOne({
            email: cryptedMail.toString(),
         });

         if (user) {
            const validpass = await bcrypt.compare(password, user.password);

            if (!validpass) {
               res.status(400).json("Incorrect password");
            } else {
               const token = jwt.sign(
                  {
                     mail: user.email,
                     id: user._id,
                  },
                  process.env.JWT_KEY,
                  { expiresIn: process.env.JWT_TIME }
               );
               res.status(200).json({ user, token });
            }
         } else {
            res.status(404).json("Incorrect email");
         }
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
};
