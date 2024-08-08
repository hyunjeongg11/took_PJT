import { request } from './request';
import { handleApiError } from './errorHandling';

export const getDeliveryByRoom = async (roomSeq) => {
  try {
    const response = await request.get(`/api/delivery/selectByRoom/${roomSeq}`);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};
