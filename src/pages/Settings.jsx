import React, { useState } from 'react'
import { useAuth } from '../hooks';
import { Toaster } from 'react-hot-toast';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = useAuth();

    return (
        <form className='w-5/6 rounded-md md:w-1/3 border-2 p-5  my-8 mx-auto flex flex-col bg-slate-100 md:flex-row' onSubmit={() => console.log('submitted')}>
            <div className='md:px-8 w-full flex flex-col items-center justify-center'>
                <img className='w-1/4 md:w-1/2' src='./man.png' alt='login' />

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Email</div>
                    <p className='w-full md:w-5/6 text-slate-600 text-lg'
                    >{auth.user.email}
                    </p>
                </div>

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Name</div>
                    <p className='w-full md:w-5/6 text-slate-600 text-lg'
                    >{auth.user.name}
                    </p>
                </div>

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Password</div>
                    <input className='w-full text-slate-600 outline-gray-300 text-lg p-2 rounded-md'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Confirm Password</div>
                    <input className='w-full text-slate-600 outline-gray-300 text-lg p-2 rounded-md'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        required />
                </div>

                <div className='w-full mt-2'>
                    <button className='bg-purple-500 my-4 w-full mt-2 text-white p-2 rounded-md'
                        disabled={loggedIn}>
                        {loggedIn ? 'Updating . . .' : 'Update profile'}
                    </button>
                </div>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </form >
    )
}

export default Settings