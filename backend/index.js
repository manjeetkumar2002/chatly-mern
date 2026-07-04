import "dotenv/config";
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectMongoDB from "./src/config/db.js"
import authRouter from "./src/routes/auth.routes.js"
import redisClient from "./src/config/redis.js"
import userRouter from "./src/routes/user.routes.js";
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:[
        "http://localhost:5173"
    ],
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


const initializeConnection = async ()=>{
    await Promise.all([redisClient.connect(),connectMongoDB()])
    console.log("db connected")
    app.listen(process.env.PORT,()=>{
        console.log("Listening at port : ",process.env.PORT)
    })
}

initializeConnection()