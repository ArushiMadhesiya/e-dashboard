// api made
const express=require('express');
const cors=require('cors');
const UserModel=require('./db/UserModel');
const ProductModel=require('./db/ProductModel');
const { ObjectId } = require('mongodb');
require('./db/config');
const app=express();
app.use(express.json());
app.use(cors());
app.post('/register',async(req,res)=>{
    console.warn(req.body);
    console.warn("post at backend called");
    // saving in db 
    const user=new UserModel(req.body);
    let result=await user.save();
    // sending without the password to the frontend
    result=result.toObject();
    delete result.password
    console.warn(result);
    res.send(result);
})
app.get('/register',(req,res)=>{
    
    res.send("getting");
})
// login
app.post('/login',async(req,res)=>{
    if(req.body.email && req.body.password){
        const user=await UserModel.find(req.body);
        //console.warn(user);
        if(user.length){
            console.warn("logging in");
            console.warn(req.body);
            res.send(req.body);
        }
        else{
            console.warn("not found");
            res.send({result:"usernotfound"});
        }
    }
    else{
        console.warn("not found");
        res.send({result:"usernotfound"});
    }
    
})
// add product api
app.post('/add-product',async(req,res)=>{
    const data=req.body;
    const product=new ProductModel(data);
    const result=await product.save();
    console.warn(result);
    res.send(req.body);
})
// product list api
app.get('/products', async(req,res)=>{
    const result=await ProductModel.find({});
    if(result.length){
        res.send(result);
    }
    else{
        res.send({result:"no products  present"});
    }
    
})
//delete api
app.delete('/products/:id',async(req,res)=>{
    const filter = {
        _id:new ObjectId(req.params.id)
    }
    const result = await ProductModel.deleteOne(filter);
    res.send(result);
})
// update api
app.put('/products/:id',async(req,res)=>{
   // console.warn((req.params.id));
    const filter={
        _id:new ObjectId(req.params.id)
    }
    const op={
        $set:req.body
    }
    const result=await ProductModel.updateOne(filter,op);
    console.warn("updated");
    res.send(result);
})
// get single item api
app.get('/products/:id', async(req,res)=>{
    const filter={
        _id:new ObjectId(req.params.id)
    }
    const result=await ProductModel.findOne(filter);
    //console.warn(result);
    res.send(result)
})
const port=3001;
app.listen(port);