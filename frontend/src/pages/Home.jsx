import React, { useState, useEffect } from 'react'

// components
import ExpenditureDetails from '../components/ExpenditureDetails';

//images
import chart from "../assets/chart.png";
import table from "../assets/table.png";
import plus from "../assets/plus.png"

const Home = () => {
  const [expenses, setExpenses] = useState(null);
  const [selected, setSelected] = useState('table');

  const handleOnClick = (item) => {
    setSelected(item)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/api/expense')
      const json = await response.json();

      if (response.ok) {
        setExpenses(json);
      }
    }
    fetchData();
  }, [expenses])
  return (
    <div>
      <div className='m-5 flex justify-around items-end'>
        <div className='w-fit flex space-x-4 border-black border-2 p-1 rounded-md'>
          <img className={`w-[1.5rem] cursor-pointer ${selected === 'table' ? 'bg-slate-200 rounded-sm' : ''}`} onClick={() => handleOnClick('table')} src={table} />
          <img className={`w-[1.5rem] cursor-pointer ${selected === 'chart' ? 'bg-slate-200 rounded-sm' : ''}`} onClick={() => handleOnClick('chart')} src={chart} />
        </div>
        <div className='flex flex-col text-sm'>
          <p>Type</p>
          <select className='border-2 border-slate-400 rounded-md'>
            <option value="">All</option>
            <option value="">Expense</option>
            <option value="">Credit</option>
          </select>
        </div>
        <div className='flex flex-col text-sm'>
          <p>Frequency</p>
          <select className='border-2 border-slate-400 rounded-md px-2'>
            <option value="">Today</option>
            <option value="">Week</option>
            <option value="">Month</option>
          </select>
        </div>
        <div>
          <img className='w-[2rem] cursor-pointer' src={plus} />
        </div>
      </div>

      <div>
        <h2>Recent Transactions</h2>
        {selected === 'table' &&
          <table className='w-[80vw] max-h-fit'>
            <tr className='text-sm'>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
            {expenses && expenses.map((item) => (
              <ExpenditureDetails key={item._id} expense={item} />
            ))}
          </table>
        }

      </div>
    </div>
  )
}

export default Home
