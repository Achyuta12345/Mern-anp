const dotenv=require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'});

require('./DB/conn');
//const User = require('./models/userSchema');
app.use(express.json());
//link router files
app.use(require('./router/auth'));
const User = require('./models/userSchema');

const PORT = process.env.PORT;

//Middleware
const middleware = (req,res,next)=>{
 console.log('Hello this is middleware');
 next();
}
 


//app.get('/',(req,res)=>{
  //       res.send('This is home page1');
//});

app.get('/about',middleware,(req,res)=>{
     console.log('This is after middleware');
     res.send('This is about page');
});

app.get('/contactus',(req,res)=>{
  res.cookie("test","thapa");
     res.send('This is contactus page');

});

app.get('/signin',(req,res)=>{
      res.send('This is signin');
});
app.get('/signup',(req,res)=>{
    res.send('This is signup');
});


app.listen(PORT,() => {
    console.log(`Server is starting ${PORT}`);
});
