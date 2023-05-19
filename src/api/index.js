import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if (body) {
        config.body = getFormBody(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }

        //if success is not true
        throw new Error(data.message);

    } catch (err) {
        console.error('error in fetching', err);

        return {
            message: err.message,
            success: false
        }
    }
}


export const getPost = (page = 1, limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET'
    });
}

export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method: 'POST',
        body: { email, password },
    })
}

export const signup = (name, email, password, confirm_password) => {
    return customFetch(API_URLS.signup(), {
        method: 'POST',
        body: { email, name, password, confirm_password }
    })
}

export const editProfile = (id, name, password, confirm_password) => {
    return customFetch(API_URLS.editUser(), {
        method: 'POST',
        body: { id, password, confirm_password, name }
    })
}