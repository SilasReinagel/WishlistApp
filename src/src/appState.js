import { writable } from 'svelte/store';
import { testGroup } from './config';
import { localStorageWritableJson } from './localStorageItemStore';

export const routePath = writable(window.location.pathname);
export const isLoggedIn = writable(false);
export const isLoaded = writable(false);
export const currentUser = localStorageWritableJson('WL_CURRENT_USER', undefined);
export const recipientUser = localStorageWritableJson('WL_CURRENT_RECIPIENT', undefined);
export const currentGroupDisplayName = localStorageWritableJson('WL_GROUP_DISPLAY_NAME', testGroup.displayName);
export const connStatus = writable({ color: 'Red', message: 'Not Connected' });
export const groupUsers = writable([]);
export const wishlistItems = writable([]);
