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
        enum: ["debit", "expenditure"],
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Education', 'Entertainment', 'Utilities', 'Food', 'Travel', 'Rent'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

expenseSchema.pre('save', function (next) {
    if (this.date && typeof this.date === 'string') {
        this.date = new Date(this.date); // Convert string to a Date object
    }
    next();
});

const Expense = mongoose.model('Expense', expenseSchema);
