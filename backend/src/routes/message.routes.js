import express from "express"
import userMiddleware from "../middleware/userMiddleware.js"
import {sendMessage,getMessages} from "../controllers/message.controllers.js"
const messageRouter = express.Router()

messageRouter.post("/send/:receiver",userMiddleware,sendMessage)
messageRouter.get("/get/:receiver",userMiddleware,getMessages)

export default messageRouter