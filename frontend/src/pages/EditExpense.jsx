import React, { useState, useEffect } from 'react';
import "./EditExpense.css";
import { useNavigate, useParams } from 'react-router-dom';

const EditExpense = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await fetch(`http://localhost:3001/api/expense/${id}`);
      if (response.ok) {
        const expense = await response.json();
        setTitle(expense.title);
        setDate(expense.date);
        setAmount(expense.amount);
        setCategory(expense.category);
        setType(expense.type);
      } else {
        setError("Failed to fetch expense details.");
      }
    };

    fetchExpense();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(date)) {
      setError("Date must be in the format dd-mm-yyyy.");
      return;
    }

    const [day, month, year] = date.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day);

    if (isNaN(formattedDate.getTime())) {
      setError("Invalid date provided.");
      return;
    }

    if (formattedDate > new Date()) {
      setError("Date cannot be in the future.");
      return;
    }

    const response = await fetch(`http://localhost:3001/api/expense/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, amount, date, category, type }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      setError("Failed to save expense. Please try again.");
      return;
    }
    setError("");
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setType("");
    navigate('/');
  };

  return (
    <div>
      <form
        className='w-[90vw] md:w-[50vw] h-fit border-2 border-slate-400 rounded-md p-4 text-center mt-[2rem]'
        onSubmit={handleFormSubmit}
      >
        <h1 className='text-[2rem] md:text-[4rem] text-blue-300'>Edit Expense</h1>
        <div className='flex flex-col'>
          {error && <p className='text-red-500'>{error}</p>}
          <label className='text-sm md:text-base'>Title</label>
          <input
            type="text"
            className='w-full md:w-auto text-sm md:text-base'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label className='text-sm md:text-base'>Amount:</label>
          <input
            type="number"
            className='w-full md:w-auto text-sm md:text-base'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <label className='text-sm md:text-base'>Category</label>
          <select
            className='w-full md:w-auto text-sm md:text-base'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value='Expense'>Expense</option>
            <option value='Income'>Income</option>
          </select>
          <label className='text-sm md:text-base'>Date *(dd-mm-yyyy)</label>
          <input
            type="text"
            className='w-full md:w-auto text-sm md:text-base'
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <label className='text-sm md:text-base'>Type</label>
          <select
            className='w-full md:w-auto text-sm md:text-base'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Rent</option>
            <option>Education</option>
            <option>Other</option>
          </select>
          {
            (title && amount && date && category && type) ?
              <button className='w-full md:w-auto text-sm md:text-base'>Submit</button> : <button className='w-full md:w-auto text-sm md:text-base' disabled>Submit</button>
          }
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
