// api made
const express = require("express");
const cors = require("cors");
const UserModel = require("./db/UserModel");
const ProductModel = require("./db/ProductModel");
const { ObjectId } = require("mongodb");
require("./db/config");
const Jwt = require("jsonwebtoken");
const JwtKey = "e-dash";
const app = express();
app.use(express.json());
app.use(cors());
//signup API
app.post("/register", async (req, res) => {
  console.warn(req.body);
  console.warn("post at backend called");
  // saving in db
  const user = new UserModel(req.body);
  let result = await user.save();
  // sending without the password to the frontend
  result = result.toObject();
  delete result.password;
  if(result){
    Jwt.sign({ result }, JwtKey, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        res.send({ result: "error found in jwt" });
      }
      else{
        console.warn("registered");
        console.warn(result);
        res.send({result,auth:token});
      }
    });
  }
  // console.warn(result);
  // res.send(result);
});
app.get("/register", (req, res) => {
  res.send("getting");
});
// login
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await UserModel.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "24h" }, (err, token) => {
        if (err) {
          res.send({ result: "error found in jwt" });
        }
        else{
          console.warn("found");
          res.send({user,auth:token});
        }
      });
     
    } else {
      console.warn("not found");
      res.send({ result: "no user found" });
    }
  } else {
    console.warn("not found");
    res.send({ result: "no user found" });
  }
});
// add product api
app.post("/add-product", verifyToken,async (req, res) => {
  const data = req.body;
  const product = new ProductModel(data);
  const result = await product.save();
  console.warn(result);
  res.send(req.body);
});
// product list api
app.get("/products", verifyToken,async (req, res) => {
  const result = await ProductModel.find({});
  if (result.length) {
    res.send(result);
  } else {
    res.send({ result: "no products  present" });
  }
});
//delete api
app.delete("/products/:id",verifyToken, async (req, res) => {
  const filter = {
    _id: new ObjectId(req.params.id),
  };
  const result = await ProductModel.deleteOne(filter);
  res.send(result);
});
// update api
app.put("/products/:id",verifyToken, async (req, res) => {
  // console.warn((req.params.id));
  const filter = {
    _id: new ObjectId(req.params.id),
  };
  const op = {
    $set: req.body,
  };
  const result = await ProductModel.updateOne(filter, op);
  console.warn("updated");
  res.send(result);
});
// get single item api
app.get("/products/:id", verifyToken,async (req, res) => {
  const filter = {
    _id: new ObjectId(req.params.id),
  };
  const result = await ProductModel.findOne(filter);
  //console.warn(result);
  res.send(result);
});
// searchapi
app.get("/search/:key", verifyToken,async (req, res) => {
  const filter = {
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  };
  const result = await ProductModel.find(filter);
  res.send(result);
});
function verifyToken(req,res,next){
  // getting the authorization key sent by postman
  let token=req.headers['authorization']
  if(token){
    token=token.split(' ')[1];
    Jwt.verify(token,JwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"please provide valid token "})
      }
      else{
        next();
      }
    })
  }
  else{
    res.status(403).send({result:"please add token with header"})
  }
  console.warn("middleware called",token);
  //next();
}
const port = 3001;
app.listen(port);
