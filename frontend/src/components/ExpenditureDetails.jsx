import React,{useState} from 'react'
import {Link} from 'react-router-dom'
//images
import deletee from "../assets/delete.png"
import edit from "../assets/edit.png"
import Delete from './Delete'


const ExpenditureDetails = ({expense,onDelete}) => {
    const [delClicked,setdelClicked] = useState(false);
    return (
        <tbody>
        <tr className='text-center'>
            <td>{expense.date}</td>
            <td>{expense.title}</td>
            <td>${expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.type}</td>
            <td className='flex justify-center mt-1'>
                <span className='w-[1rem] cursor-pointer' onClick={()=>setdelClicked(prev => !prev)} >
                    <img src={deletee}/> 
                </span>
                <span className='w-[1rem]'>
                    <Link to='/edit'>
                        <img src={edit} />
                    </Link>
                </span>
            </td>
        </tr>
        {delClicked && (
        <tr>
          <td colSpan={5} className='text-center'>
            <Delete onDelete={onDelete} onCancel={() => setdelClicked(false)} expenseId = {expense._id}/>
          </td>
        </tr>
      )}
        </tbody>
    )
}

export default ExpenditureDetails;
