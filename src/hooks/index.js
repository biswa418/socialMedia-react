import { useContext, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, getUserFriends, login as userLogin, signup as userSignup } from '../api';
import { setInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeFromLocalStorage, getFromLocalStorage } from '../utils'

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const token = getFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

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

        getUser();
    }, []);

    const login = async (email, password) => {
        const response = await userLogin(email, password);

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

    return {
        user,
        login,
        signup,
        logout,
        loading,
        updateUser
    }
}