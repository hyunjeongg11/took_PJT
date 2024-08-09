import { request } from '../request';
import { handleApiError } from '../errorHandling';

/*
요청
{
  "userSeq": 1,
  "title": "친구들과의 모임",
  "category": 1,
<<<<<<< HEAD
  "cost": 100000, // 0으로 설정해도 됨
  "totalMember": 10,
  "reciever": false, // null 가능
  "deliveryTip": 5000 // null 가능
=======
  "cost": 100000,
  "totalMember": 10,
  "reciever": false,
  "deliveryTip": 5000
>>>>>>> feature/taxi_Cho
}
응답
{
  "code": "string",
  "message": "string",
  "partySeq": 12345,
  "memberSeq": 67890
}

*/
// 파티 생성
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
// 멤버추가
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
//멤버 삭제
export const deleteMemberApi = async (params) => {
  try {
    const response = await request.post('/api/pay/delete-member', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 정산시 맴버들이 돈을 보낼 때
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
// 오직 정산 후 정산자가 돈 받을 때
export const onlyjungsanhostRecievepi = async (params) => {
  try {
    const response = await request.post(
      '/api/pay/only-jungsan-host-recieve',
      params
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 요청
// {
//     "memberSeq": 0,
//     "partySeq": 0
//   }
// 응답
// {
//     "code": "string",
//     "message": "string",
//     "memberSeq": 12345
//   }
// 멤버들이 수령 확인, 모든 수령이 끝내면 done에서 true 반환
// [배달, 공구]가 수령했을 때
export const deliveryGroupDoneApi = async (params) => {
  try {
    const response = await request.post('/api/pay/deli-gongu-done', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 요청
// {
//     "partySeq": 1,
//     "userSeq": 0
//   }
// 응답
// {
//     "code": "string",
//     "message": "string",
//     "memberSeq": 12345
//   }
// [배달, 공구] 수령 후 입금
export const deliveryGroupHostRecieveApi = async (params) => {
  try {
    const response = await request.post(
      '/api/pay/deli-gongu-host-recieve',
      params
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 요청
// {
//     "userSeq": 0, 로그인한 user
//     "partySeq": 0
//   }
// 응답
// {
//     "code": "string",
//     "message": "string",
//     "memberSeq": 12345
//   }
// [배달, 공구] 유저가 돈 보낼 때
export const deliveryGroupPayApi = async (params) => {
  try {
    const response = await request.post('/api/pay/deli-gongu-pay', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 요청
// {
//     "partySeq": 0,
//     "userCosts": [
//       {
//         "userSeq": 0,
//         "cost": 0
//       }
//     ]
//   }
// 응답
// {
//     "code": "string",
//     "message": "string",
//     "memberSeq": 12345
//   }
export const insertAllMemberApi = async (params) => {
  try {
    const response = await request.post('/api/pay/insert-all-member', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 응답
// {
//     "code": "string",
//     "message": "string",
//     "partyDetailList": [
//       {
//         "memberSeq": 0,
//         "cost": 0,
//         "status": true,
//         "receive": true,
//         "party": {
//           "partySeq": 0,
//           "title": "string",
//           "category": 0,
//           "cost": 0,
//           "status": true,
//           "createdAt": "2024-08-08T02:41:34.368Z",
//           "count": 0,
//           "totalMember": 0,
//           "receiveCost": 0,
//           "deliveryTip": 0
//         },
//         "user": {
//           "userSeq": 0,
//           "userId": "string",
//           "password": "string",
//           "userName": "string",
//           "email": "string",
//           "phoneNumber": "string",
//           "birth": "string",
//           "createdAt": "2024-08-08T02:41:34.368Z",
//           "loginStatus": "KAKAO",
//           "alarm": true,
//           "addr": "string",
//           "lat": 0,
//           "lon": 0,
//           "imageNo": 0,
//           "gender": "M",
//           "simplePassword": 0,
//           "role": "string",
//           "nickname": "string"
//         },
//         "createdAt": "2024-08-08T02:41:34.368Z",
//         "leader": true
//       }
//     ]
//   }
// 파티 삭제
export const partyDeleteApi = async (params) => {
  try {
    const response = await request.delete(
      '/api/pay/party-delete/{partySeq}',
      params
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 요청
// {
//     "partySeq": 1,
//     "userSeq": 1
//   }
// 응답
// {
//     "code": "string",
//     "message": "string",
//     "partyDetailList": [
//       {
//         "memberSeq": 0,
//         "cost": 0,
//         "status": true,
//         "receive": true,
//         "party": {
//           "partySeq": 0,
//           "title": "string",
//           "category": 0,
//           "cost": 0,
//           "status": true,
//           "createdAt": "2024-08-08T02:42:53.084Z",
//           "count": 0,
//           "totalMember": 0,
//           "receiveCost": 0,
//           "deliveryTip": 0
//         },
//         "user": {
//           "userSeq": 0,
//           "userId": "string",
//           "password": "string",
//           "userName": "string",
//           "email": "string",
//           "phoneNumber": "string",
//           "birth": "string",
//           "createdAt": "2024-08-08T02:42:53.084Z",
//           "loginStatus": "KAKAO",
//           "alarm": true,
//           "addr": "string",
//           "lat": 0,
//           "lon": 0,
//           "imageNo": 0,
//           "gender": "M",
//           "simplePassword": 0,
//           "role": "string",
//           "nickname": "string"
//         },
//         "createdAt": "2024-08-08T02:42:53.084Z",
//         "leader": true
//       }
//     ]
//   }
// 파티 상세 조회
export const partyDetailApi = async (params) => {
  try {
    const response = await request.delete('/api/pay/party-detail', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
