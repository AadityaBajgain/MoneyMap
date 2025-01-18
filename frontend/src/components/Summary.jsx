import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
// import images
import redArrow from '../assets/redArrow.png';
import greenArrow from '../assets/greenArrow.png';

const TableSummary = ({ expenses }) => {
    const amounts = expenses?.map((expense) => expense.amount) || [];
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    const expense = expenses
        ?.filter((expense) => expense.category === 'Expense')
        .map((expense) => expense.amount) || [];
    const expenseAmount = expense.reduce((acc, item) => acc + item, 0).toFixed(2);

    const Income = expenses
        ?.filter((expense) => expense.category === 'Income')
        .map((expense) => expense.amount) || [];
    const IncomeAmount = Income.reduce((acc, item) => acc + item, 0).toFixed(2);
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Amount',
                data: [IncomeAmount, expenseAmount],
                backgroundColor: [
                    'rgba(75,192,192,0.4)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75,192,192,1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 15,
                    usePointStyle: true,
                },
                position: 'bottom',
            },
        },
    };

    return (
        <div className='flex flex-row flex-wrap justify-center items-center border-2 border-slate-400 rounded-md p-4'>
            <div className='flex flex-col p-4'>
                <h1 className='text-xl md:text-4xl font-bold'>Transaction Summary</h1>
                <div className='text-center'>
                    <p className='text-base md:text-xl'>Total: <span className='text-blue-400'>${total}</span></p>
                    <h2 className='text-lg md:text-2xl underline'>Categories wise Expense:</h2>
                    <div className='flex flex-col space-y-2 text-sm md:text-lg items-center mr-5'>
                        <p className='flex'><img className='w-[1.5rem] h-[1.5rem]' src={greenArrow} />Income Amount:<span className='text-green-600 ml-2'> ${IncomeAmount}</span></p>
                        <p className='flex'><img className='w-[2rem] h-fit' src={redArrow} /> Expense Amount:<span className='text-red-600 ml-2'> ${expenseAmount}</span></p>
                    </div>
                </div>
            </div>
            <div className='w-[150px] h-[150px] md:w-[200px] md:h-[200px] p-2'>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default TableSummary;
