// import PropTypes from 'prop-types';
import { Loader, FriendList, CreatePost } from "../components";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth, usePost } from "../hooks";

const Home = () => {
    const auth = useAuth();
    const posts = usePost();

    if (posts.loading) {
        return <Loader />
    }

    return (
        <div className='flex md:w-3/4 mx-auto'>
            <div className='w-9/12 mx-4'>
                {auth.user && <CreatePost />}
                {posts.data.map(post => {
                    return <div key={post._id} className='border border-purple-500 box-border rounded-md my-[20px] bg-slate-100'>
                        <div className='p-3'>
                            <div className='flex items-center px-3'>
                                <img
                                    className='h-[50px]'
                                    src="/man.png"
                                    alt="user-pic"
                                />
                                <div className='flex flex-col pl-[12px]'>
                                    {/* from link also we can pass the state -- to = {{ pathname: `/users/${post.user._id}`, state: {user: post.user}}}  -- But it wont load when someone access the url without the below link*/}
                                    <Link to={`/users/${post.user._id}`} className='text-gray-600 hover:underline font-semibold text-base leading-6 capitalize'>{post.user.name}</Link>
                                    <span className='not-italic font-normal text-[14px] leading-3 text-gray-400'>a minute ago</span>
                                </div>
                            </div>
                            <div className='font-normal px-3 mb-3 not-italic text-base text-slate-700 mt-4'>{post.content}</div>

                            <div className='p-1 flex border border-solid border-gray-300 px-[10px] font-normal text-base text-gray-600 border-x-0'>
                                <div className='flex items-center'>
                                    <img
                                        className='h-4 cursor-pointer'
                                        src="/like.svg"
                                        alt="likes-icon"
                                    />
                                    <span className='ml-2'>{post.likes.length}</span>
                                </div>

                                <div className='ml-4 flex items-center'>
                                    <img
                                        className='h-4 cursor-pointer'
                                        src="/chat.png"
                                        alt="comments-icon"
                                    />
                                    <span className='ml-2'>{post.comments.length}</span>
                                </div>
                            </div>
                            <div className='my-2 md:p-3'>
                                <input className='border border-solid border-gray-100 rounded-md text-xs h-9 my-0 mx-auto w-full md:text-base box-border p-2 focus:outline-none focus-visible:outline-0' placeholder="Start typing a comment" />
                            </div>

                            {
                                post.comments.map(comment => {
                                    return (
                                        <div key={comment._id} className='relative px-3 py-1'>
                                            <div className='bg-slate-200 rounded-md p-3 mb-3'>
                                                <div className='flex flex-col md:flex-row'>
                                                    <span className='font-semibold text-xs text-gray-600 capitalize'>{comment.user?.name}</span>
                                                    <span className='md:ml-2 text-xs text-gray-500'> a minute ago</span >
                                                    <span className='text-xs text-gray-700 md:ml-2' >22</span>
                                                </div >

                                                <div className='mt-2'>{comment.content}</div>
                                            </div >
                                        </div >
                                    )
                                })
                            }
                        </div >
                    </div >
                })}

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div >
            {
                auth.user &&
                <FriendList />
            }
        </div>
    );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
