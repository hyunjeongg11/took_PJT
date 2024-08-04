import axios from 'axios';
import { useToken } from '../store/token';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// request에는 jwt 토큰이 담겨서 전송됨. 회원가입/로그인을 제외한 API 요청에 사용
export const request = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

request.interceptors.request.use(async (config) => {
  const { accessToken, setAccessToken } = useToken.getState();
  
  if (!accessToken) {
    const storedAccessToken = localStorage.getItem('accessToken');
    console.log(storedAccessToken);
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      config.headers['Authorization'] = 'Bearer ' + storedAccessToken;
    }
  } else {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return config;
});

// member_request
export const member_request = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
