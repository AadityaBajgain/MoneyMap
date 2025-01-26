const express = require('express');
const router = express.Router();


// import controllers
const {loginUser,signupUser} = require('../controllers/userController');

// signup router
router.post('/signup,signupUser');

// login router
router.post('/login',loginUser);

module.exports = router;