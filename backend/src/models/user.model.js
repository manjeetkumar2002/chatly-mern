import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

const User = new mongoose.model("user",userSchema)

export default User