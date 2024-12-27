import React, { useState, useEffect } from 'react';

// components
import ExpenditureDetails from '../components/ExpenditureDetails';
import Graph from '../components/Graph';

// images
import chart from "../assets/chart.png";
import table from "../assets/table.png";
import AddExpense from '../components/AddExpense';
import TableSummary from '../components/Summary';

const Home = () => {
  const [expenses, setExpenses] = useState(null);
  const [selected, setSelected] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFrequency, setSelectedFrequency] = useState('30');
  const [dataChanged, setDataChanged] = useState(false);
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
  }, [dataChanged]);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleFrequencyChange = (event) => {
    setSelectedFrequency(event.target.value);
  };
  const handleDataChange = () => {
    setDataChanged(!dataChanged);
  };
  const filteredExpenses = expenses?.filter((expense) => {
    if (selectedCategory === 'All') {
      return true;
    }
    return expense.category === selectedCategory;
  });

  const filteredExpensesByFrequency = filteredExpenses?.filter((expense) => {
    const date = new Date();
    const expenseDate = new Date(expense.date);
    const diffTime = Math.abs(date - expenseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (selectedFrequency === '1') {
      return diffDays <= 1;
    } else if (selectedFrequency === '7') {
      return diffDays <= 7;
    } else if (selectedFrequency === '30') {
      return diffDays <= 30;
    } else {
      return true;
    };
  });

  return (
    <div>
      <div className='flex justify-center items-center'>
      <TableSummary expenses={expenses} />
      </div>
      <div className='m-5 flex justify-around items-end'>
        <div className='w-fit flex space-x-2 border-white border-2 p-1 rounded-md'>
          <img
            className={`w-[1.5rem] cursor-pointer ${selected === 'table' ? 'bg-green-200 rounded-sm' : 'bg-slate-500 rounded-sm'}`}
            onClick={() => handleOnClick('table')}
            src={table} alt='table'
          />
          <img
            className={`w-[1.5rem] cursor-pointer ${selected === 'chart' ? 'bg-green-200 rounded-sm' : 'bg-slate-500 rounded-sm'}`}
            onClick={() => handleOnClick('chart')}
            src={chart} alt='chart'
          />
        </div>
        <div className='flex flex-col text-sm'>
          <p>Category</p>
          <select
            className='border-2 border-slate-400 rounded-md text-black'
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All">All</option>
            <option value="Expense">Expense</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        <div className='flex flex-col text-sm '>
          <p>Frequency</p>
          <select className='border-2 border-slate-400 rounded-md  text-black px-2' onChange={handleFrequencyChange} value={selectedFrequency}>
            <option value="1">Today</option>
            <option value="7">Week</option>
            <option value="30">Month</option>
          </select>
        </div>
      </div>

      <div className='flex justify-around w-[85vw]'>
        <div className='w-[60vw]'>
          <h2 className='text-4xl text-center my-5'>Recent Transactions</h2>
          {selected === 'table' &&
            <table className='w-full max-h-fit'>
              <thead className='text-lg'>
                <tr>
                  <th>Index</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th className='hidden lg:table-cell'>Category</th>
                  <th className='hidden lg:table-cell'>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {filteredExpensesByFrequency &&
                filteredExpensesByFrequency.map((item) => (
                  <ExpenditureDetails
                    onDelete={handleDataChange}
                    key={item._id}
                    expense={item}
                    index={filteredExpensesByFrequency.indexOf(item) + 1}
                  />
                ))
              }
              </tbody>
            </table>
          }
          {selected === 'chart' &&
            <Graph className='w-full max-h-fit'expenseData={filteredExpensesByFrequency} />
          }
        </div>
        <div className='w-[20vw] mt-10'>
          <AddExpense onAdd={handleDataChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
