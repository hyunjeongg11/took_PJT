import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '../../assets/delivery/whiteBack.svg';
import { getDeliveryDetailApi } from '../../apis/delivery';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { useUser } from '../../store/user.js';
import { getUserInfoApi } from '../../apis/user.js'


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

function formatTime(timeString) {
  const date = new Date(timeString);
  const now = new Date();
  const diff = (now - date) / 1000 / 60; // difference in minutes

  if (diff < 1) {
    return '방금 전';
  } else if (diff < 60) {
    return `${Math.floor(diff)}분 전`;
  } else if (diff < 24 * 60) {
    return `${Math.floor(diff / 60)}시간 전`;
  } else if (diff < 7 * 24 * 60) {
    return `${Math.floor(diff / (24 * 60))}일 전`;
  } else if (diff < 30 * 24 * 60) {
    return `${Math.floor(diff / (7 * 24 * 60))}주 전`;
  } else if (diff < 12 * 30 * 24 * 60) {
    return `${Math.floor(diff / (30 * 24 * 60))}개월 전`;
  } else {
    return `${Math.floor(diff / (12 * 30 * 24 * 60))}년 전`;
  }
}

// 배달 주문 시간 형식 맞추는 함수
function formatDeliveryTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day} ${hours >= 12 ? '오후' : '오전'} ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function DeliveryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeliveryDetailApi(id);
        setData(response);
      } catch (error) {
        console.error('배달 글 상세 조회 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleParticipate = () => {
    // 참여하기 버튼 클릭 시 로직 추가
    console.log('참여하기 버튼 클릭됨');
  };

  if (!data) {
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
        <div className="flex items-center mb-4">
          <img
            src={getProfileImagePath(user.imgNo)}
            alt="avatar"
            className="w-10 h-10 mr-4"
          />
          <div>
            <div className="text-base font-bold">{data.userName}</div>
            <div className="text-xs text-gray-500">
              {formatTime(data.createdAt)}
            </div>
          </div>
        </div>

        <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div className="mb-10 px-2">
          <div className="text-xl font-bold mb-1 mt-3">
            {data.storeName}
          </div>
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
          <button
            onClick={handleParticipate}
            className="bg-main text-white py-2 px-10 rounded-2xl text-lg font-bold"
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetailPage;
