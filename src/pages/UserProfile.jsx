import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../api';
import { Loader } from '../components';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const auth = useAuth();
    const nav = useNavigate();

    if (!auth.user) {
        setTimeout(() => toast.error(`You have to login to see the details.`), 500);
        return <Navigate to='/login' />
    }

    useEffect(() => {
        if (!auth.user) {
            setTimeout(() => toast.error(`You have to login to see the details.`), 500);
            return nav('/login')
        }

        const getUser = async () => {
            const response = await getUserDetails(userId);

            if (response.success) {
                setUser(response.data.user);
            } else {
                toast.error(`${response.message}`);
                return nav('/');
            }

            setLoading(false);
        }

        getUser();
    }, [userId, auth.user]);

    const checkIfFriend = () => {
        const friends = auth.user.friendships;

        if (friends) {
            const friendList = friends.map(friend => friend.to_user._id);

            if (friendList.indexOf(userId) > -1) {
                return true;
            }
        }

        return false;
    }

    const checkFriend = checkIfFriend();

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-5/6 rounded-md md:w-1/3 border-2 p-5  my-8 mx-auto flex flex-col bg-slate-100 md:flex-row' onSubmit={() => { }}>
            <div className='md:px-8 w-full flex flex-col items-center justify-center'>
                <img className='w-1/4 md:w-1/2' src='../man.png' alt='login' />

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Email</div>
                    <p className='w-full md:w-5/6 text-slate-600 text-lg'
                    >{user?.email}
                    </p>
                </div>

                <div className='w-full mt-2'>
                    <div className='text-slate-400'>Name</div>
                    <p className='w-full md:w-5/6 text-slate-600 text-lg'>
                        {user?.name}
                    </p>
                </div>

                <div className='w-full mt-2 flex flex-col items-end'>
                    {
                        checkFriend ?
                            (<button className='bg-cyan-500 w-full mb-2 text-white p-2 rounded-md'>
                                Remove friend
                            </button>)
                            : (
                                <button className='bg-cyan-500 my-4 w-full mt-2 text-white p-2 rounded-md'>
                                    Add friend
                                </button>
                            )
                    }
                </div>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div >
    )
}

export default UserProfile