import React, { useState } from 'react'
import { useAuth } from '../hooks';
import { Toaster, toast } from 'react-hot-toast';

const Settings = () => {
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState(auth.user.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [updateIn, setupdateIn] = useState(false);
    const [editMode, seteditMode] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        setupdateIn(true);

        const response = await auth.updateUser(
            auth.user._id,
            name,
            password,
            confirmPassword
        );

        if (response.success) {
            seteditMode(false);
            setupdateIn(false);

            setPassword('');
            setconfirmPassword('');

            return toast.success('User updated successfully');
        } else {
            toast.error(`${response.message}`);
        }

        setupdateIn(false);
    }

    return (
        <form className='w-5/6 rounded-md md:w-1/3 border-2 p-5  my-8 mx-auto flex flex-col bg-slate-100 md:flex-row' onSubmit={updateProfile}>
            <div className='md:px-8 w-full flex flex-col items-center justify-center'>
                <img className='w-1/4 md:w-1/2' src='./man.png' alt='login' />

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Email</div>
                    <p className='w-full md:w-5/6 text-slate-600 text-lg'
                    >{auth.user?.email}
                    </p>
                </div>

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Name</div>
                    {
                        !editMode ?
                            <p className='w-full md:w-5/6 text-slate-600 text-lg'>
                                {auth.user?.name}
                            </p>
                            :

                            <input className='w-full text-slate-600 outline-gray-300 text-lg p-2 rounded-md'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                    }
                </div>

                {
                    editMode &&
                    <>
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
                    </>
                }

                <div className='w-full mt-2 flex flex-col items-end'>
                    {
                        editMode ? (
                            <>
                                <button className='bg-purple-500 my-4 w-full mt-2 text-white p-2 rounded-md'
                                    disabled={updateIn}>
                                    {updateIn ? 'Updating . . .' : 'Update profile'}
                                </button>

                                <button className='text-purple-500 mb-4  p-2 rounded-md'
                                    disabled={updateIn}
                                    onClick={() => seteditMode(false)}>
                                    Go back
                                </button>
                            </>
                        )
                            : (
                                <button className='bg-purple-500 my-4 w-full mt-2 text-white p-2 rounded-md'
                                    disabled={updateIn}
                                    onClick={(e) => { e.preventDefault(); seteditMode(true) }}>
                                    Edit Profile
                                </button>
                            )
                    }
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