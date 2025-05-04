import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/connectDb.js";
import authRouter from "./routes/auth.router.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get("/", () => {
  console.log("welcome to NetWorth Tracker! ");
});

const PORT = 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  });
