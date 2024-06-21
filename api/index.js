import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("Connected to Database")
    })
    .catch((err)=>{
        console.log(err)
    })

const app = express();

app.use(express.json()); // this is allowing json as input in express we are allowing json to send to our backend.

const port = 4000;


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

// app.get('/test',(req,res)=>{ //Test Api routes   // request is the data which we sends while response is the data which we receive... Here we created apiu route
//             res.json({message:'Api is Working'});
// })

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

// now we are creating middlewares for error handling..

app.use((err,req,res,next)=>{
    const stausCode = err.stausCode || 500 ;
    const message = err.message || 'Internal Server Error!!';
    res.status(stausCode).json({
        success:false,
        stausCode,
        message,
    })
})