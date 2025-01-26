const express = require('express');
const router = express.Router();

const {
    allExpense,
    singleExpense,
    createExpense,
    deleteExpense,
    editExpense
} = require('../controllers/expenseController');

// getting all expense
router.get('/', allExpense);

// getting single expense
router.get('/:id', singleExpense);

// deleting expense
router.delete('/:id', deleteExpense);

// adding expense
router.post('/', createExpense);

// editing expense
router.patch('/:id', editExpense);

module.exports = router;


