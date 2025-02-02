const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Credit", "Expense"],
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Education', 'Entertainment', 'Utilities', 'Food', 'Travel', 'Rent','Other'],
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user_id:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Expense', expenseSchema);
