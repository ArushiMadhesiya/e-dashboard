// api made
const express=require('express');
const cors=require('cors');
const UserModel=require('./db/UserModel');
require('./db/config');
const app=express();
app.use(express.json());
app.use(cors());
app.post('/register',async(req,res)=>{
    console.warn("post at backend called");
    // saving in db 
    const user=new UserModel(req.body);
    const result=await user.save();
    console.warn(result);
    res.send(req.body);
})

app.get('/register',(req,res)=>{
    
    res.send("getting");
})

const port=3001;
app.listen(port);