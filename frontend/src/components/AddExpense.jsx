import React, { useState } from 'react';
import "./AddExpense.css";

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState();
  const [type, setType] = useState('All');
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(date)) {
      setError("Date must be in the format dd-mm-yyyy.");
      return;
    }

    const response = await fetch('http://localhost:3001/api/expense', {
      method: 'POST',
      body: JSON.stringify({ title, amount, date, category, type }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle('');
      setAmount(0);
      setCategory('All');
      setDate('');
      setType('All');
    }
    onAdd();
  };

  return (
    <form
      className='w-[30vw] border-2 border-slate-400 rounded-md p-4 text-center'
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
        <button>Submit</button>
      </div>
    </form>
  );
};

export default AddExpense;
