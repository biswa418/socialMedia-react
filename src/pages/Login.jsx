import React from 'react'
import { Toaster } from 'react-hot-toast'

const Login = () => {
    return (
        <form className='w-5/6 my-8 mx-auto flex flex-col md:flex-row'>
            <img className='w-full md:w-1/2' src='./login.png' alt='login' />

            <div className='md:px-8 w-full flex flex-col justify-center'>
                <h2 className='md:text-2xl text-blue-400 font-bold'>Hi Dev, Sign in!</h2>

                <div className='w-full my-2'>
                    <input className='w-full text-slate-500 outline-gray-300 text-lg p-2 rounded-md' type='email' placeholder='Email' required />
                </div>

                <div className='my-2'>
                    <input className='w-full text-slate-500 outline-gray-300 text-lg p-2 rounded-md' type='password' placeholder='Password' required />
                </div>

                <button className='bg-purple-500 mt-2 text-white p-2 rounded-md'>
                    Log in
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