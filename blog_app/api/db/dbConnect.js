import mongoose from "mongoose";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};

//zFmd6Ar2q8S1N8OW
//mongodb+srv://biswajeetsahoo0023:zFmd6Ar2q8S1N8OW@cluster0.dxcz0x4.mongodb.net/

export default dbConnect;
