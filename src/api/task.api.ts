import api from './api';
import { Task } from '../interfaces/task.interface';

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getDeveloperTasks = async () => {
  const response = await api.get('/tasks/developer');
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};