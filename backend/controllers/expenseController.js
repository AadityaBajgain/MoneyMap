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

const createExpense = async (req, res) => {
    try {
        const { date, ...rest } = req.body;
        const expense = await Expense.create({
            ...rest,
            date: date.slice(0,10),
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// edit expense
const editExpense = async (req,res)=>{
    const {id} = req.params;
    const {title,amount,category,description,type,date} = req.body;
    try{
        const updatedData  = await Expense.findByIdAndUpdate(id,{title,amount,category,description,type,date},{new:true});
        if(!updatedData){
            return res.status(404).json({ message: "Expense data not found" });
        }
        res.status(200).json(updatedData);
    }catch(err){
        console.log(err.message);
        res.status(400).json({error:err.messsage})
    }
}

module.exports = {
    allExpense,
    singleExpense,
    createExpense,
    deleteExpense,
    editExpense
}