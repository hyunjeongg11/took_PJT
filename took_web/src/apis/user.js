import { member_request, request } from './request';
import { handleApiError } from './errorHandling';

// signUpApi params
// {
//     "id": “turtle",
//     "password": "P!ssw0rd",
//     "email": "email@email.com",
//     "certificationNumber": "0000"
//     } → 추가 커스텀 필요
// 회원가입
export const signUpApi = async (params) => {
  try {
    const response = await member_request.post('/api/auth/sign-up', params);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// validIdApi params
// {
//     "id": “turtle"
//     }
// 아이디 중복 검사
export const validIdApi = async (params) => {
  try {
    const response = await member_request.post('/api/auth/id-check', params);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// emailCertificationApi params
// {
//     "id": “turtle",
//     "email": "email@email.com"
//     }
// 이메일 인증
export const emailCertificateApi = async (params) => {
  try {
    const response = await member_request.post(
      '/api/auth/email-certification',
      params
    );
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// CheckEmailCodeApi
// {
//     "id": “turtle",
//     "email": "email@email.com",
//     "certificationNumber": "0000"
//     }
// 이메일 인증 확인
export const checkEmailCodeApi = async (params) => {
  try {
    const response = await member_request.post(
      '/api/auth/check-certification',
      params
    );
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// loginApi params
// {
//     "id": “turtle",
//     "password": "P!ssw0rd"
//     }
// 로그인
// 로그인
export const loginApi = async (params, setAccessToken) => {
  try {

    const response = await member_request.post('/api/auth/sign-in', params);
    const accessToken = response.data.accessToken;

    if (accessToken) {
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
    }

    return response.data;

  } catch (err) {
    return handleApiError(err);
  }
};

//getUserInfoApi
// {
//   ”userSeq” : 2
//   }
export const getUserInfoApi = async (params) => {
  try {
    const response = await request.post('/api/user/info', params);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// refreshAccessTokenApi
// params에 refreshToken 담아서 요청
export const refreshAccessTokenApi = async (params) => {
  try {
    const response = await request.post(
      '/api/auth/refresh-access-token',
      params
    );
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

/* {
  "userId" : "yourId",
  "userName" : "yourName",
  "phoneNumber": "yourPhoneNumber"
  } */
export const modifyUserInfoApi = async(params) => {
  try {
    const response = await request.post('/api/user/info-change', params);
    return response.data;
  }catch(err) {
    return handleApiError(err);
  }
}

export const modifyPwdApi = async(params) => {
  try {
    const response = await request.post('/api/user/change-pwd', params);
    return response.data;
  }
  catch(err) {
    return handleApiError(err);
  }
}

export const logoutApi = async () => {
  try {
    const response = await request.get('/api/user/sign-out');
    return response.data;
  } catch(err) {
    return handleApiError(err);
  }
}