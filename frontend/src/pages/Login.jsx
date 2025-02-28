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
    // console.log(error);
    return (
        <div className='w-[80vw] md:w-[50vw] lg:w-[35vw] h-fit m-auto rounded-md shadow-md p-4 mt-8 flex justify-center'>
            <form
                className='flex flex-col px-4 rounded-md shadow-md shadow-blue-50'
                onSubmit={handleSubmit}>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-center underline mb-2'>Login to MoneyMap</h1>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-lg md:text-xl lg:text-2xl mb-1'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='p-1 border text-center rounded'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor='password' className='text-lg md:text-xl lg:text-2xl mb-1 mt-2'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className='p-1 border rounded text-black text-md'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className='p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600'
                    disabled={loading}
                >
                    Login
                </button>
                <p className='mx-auto text-sm md:text-base lg:text-lg mt-2'>Need an account? <Link to='/signup'><span className='underline hover:text-blue-400'>SIGN UP</span></Link></p>
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </form>
        </div>
    )
}

export default Login;