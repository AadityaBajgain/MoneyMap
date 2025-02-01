import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/UseLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className='w-[90vw] md:w-[60vw] lg:w-[40vw] h-fit m-auto rounded-md shadow-md p-4 mt-8 flex justify-center'>
            <form
                className='flex flex-col px-4 rounded-md shadow-md shadow-blue-50'
                onSubmit={handleSubmit}>
                <h1 className='text-4xl text-center underline mb-2'>Login to MoneyMap</h1>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-[1.5rem]'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='p-2 border text-center rounded'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor='password' className='text-[1.5rem]'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='p-2 border rounded text-black text-md'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    disabled={loading}
                >
                    Login
                </button>
                <p className='mx-auto'>Need an account? <Link to='/signup'><span className='underline hover:text-blue-400'>SIGN UP</span></Link></p>
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </form>
        </div>
    )
}

export default Login;