const express = require('express');
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(userRoutes);


const start = async()=>{
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (err)=>{
        if(err){
            console.log(err)
        }
        console.log('Database is connected');
        console.log(`server is listening on http://localhost:${port}`);
    });
};

start();

