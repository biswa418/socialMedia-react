import React, { useState } from 'react'
import { addPosts } from '../api';
import { toast } from 'react-hot-toast';
import { usePost } from '../hooks';

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setaddingPost] = useState(false);
    const posts = usePost();


    const handlePostSubmit = async () => {
        setaddingPost(true);

        //check if post is not empty string
        let checkedPost = post.trim();

        if (checkedPost.length === 0) {
            toast.error('Post cannot be empty! Come on, write something.')
            setaddingPost(false);
            return;
        }

        const response = await addPosts(post);

        if (response.success) {
            posts.addNewPost(response.data.post);
            setPost('');
            toast.success('Post added successfully.')
        } else {
            toast.error(response.message)
        }



        setaddingPost(false);
    }

    return (
        <div className='mt-[20px] flex flex-col bg-purple-100 p-4 rounded-md'>
            <textarea
                className='w-full resize-none bg-slate-50 rounded-md border border-purple-500 focus-visible:outline-4 focus-visible:bg-slate-100 focus-visible:outline-purple-700 p-4' value={post}
                rows={5}
                placeholder='Write something down..'
                onChange={(e) => setPost(e.target.value)}
            />

            <div className='w-full text-right'>
                <button
                    className='w-full md:w-40 bg-purple-200 ring-4 ring-purple-300/30 text-purple-900 shadow-xl hover:scale-[0.95] transition-all ease-in-out duration-300 p-2 rounded-md mt-4'
                    onClick={handlePostSubmit}
                    disabled={addingPost}
                >
                    {
                        addingPost ? 'Adding Post. . .' : 'Add Post'
                    }
                </button>
            </div>
        </div>
    )
}

export default CreatePost