import React, { useEffect, useState } from 'react';
import './EditExpense.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';
import { buildApiUrl } from '../hooks/api';
import { CATEGORY_OPTIONS, TYPE_OPTIONS } from '../constants/expenseOptions';

const EditExpense = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [type, setType] = useState(TYPE_OPTIONS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchExpense = async () => {
      if (!user) {
        return;
      }
      setLoading(true);
      setError('');
      try {
        const response = await fetch(buildApiUrl(`/api/expense/${id}`), {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setError(data.error || 'Failed to fetch expense details.');
          return;
        }

        setTitle(data.title || '');
        setDate(data.date || '');
        setAmount(data.amount ?? '');
        setCategory(CATEGORY_OPTIONS.includes(data.category) ? data.category : CATEGORY_OPTIONS[0]);
        setType(TYPE_OPTIONS.includes(data.type) ? data.type : TYPE_OPTIONS[0]);
      } catch (err) {
        setError('Unable to fetch expense details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id, user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to edit expenses.');
      return;
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(date)) {
      setError('Date must be in the format dd-mm-yyyy.');
      return;
    }

    const [day, month, year] = date.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day);

    if (Number.isNaN(formattedDate.getTime())) {
      setError('Invalid date provided.');
      return;
    }

    if (formattedDate > new Date()) {
      setError('Date cannot be in the future.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(buildApiUrl(`/api/expense/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ title, amount: parsedAmount, date, category, type }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Failed to save expense. Please try again.');
        return;
      }
      setError('');
      navigate('/');
    } catch (err) {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full text-center mt-10'>
        <p>Loading expense...</p>
      </div>
    );
  }

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
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
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
            {TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {(title && amount && date && category && type) ? (
            <button className='w-full md:w-auto text-sm md:text-base' disabled={saving}>
              {saving ? 'Saving...' : 'Submit'}
            </button>
          ) : (
            <button className='w-full md:w-auto text-sm md:text-base' disabled>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
