import express from "express";
import {
  userLogin,
  userLogout,
  userProfile,
  userRegister,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";

const userRouter = express.Router();

//register
userRouter.post("/register", userRegister);

//login
userRouter.post("/login", userLogin);

//getProfile
userRouter.get("/profile", verifyToken, userProfile);

//logout
userRouter.post("/logout", userLogout);

export default userRouter;
