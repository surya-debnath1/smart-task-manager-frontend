import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'https://smart-task-manager-backend-gfx6.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;