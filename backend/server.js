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

app.use(cors({
    "Access-Control-Allow-Origin": process.env.FrontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// app.use(cors());

app.use(express.json());

app.use('/api/expense',expenseRoute)
app.use('/api/user',userRoute)

