const mongoose = require('mongoose');
const Expense = require('../model/expenseModel');

const formatDateString = (date) => {
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const normalizeDate = (input) => {
    if (!input) {
        return null;
    }

    const trimmed = input.toString().trim();

    // Already ISO or Date parsable
    const isoCandidate = new Date(trimmed);
    if (!Number.isNaN(isoCandidate.getTime())) {
        return formatDateString(isoCandidate);
    }

    // Handle dd-mm-yyyy
    const customMatch = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (customMatch) {
        const [, day, month, year] = customMatch;
        const parsed = new Date(`${year}-${month}-${day}`);
        if (!Number.isNaN(parsed.getTime())) {
            return formatDateString(parsed);
        }
    }

    return null;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get all expense
const allExpense = async (req, res) => {
    const user_id = req.user._id;
    try {
        const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 });
        return res.status(200).json(expenses);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

// get single expense
const singleExpense = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid expense id' });
    }

    try {
        const expense = await Expense.findOne({ _id: id, user_id: req.user._id });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json(expense);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: 'Failed to fetch expense' });
    }
};

// delete expense
const deleteExpense = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid expense id' });
    }

    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, user_id: req.user._id });

        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: 'Failed to delete expense' });
    }
};

// add expense
const createExpense = async (req, res) => {
    const user_id = req.user._id;
    const { title, amount, category, description, type, date } = req.body;
    const parsedAmount = Number(amount);

    const missingFields = [];
    if (!title) missingFields.push('title');
    if (amount === undefined || amount === null || Number.isNaN(parsedAmount)) missingFields.push('amount');
    if (!category) missingFields.push('category');
    if (!type) missingFields.push('type');
    if (!date) missingFields.push('date');

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing or invalid fields: ${missingFields.join(', ')}` });
    }

    const normalizedDate = normalizeDate(date);
    if (!normalizedDate) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
        const expense = await Expense.create({
            title,
            amount: parsedAmount,
            category,
            description,
            type,
            date: normalizedDate,
            user_id,
        });

        return res.status(201).json(expense);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// edit expense
const editExpense = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid expense id' });
    }

    const { title, amount, category, description, type, date } = req.body;
    const updatePayload = {};

    if (title !== undefined) updatePayload.title = title;
    if (category !== undefined) updatePayload.category = category;
    if (description !== undefined) updatePayload.description = description;
    if (type !== undefined) updatePayload.type = type;

    if (amount !== undefined) {
        const parsedAmount = Number(amount);
        if (Number.isNaN(parsedAmount)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        updatePayload.amount = parsedAmount;
    }

    if (date) {
        const normalizedDate = normalizeDate(date);
        if (!normalizedDate) {
            return res.status(400).json({ error: 'Invalid date format' });
        }
        updatePayload.date = normalizedDate;
    }

    if (Object.keys(updatePayload).length === 0) {
        return res.status(400).json({ error: 'No updates provided' });
    }

    try {
        const updatedData = await Expense.findOneAndUpdate(
            { _id: id, user_id: req.user._id },
            updatePayload,
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        return res.status(200).json(updatedData);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: 'Failed to update expense' });
    }
};

module.exports = {
    allExpense,
    singleExpense,
    createExpense,
    deleteExpense,
    editExpense,
};
