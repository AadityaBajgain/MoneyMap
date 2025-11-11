import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/UseLogout';
import money from '../assets/money.png';
import { useAuthContext } from '../hooks/UseAuthContext';



const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => logout();

    return (
        <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-900/60 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link to='/' className="flex items-center gap-3">
                    <div className="relative">
                        <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-500/60 to-emerald-400/50 blur-lg" />
                        <img className="relative h-10 w-10" src={money} alt="MoneyMap logo" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-wide text-white md:text-2xl">
                            MoneyMap
                        </h1>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Finance OS</p>
                    </div>
                </Link>

        

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200 md:inline-flex">
                                {user.email}
                            </span>
                            <button
                                onClick={handleClick}
                                className="rounded-full border border-rose-400/40 px-4 py-1.5 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to='/login' className="rounded-full border border-white/10 px-4 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-white/40">
                                Login
                            </Link>
                            <Link to='/signup' className="rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-lg shadow-violet-500/30">
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
