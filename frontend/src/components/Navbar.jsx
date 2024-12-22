import React, { useReducer } from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    //     const [state,dispatch] = useReducer(useReducer,{})
    return (
        <header>
            <nav className='flex justify-between items-center'>
                <Link to='/'>
                    <div>
                        <h2 className='text-3xl font-bold'>
                            Money Map
                        </h2>
                        <p className='text-xs'>Your Expense Management Assistant</p>
                    </div>
                </Link>
                <div class="flex space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                        Login
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                        Signup
                    </button>
                </div>

            </nav>

        </header>
    )
}

export default Navbar
