import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"
export const sendMessage=async (req,res)=>{
    try {
        console.log(req.body)
        const sender = req.userId
        const {receiver} = req.params
        const {message} = req.body
        console.log(message)
        console.log(req.file)
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
            console.log(image)
        }
        const newMessage = await Message.create({sender,receiver,message,image})
        let conversation = await Conversation.findOne({
            participants:{$all:[sender,receiver]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[sender,receiver],
                messages:[newMessage._id]
            })
        }
        else{
            conversation.messages.push(newMessage._id);
            await conversation.save()
        }
        return res.status(201).json(newMessage)
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

export const getMessages = async(req,res)=>{
    try {
        const sender = req.userId
        const {receiver} = req.params

        const conversation = await Conversation.find({participants:[sender,receiver]})

        if(!conversation){
            return res.status(400).json({message:"conversation not found!"})
        }

        return res.status(200).json(conversation.messages)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:process.env.NODE_ENV === "development"?error.message:"Internal Server Error"
        })
    }
}

