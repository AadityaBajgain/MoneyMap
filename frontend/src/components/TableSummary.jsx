import React from 'react';

// import images
import redArrow from '../assets/redArrow.png';
import greenArrow from '../assets/greenArrow.png';

const TableSummary = ({ expenses }) => {
    const amounts = expenses?.map((expense) => expense.amount) || [];
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    // Calculate total expense amount
    const expense = expenses
        ?.filter((expense) => expense.category === 'Expense')
        .map((expense) => expense.amount) || [];
    const expenseAmount = expense.reduce((acc, item) => acc + item, 0).toFixed(2);

    // Calculate total credit amount
    const credit = expenses
        ?.filter((expense) => expense.category === 'Credit')
        .map((expense) => expense.amount) || [];
    const creditAmount = credit.reduce((acc, item) => acc + item, 0).toFixed(2);

    return (
        <div className=' flex flex-col border-2 border-slate-400 rounded-md p-4'>
            <h1 className='text-4xl font-bold'>Transaction Summary</h1>
            <div className='text-center'>
                <p className='text-xl'>Total: <span className='text-blue-400'>${total}</span></p>
                <h2 className='text-3xl'>Categories</h2>
                <div className='flex flex-col space-y-2 text-lg items-center mr-5'>
                    <p className='flex'><img className='w-[1.5rem] h-[1.5rem]' src={greenArrow} />Credit Amount:<span className='text-green-600 ml-2'> ${creditAmount}</span></p>
                    <p className='flex'><img className='w-[2rem] h-fit' src={redArrow} /> Expense Amount:<span className='text-red-600 ml-2'> ${expenseAmount}</span></p>
                </div>
            </div>

        </div>
    );
};

export default TableSummary;
