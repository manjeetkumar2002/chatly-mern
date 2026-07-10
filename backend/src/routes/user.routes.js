import express from "express"
import { editProfile, getOtherUsers, search } from "../controllers/user.controllers.js"
import userMiddleware from "../middleware/userMiddleware.js"
import upload from "../middleware/multer.js"
const userRouter = express.Router()

userRouter.put("/profile",userMiddleware,upload.single("image"),editProfile)
userRouter.get("/others",userMiddleware,getOtherUsers)
userRouter.get("/search",userMiddleware,search)

export default userRouter
