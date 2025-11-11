import React, { useState } from 'react';
import { useAuthContext } from '../hooks/UseAuthContext';
import { buildApiUrl } from '../hooks/api';
import { CATEGORY_OPTIONS, TYPE_OPTIONS } from '../constants/expenseOptions';

const inputStyles = 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300/30';

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [type, setType] = useState(TYPE_OPTIONS[0]);
  const [error, setError] = useState('');
  const { user } = useAuthContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to add an expense.');
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

    if (Number.isNaN(formattedDate.getTime()) || formattedDate > new Date()) {
      setError('Date must be valid and not in the future.');
      return;
    }

    try {
      const response = await fetch(buildApiUrl('/api/expense'), {
        method: 'POST',
        body: JSON.stringify({ title, amount: parsedAmount, date, category, type }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Failed to save expense. Please try again.');
        return;
      }

      setError('');
      setTitle('');
      setAmount('');
      setDate('');
      setCategory(CATEGORY_OPTIONS[0]);
      setType(TYPE_OPTIONS[0]);
      onAdd?.();
    } catch (err) {
      setError('Unable to reach the server. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="glass-panel w-full max-w-md space-y-5 px-6 py-6 text-left">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">New Entry</p>
        <h3 className="text-xl font-semibold text-white">Add transaction</h3>
        <p className="text-xs text-slate-400">Capture an expense or income in seconds.</p>
      </div>

      {error && <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200">{error}</p>}

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Title</label>
        <input type="text" className={inputStyles} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grocery run" />
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Amount</label>
        <input type="number" className={inputStyles} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="120.00" />
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Category</label>
        <select className={`${inputStyles} bg-slate-900/40`} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Date (dd-mm-yyyy)</label>
          <input type="text" className={inputStyles} value={date} onChange={(e) => setDate(e.target.value)} placeholder="12-05-2024" />
        </div>
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Type</label>
          <select className={`${inputStyles} bg-slate-900/40`} value={type} onChange={(e) => setType(e.target.value)}>
            {TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button disabled={!(title && amount && date && category && type)} className="primary-btn w-full text-center text-sm">
        Save transaction
      </button>
    </form>
  );
};

export default AddExpense;
