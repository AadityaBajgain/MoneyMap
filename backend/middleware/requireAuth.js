const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
const requireAuth = (req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: "Authorization required"}); 
    }

    const token = authorization.split(" ")[1];
    try{
        const {_id} = jwt.verify(token, process.env.SECRET);
        res.user = User.findOne({_id}).select('_id');
        next();
    }catch(error)
    {
        console.log("Error:",error);
    }
}

module.exports = requireAuth;