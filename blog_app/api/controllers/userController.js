import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import fs from "fs";
import postModel from "../model/postModel.js";
config();

//user register
export const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await userModel.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).send(userDoc);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await userModel.findOne({ username });
    const checkPass = bcrypt.compareSync(password, userDoc.password);
    if (checkPass) {
      const userId = userDoc._id;
      const token = jwt.sign({ userId }, process.env.JWT_Secret, {
        expiresIn: "7d",
      });
      res.cookie("auth_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .send({ message: "Login successfull", username, userId });
    } else {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//user profile
export const userProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await userModel
      .findById(userId)
      .select("-_id -password -__v");
    if (!userDetails) res.status(400).send({ message: "Invalid user" });
    res.status(200).send(userDetails);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something is wrong", errorMessage: err.message });
  }
};

//user logout
export const userLogout = (req, res) => {
  try {
    res.clearCookie("auth_token");
    return res.status(200).send({ message: "Logout Successful" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//new post
export const userNewPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, summary, content } = req.body;
    const postDoc = new postModel({
      title,
      summary,
      content,
      cover: newPath,
    });
    const response = await postDoc.save();
    res.status(200).send({ message: "Form submitted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

export const getAllUserPosts = async (req, res) => {
  try {
    const userPosts = await postModel.find();
    if (userPosts) {
      res.status(200).send(userPosts);
    } else {
      res.status(400).send({ message: "No Posts" });
    }
    res.status(200);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something went wrong", errorMessage: err.message });
  }
};
