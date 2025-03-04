const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

//create Secret key
const createSecret = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// signup controller
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.signup(email, password);
        const token = createSecret(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ error: error.message });
    }
}

// login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createSecret(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };