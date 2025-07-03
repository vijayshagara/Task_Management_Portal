import api from './api';
import { User } from '../interfaces/user.interface';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getDevelopers = async () => {  
  const response = await api.get('/users/developers');
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};