import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next)=>{
    const { username,email,password } = req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        // return res.status(400).json({message:'All fields are required!'});
        // We are using error handler here..
        next(errorHandler(400,'All fields are required!'))
    }
    const hashedpassword=bcryptjs.hashSync(password,12); // we hashed password using bcrypt js
    const newuser = new User({
        username,
        email,
        password:hashedpassword, // we donot need to write username:username as after es6 if key and value matches then it is already self explanatory.
    });

    // now we need to save the user.. to database.
    // We need to use try catch here as we need to display error also if any occured ...
    try {
        await newuser.save();

        res.json('Successfully Signed up!');

    } catch (error) {
        next(error);
    }




}