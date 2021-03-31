const express=require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../DB/conn');
const User = require('../models/userSchema');


router.get('/',(req,res)=>{
   res.send('This is home from router');
});

//using promises
// router.post('/register',(req, res) => {
//     const {name, email, phone, work, password, cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//               return res.status(422).json({error: "Please enter right data"});
//     }

//     User.findOne({ email : email })
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"});
//         }
        
//         const user = new User({name,email, phone, work, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:"Registered sucessfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed to regester"}));
//     }).catch(err => {console.log(err);});
    

// console.log(name);
   //console.log(req.body);
   //console.log(req.body.name);
   //console.log(req.body.email);
  //  res.json({message:req.body});
    //res.send("This is mera router");
//});


router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
              return res.status(422).json({error: "Please enter right data"});
    }

try{

      const userExist = await User.findOne({ email : email })
      if(userExist){
        return res.status(422).json({error:"Email already exist"});
    }else if (password != cpassword){
        return res.status(422).json({error:"Email already exist"});
    }else{
           const user = new User({name,email, phone, work, password, cpassword});
     
           await  user.save();
           res.status(201).json({message:"Registered sucessfully"});
    }

   
    

}catch(err){
    console.log(err);
}
  
   //console.log(name);
   //console.log(req.body);
   //console.log(req.body.name);
   //console.log(req.body.email);
   //res.json({message:req.body});
   //res.send("This is mera router");
});

//login route
router.post('/signin', async (req,res)=>{
    //   console.log(req.body); 
    //   res.json({message:"awesome"});

    try{ let token;
         const{ email,password} = req.body;
         
         if(!email|| !password){
              return res.status(400).json({error:"Please fill the data"})
         }

        const userLogin = await User.findOne({ email:email });
 
        //console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token =await  userLogin.generateAuthToken();
            console.log(token);
             res.cookie("jwtoken",token,{
                       expires:new Date(Date.now() + 25892000000),
                       httpOnly:true
             });
            if(!isMatch)
            {
                res.status(400).json({error : "User error p"});
            }else{
                res.json({message:"User Signin sucessfully"});
            }
        }else{
            res.status(400).json({error : "User error e"});
        }
       
        


    }catch(err){
        console.log(err);
    }
});

module.exports = router;