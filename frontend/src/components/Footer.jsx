import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-slate-900/30">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-400 md:flex-row">
                <p>
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-200">MoneyMap</span>. Designed for clarity and calm finances.
                </p>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>Privacy</span>
                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                    <span>Support</span>
                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                    <span>Releases</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
