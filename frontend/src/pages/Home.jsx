import React, { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from "../hooks/UseAuthContext";
import { buildApiUrl } from '../hooks/api';
import ExpenditureDetails from '../components/ExpenditureDetails';
import Graph from '../components/Graph';
import AddExpense from '../components/AddExpense';
import TableSummary from '../components/Summary';

const filterByDateRange = (expenses, selectedFrequency) => {
  if (!expenses) return [];
  return expenses.filter((expense) => {
    if (!expense.date) return false;
    const [day, month, year] = expense.date.split('-').map(Number);
    const expenseDate = new Date(year, month - 1, day);
    if (Number.isNaN(expenseDate.getTime())) return false;

    const today = new Date();
    const diffTime = today - expenseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    switch (selectedFrequency) {
      case '1':
        return diffDays === 0;
      case '7':
        return diffDays >= 0 && diffDays <= 7;
      case '30':
        return diffDays >= 0 && diffDays <= 30;
      case '365':
        return diffDays >= 0 && diffDays <= 365;
      default:
        return true;
    }
  });
};

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [selected, setSelected] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFrequency, setSelectedFrequency] = useState('30');
  const [dataChanged, setDataChanged] = useState(false);
  const [total, setTotal] = useState(0);
  const [fetchError, setFetchError] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const response = await fetch(buildApiUrl('/api/expense'), {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json().catch(() => ({}));

        if (!response.ok) {
          setFetchError(json.error || 'Failed to load expenses.');
          setExpenses([]);
          setTotal(0);
          return;
        }

        setFetchError('');
        setExpenses(json);
        setTotal(json.reduce((acc, expense) => acc + expense.amount, 0));
      } catch (error) {
        setFetchError('Unable to fetch expenses. Please try again.');
      }
    };
    fetchData();
  }, [dataChanged, user]);

  const handleFilters = (expenses) => {
    if (!expenses) return [];
    return expenses.filter((expense) => selectedCategory === 'All' || expense.category === selectedCategory);
  };

  const filteredExpenses = handleFilters(expenses);
  const filteredExpensesByFrequency = filterByDateRange(filteredExpenses, selectedFrequency);

  const metrics = useMemo(() => {
    const income = expenses.filter((item) => item.category === 'Income').reduce((sum, item) => sum + item.amount, 0);
    const expenseTotal = expenses.filter((item) => item.category === 'Expense').reduce((sum, item) => sum + item.amount, 0);
    return {
      transactions: expenses.length,
      income,
      expenseTotal,
      net: income - expenseTotal,
    };
  }, [expenses]);

  const handleDataChange = () => setDataChanged((prev) => !prev);

  const selectClasses = 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 focus:border-violet-400 focus:outline-none';

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {fetchError && (
        <div className='glass-panel-soft border border-rose-500/40 px-6 py-3 text-center text-sm text-rose-200'>
          {fetchError}
        </div>
      )}

      <section id="overview" className="glass-panel px-6 py-8 text-slate-200">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Welcome back</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Your calm finance cockpit</h1>
            <p className="text-sm text-slate-400">
              {user?.email ? `${user.email} · ` : ''}Stay aligned with every rupee you earn and spend.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Net balance</p>
            <p className={`text-2xl font-semibold ${metrics.net >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              ${metrics.net.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Transactions</p>
            <p className="mt-2 text-2xl font-semibold text-white">{metrics.transactions}</p>
            <p className="text-xs text-slate-500">this workspace</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Income</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">${metrics.income.toFixed(2)}</p>
            <p className="text-xs text-slate-500">recorded</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Expense</p>
            <p className="mt-2 text-2xl font-semibold text-rose-300">${metrics.expenseTotal.toFixed(2)}</p>
            <p className="text-xs text-slate-500">recorded</p>
          </div>
        </div>
      </section>

      <section id="insights" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <TableSummary expenses={filteredExpensesByFrequency} />
        <div id="add-transaction" className="flex justify-center">
          <AddExpense onAdd={handleDataChange} />
        </div>
      </section>

      <section id="transactions" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Transactions</p>
            <h2 className="text-2xl font-semibold text-white">Activity feed</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="pill-toggle">
              <button
                className={selected === 'table' ? 'bg-slate-700 text-black shadow-lg' : ''}
                onClick={() => setSelected('table')}
                type="button"
              >
                Table
              </button>
              <button
                className={selected === 'chart' ? 'bg-slate-700 text-slate-900 shadow-lg' : ''}
                onClick={() => setSelected('chart')}
                type="button"
              >
                Cards
              </button>
            </div>
            <select className={selectClasses} onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
              <option value="All">All categories</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            <select className={selectClasses} onChange={(e) => setSelectedFrequency(e.target.value)} value={selectedFrequency}>
              <option value="1">Today</option>
              <option value="7">Week</option>
              <option value="30">Month</option>
              <option value="365">Year</option>
            </select>
          </div>
        </div>

        {selected === 'table' ? (
          <div className="glass-panel-soft overflow-hidden rounded-3xl">
            <div className="soft-scrollbar overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  <tr>
                    <th className="py-4 pl-4">#</th>
                    <th className="hidden py-4 md:table-cell">Date</th>
                    <th className="py-4">Title</th>
                    <th className="py-4 text-center">Amount</th>
                    <th className="hidden py-4 text-center lg:table-cell">Category</th>
                    <th className="hidden py-4 text-center lg:table-cell">Type</th>
                    <th className="py-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpensesByFrequency.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-6 text-center text-sm text-slate-500">
                        No entries match your filters.
                      </td>
                    </tr>
                  )}
                  {filteredExpensesByFrequency.map((item, idx) => (
                    <ExpenditureDetails
                      onDelete={handleDataChange}
                      key={item._id}
                      expense={item}
                      index={idx + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredExpensesByFrequency.length === 0 && (
              <div className="glass-panel-soft p-6 text-center text-sm text-slate-500">
                No cards yet — add a transaction to visualise.
              </div>
            )}
            {filteredExpensesByFrequency.map((item) => (
              <Graph
                onDelete={handleDataChange}
                key={item._id}
                expense={item}
                total={total}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
