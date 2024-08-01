const express=require('express');
const mongoose = require("mongoose");
const router=express.Router();
const mongoDB= require('../db');
const User=require('../collectionSchema/User');
const Product=require('../collectionSchema/Product');
const Location=require('../collectionSchema/Location');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const signature="WeAreUsingJsonWebToken";
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


//Code to create a user id, To save data
   router.post('/signup',async (req,res)=>{

    const user=User.findOne({email:req.body.email});
    if(!user){
        return res.json({success:true,msg:"email is already in use"})
    }

    const salt=await bcrypt.genSalt(10);
    let encryptedPassword=await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            mobileNumber:req.body.mobileNumber,
            password: encryptedPassword
        })
        return res.json({success:true,msg:"Successfully signed up"});
    }
    catch(error){
        console.log(error);
        return res.json({success:false,msg:"Error in signing up"});
    }
})



//Code to login: 
    router.post('/login',async(req,res)=>{
        const {email,password}=req.body;
        try{
        const userData=await User.findOne({email:email});
        if(!userData){
            return res.json({success:false,msg:"Invalid Credentials"});
        }
        const userPassword=userData.password;
        const pwdCompare=await bcrypt.compare(password,userPassword);
        if(!pwdCompare){
            return res.json({success:false,msg:"Invalid Credentials"});
        }
        const jwtPayload={
            email:email,
            password:req.body.password
        }
        const authToken=jwt.sign(jwtPayload,signature);
        res.json({success:true,authToken:authToken,userId:userData._id,msg:"Successfully Logged in"})
    }
        catch(error){
            res.json({msg:error.message})
        }
})



//code to add product
    router.post('/add-product',upload.array('images', 10),async(req,res)=>{
        const details=JSON.parse(req.body.productDetails);
        console.log(req.body);
        const productImages=req.files.map((file)=>{return (file.path)});
        try{
            const loc=await Location.findOne({District:req.body.district.toLowerCase(),State:req.body.state.toLowerCase()});
            if(!loc){
                await Location.create({District:req.body.district.toLowerCase(),State:req.body.state.toLowerCase()});
            }
        await Product.create({
            ProductCategory: req.body.category,
            ProductName:req.body.name,
            ProductDescription:req.body.description,
            ProductPrice:req.body.price,
            ProductImage:productImages,
            ProductDetail:details,
            District:req.body.district,
            State:req.body.state,
            addedBy:new mongoose.Types.ObjectId(req.body.userId)
        })
        res.json({success:true});
    }
    catch(error){
        console.log(error);
        res.json({success:false,msg:error.message});
    }
    })



    //code to get product
    router.post('/get-product',async(req,res)=>{
        const productData=await Product.find();
        res.json({productData:productData});
    })



    //code to add liked products to wishlist
    router.post('/add-to-wishlist', async(req,res)=>{
        let productId=req.body.productId;
        let userId=req.body.userId
        try{
        await User.updateOne({ _id: new mongoose.Types.ObjectId(userId) },
        { $addToSet: { likedProducts: new mongoose.Types.ObjectId(productId) }})
        res.json({success:true})
        }
        catch(error){
            console.log("error", error.message);
            res.json({success:false,msg:error.message})
        }

    })
    


    //code to get wishlist items
    router.post('/get-wishlist-item',async(req,res)=>{
        try{
        const userId=req.body.userId;
        const wishListData=await User.findOne({}).populate('likedProducts');
        res.json({success:true,wishListData:wishListData.likedProducts});
        }
        catch(error){
            console.log({msg:error.message});
            res.json({success:false,msg:error.message});
        }
    })



     //code to get product details
     router.post("/get-product-details/:pId",async(req,res)=>{
        //console.log(req.params);
        try{
            const details=await Product.findOne({_id:req.params.pId}).populate('addedBy');
            res.json({success:true,product:details})
        }
        catch(error){
            console.log({msg:error.message});
            res.json({success:false});
        }
     })



     //code to fetch search item
     router.post('/get-product-by-search-btn',async(req,res)=>{
        try{
        const search=req.query.searchItem;
        const products=await Product.find({
            $or:[
                {ProductName: {$regex:search}},
                {ProductDescription: {$regex:search}},
                {ProductCategory: {$regex:search}},
            ]
        })
        res.json({success:true,product:products});
        }
        catch(error){
            res.json({success:false, msg:error.message});
        }
     })



     //code to fetch category item
     router.post('/get-product-by-category',async(req,res)=>{
        try{
        const search=req.query.category;
        const products=await Product.find({ProductCategory: search});
        res.json({success:true,product:products});
        }
        catch(error){
            res.json({success:false, msg:error.message});
        }
     })
module.exports=router;