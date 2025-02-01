const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// Static signup method
userSchema.statics.signup  = async function(email,password){

    // validation of email and password 
    if(!email || !password){
        throw Error("All fields are required");
    }
    if(!validator.isEmail(email)){
        throw Errror("Invalid Email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough");
    }


    // check if user already exists
    const emailExists = await this.findOne({email});

    if(emailExists){
        throw Error("User already exists");
    }


    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await this.create({email,password:hashedPassword});

    return user;
}

// Static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All fields are required");
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error("User not found");
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw Error("Invalid password");
    }
    return user;
}

module.exports = mongoose.model('Userschema',userSchema);