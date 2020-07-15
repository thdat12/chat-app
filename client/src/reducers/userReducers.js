import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../actions/types';

export default function (state = {token: null}, action) {
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token)
            return { ...state, userData: action.payload.userData, token: action.payload.token}
        case AUTH_USER:
            const token = localStorage.getItem('token')
            return { ...state, userData: action.payload.userData, token }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return { ...state, userData: {}, token: null }
        default:
            return state;
    }
}