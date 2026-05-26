import axios from 'axios';
import { API_URL } from './constants';

export const loginUser = (data) => axios.post(`${API_URL}/users/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/users/register`, data);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}`, data);