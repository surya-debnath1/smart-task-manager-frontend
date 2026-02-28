import API from '../config/api';
import { Task } from '../types/task';

export const getTasks = async () => {
  const response = await API.get('/tasks');
  return response.data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  status?: string;
}) => {
  const response = await API.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  const response = await API.put(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};