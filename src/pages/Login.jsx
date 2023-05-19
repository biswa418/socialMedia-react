import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggedIn(true);
        const loadId = toast.loading('Loggin in..');

        const response = await auth.login(email, password);

        if (response.success) {
            toast.success('Successfully logged in', {
            });
        } else {
            toast.error(`${response.message}`)
        }

        toast.dismiss(loadId);
        setLoggedIn(false);
    }

    return (
        <form className='w-5/6 my-8 mx-auto flex flex-col md:flex-row' onSubmit={handleSubmit}>
            <img className='w-full md:w-1/2' src='./login.png' alt='login' />

            <div className='md:px-8 w-full flex flex-col justify-center'>
                <h2 className='md:text-2xl text-blue-400 font-bold'>Hi Dev, Sign in!</h2>

                <div className='w-full my-2'>
                    <input className='w-full  md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>

                <div className='my-2'>
                    <input className='w-full  md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <button className='bg-purple-500  md:w-5/6 mt-2 text-white p-2 rounded-md'
                    disabled={loggedIn}>
                    {loggedIn ? 'Signing In . . .' : 'Sign in'}
                </button>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </form>
    )
}

export default Login