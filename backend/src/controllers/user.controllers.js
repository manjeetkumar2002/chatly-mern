import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const editProfile = async (req,res)=>{
    try {
        const {name} = req.body
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        const user = await User.findByIdAndUpdate(req.userId,{name:name,image:image})
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
