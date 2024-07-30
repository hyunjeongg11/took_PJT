import axios from 'axios';
import { useToken } from '../store/token';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


// request에는 jwt 토큰이 담겨서 전송됨. 회원가입/로그인을 제외한 API 요청에 사용
export const request = axios.create({
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


// member_request
export const member_request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
