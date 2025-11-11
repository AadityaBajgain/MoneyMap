import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
import deletee from "../assets/delete.png";
import edit from "../assets/edit.png";
import { buildApiUrl } from '../hooks/api';
import { useAuthContext } from '../hooks/UseAuthContext';

const Graph = ({ expense, total, onDelete }) => {
    const { user } = useAuthContext();

    const remaining = Math.max(total - expense.amount, 0);
    const doughnutData = {
        labels: [expense.category === 'Expense' ? 'Expense' : 'Income', 'Remaining'],
        datasets: [
            {
                data: [expense.amount, remaining],
                backgroundColor: [
                    expense.category === 'Expense' ? 'rgba(248,113,113,0.35)' : 'rgba(74,222,128,0.35)',
                    'rgba(148,163,184,0.25)',
                ],
                borderColor: [
                    expense.category === 'Expense' ? 'rgba(248,113,113,1)' : 'rgba(74,222,128,1)',
                    'rgba(148,163,184,0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const handleDeleteClick = async () => {
        if (!user) return;
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

    const confirmDelete = () => {
        const sure = prompt("Type 'yes' to confirm deletion");
        if (sure === 'yes') {
            handleDeleteClick();
        }
    };

    const pillClasses = expense.category === 'Expense'
        ? 'bg-rose-500/10 text-rose-200 border border-rose-500/30'
        : 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30';

    return (
        <div className='glass-panel-soft w-full max-w-sm p-5 text-slate-200'>
            <div className='flex items-start justify-between'>
                <div>
                    <p className='text-xs uppercase tracking-[0.4em] text-slate-500'>{expense.date}</p>
                    <h3 className='mt-1 text-xl font-semibold text-white'>{expense.title}</h3>
                    <div className='mt-2 inline-flex items-center gap-2'>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pillClasses}`}>
                            {expense.category}
                        </span>
                        <span className='text-sm text-slate-400'>{expense.type}</span>
                    </div>
                    <p className='mt-3 text-2xl font-semibold text-white'>${expense.amount}</p>
                </div>
                <div className='flex gap-3'>
                    <button onClick={confirmDelete} className='rounded-full border border-white/10 p-2 transition hover:border-rose-400/60 hover:bg-rose-500/10'>
                        <img src={deletee} alt="Delete" className='h-4 w-4' />
                    </button>
                    <Link to={`/edit/${expense._id}`} className='rounded-full border border-white/10 p-2 transition hover:border-emerald-400/60 hover:bg-emerald-500/10'>
                        <img src={edit} alt="Edit" className='h-4 w-4' />
                    </Link>
                </div>
            </div>
            <div className='mt-4 flex justify-center'>
                <div className='h-40 w-40'>
                    <Doughnut
                        data={doughnutData}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Graph;
