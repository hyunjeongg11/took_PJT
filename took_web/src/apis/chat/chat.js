import { request } from '../request';
import { handleApiError } from '../errorHandling';

// 새로운 채팅방 생성
export const createChatApi = async (params) => {
  try {
    const response = await request.post('/api/chat/room', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 모든 채팅방 조회
export const getChatListApi = async (userSeq) => {
  try {
    const response = await request.get(`/api/chat/rooms/${userSeq}`);
    const sortedData = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sortedData;
  } catch (error) {
    return handleApiError(error);
  }
};

// 채팅방 카테고리/사용자 위치 기반 채팅방 조회
export const getChatFilterApi = async (params) => {
  try {
    const response = await request.get('/api/chat/rooms/filter', { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

//채팅방 메시지 조회
export const getChatRoomMessageApi = async (params) => {
  try {
    const response = await request.post('/api/chat/message/list', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteRoomApi = async (roomSeq) => {
  try {
    const response = await request.delete(`/api/chat/room/${roomSeq}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

///api/chat/users/{roomSeq}
export const getUsersApi = async (roomSeq) => {
  try {
    const response = await request.get(`/api/chat/users/${roomSeq}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
