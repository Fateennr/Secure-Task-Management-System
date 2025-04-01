const express = require('express');
const dbConnection = require('./config/db');
require('dotenv').config();
const cors = require('cors');

dbConnection();
app = express();

// basic utilities to test and run the express app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true } ));
// app.use(express.static("public")); 

const port = 3000;




app.get('/', (req, res)=>{
    res.send("Hello world");
});

app.listen(port, ()=>{
    console.log(`Server is running ${port}`);
});