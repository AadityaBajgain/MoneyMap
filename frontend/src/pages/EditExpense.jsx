import React, { useState } from 'react';
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
      <h1 className='text-4xl text-center mt-5 mb-0'>Edit Expense</h1>
      <form
        className='w-[50vw] border-2 border-slate-400 rounded-md p-4 text-center mt-[2rem]'
        onSubmit={handleFormSubmit}
      >
        <h2 className='text-xl text-blue-300'>Add new Expense</h2>
        <div className='flex flex-col'>
          {error && <p className='text-red-500'>{error}</p>}
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label>Amount:</label>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value='Expense'>Expense</option>
            <option value='Credit'>Credit</option>
          </select>
          <label>Date *(dd-mm-yyyy)</label>
          <input
            type="text"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
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
              <button>Submit</button> : <button disabled>Submit</button>
          }
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
