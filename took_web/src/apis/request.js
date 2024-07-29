import axios from 'axios';
import { useToken } from '../store/token';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const request = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(async (config) => {
  const { accessToken } = useToken.getState();
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});

export const member_request = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
