import express from "express";
import {
  getAllUserPosts,
  userLogin,
  userLogout,
  userNewPost,
  userProfile,
  userRegister,
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
userRouter.post("/newPost", uploadMiddleware.single("file"), userNewPost);

//get all posts
userRouter.get("/getAllPosts", getAllUserPosts);

export default userRouter;
