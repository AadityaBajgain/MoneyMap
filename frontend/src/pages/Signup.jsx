import React, { useState } from 'react';
import { useSignup } from '../hooks/UseSignup';
import { Link } from 'react-router-dom';

const inputStyles = 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/30';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="glass-panel-soft mb-8 grid gap-10 p-8 lg:grid-cols-2">
                <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Get started</p>
                    <h1 className="text-3xl font-semibold text-white md:text-4xl">Create your MoneyMap space</h1>
                    <p className="text-sm text-slate-400">
                        Build an elegant view of your financial life. Track income streams, spending rituals, and patterns that matter.
                    </p>
                    <ul className="list-disc space-y-1 pl-4 text-sm text-slate-400">
                        <li>Unlimited transactions</li>
                        <li>Instant insights and charts</li>
                        <li>Secure, JWT-based access</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel space-y-4 px-6 py-8">
                    <div className="space-y-1 text-center">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Sign up</p>
                        <h2 className="text-2xl font-semibold text-white">Start free today</h2>
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
                            placeholder="Minimum 8 characters"
                        />
                    </div>
                    <button type='submit' className='primary-btn w-full text-sm' disabled={loading}>
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                    <p className='text-center text-xs text-slate-400'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-violet-300 underline underline-offset-4'>Log in</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Signup;
