import mongoose, {Schema} from "mongoose"

const conversationSchema = new Schema({
    participants:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    conversation:[
        {
            type:String,
            required:true
        }
    ]
})

const Conversation = new mongoose.model("Conversation",conversationSchema)

export default Conversation