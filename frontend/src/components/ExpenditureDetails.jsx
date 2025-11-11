import React from 'react';
import { Link } from 'react-router-dom';
import deletee from "../assets/delete.png";
import edit from "../assets/edit.png";
import { useAuthContext } from "../hooks/UseAuthContext";
import { buildApiUrl } from '../hooks/api';

const ExpenditureDetails = ({ expense, onDelete, index }) => {
    const { user } = useAuthContext();

    const handleDeleteClick = async () => {
        if (!user) return;
        try {
            const response = await fetch(buildApiUrl(`/api/expense/${expense._id}`), {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
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

    return (
        <tr className='text-sm text-slate-200'>
            <td className='py-4 pl-4 text-left text-xs uppercase tracking-[0.3em] text-slate-500'>{index}</td>
            <td className='hidden py-4 text-left text-slate-300 md:table-cell'>{expense.date}</td>
            <td className='py-4 text-left font-semibold text-white'>{expense.title}</td>
            <td className='py-4 text-center font-semibold text-white'>${expense.amount}</td>
            <td className='hidden py-4 text-center text-slate-400 lg:table-cell'>{expense.category}</td>
            <td className='hidden py-4 text-center text-slate-400 lg:table-cell'>{expense.type}</td>
            <td className='py-4 pr-4'>
                <div className='flex items-center justify-end gap-3'>
                    <button onClick={confirmDelete} className='rounded-full border border-white/10 p-2 transition hover:border-rose-400/60 hover:bg-rose-500/10'>
                        <img src={deletee} alt="Delete" className='h-4 w-4' />
                    </button>
                    <Link to={`/edit/${expense._id}`} className='rounded-full border border-white/10 p-2 transition hover:border-emerald-400/60 hover:bg-emerald-500/10'>
                        <img src={edit} alt="Edit" className='h-4 w-4' />
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default ExpenditureDetails;
