import React from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/UseLogout';
import money from '../assets/money.png'
import { useAuthContext } from '../hooks/UseAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = () => {
        logout();
    }

    return (
        <header className='p-4'>
            <nav className='flex justify-between items-center'>
                <Link to='/'>
                    <div>
                        <div className='flex items-end space-x-2'>
                            <h2 className="text-2xl font-bold font- bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-transparent bg-clip-text md:text-4xl">
                                MoneyMap
                            </h2>
                            <img className="h-[2rem]" src={money} />
                        </div>
                        <p className='text-[0.5rem] md:text-xs'>Your Expense Management Assistant</p>
                    </div>
                </Link>
                <div>
                    {user ? (<div className="mb-4">
                        <span className='mr-3'>{user.email}</span>
                        <button
                            onClick={handleClick}
                            className="bg-red-500 hover:bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 w-[4rem] text-[0.8rem] md:px-3 md:w-[5rem]"
                        >
                            Log out
                        </button></div>

                    ): (
                            <div className="flex space-x-4 mb-4">
                                <Link to='/login'>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 w-[3rem] text-[0.8rem] md:px-3 md:w-[4rem]">
                                        Login
                                    </button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 w-[3rem] text-[0.8rem] md:px-3 md:w-[4rem]">
                                        Signup
                                    </button>
                                </Link>
                            </div>
                        )}
                </div>
            </nav>
            <div className="bg-slate-400 h-[0.01rem] "></div>
        </header>
    )
}

export default Navbar
