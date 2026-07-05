import mongoose, {Schema} from "mongoose"

const conversationSchema = new Schema({
    participants:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message",
            required:true
        }
    ]
})

const Conversation = new mongoose.model("Conversation",conversationSchema)

export default Conversation