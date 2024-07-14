import express from "express";
import {
  getAllUserPosts,
  getPostById,
  userLogin,
  userLogout,
  userNewPost,
  userProfile,
  userRegister,
  userUpdatePost,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";

const userRouter = express.Router();

//register
userRouter.post("/register", userRegister);

//login
userRouter.post("/login", userLogin);

//getProfile
userRouter.get("/profile", verifyToken, userProfile);

//logout
userRouter.post("/logout", userLogout);

//user new post
userRouter.post(
  "/newPost",
  verifyToken,
  uploadMiddleware.single("file"),
  userNewPost
);

//user update post
userRouter.put(
  "/updatePost",
  verifyToken,
  uploadMiddleware.single("file"),
  userUpdatePost
);

//get all posts
userRouter.get("/getAllPosts", getAllUserPosts);

//get post by id
userRouter.get("/post/:id", getPostById);

export default userRouter;
