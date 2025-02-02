import React, { useState, useEffect } from 'react';
import {useAuthContext} from "../hooks/UseAuthContext";
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
  const [total, setTotal] = useState(0);
  const {user} = useAuthContext();
  const handleOnClick = (item) => {
    setSelected(item);
  };

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/expense',
      {
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      }
    );
    const json = await response.json();

    if (response.ok) {
      setExpenses(json);
      const totalAmount = json.reduce((acc, expense) => acc + expense.amount, 0);
      setTotal(totalAmount);
    }
  };

  useEffect(() => {
    if (user){
      fetchData();
    }
  }, [dataChanged,user]);

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
    if (!expense.date) return false; 
   
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('-').map(Number); 
      return new Date(year, month - 1, day);
    };
  
    const today = new Date(); 
    const expenseDate = parseDate(expense.date);
  
    if (isNaN(expenseDate)) return false; 
 
    const diffTime = today - expenseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (selectedFrequency === '1') {
      return diffDays === 0; 
    } else if (selectedFrequency === '7') {
      return diffDays >= 0 && diffDays <= 7; 
    } else if (selectedFrequency === '30') {
      return diffDays >= 0 && diffDays <= 30;
    } else if (selectedFrequency === '365') {
      return diffDays >= 0 && diffDays <= 365;
    } else {
      return true;
    }
  });

  return (
    <div>
      <div className='flex justify-center items-center'>
        <TableSummary expenses={filteredExpensesByFrequency} />
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
            <option value="Income">Income</option>
          </select>
        </div>
        <div className='flex flex-col text-sm '>
          <p>Frequency</p>
          <select className='border-2 border-slate-400 rounded-md  text-black px-2' onChange={handleFrequencyChange} value={selectedFrequency}>
            <option value="1">Today</option>
            <option value="7">Week</option>
            <option value="30">Month</option>
            <option value="365">Year</option>
          </select>
        </div>
      </div>

      <div className='flex justify-between w-[85vw]'>
        <div className='w-[60vw] mt-10'>
          <h2 className='text-4xl text-center my-5'>Recent Transactions</h2>
          {selected === 'table' &&
            <div className='overflow-x-auto'>
              <table className='w-full max-h-fit'>
                <thead className='text-md md:text-lg'>
                  <tr>
                    <th>Index</th>
                    <th className='hidden md:table-cell'>Date</th>
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
            </div>
          }
          {selected === 'chart' &&
            <div className='flex flex-wrap justify-center'>
              {filteredExpensesByFrequency && filteredExpensesByFrequency.map((item) => (
                <Graph onDelete={handleDataChange}
                  key={item._id}
                  expense={item}
                  index={filteredExpensesByFrequency.indexOf(item)}
                  total={total} />
              ))}
            </div>
          }
        </div>
        <div className='w-[20vw]'>
          <AddExpense onAdd={handleDataChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
