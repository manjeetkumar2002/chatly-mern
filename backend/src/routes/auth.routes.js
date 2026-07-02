import express from "express"
import { checkAuth, login, logout, signup } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.post("/check",checkAuth)

export default authRouter