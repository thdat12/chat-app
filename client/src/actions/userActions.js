import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';

export const loginUser = (dataToSubmit) => {
  const request = axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user/login`, dataToSubmit)
      .then(response => response.data)
  return {
      type: LOGIN_USER,
      payload: request
  }
}

export const registerUser = (dataToSubmit)  => {
  const request = axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user/register`, dataToSubmit)
      .then(response => response.data)

  return {
      type: REGISTER_USER,
      payload: request
  }
}


export const auth = () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = token
  }
  const request = axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/auth`, config)
      .then(response => response.data)

  return {
      type: AUTH_USER,
      payload: request
  }
}

export const logOutUser = () => {
  return{
    type: LOGOUT_USER
  }
}