import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const editProfile = async (req,res)=>{
    try {
        const {name} = req.body
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        const user = await User.findByIdAndUpdate(req.userId,{name:name,image:image},{new:true}).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "development"
            ? error.message
            : "Internal Server Error",
        });
    }
}


export const getOtherUsers =async (req,res)=>{
    try {
        const result = await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(200).json(result)
    } catch (error) {
         console.error(error);
        return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "development"
            ? error.message
            : "Internal Server Error",
        });
    }
}

export const search = async(req,res)=>{
    try {
        const {query} = req.query

        if(!query){
            return res.status(400).json({message:"Query is required"})
        }
        const users = await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}}
            ]
        }).select("-password")

        return res.status(200).json(users)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "development"
            ? error.message
            : "Internal Server Error",
        });
    }
}