import React from 'react'
import { Link } from 'react-router-dom';

import money from '../assets/money.png'
const Navbar = () => {
    //     const [state,dispatch] = useReducer(useReducer,{})
    return (
        <header className='top-0 left-0 right-0 z-1 shadow-md p-4 bg-transparent'>
            <nav className='flex justify-between items-center'>
                <Link to='/'>
                    <div>
                        <div className='flex items-end space-x-2'>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-transparent bg-clip-text">
                                Money Map
                            </h2>
                            <img className="h-[2rem]" src={money} />
                        </div>
                        <p className='text-xs'>Your Expense Management Assistant</p>
                    </div>
                </Link>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                        Login
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                        Signup
                    </button>
                </div>

            </nav>
            <div className="bg-slate-400 h-[0.01rem] "></div>
        </header>
    )
}

export default Navbar
