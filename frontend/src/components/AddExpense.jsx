import React, { useState } from 'react';
import {useAuthContext} from "../hooks/UseAuthContext";
import "./AddExpense.css";

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [error, setError] = useState('');
  const {user} = useAuthContext();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user){
      setError("Please login to add an expense.");
      return;
    }
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(date)) {
      setError("Date must be in the format dd-mm-yyyy.");
      return;
    }
  
    const [day, month, year] = date.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day); // Months are 0-based in JS Date
    
    if (isNaN(formattedDate.getTime())) {
      setError("Invalid date provided.");
      return;
    }
  
    if (formattedDate > new Date()) {
      setError("Date cannot be in the future.");
      return;
    }
  
    // Proceed with the API request
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expense`, {
      method: 'POST',
      body: JSON.stringify({ title, amount, date, category, type }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.token}`
      },
    });
  
    if (!response.ok) {
      setError("Failed to save expense. Please try again.");
      return;
    }
  
    // Reset form and errors
    setError("");
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setType("");
    onAdd();
  };
  

  return (
    <form
      className='w-[30vw] h-fit border-2 border-slate-400 rounded-md p-4 text-center mt-[8rem]'
      onSubmit={handleFormSubmit}
    >
      <h2 className='text-blue-300 text-md md:text-xl '>Add new Expense</h2>
      <div className='flex flex-col'>
        {error && <p className='text-red-500'>{error}</p>}
        <label className='text-sm md:text-md'>Title</label>
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
          <option value='Income'>Income</option>
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
          <button>Submit</button>:<button disabled>Submit</button>
        }
       
      </div>
    </form>
  );
};

export default AddExpense;
