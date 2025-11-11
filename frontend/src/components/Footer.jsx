import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-slate-900/30">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-400 md:flex-row">
                <p>
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-200">MoneyMap</span>. Your finance tracking wizz..
                </p>
            </div>
        </footer>
    );
};

export default Footer;
