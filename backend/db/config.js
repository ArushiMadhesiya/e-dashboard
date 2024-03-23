// database connection
const mongoose=require('mongoose');
const url="mongodb://0.0.0:27017/ecom";
module.exports =mongoose.connect(url).then(()=>{
    console.warn("connected yayyy");
}).catch((err)=>{
    console.warn("not connected",err);
})