const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app=express();

//config .env file
dotenv.config({path:'./config.env'});

//connecting to mongoose altas database
require('./database/connection');

//convert JSON to object bcz server dont understand JSON
app.use(express.json());

//to communicating btw diff port client(3000) and server(5000)
app.use(cors());

//requiring routes
app.use(require('./routes'));


//listen
const PORT = process.env.PORT; 
app.listen(PORT,()=>{
    console.log(`server started at port number ${PORT}`);
})