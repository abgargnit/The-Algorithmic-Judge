import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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