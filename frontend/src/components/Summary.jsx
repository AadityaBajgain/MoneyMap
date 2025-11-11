import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const TableSummary = ({ expenses = [] }) => {
    const { total, expenseAmount, incomeAmount, data, difference } = useMemo(() => {
        const expenseValues = expenses.filter((expense) => expense.category === 'Expense').map((expense) => expense.amount);
        const incomeValues = expenses.filter((expense) => expense.category === 'Income').map((expense) => expense.amount);
        const expenseAmount = expenseValues.reduce((acc, value) => acc + value, 0);
        const incomeAmount = incomeValues.reduce((acc, value) => acc + value, 0);
        const total = incomeAmount + expenseAmount;
        const difference = incomeAmount - expenseAmount;

        const data = {
            labels: ['Income', 'Expense'],
            datasets: [
                {
                    label: 'Amount',
                    data: [incomeAmount || 0.01, expenseAmount || 0.01],
                    backgroundColor: ['rgba(34,197,94,0.4)', 'rgba(248,113,113,0.35)'],
                    borderColor: ['rgba(34,197,94,1)', 'rgba(248,113,113,1)'],
                    borderWidth: 1,
                },
            ],
        };

        return { total, expenseAmount, incomeAmount, data, difference };
    }, [expenses]);

    const hasData = expenses.length > 0;
    const savingsIsPositive = difference >= 0;

    return (
        <div className="glass-panel w-full px-6 py-8 text-slate-200">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Transaction summary</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Monitor how money moves across your accounts and stay in front of spending trends.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Income</p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-300">
                                {currencyFormatter.format(incomeAmount)}
                            </p>
                            <p className="text-xs text-slate-500">This period</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Expense</p>
                            <p className="mt-2 text-2xl font-semibold text-rose-300">
                                {currencyFormatter.format(expenseAmount)}
                            </p>
                            <p className="text-xs text-slate-500">This period</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/40 to-emerald-400/30 p-4">
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-100">Net flow</p>
                            <p className={`mt-2 text-2xl font-semibold ${savingsIsPositive ? 'text-emerald-200' : 'text-rose-200'}`}>
                                {currencyFormatter.format(difference)}
                            </p>
                            <p className="text-xs text-slate-100">
                                {savingsIsPositive ? 'You are saving' : 'You are overspending'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    {hasData ? (
                        <Pie
                            data={data}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            color: '#cbd5f5',
                                            usePointStyle: true,
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-500">
                            <p>No data yet</p>
                            <p className="text-xs">Add your first transaction to unlock insights.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableSummary;
