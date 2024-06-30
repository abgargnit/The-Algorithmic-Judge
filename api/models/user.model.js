import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
}, {timestamps:true} // mongo db will automatically store the timestamps..
)

const User = mongoose.model('User', userSchema); // we create here user model!!

export default User;