import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        reqired:true
    },
    postId:{
        type:String,
        reqired:true
    },
    userId:{
        type:String,
        reqired:true
    },
    likes:{
        type: Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default: 0
    },
},
{timestamps:true}
)

const Comment = mongoose.model('Comment',commentSchema)

export default Comment