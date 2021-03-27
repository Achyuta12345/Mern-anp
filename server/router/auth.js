const express=require('express');
const router= express.Router();

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
    }

    const user = new User({name,email, phone, work, password, cpassword});
     
    await  user.save();
    res.status(201).json({message:"Registered sucessfully"});
    

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

module.exports = router;