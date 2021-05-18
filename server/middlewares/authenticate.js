const jwt = require('jsonwebtoken');
const { User, Admin } = require('../model/schema');

const authenticateUser = async (req,res,next) =>{
    try {        
        if(!req.body.token)
            return res.status(400).send("Login first")
        const decode = jwt.verify(req.body.token,process.env.SECRET_KEY);        
        const user = await User.findOne({_id:decode._id,'tokens.token': req.body.token})      
        if(!user)
            return res.status(400).send("Login first")

        req.user = user        
        next()        
    } catch (error) {
        return res.status(500).send({error})
    }
}

const authenticateAdmin = async (req,res,next) =>{
    try {        
        if(!req.body.token)
            return res.status(403).send("Access Denied")
        const decode = jwt.verify(req.body.token,process.env.SECRET_KEY);  
        const admin = await Admin.findOne({_id:decode._id,'tokens.token': req.body.token})      
        if(!admin)
            return res.status(403).send("Access Denied")

        req.admin = admin        
        next()        
    } catch (error) {
        return res.status(500).send({error})
    }
}

module.exports = {authenticateUser,authenticateAdmin} ;