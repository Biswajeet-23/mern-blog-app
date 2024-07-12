import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
