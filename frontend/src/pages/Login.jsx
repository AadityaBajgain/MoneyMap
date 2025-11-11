import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/UseLogin';

const inputStyles = 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300/30';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="glass-panel-soft mb-8 grid gap-10 p-8 lg:grid-cols-2">
                <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">MoneyMap OS</p>
                    <h1 className="text-3xl font-semibold text-white md:text-4xl">A calmer way to track money</h1>
                    <p className="text-sm text-slate-400">
                        Login to sync expenses, review insights, and keep your cash flow decisions intentional.
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                        “MoneyMap made budgeting feel luxurious instead of stressful.” – power user
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel space-y-4 px-6 py-8">
                    <div className="space-y-1 text-center">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Login</p>
                        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                    </div>

                    {error && <p className="text-center text-sm text-rose-300">{error}</p>}

                    <div className="space-y-3">
                        <label htmlFor='email' className='text-xs uppercase tracking-[0.3em] text-slate-400'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className={inputStyles}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            placeholder="you@email.com"
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor='password' className='text-xs uppercase tracking-[0.3em] text-slate-400'>Password</label>
                        <input
                            type='password'
                            id='password'
                            className={inputStyles}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type='submit'
                        className='primary-btn w-full text-sm'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Enter workspace'}
                    </button>
                    <p className='text-center text-xs text-slate-400'>
                        Need an account? {' '}
                        <Link to='/signup' className='text-emerald-300 underline underline-offset-4'>Sign up</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
