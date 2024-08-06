import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '../../assets/delivery/whiteBack.svg';
import {
  getDeliveryDetailApi,
  deleteDeliveryApi,
  joinDeliveryApi,
  getDeliveryMembersApi,
  changeDeliveryStatusApi,
} from '../../apis/delivery';
import { getUserInfoApi } from '../../apis/user';
import { useUser } from '../../store/user';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { TbPencil } from 'react-icons/tb';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatBeforeTime } from '../../utils/formatDate';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <img
      src={backIcon}
      alt="뒤로"
      className="w-6 h-6 mx-6 mt-6 absolute top-0 left-0 opacity-80"
      onClick={handleBackClick}
    />
  );
};

function formatDeliveryTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day} ${hours >= 12 ? '오후' : '오전'} ${
    hours > 12 ? hours - 12 : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function DeliveryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { seq: currentUserSeq } = useUser();
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const deliveryResponse = await getDeliveryDetailApi(id);
        if (deliveryResponse.status === 'DONE') {
          navigate('/');
          return;
        }

        setData(deliveryResponse);

        const deliveryUserSeq = deliveryResponse.userSeq;
        if (deliveryUserSeq) {
          const userResponse = await getUserInfoApi({
            userSeq: deliveryUserSeq,
          });
          setUserInfo(userResponse);
          setIsLeader(deliveryUserSeq === currentUserSeq);
        }

        const membersResponse = await getDeliveryMembersApi(id);
        const isCurrentUserParticipant = membersResponse.some(
          (member) => member.userSeq === currentUserSeq
        );
        setIsParticipant(isCurrentUserParticipant);

        const deliveryTime = new Date(deliveryResponse.deliveryTime);
        if (new Date() > deliveryTime) {
          await changeDeliveryStatusApi({ deliverySeq: id, status: 'DONE' });
          navigate('/');
        }
      } catch (error) {
        console.error(
          '배달 글 상세 조회 중 오류 발생:',
          error.response?.data || error.message
        );
      }
    };

    if (id) {
      fetchDeliveryData();
    }
  }, [id, currentUserSeq, navigate]);

  const handleParticipate = async () => {
    try {
      await joinDeliveryApi({ deliverySeq: id, userSeq: currentUserSeq });
      alert('배달 파티에 참여하였습니다!');
      setIsParticipant(true);
    } catch (error) {
      console.error(
        '참여 중 오류 발생:',
        error.response?.data || error.message
      );
      alert('참여 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      console.log('Deleting delivery with id:', id);
      const response = await deleteDeliveryApi(id);
      console.log('Delete response:', response);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(
        '삭제 중 오류 발생:',
        error.response?.data || error.message
      );
    }
  };

  const handleModify = () => {
    navigate(`/delivery/modify/${id}`);
  };

  const handleChatRedirect = () => {
    if (data && data.roomSeq) {
      navigate(`/chat/delivery/${data.roomSeq}`);
    }
  };

  const handleEndRecruitment = async () => {
    try {
      await changeDeliveryStatusApi({ deliverySeq: id, status: 'DONE' });
      navigate('/');
    } catch (error) {
      console.error(
        '모집 종료 중 오류 발생:',
        error.response?.data || error.message
      );
      alert('모집 종료 중 오류가 발생했습니다.');
    }
  };

  if (!data || !userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen">
      <div className="flex bg-main items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 mb-2 flex-grow text-center text-lg font-bold text-white">
          배달 <span className="font-dela">took</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <img
              src={getProfileImagePath(userInfo.imageNo)}
              alt="avatar"
              className="w-10 h-10 mr-4"
            />
            <div>
              <div className="text-base font-bold">{userInfo.userName}</div>
              <div className="text-xs text-gray-500">
                {formatBeforeTime(data.createdAt)}
              </div>
            </div>
          </div>
          {isLeader && (
            <div className="flex items-center">
              <TbPencil
                className="w-5 h-5 text-neutral-500 mr-4"
                onClick={handleModify}
              />
              <FaRegTrashAlt
                className="w-5 h-4 text-neutral-500"
                onClick={() => setShowDeleteModal(true)}
              />
            </div>
          )}
        </div>

        <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div className="mb-10 px-2">
          <div className="text-xl font-bold mb-1 mt-3">{data.storeName}</div>
          <div className="text-gray-700 mb-3">{data.pickupPlace}</div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 my-3">
            배달팁 : {data.deliveryTip}원
          </div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 my-3">
            배달 주문 시간 : {formatDeliveryTime(data.deliveryTime)}
          </div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 whitespace-pre-line leading-7">
            {data.content}
          </div>
        </div>

        <div className="flex justify-center">
          {isParticipant ? (
            <button
              onClick={handleChatRedirect}
              className="bg-main text-white py-2 px-10 rounded-2xl text-lg font-bold"
            >
              채팅방 이동
            </button>
          ) : (
            <button
              onClick={isLeader ? handleEndRecruitment : handleParticipate}
              className="bg-main text-white py-2 px-10 rounded-2xl text-lg font-bold"
            >
              {isLeader ? '모집 종료하기' : '참여하기'}
            </button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <div className="text-base font-bold mb-2">
              게시글을 삭제하시겠습니까?
            </div>
            <div className="mb-4 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
            <div className="flex justify-center">
              <button
                className="bg-gray-200 font-bold text-[#3D3D3D] px-10 py-2 rounded-2xl mx-2"
                onClick={() => setShowDeleteModal(false)}
              >
                취소
              </button>
              <button
                className="bg-main font-bold text-white px-10 py-2 rounded-2xl mx-2"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center text-base font-bold">
            배달 게시글이 삭제되었습니다
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryDetailPage;
