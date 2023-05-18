export * from './constants';
export * from './formbody';

//get and set localstorage with user --
export const getFromLocalStorage = (key) => {
    if (!key) {
        return console.error('No key given to extract');
    }

    return localStorage.getItem(key);
}


export const setInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Error in key or value');
    }

    const strValue = typeof value === 'string' ? value : JSON.stringify(value);

    localStorage.setItem(key, strValue);
}


export const removeFromLocalStorage = (key) => {
    if (!key) {
        return console.error('No key given to remove');
    }

    localStorage.removeItem(key);
}