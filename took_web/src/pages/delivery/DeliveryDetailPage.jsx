import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/delivery/whiteBack.svg';
import userProfile1 from '../../assets/profile/img7.png'; // 사용자 프로필 아이콘 경로

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

const temp_data = {
  userName: '조현정',
  userIcon: userProfile1,
  storeName: '반올림 피자 명지점',
  pickupPlace: '송정삼정그린코아 1층',
  deliveryTip: '4500',
  deliveryTime: '2024-07-24 18:00:00',
  content: `오늘 저녁으로 반올림 피자 시켜 먹을 분 구합니다!
저녁은 6시쯤에 주문할 예정이고,
배달 수령은 송정삼정그린코아시티 정문에서 할 예정입니다~
참고로 배달팁은 50,000원 이상일때만 3,300원이에요.

같이 배달비 절약해서 부자됩시다 !`,
  createdAt: '2024-07-24 14:00:00',
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

  const handleParticipate = () => {
    // 참여하기 버튼 클릭 시 로직 추가
    console.log('참여하기 버튼 클릭됨');
  };

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
          <img src={temp_data.userIcon} alt="avatar" className="w-10 h-10 mr-4" />
          <div>
            <div className="text-base font-bold">{temp_data.userName}</div>
            <div className="text-xs text-gray-500">{formatTime(temp_data.createdAt)}</div>
          </div>
        </div>

        <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div className="mb-10 px-2">
          <div className="text-xl font-bold mb-1 mt-3">{temp_data.storeName}</div>
          <div className="text-gray-700 mb-3">{temp_data.pickupPlace}</div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 my-3">배달팁 : {temp_data.deliveryTip}원</div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 my-3">배달 주문 시간 : {formatDeliveryTime(temp_data.deliveryTime)}</div>
          <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          <div className="text-gray-700 whitespace-pre-line leading-7">{temp_data.content}</div>
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
