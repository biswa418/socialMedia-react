import { useContext, useState } from "react"
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';
import { setInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeFromLocalStorage, getFromLocalStorage } from '../utils'

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const logout = () => {
        setUser(null);
        removeFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    return {
        user,
        login,
        logout,
        loading
    }
}