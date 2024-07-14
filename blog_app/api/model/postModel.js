import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    summary: String,
    content: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
