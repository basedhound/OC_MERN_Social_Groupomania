import mongoose from "mongoose";
import Post from "../models/post_model.js";
import User from "../models/user_model.js";
import fs, { unlink } from "fs";

// //? Create
export const createPost = async (req, res) => {
   const reqPost = req.body;

   const newPost = new Post({
      ...reqPost,
   });
   try {
      await newPost.save();
      res.status(200).json(newPost);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// //? Update post
export const updatePost = async (req, res) => {
   const postId = req.params.id;
   const { userId, admin } = req.body;

   try {
      const post = await Post.findById(postId);
      if (admin || post.userId === userId) {
         if (req.body.image && post.image) {
            const filename = post.image.split("public/images/")[0];
            fs.unlink(`public/images/${filename}`, () => {});
         }

         await post.updateOne({ $set: req.body });
         res.status(200).json(req.body);
      } else {
         res.status(403).json("You can only update your own posts !");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Delete
export const deletePost = async (req, res) => {
   const postId = req.params.id;
   const { userId, admin } = req.body;
   try {
      const post = await Post.findById(postId);
      if (admin || post.userId === userId) {
         if (post.image) {
            const filename = post.image.split("public/images/")[0];
            fs.unlink(`public/images/${filename}`, () => {
               post.deleteOne();
               res.status(200).json(post);
            });
         } else {
            post.deleteOne();
            res.status(200).json(post);
         }
      } else {
         res.status(403).json("You can only delete your own posts !");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Like / Dislike
export const likePost = async (req, res) => {
   const postId = req.params.id;
   const { userId } = req.body;
   try {
      const post = await Post.findById(postId);
      if (!post.likes.includes(userId)) {
         await post.updateOne({ $push: { likes: userId } });
         res.status(200).json("Post liked !");
      } else {
         await post.updateOne({ $pull: { likes: userId } });
         res.status(200).json("Post disliked !");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Get one
export const getPost = async (req, res) => {
   const postId = req.params.id;
   try {
      const post = await Post.findById(postId);
      res.status(200).json(post);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Get all
export const getPosts = async (req, res) => {
   try {
      const posts = await Post.find();
      res.status(200).json(
         posts
            .filter((post) => post != null)
            .sort((a, b) => {
               return new Date(b.createdAt) - new Date(a.createdAt);
            })
      );
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Get a user's posts
export const getUserPosts = async (req, res) => {
   const userId = req.params.id;
   try {
      const userPosts = await Post.find({ userId: userId });

      res.status(200).json(
         userPosts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
         })
      );
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
