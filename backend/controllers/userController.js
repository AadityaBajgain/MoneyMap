const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


const createSecret = (_id)=>{
    return jwt.sign({_id}),process.env.SECRET,{expiresIn:'30d'};
}
// Signup route

const signupUser = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.signup(email,password);
        const token = createSecret(user._id);
        res.status(200).json({email,token});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

// Login route
const loginUser = async(email,password)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createSecret(user._id);
        res.status(200).json({email,token});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
}