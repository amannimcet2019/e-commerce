const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const productsSchema= new mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    details:{type:String,required:true},
    category:{type:String,required:true}
})

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:Number,required:true},
    email:{type:String,required:true},    
    pass:{type:String,required:true},
    cart:[{
        product:{                    
            image:{type:String,required:true},
            pname:{type:String,required:true},
            price:{type:Number,required:true},
            quantity:{type:Number,required:true}
        }
    }],
    history:[{
        address:{type:String,required:true},
        total:{type:Number,required:true},
        tid:{type:String,required:true},
        date:{type:String,required:true}
    }],
    tokens:[{
        token:{type:String,required:true}
    }]
})

const adminSchema = new mongoose.Schema({
    email:{type:String,required:true},
    pass:{type:String,required:true},
    history:[{
        tid:{type:String,required:true},
        total:{type:Number,required:true},
        date:{type:String,required:true}
    }],
    tokens:[{
        token:{type:String,required:true}
    }]
})

const categoriesSchema= new mongoose.Schema({   
    name:{type:String,required:true,trim:true,unique:true}
})


// hashing password
userSchema.pre('save',async function(next){
    if(this.isModified('pass')){
        this.pass= await bcrypt.hash(this.pass,10);
    }
    next();
})

// generating token for user
userSchema.methods.generateToken = async function(){
    try {
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();   
        return token;
    } catch (error) {
        console.log({error});
    }
}

// generating token for admin
adminSchema.methods.generateToken = async function(){
    try {
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();   
        return token;
    } catch (error) {
        console.log({error});
    }
}

const Product = mongoose.model('PRODUCT',productsSchema);
const User = mongoose.model('USER',userSchema);
const Admin = mongoose.model('ADMIN',adminSchema);
const Category = mongoose.model('CATEGORY',categoriesSchema);

module.exports = { Product, User, Admin, Category };