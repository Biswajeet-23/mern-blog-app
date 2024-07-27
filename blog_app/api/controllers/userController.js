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
    res.status(201).send({ message: "Registration successful" });
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
        .send({ message: "Login successfull", username, userId, token });
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

    const authorId = req.userId;
    const userDetails = await userModel
      .findById(authorId)
      .select("-_id -password -__v");
    const { title, summary, content } = req.body;
    const postDoc = new postModel({
      author: authorId,
      title,
      summary,
      content,
      cover: newPath,
    });
    const response = await postDoc.save();
    res
      .status(200)
      .send({ message: "Form submitted successfully", data: response });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//update post
export const userUpdatePost = async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const userId = req.userId;
    const { id, title, summary, content } = req.body;
    const postDoc = await postModel.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userId);
    if (!isAuthor) {
      return res.status(400).send({ message: "you are not the author" });
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.status(200).send({ message: "post updated successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//get all blog posts
export const getAllUserPosts = async (req, res) => {
  try {
    const userPosts = await postModel
      .find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
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

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await postModel
      .findById(id)
      .populate("author", ["username"]);
    if (!postDoc) {
      return res.status(400).send({ message: "Post not found" });
    } else {
      res.status(200).send(postDoc);
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something went wrong", errorMessage: err.message });
  }
};
