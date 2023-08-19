import mongoose from "mongoose";


//---------USER SCHEMA ---------------
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    password: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    Image: { 
        type: String,
    },
    Posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    Friend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    relationship: {
        type: String
    },
    work:{
        type : String,
    },
    gender: {
        type: String
    }
},
    { timestamps: true })


const userModel = mongoose.model("User", UserSchema);
export default userModel;