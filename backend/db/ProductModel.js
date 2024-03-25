const mongoose =require('mongoose');
const ProductSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    userId:String,// who insterted this  product
    company:String
})
const ProductModel=mongoose.model('products',ProductSchema);
module.exports=ProductModel;