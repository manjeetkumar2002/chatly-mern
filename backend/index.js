import "dotenv/config";
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectMongoDB from "./src/config/db.js"
import authRouter from "./src/routes/auth.routes.js"
import redisClient from "./src/config/redis.js"
import userRouter from "./src/routes/user.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { app ,server } from "./src/socket/socket.js";
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://chatly-o57e.onrender.com"
    ],
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)


const initializeConnection = async ()=>{
    await Promise.all([redisClient.connect(),connectMongoDB()])
    console.log("db connected")
    server.listen(process.env.PORT,()=>{
        console.log("Listening at port : ",process.env.PORT)
    })
}

initializeConnection()