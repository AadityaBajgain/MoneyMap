const Expense = require('../model/expenseModel');


// get all expense

const allExpense = async (req,res)=>{
    try{
        const expenses = await Expense.find({}).sort({createdAt:-1})
        res.status(200).json(expenses)
    }catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

// get single expense

const singleExpense = async(req,res)=>{
    try{
        const {id} = req.params;
        const expense = await Expense.findById(id);
        res.status(200).json(expense);
    }catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

// delete expense

const deleteExpense = async(req,res)=>{
    try{
        const {id} = req.params;
        await Expense.findByIdAndDelete(id);
        res.status(200).json('Deleted Successfully!!')
    }catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

// add expense

const addExpense = async (req,res)=>{
    const {title,amount,category,description,type,date} =  req.body;
    try {
        const expense = await Expense.create({
            title,amount,category,description,type,date
        });
        res.status(200).json(expense);
    }catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports = {
    allExpense,
    singleExpense,
    addExpense,
    deleteExpense
}