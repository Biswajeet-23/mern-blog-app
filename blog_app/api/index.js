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
app.use(cors({ credentials: true, origin: "https://mern-blog-app-frontend-wkow.onrender.com" }));
//LOCAL_HOST
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 4000;
// const LOCAL_HOST = "127.0.0.4";

//routers
app.use("/users", userRouter);

//PRODUCTION
app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
  dbConnect();
});

//LOCAL_HOST
// app.listen(PORT, LOCAL_HOST, () => {
//   console.log(`App is Listening on http://${LOCAL_HOST}:${PORT}`);
//   dbConnect();
// });
