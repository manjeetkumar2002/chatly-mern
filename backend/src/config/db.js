import mongoose  from "mongoose";

const connectMongoDB = async()=>{
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
}

export default connectMongoDB