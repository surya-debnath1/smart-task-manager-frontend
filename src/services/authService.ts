import API from '../config/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await API.post('/users/register', data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await API.post('/users/login', data);
  return response.data;
};