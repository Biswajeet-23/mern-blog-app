import express from "express";
import cors from "cors";
import { config } from "dotenv";
import userRouter from "./routes/userRouter.js";
import dbConnect from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

config("./.env");

const app = express();

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT;
const host = process.env.HOSTNAME;

//routers
app.use("/users", userRouter);

app.listen(PORT, host, () => {
  console.log(`server is running at http://${host}:${PORT}`);
  dbConnect();
});
