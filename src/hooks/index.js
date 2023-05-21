import { useContext, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, getPost, getUserFriends, login as userLogin, signup as userSignup } from '../api';
import { setInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeFromLocalStorage, getFromLocalStorage } from '../utils'
import { PostsContext } from "../providers/PostProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (newToken) => {
        const token = !newToken ? getFromLocalStorage(LOCALSTORAGE_TOKEN_KEY) : newToken

        if (token) {
            const user = jwt_decode(token);
            const response = await getUserFriends();
            let friendships = [];

            if (response.success) {
                friendships = response.data.friends
            }

            setUser({
                ...user,
                friendships
            });
        }

        setLoading(false);
    }

    const login = async (email, password) => {
        const response = await userLogin(email, password);

        if (response.success) {
            setUser(response.data.user);
            setInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            await getUser(response.data.token);

            return {
                success: true,

            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const signup = async (name, email, password, cnfpassword) => {
        const response = await userSignup(email, name, password, cnfpassword);

        if (response.success) {
            // setUser(response.data.user);
            // setInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);

            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const logout = () => {
        setUser(null);
        removeFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    const updateUser = async (id, name, password, confirm_password) => {
        const response = await editProfile(id, name, password, confirm_password);

        if (response.success) {
            setUser(response.data.user);
            setInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);

            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const updateUserFriends = async (addFriend, friend) => {
        if (addFriend) {
            setUser({
                ...user,
                friendships: [...user.friendships, friend]
            })
        } else {
            //check if friend -- remove it
            const newFriends = user.friendships.filter(fr => fr.to_user._id !== friend.to_user._id)

            setUser({
                ...user,
                friendships: newFriends
            })

        }
    }

    return {
        user,
        login,
        signup,
        logout,
        loading,
        updateUser,
        updateUserFriends
    }
}

export const usePost = () => {
    return useContext(PostsContext);
}

export const useProvidePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)

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

    const addNewPost = (post) => {
        const newPosts = [post, ...posts];
        setPosts(newPosts)
    }

    const addComment = (comment, postId) => {
        const updatedWithComment = posts.map((post) => {
            if (post._id === postId) {
                return { ...post, comments: [...post.comments, comment] }
            }
            return post;
        })

        setPosts(updatedWithComment)
    }

    return {
        data: posts,
        loading,
        addNewPost,
        addComment
    }
}