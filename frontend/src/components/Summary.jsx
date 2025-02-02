import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
// Import images
import redArrow from '../assets/redArrow.png';
import greenArrow from '../assets/greenArrow.png';

const TableSummary = ({ expenses = [] }) => {
    // Calculate amounts only when expenses change
    const { total, expenseAmount, incomeAmount, data } = useMemo(() => {
        const amounts = expenses.map((expense) => expense.amount);
        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

        const expense = expenses
            .filter((expense) => expense.category === 'Expense')
            .map((expense) => expense.amount);
        const expenseAmount = expense.reduce((acc, item) => acc + item, 0).toFixed(2);

        const income = expenses
            .filter((expense) => expense.category === 'Income')
            .map((expense) => expense.amount);
        const incomeAmount = income.reduce((acc, item) => acc + item, 0).toFixed(2);

        const data = {
            labels: ['Income', 'Expense'],
            datasets: [
                {
                    label: 'Amount',
                    data: [incomeAmount, expenseAmount],
                    backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(75,192,192,1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1,
                },
            ],
        };

        return { total, expenseAmount, incomeAmount, data };
    }, [expenses]);

    const options = {
        plugins: {
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 10,
                    usePointStyle: true,
                },
                position: 'bottom',
            },
        },
    };

    return (
        <div className='flex flex-col md:flex-row gap-4 border-2 border-slate-400 rounded-md p-4 w-[90vw] max-w-3xl mx-auto'>
            <div className='flex flex-col items-center text-center p-2'>
                <h1 className='text-xl md:text-3xl font-bold'>Transaction Summary</h1>
                <p className='text-lg md:text-xl'>Total: <span className='text-blue-400'>${total}</span></p>
                <h2 className='text-md md:text-xl underline mt-2'>Category-wise Summary:</h2>
                <div className='flex flex-col space-y-2 text-sm md:text-lg items-center'>
                    <p className='flex items-center'>
                        <img className='w-4 h-4 md:w-6 md:h-6' src={greenArrow} alt="Income Arrow" loading="lazy" />
                        <span className='ml-2'>Income: <span className='text-green-600'>${incomeAmount}</span></span>
                    </p>
                    <p className='flex items-center'>
                        <img className='w-4 h-4 md:w-6 md:h-6' src={redArrow} alt="Expense Arrow" loading="lazy" />
                        <span className='ml-2'>Expense: <span className='text-red-600'>${expenseAmount}</span></span>
                    </p>
                </div>
            </div>
            {expenses.length > 0 && (
                <div className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] mx-auto'>
                    <Pie data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default TableSummary;
