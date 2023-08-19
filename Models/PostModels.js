import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({
    Caption: {
        type: String,
    },
    Image: {
        type: String
    },
    Comments :[
        {
            User :{
                type : mongoose.Types.ObjectId,
                ref : "User"
            },
            Comment:{
                type : String,
                required : true
            }
        },
    ],
    Likes:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    Owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},
{timestamps:true});

const PostModels =mongoose.model('Post', PostSchema)
export default PostModels;