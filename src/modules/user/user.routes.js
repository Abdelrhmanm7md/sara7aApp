import express from "express";
import { signUp ,signIn ,verifyEmail } from "./user.controller.js";

const userRoutes = express.Router()

userRoutes.post("/signUp",signUp)
userRoutes.post("/signIn",signIn)
userRoutes.get("/verify/:token",verifyEmail)


export default userRoutes