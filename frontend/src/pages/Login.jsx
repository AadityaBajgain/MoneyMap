import React ,{useState} from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div className='w-[90vw] md:w-[60vw] lg:w-[40vw] h-fit m-auto rounded-md shadow-md p-4'>
            <h1 className='text-4xl text-center underline mb-6'>Login to MoneyMap</h1>
            <form 
                className='flex flex-col px-4 rounded-md shadow-md shadow-blue-50 text-justify'
                onSubmit={handleSubmit}>
                <label htmlFor='email' className='text-[1.5rem]'>Email</label>
                <input 
                    type='email' 
                    id='email' 
                    name='email' 
                    className='mt-[-3rem] p-2 border text-center rounded' 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email} 
                    required
                />
                <label htmlFor='password' className='mt-[-3rem] text-[1.5rem]'>Password</label>
                <input 
                    type='password' 
                    id='password' 
                    name='password' 
                    className='mt-[-3rem] p-2 border rounded text-black text-md' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                />
                <button type='submit' className='p-2 mt-[-2rem] bg-blue-500 text-white rounded hover:bg-blue-600'>Login</button>
            </form>
        </div>
    )
}

export default Login;