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
                            Expense Tracker
                        </h2>
                        <p className='text-xs'>Your Expense Management Assistant</p>
                    </div>
                </Link>
                <div className='text-sm '>
                    <span className="m-2">Login</span>
                    <span>Signup</span>
                </div>
            </nav>
            <div className='h-[0.1rem] w-full bg-slate-200'></div>
        </header>
    )
}

export default Navbar
