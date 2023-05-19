// import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { getPost } from '../api';
import { Loader } from "../components";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loader, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            const allPosts = await getPost();

            if (allPosts.success) {
                setPosts(allPosts.data.posts);
            }

            setLoading(false);
        }

        loadPost();
    }, []);


    if (loader) {
        return <Loader />
    }

    return (
        <div className='w-11/12 mx-auto'>
            {posts.map(post => {
                return <div key={post._id} className='border border-teal-500 box-border rounded-md mt-[20px] bg-slate-100'>
                    <div className='p-3'>
                        <div className='flex items-center'>
                            <img
                                className='h-[50px]'
                                src="/man.png"
                                alt="user-pic"
                            />
                            <div className='flex flex-col pl-[12px]'>
                                <span className='text-gray-600 font-semibold text-base leading-6 capitalize'>{post.user.name}</span>
                                <span className='not-italic font-normal text-[14px] leading-3 text-gray-400'>a minute ago</span>
                            </div>
                        </div>
                        <div className='font-normal not-italic text-base text-slate-700 mt-4'>{post.content}</div>

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
                        <div className='p-3'>
                            <input className='border border-solid border-gray-100 rounded-md h-9 my-0 mx-auto w-full text-base box-border p-2 focus:outline-none focus-visible:outline-0' placeholder="Start typing a comment" />
                        </div>

                        {
                            post.comments.map(comment => {
                                return (
                                    <div key={comment._id} className='relative px-3 py-1'>
                                        <div className='bg-slate-200 rounded-md p-3 mb-3'>
                                            <div className='flex'>
                                                <span className='font-semibold text-xs text-gray-600 capitalize'>{comment.user?.name}</span>
                                                <span className='ml-2 text-xs text-gray-500'> a minute ago</span >
                                                <span className='text-xs text-gray-700 ml-2' >22</span>
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
        </div >
    );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
