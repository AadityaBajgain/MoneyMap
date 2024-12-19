const express = require('express');
const router = express.Router();

const {
    allExpense,
    singleExpense,
    addExpense,
    deleteExpense
} = require('../controllers/expenseController');


// getting all expense
router.get('/',allExpense);

// getting single expense
router.get('/:id',singleExpense);

// deleting expense
router.delete('/:id',deleteExpense);

// adding expense
router.post('/',addExpense);


module.exports = router;


