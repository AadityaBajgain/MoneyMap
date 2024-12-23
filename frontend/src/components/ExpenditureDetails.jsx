import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//images
import deletee from "../assets/delete.png"
import edit from "../assets/edit.png"

const ExpenditureDetails = ({ expense, onDelete }) => {
    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/expense/${expense._id}`, {
                method: 'DELETE',
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
        }
        else if (sure === null || sure !== 'yes') {
            onCancel();
        }
    }
    function onCancel() {
        alert('Expense not deleted');
    }
    return (
        <tbody className='text-md text-gray-400'>
            <tr className='text-center'>
                <td>{expense.date}</td>
                <td>{expense.title}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.type}</td>
                <td className='flex justify-center mt-1'>
                    <span className='w-[1.5rem] cursor-pointer' onClick={(deleteForSure)}  >
                        <img src={deletee} />
                    </span>
                    <span className='w-[1.5rem]'>
                        <Link to='/edit'>
                            <img src={edit} />
                        </Link>
                    </span>
                </td>
            </tr>
        </tbody>
    )
}

export default ExpenditureDetails;
