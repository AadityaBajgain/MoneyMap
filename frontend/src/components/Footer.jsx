import React from 'react';

const Footer = () => {
    return (
        <footer className=" text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm md:text-base text-gray-400">
                    &copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">Money Map</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
