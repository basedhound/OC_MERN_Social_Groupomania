import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
      },
      image: {         
            type: String,
      },      
      likes: {
         type: [],
      },
   },
   { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;
