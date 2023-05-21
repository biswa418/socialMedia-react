import React, { createContext } from 'react'

import { useProvidePosts } from '../hooks'

const initialState = {
    posts: [],
    loading: true,
    addNewPost: () => { }
}

export const PostsContext = createContext(initialState);

export const PostProvider = ({ children }) => {
    const posts = useProvidePosts();

    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    )
}

