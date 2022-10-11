import passwordValidator from "password-validator"

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(6)                                    // Minimum length 8
    .is().max(32)                                   // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', '123456']); // Blacklist these values

const validPassword = (req, res, next) => {
   if (passwordSchema.validate(req.body.password)) {
      next();
   } else {
      return res
         .status(403)
         .json({
            error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate(
               "req.body.password",
               { list: true }
            )}`,
         });
   }
};

export default validPassword

