import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import userRouter from "./src/Routes/user.routes";
import authRouter from "./src/Routes/auth.route";
import { errorHandler } from "./src/utils/error.handler";
import cookieParser from "cookie-parser";
import listingRouter from "./src/Routes/listing.route";
import config from "config";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const mongoURI = config.get("database") as string;
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
const PORT: string = config.get("port") as string;

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, `/client/dist`)));

app.get(`*`, (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
