import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const requireAuth = async (req, res, next) => {
   const { authorization } = req.headers;

   if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
   }

   try {
      const token = authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      const userId = decodedToken.userId;
      req.auth = {
         userId: userId,
      };
      next();
   } catch (error) {
      res.status(401).json({ error: "Request is not authorized" });
   }
};

export default requireAuth;
