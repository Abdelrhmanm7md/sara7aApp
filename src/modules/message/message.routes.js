import express from "express";
import{addMessage ,getMessages} from "./message.controller.js"
import {auth} from "../../middelware/auth.js"
const messageRoutes = express.Router();


messageRoutes.post("/",addMessage)
messageRoutes.get("/",auth,getMessages)



export default messageRoutes