import dotenv from "dotenv";

import express, { Application } from "express";
import mongoose from "mongoose";
import userRouter from "./src/Routes/user.routes";
import authRouter from "./src/Routes/auth.route";
import { errorHandler } from "./src/utils/error.handler";
import cookieParser from "cookie-parser";
import listingRouter from "./src/Routes/listing.route";

dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI as string;

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log(`Connected to the MongoDB`);
  })
  .catch((err) => {
    console.error(err);
  });

const app: Application = express();
const PORT: string = process.env.PORT as string;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
