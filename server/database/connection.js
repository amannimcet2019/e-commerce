const mongoose=require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connected to mongodb atlas");
}).catch((error)=>{
    console.log('mongodb atlas not connected');
})