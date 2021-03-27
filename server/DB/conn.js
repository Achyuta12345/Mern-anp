const mongoose = require('mongoose');
const DB = process.env.DATABASE;
//mongodb
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Connection Successful');
}).catch((err)=>{
      console.log(`This is error${err}`);
});