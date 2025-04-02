const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Static signup method
userSchema.statics.signup = async function(email, password) {
    // validation of email and password 
    if (!email || !password) {
        console.log("Signup failed: All fields are required");
        throw Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        console.log("Signup failed: Invalid Email");
        throw Error("Invalid Email");
    }
    if (!validator.isStrongPassword(password)) {
        console.log("Signup failed: Password is not strong enough");
        throw Error("Password is not strong enough");
    }

    // check if user already exists
    const emailExists = await this.findOne({ email });

    if (emailExists) {
        console.log("Signup failed: User already exists");
        throw Error("User already exists");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashedPassword });

    console.log(`User created with email: ${email}`);
    return user;
}

// Static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        console.log("Login failed: All fields are required");
        throw Error("All fields are required");
    }

    console.log(`Login attempt for email: ${email}`);

    const user = await this.findOne({ email });

    if (!user) {
        console.log("Login failed: User not found");
        throw Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Login failed: Invalid password");
        throw Error("Invalid password");
    }
    console.log(`User logged in with email: ${email}`);
    return user;
}

module.exports = mongoose.model('User', userSchema);