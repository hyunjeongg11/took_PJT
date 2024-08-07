import { request } from '../request';
import { handleApiError } from '../errorHandling';

/*
요청
{
  "userSeq": 1,
  "title": "친구들과의 모임",
  "category": 1,
  "cost": 100000,
  "totalMember": 10,
  "reciever": false,
  "deliveryTip": 5000
}
응답
{
  "code": "string",
  "message": "string",
  "partySeq": 12345,
  "memberSeq": 67890
}

*/
export const makePartyApi = async (params) => {
    try {
      const response = await request.post('/api/pay/make-party', params);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };


/*
요청
{
  "userSeq": 1,
  "partySeq": 100
}
응답
{
  "code": "string",
  "message": "string",
  "memberSeq": 12345
}
*/

export const insertMemberApi = async (params) => {
    try {
      const response = await request.post('/api/pay/insert-member', params);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
};

/*
요청
{
  "userSeq": 1,
  "partySeq": 100
}
응답
{
  "code": "string",
  "message": "string",
  "memberSeq": 12345
}
*/

export const deleteMemberApi = async (params) => {
    try {
      const response = await request.post('/api/pay/delete-member', params);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
};

/*
정산시 맴버들이 돈을 보낼 때
*/ 

export const onlyjungsanPayApi = async (params) => {
    try {
      const response = await request.post('/api/pay/only-jungsan-pay', params);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
};


/*

정산시 호스트가 돈 받을 떄

요청
{
  "partySeq": 1,
  "userSeq": 0
}
응답
{
  "code": "string",
  "message": "string",
  "memberSeq": 12345
}
*/

export const onlyjungsanhostRecievepi = async (params) => {
    try {
      const response = await request.post('/api/pay/only-jungsan-host-recieve', params);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
};