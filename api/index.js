import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("Connected to Database")
    })
    .catch((err)=>{
        console.log(err)
    })

const app = express();

const port = 4000;


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

// app.get('/test',(req,res)=>{ //Test Api routes   // request is the data which we sends while response is the data which we receive... Here we created apiu route
//             res.json({message:'Api is Working'});
// })

app.use('/api/user',userRoutes);