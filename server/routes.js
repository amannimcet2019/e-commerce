const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const router = express.Router();
const {authenticateUser,authenticateAdmin}=require('./middlewares/authenticate');

const { Product, User, Admin, Category } = require('./model/schema');

router.get('/',(req,res)=>{
    res.status(200).send("hello world from server router file")
})

//only once
router.post('/adminregistration',async (req,res)=>{    
    const {email,pass}=req.body;
    if(!email||!pass)
        return res.status(422).json({error:"all field required"})

    try{        
        const temp=new Admin({email,pass});                
        const newAdmin = await temp.save();            
        res.status(201).json({messege:"Admin added successfully",newAdmin});       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to add admin",error});
    }
})

//user registration
router.post('/registration',async (req,res)=>{    
    const {name,mobile,email,pass,cpass}=req.body;
    if(!name|| !email|| !mobile|| !pass|| !cpass)
        return res.status(406).json({error:"all field required"})//406 not acceptable

    try{
        const user = await User.findOne({email});
        if(user)
            return res.status(409).json({error:"Email Already Exist"})//409 conflict
        else if(pass!=cpass)
            return res.status(401).json({error:"Password Not Match"})//401 unauthorised
        const temp=new User({name,mobile,email,pass});                
        const newUser = await temp.save();            
        res.status(201).json({messege:"successfully register",newUser});//201 created       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to register",error});
    }
})

//user login
router.post('/userlogin',async (req,res)=>{
    const {email,pass}=req.body;
    if(!email|| !pass)
        return res.status(406).json({error:"all field required"})

    try{
        const user = await User.findOne({email});
        let isMatch = 0;
        if(user)
            isMatch = await bcrypt.compare(pass,user.pass);
        
        if(!user||!isMatch)
            return res.status(400).json({error:"Invalid email password"})

        const token = await user.generateToken();
        res.status(200).json({message:"user login successfully",user,token});       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to login",error});
    }
})

//admin login
router.post('/adminlogin',async (req,res)=>{
    const {email,pass}=req.body;
    if(!email|| !pass)
        return res.status(406).json({error:"all field required"})

    try{
        const admin = await Admin.findOne({email});
        if(pass!==admin.pass)
            return res.status(400).json({error:"Invalid email password"})
            
        const token = await admin.generateToken();
        
        res.status(200).json({message:"admin login successfully",admin,token});       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to login",error});
    }
})

//get categories public
router.get('/category',async(req,res)=>{    
    try {
        const categories = await Category.find()
        res.status(200).send({categories})
    } catch (error) {
        res.status(500).json({error})
    }
})

//get categories as admin to update
router.post('/categoryadmin',authenticateAdmin,async(req,res)=>{    
    try {
        const categories = await Category.find()
        res.status(200).send({categories})
    } catch (error) {
        res.status(500).json({error})
    }
})

//insert a new category
router.post('/category',async (req,res)=>{
    const {name}=req.body;
    if(!name)
        return res.status(422).json({error:"please fill some details"})

    try{        
        const temp=new Category({name})
        const newCategory = await temp.save();            
        res.status(201).json({messege:"Category created successfully",newCategory});       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to create Category",error});
    }
})

//delete a category
router.put('/category',async(req,res)=>{
    try {
        await Category.deleteOne({_id:req.body._id});
        res.status(200).send("successful")
    } catch (error) {
        res.status(500).json({error})
    }
})

//create product
router.post('/createProduct',async (req,res)=>{
    const {image,name,price,details,category}=req.body;
    if(!image||!name||!price||!details||!category)
        return res.status(422).json({error:"all field required"})

    try{        
        const temp=new Product({image,name,price,details,category});                
        const newProduct = await temp.save();            
        res.status(201).json({messege:"product created successfully",newProduct});       
    }
    catch(error)
    {
        res.status(500).json({error:"failed to create product",error});
    }
})

//delete product
router.put('/deleteProduct',async(req,res)=>{
    try {
        await Product.deleteOne({_id:req.body.product._id});
        res.status(200).send("successful")
    } catch (error) {
        res.status(500).json({error})
    }
})

//update product
router.post('/updateProduct',async(req,res)=>{
    try {
        await Product.updateOne({_id:req.body._id},{
            $set:{
                image:req.body.image,
                name:req.body.name,
                price:req.body.price,
                details:req.body.details,
                category:req.body.category
            }
        })
        res.status(200).send("successfully updated")
    } catch (error) {
        return res.status(500).json({error})
    }
})
//get Products
router.get('/products',async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).send({products})
    } catch (error) {
        res.status(500).json({error})
    }
})

//get one product
router.get('/product/:_id',async(req,res)=>{
    try {        
        const product = await Product.findOne({_id:req.params._id})        
        res.status(200).send({product})
    } catch (error) {
        res.status(500).json({error})
    }
})

//Add to cart
router.post('/addtocart',authenticateUser,async (req,res)=>{    
    try {
        const temp={
            image:req.body.product.image,
            pname:req.body.product.name,
            price:req.body.product.price,
            quantity:1
        }
        const found = req.user.cart.filter((ele)=>temp.pname===ele.product.pname);
        if(found.length)
            return res.status(401).send("already in cart")
        req.user.cart = req.user.cart.concat({product:temp});
        await req.user.save()
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(500).send({error})
    }
})

//get user
router.post('/user',authenticateUser,async (req,res)=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(500).send({error})
    }
})

//get usercount
router.get('/usercount',async (req,res)=>{
    try {
        const users = await User.find({})  
               
        res.status(200).json({count:users.length})
        
    } catch (error) {
        res.status(500).send({error})
    }
})

//get admin
router.post('/admin',authenticateAdmin,async (req,res)=>{
    try {
        res.status(200).json({admin:req.admin})
    } catch (error) {
        res.status(500).send({error})
    }
})

//delete from cart
router.post('/cartdelete',authenticateUser,async(req,res)=>{    
    try {        
        const temp=req.user.cart.filter((ele)=>ele.product.pname!==req.body.del)
        req.user.cart=temp;
        await req.user.save()
        res.status(200).send("successful")
    } catch (error) {
        res.status(500).json({error})
    }
})

//payment
router.post('/payment',authenticateUser,async(req,res)=>{    
    try {
        if(!req.body.address)
            return res.status(400).send("address required")
        let admin = await Admin.findOne({email:"aman@admin.com"});
        const adminHistory={
            tid:uuid.v4(),
            total:req.body.total,
            date:req.body.date
        }
        admin.history = admin.history.concat(adminHistory)        
        await admin.save()  

        const userHistory={
            ...adminHistory,
            address:req.body.address
        }        
        req.user.cart=[]
        req.user.history = req.user.history.concat(userHistory)        
        await req.user.save()
        
        res.status(200).send("successful Payment")
    } catch (error) {
        res.status(500).send({error})
    }
})

//user logout
router.post('/userlogout',authenticateUser,async(req,res)=>{    
    try {        
        req.user.tokens=req.user.tokens.filter((ele)=>ele.token!=req.body.token)
        await req.user.save()
        
        res.status(200).send("successful Logout")
    } catch (error) {
        res.status(500).send({error})
    }
})

//user logout
router.post('/adminlogout',authenticateAdmin,async(req,res)=>{    
    try {        
        req.admin.tokens=req.admin.tokens.filter((ele)=>ele.token!=req.body.token)
        await req.admin.save()
        
        res.status(200).send("successful Logout")
    } catch (error) {
        res.status(500).send({error})
    }
})

//login verify
router.post('/verify',async(req,res)=>{    
    try {
        if(!req.body.token)
            return res.status(200).send("NO ONE IS ACTIVE")

        const decode = jwt.verify(req.body.token,process.env.SECRET_KEY);        
        const user = await User.findOne({_id:decode._id});
        
        if(user)
            return res.status(200).send("USER IS ACTIVE")
            
        const admin = await Admin.findOne({_id:decode._id});
        if(admin)
            return res.status(200).send("ADMIN IS ACTIVE")            
        
    } catch (error) {
        res.status(500).json({error})
    }
})
module.exports=router;  