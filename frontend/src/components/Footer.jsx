import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-white p-4">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;