import dotenv from "dotenv";
dotenv.config({});

import express from "express";
import { connect } from "./db/connection.js";
import userRoutes from "./src/modules/user/user.routes.js";
import messageRoutes from "./src/modules/message/message.routes.js";
import { AppError } from "./utils/appError.js";
import { globalError } from "./utils/globalError.js";
const app = express();
app.use(express.json());
connect();
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/message/", messageRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("*", (req, res) => {
  next(new AppError(`invald url ${req.originalUrl}`, 404));
});

app.use(globalError);
app.listen(3000, () => console.log("Server started on port 3000"));