import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadId = toast.loading('Signing up..');
        setLoggedIn(true);

        const response = await auth.signup(email, name, password, confirmPassword);

        if (response.success) {
            toast.success('Successfully signed up');

            setTimeout(() => {
                navigate('/login');
            }, 2200);

        } else {
            toast.error(`${response.message}`)
        }

        setEmail('');
        setName('');
        setPassword('');
        setconfirmPassword('');
        setLoggedIn(false);

        toast.dismiss(loadId);
    }

    return (
        <form className='w-5/6 my-8 mx-auto flex flex-col md:flex-row' onSubmit={handleSubmit}>
            <img className='w-full md:w-6/12' src='./sign.png' alt='login' />

            <div className='md:px-8 w-full flex flex-col justify-center'>
                <h2 className='md:text-2xl text-blue-400 font-bold'>New Dev? Sign Up!</h2>

                <div className='w-full my-2'>
                    <input className='w-full md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>

                <div className='w-full my-2'>
                    <input className='w-full md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>

                <div className='my-2'>
                    <input className='w-full md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <div className='my-2'>
                    <input className='w-full md:w-5/6 text-slate-500 outline-gray-300 text-lg p-2 rounded-md'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        required />
                </div>

                <button className='bg-purple-500 mt-2 text-white p-2 rounded-md md:w-5/6'
                    disabled={loggedIn}>
                    {loggedIn ? 'Signing Up . . .' : 'Sign Up'}
                </button>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </form>
    )
}

export default Signup