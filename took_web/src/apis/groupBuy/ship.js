import { request } from '../request';
import { handleApiError } from '../errorHandling';

// {
//   "shopSeq": Long,
//   "courier": String,
//   "invoiceNum": String
// }
// : 배송 정보 등록
// 응답
// {
// 	"shipSeq": Long,
//   "shopSeq": Long,
//   "courier": String,
//   "invoiceNum": String
// }

export const writeShipApi = async (params) => {
  try {
    const response = await request.post('/ship/create', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// : 배송 정보 조회
// 응답
// {
//     "shopSeq": Long,
//     "courier": String,
//     "invoiceNum": String
//   }

export const getShipApi = async (shopSeq) => {
  try {
    const response = await request.get(`/ship/select/${shopSeq}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 배송 정보 삭제
export const deleteShipApi = async (shipSeq) => {
  try {
    const response = await request.delete(`ship/delete/${shipSeq}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// {
//     "courier": String,
//     "invoiceNum": String
//   }
// 배송 정보 수정
export const modifyShipApi = async (shipSeq, params) => {
  try {
    const response = await request.put(`/ship/update/${shipSeq}`, params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
