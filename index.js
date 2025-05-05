import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/connectDb.js";
import { verifyToken } from "./middlewares/auth.middleware.js";

import authRouter from "./routes/auth.router.js";
import customerRouter from "./routes/customer.router.js";
import loanRouter from "./routes/loan.router.js";
import repaymentRouter from "./routes/repayment.router.js";

import { getSummary } from "./controllers/summary.controller.js";
import { getOverdues } from "./controllers/overdue.controller.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/customers", verifyToken, customerRouter);
app.use("/api/loans", verifyToken, loanRouter);
app.use("/api/repayments", verifyToken, repaymentRouter);
app.use("/api/summary", verifyToken, getSummary);
app.use("/api/overdue", verifyToken, getOverdues);

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
