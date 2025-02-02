import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//images
import deletee from "../assets/delete.png"
import edit from "../assets/edit.png"
import {useAuthContext} from "../hooks/useAuthContext";
const ExpenditureDetails = ({ expense, onDelete, index }) => {
    const {user} = useAuthContext();
    const handleDeleteClick = async () => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/expense/${expense._id}`, {
                method: 'DELETE',
                headers:{
                    "Authorization": `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                onDelete();
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
        } else if (sure === null || sure !== 'yes') {
            onCancel();
        }
    }   
    function onCancel() {
        alert('Expense not deleted');
    }
    return (

        <tr className='text-sm md:text-base text-center'>
            <td className='py-2'>{index}</td>
            <td className='py-2 hidden md:table-cell'>{expense.date}</td>
            <td className='py-2'>{expense.title}</td>
            <td className='py-2'>${expense.amount}</td>
            <td className='hidden lg:table-cell py-2'>{expense.category}</td>
            <td className='hidden lg:table-cell py-2'>{expense.type}</td>
            <td className='flex justify-center mt-1 space-x-2'>
                <span className='w-[1.25rem] md:w-[1.5rem] cursor-pointer' onClick={(deleteForSure)}  >
                    <img src={deletee} alt="Delete" />
                </span>
                <span className='w-[1.25rem] md:w-[1.5rem]'>
                    <Link to={`/edit/${expense._id}`}>
                        <img src={edit} alt="Edit" />
                    </Link>
                </span>
            </td>
        </tr>

    )
}

export default ExpenditureDetails
