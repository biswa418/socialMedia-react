import React from 'react'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom';

const FriendList = () => {
    const auth = useAuth();
    const { friendships = [] } = auth.user;

    return (
        <div className='w-1/3 md:w-2/12 min-w-max border h-max max-h-80 overflow-y-scroll border-teal-500 box-border rounded-md mt-[20px] bg-slate-100 p-2 md:p-4 me-4'>
            <div className='text-sm md:text-lg'>Friends</div>

            {
                friendships && friendships.length === 0 && (
                    <div>No friends found!</div>
                )
            }

            {
                friendships && friendships.map(friend =>
                    <div className='mt-2 hover:bg-slate-200 rounded md:p-1' key={`friend-${friend._id}`}>
                        <Link className='flex items-center' to={`/users/${friend.to_user._id}`}>
                            <div className='md:w-9 w-5'>
                                <img src='../man.png' alt='friend-dp' />
                            </div>

                            <div className='text-slate-500 text-xs md:text-sm md:ms-2'>
                                {friend.to_user.email}
                            </div>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default FriendList