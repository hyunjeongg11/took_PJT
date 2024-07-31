import { request } from '../request';
import { handleApiError } from '../errorHandling';

// 계좌 연동
// 요청
/* 
{
  "userSeq": 2,
  "main": false,
  "accountName": "두번째 계좌",
  "accountNum": "1",
  "accountPwd": "-1"
} 
*/
// 응답
/*
{
  "code": "su",
  "message": "Success."
}
*/
export const linkAccountApi = async (params) => {
  try {
    const response = await request.post('/api/link-account', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 주거래 계좌 변경
// 요청
/* 
{
  "userSeq": 2,
  "accountSeq": 2
}
*/
// 응답
/*
{
  "code": "su",
  "message": "Success."
}
*/
export const changeMainAccountApi = async (params) => {
  try {
    const response = await request.post('/api/change-main-account', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 계좌 list 가져오기
// 요청
/* 
{
  "userSeq": 2
}
*/
// 응답
/*
{
  "code": "su",
  "message": "Success.",
  "list": [
    {
      "accountSeq": 1,
      "main": true,
      "accountName": "일반 결제 계좌"
    },
    {
      "accountSeq": 2,
      "main": false,
      "accountName": "두번째 계좌"
    }
  ]
}
*/
export const getAccountListApi = async (params) => {
  try {
    const response = await request.post('/api/account-list', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 계좌 잔액 보기
// 요청
/* 
{
  "accountSeq": 2
}
*/
// 응답
/*
{
  "code": "su",
  "message": "Success.",
  "balance": 10000000
}
*/
export const getAccountBalanceApi = async (params) => {
  try {
    const response = await request.post('/api/account-balance', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 계좌 삭제 
// 요청
/* 
{
  "accountSeq": 2
}
*/
// 응답
/*
{
  "Done!"
}
*/
export const deleteAccountApi = async (params) => {
  try {
    const response = await request.post('/api/account-delete', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 미송금 고객 재송금
// 요청
/* 
{
  "cost": 내야할 가격 (int),
  "accountSeq": 재송금 계좌 (int)
}
*/
// 응답
/*
{
  "code": "su",
  "message": "Success."
}
*/
export const rePayApi = async (params) => {
  try {
    const response = await request.post('/api/re-pay', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
