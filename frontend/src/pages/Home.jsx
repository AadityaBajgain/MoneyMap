import React, { useState, useEffect } from 'react';

// components
import ExpenditureDetails from '../components/ExpenditureDetails';

// images
import chart from "../assets/chart.png";
import table from "../assets/table.png";
import AddExpense from '../components/AddExpense';

const Home = () => {
  const [expenses, setExpenses] = useState(null);
  const [selected, setSelected] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addExpense,setAddExpense] = useState(false);


  const handleOnClick = (item) => {
    setSelected(item);
  };

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/expense');
    const json = await response.json();

    if (response.ok) {
      setExpenses(json);
    }
  };

  useEffect(() => {
    fetchData();
  }, [addExpense]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredExpenses = expenses?.filter((expense) => {
    if (selectedCategory === 'All') {
      return true;
    }
    return expense.category === selectedCategory;
  });

  return (
    <div>
      <div className='m-5 flex justify-around items-end'>
        <div className='w-fit flex space-x-2 border-black border-2 p-1 rounded-md'>
          <img
            className={`w-[1.5rem] cursor-pointer ${selected === 'table' ? 'bg-slate-200 rounded-sm' : ''}`}
            onClick={() => handleOnClick('table')}
            src={table}
          />
          <img
            className={`w-[1.5rem] cursor-pointer ${selected === 'chart' ? 'bg-slate-200 rounded-sm' : ''}`}
            onClick={() => handleOnClick('chart')}
            src={chart}
          />
        </div>
        <div className='flex flex-col text-sm'>
          <p>Category</p>
          <select
            className='border-2 border-slate-400 rounded-md'
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All">All</option>
            <option value="Expense">Expense</option>
            <option value="Credit">Credit</option>
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
      </div>

      <div className='flex'>
        <div>
          <h2>Recent Transactions</h2>
          {selected === 'table' &&
            <table className='w-[60vw] max-h-fit'>
              <thead className='text-sm'>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
                {filteredExpenses &&
                  filteredExpenses.map((item) => (
                    <ExpenditureDetails key={item._id} expense={item} />
                  ))}
            </table>}
        </div>
        <div className='w-[20vw] mt-6 left-[65vw] fixed'>
          <AddExpense onAdd={()=>setAddExpense(!addExpense)}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
