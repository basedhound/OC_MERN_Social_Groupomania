import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   {
      admin: {
         type: Boolean,
         default: false,
      },
      email: {
         type: String,
         required: [true, "Please provide email"],
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: [true, "Please provide password"],
         minlength: 8,
      },
      firstname: {
         type: String,
         required: [true, "Please provide firstname"],
         minlength: 2,
         maxlength: 20,
      },
      lastname: {
         type: String,
         required: [true, "Please provide lastname"],
         minlength: 2,
         maxlength: 20,
      },
      profilePicture: {
         type: String,
         default: "",
      },
      location: {
         type: String,
         maxlength: 20,
      },
      about: {
         type: String,
         maxlength: 20,
         default: "",
      },
   },
   { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
