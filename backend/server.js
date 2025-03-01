require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');

const app = express();

mongoose_url = process.env.mongoo_URL;
mongoose.connect(mongoose_url)
    .then((result)=>{
        console.log('connected to mongodb')
        app.listen(3001,()=>{
            console.log('server is running')
        })
    }).catch(err=>{
        console.log(err.message)
    })

// middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FrontendURL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: [process.env.FrontendURL, process.env.VercelURL],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use(cors());

app.use(express.json());

app.use('/api/expense',expenseRoute)
app.use('/api/user',userRoute)

