import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
//images
import deletee from "../assets/delete.png"
import edit from "../assets/edit.png"
import { buildApiUrl } from '../hooks/api';
import { useAuthContext } from '../hooks/UseAuthContext';

const Graph = ({ expense, total, onDelete }) => {
    const { user } = useAuthContext();

    const doughnutData = (expense) => ({
        labels: [`${expense.category === 'Expense' ? 'Expense' : 'Income'}`, 'Remaining'],
        datasets: [
            {
                data: [expense.amount, total - expense.amount],
                backgroundColor: [`${expense.category === 'Expense' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(0,255,0,0.2)'}`, 'rgba(75, 192, 192, 0.2)'],
                borderColor: [`${expense.category === 'Expense' ? 'rgba(255, 99, 132, 1)' : 'rgba(0,255,0,1)'}`, 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    });

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
    const handleDeleteClick = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(buildApiUrl(`/api/expense/${expense._id}`), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                onDelete?.();
            } else {
                console.error('Failed to delete expense');
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    function deleteForSure() {
        let sure = prompt("Are you sure you want to delete this expense? Type 'yes' to confirm");
        if (sure === 'yes') {
            handleDeleteClick();
        }
        else if (sure === null || sure !== 'yes') {
            onCancel();
        }
    }
    function onCancel() {
        alert('Expense not deleted');
    }
    return (
        <div className='w-[50vw] border-2 border-slate-400 rounded-md p-4 m-2 md:w-[fit] lg:w-[280px]'>
            <div className='flex justify-between'> 
                <div>
                    <h3 className='text-2xl font-bold text-blue-400'>{expense.title}</h3>
                    <p><strong>Date:</strong> {expense.date}</p>
                    <p><strong>Amount : </strong> ${expense.amount}</p>
                </div>
                <div className='flex space-x-2'>
                    <img src={deletee} alt="Delete" onClick={(deleteForSure)} className='w-[1.5rem] h-fit cursor-pointer' />
                    <Link to={`/edit/${expense._id}`}>
                        <img src={edit} alt="Edit" className='w-[1.5rem]' />
                    </Link>
                </div>
            </div>
            <div className='flex justify-around'>
                <div className='w-[150px] h-[150px] md:w-[100px]h-[100px]'>
                    <Doughnut data={doughnutData(expense)} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Graph;
