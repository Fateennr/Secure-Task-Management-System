const express = require('express');
const dbConnection = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const taskRouter = require('./routes/tasks.routes');
const userRouter = require('./routes/user.routes');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

dbConnection();
app = express();

app.use(bodyparser.json());
app.use(cookieParser());

// basic utilities to test and run the express app
app.use(cors({
    origin: process.env.FRONTEND_URI,  
    credentials: true              
}));

// console.log(process.env.FRONTEND_URI);

app.use(express.json());
app.use(express.urlencoded( {extended: true } ));
// app.use(express.static("public")); 

const port = 3000;

//routes
app.use('/tasks', taskRouter);
app.use('/user', userRouter);

app.get('/', (req, res)=>{
    res.send("Hello world");
});



app.listen(port, ()=>{
    console.log(`Server is running ${port}`);
});