import express from "express"
import {Server} from "socket.io"
import http from "http"
const app = express()

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173","https://chatly-o57e.onrender.com"],
        credentials:true
    }
})
const userSocketMap = {}

export function getReceiverSocketId(receiver){
    return userSocketMap[receiver]
}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId
    if(userId){
        console.log("Connected:", userId, socket.id);
        userSocketMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }
        console.log("Disconnected:", userId, socket.id);
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})
export {io,app,server}