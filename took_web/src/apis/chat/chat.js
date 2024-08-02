import { request } from '../request';
import { handleApiError } from '../errorHandling';
import { useUser } from '../../store/user';

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
export const getChatListApi = async () => {
  try {
    const response = await request.get('/api/chat/rooms');
    return response.data;
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
    console.log("test", params)
  try {
    const response = await request.post('/api/chat/message/list', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
