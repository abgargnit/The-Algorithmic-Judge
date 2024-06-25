import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
};

export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,'All fields are required!'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password!'));
        }

        // now for authentication of user we are using json web tokens..
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRETKEY
        );
        const {password:pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(rest);

    } catch (error) {
        next(error);
    }
}