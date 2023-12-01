import { writable } from 'svelte/store';

export const getLocalStorageJson = (localStorageKey, defaultValue) => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse user data from local storage', e);
            return defaultValue;
        }
    }
    else if (defaultValue) {
        return defaultValue;
    }
    return undefined;
}

export const localStorageWritableJson = (localStorageKey, defaultValue) => {
    const { subscribe, set, update } = writable(getLocalStorageJson(localStorageKey, defaultValue));

    return {
        subscribe,
        set: obj => {
            localStorage.setItem(localStorageKey, JSON.stringify(obj));
            set(obj);
        },
        update,
        clear: () => {
            localStorage.removeItem(localStorageKey);
            set(undefined);
        }
    };
}
