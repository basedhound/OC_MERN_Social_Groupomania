import validator from "validator"

const validEmail = (req, res, next) => {
   const { email } = req.body;
   if (validator.isEmail(email)) {
      next();
   } else {
      return res
         .status(403)
         .json({ error: `${email} n'est pas un email valide` });
   }
};

export default validEmail