import { isEmpty } from "lodash";

export const setLocalStorage = (response) => {
    localStorage.setItem('userToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
};

export function isUserSignedIn() {
    return !isEmpty(localStorage.getItem('userToken'));
}

export function getToken() {
    return localStorage.getItem('userToken');
}

export function getUser() {
    const userString = localStorage.getItem('user');
    return JSON.parse(userString);
}

export function isAdmin() {
    const userString = localStorage.getItem('user');
    return JSON.parse(userString).admin;
}