import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';
import { buildApiUrl } from '../hooks/api';
import { CATEGORY_OPTIONS, TYPE_OPTIONS } from '../constants/expenseOptions';

const inputStyles = 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/30';

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

    if (Number.isNaN(formattedDate.getTime()) || formattedDate > new Date()) {
      setError('Date must be valid and not in the future.');
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
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-slate-400">
        <div className="glass-panel-soft mx-auto w-full max-w-lg rounded-2xl px-6 py-10">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-500">Loading</p>
          <p className="mt-4 text-lg text-white">Fetching transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Refine</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Edit transaction</h1>
        <p className="text-sm text-slate-400">Update the details so your trends stay accurate.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="glass-panel space-y-6 px-6 py-8">
        {error && <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Title</label>
          <input type="text" className={inputStyles} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Amount</label>
            <input type="number" className={inputStyles} value={amount} onChange={(e) => setAmount(e.target.value)} />
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
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Date (dd-mm-yyyy)</label>
            <input type="text" className={inputStyles} value={date} onChange={(e) => setDate(e.target.value)} />
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

        <button disabled={saving} className="primary-btn w-full text-sm">
          {saving ? 'Updating...' : 'Update transaction'}
        </button>
      </form>
    </section>
  );
};

export default EditExpense;
