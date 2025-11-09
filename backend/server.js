require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');

const app = express();

const allowedOrigins = [
    process.env.FrontendURL,
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean);

const mongooseUrl = process.env.MONGO_URL || process.env.mongoo_URL;
const mongooseDbName = process.env.MONGO_DB_NAME;

if (!mongooseUrl) {
    throw new Error('Missing MongoDB connection string. Set MONGO_URL or mongoo_URL in your environment.');
}

const mongooseOptions = {};
if (mongooseDbName) {
    mongooseOptions.dbName = mongooseDbName;
}

mongoose.connect(mongooseUrl, mongooseOptions)
    .then(() => {
        console.log(`Connected to MongoDB${mongooseDbName ? ` (db: ${mongooseDbName})` : ''}`);
        app.listen(3001, () => {
            console.log('server is running');
        });
    })
    .catch(err => {
        console.error('Mongo connection error:', err.message);
    });
// middleware

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// app.use(cors());

app.use(express.json());

app.use('/api/expense',expenseRoute)
app.use('/api/user',userRoute)
