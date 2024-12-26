import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import React from 'react';

const Graph = ({ expenseData }) => {
    const lineData = {
        labels: expenseData.map(expense => expense.date),
        datasets: [
            {
                label: 'Expenses',
                data: expenseData.map(expense => expense.amount),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const pieData = {
        labels: expenseData.map(expense => expense.category),
        datasets: [
            {
                label: 'Amount',
                data: expenseData.map(expense => expense.amount),
                backgroundColor: expenseData.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4)`),
                borderColor: expenseData.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
            },
        ],
    };

    const barData = {
        labels: expenseData.map(expense => expense.date),
        datasets: [
            {
                label: 'Transactions',
                data: expenseData.map(expense => expense.amount),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        title: {
            display: true,
            text: 'Expense Tracker',
        },
    };

    return (
        <div>
            <Line data={lineData} options={options} />
            <Pie data={pieData} options={options} />
            <Bar data={barData} options={options} />
        </div>
    );
};

export default Graph;