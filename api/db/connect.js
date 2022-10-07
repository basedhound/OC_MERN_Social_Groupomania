import mongoose from "mongoose"

const connectDB = (uri) => {
   return mongoose.connect(uri);
};

module.exports = connectDB;
