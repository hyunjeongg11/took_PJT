import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import userProfileIcon1 from '../../assets/profile/img5.png';
import userProfileIcon2 from '../../assets/profile/img6.png';
import changeOrderIcon from '../../assets/taxi/changeOrder.png';

const tempData = [
  {
    userName: '차민주',
    userProfileIcon: userProfileIcon2,
    userDestination: '부산 강서구 녹산산단335로 7 송정삼정그린코아더시티',
    estimatedCost: 13800,
  },
  {
    userName: '조현정',
    userProfileIcon: userProfileIcon1,
    userDestination: '부산 강서구 명지국제5로 170-5 명일초등학교',
    estimatedCost: 11500,
  },
];

const tempUser = {
  gender: '여성',
}; 

function TaxiChattingSettingPage() {
  const [destinations, setDestinations] = useState(tempData);
  const [paymentUser, setPaymentUser] = useState(tempData[0].userName);
  const [userCount, setUserCount] = useState(1);
  const [genderPreference, setGenderPreference] = useState('무관');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    setDraggingIndex(index);
  };

  const onDragOver = (index) => {
    if (draggingIndex === index) return;

    const tempDestinations = [...destinations];
    const [draggedItem] = tempDestinations.splice(draggingIndex, 1);
    tempDestinations.splice(index, 0, draggedItem);

    setDraggingIndex(index);
    setDestinations(tempDestinations);
  };

  const onDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleCreateChatRoom = () => {
    // todo: 채팅방 생성 로직을 추가
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          채팅방 설정
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col px-6 py-4 space-y-6">
        <div>
          <label className="block text-base font-bold text-gray-700 mb-2">
            경로 목록
          </label>
          <div className="mt-1 border border-neutral-100 rounded-xl bg-neutral-100 p-2 shadow-md">
            {destinations.map((item, index) => (
              <div key={index}>
                <div
                  className={`flex items-center p-2 rounded-md cursor-grab transition duration-200 relative ${
                    draggingIndex === index
                      ? 'bg-neutral-300 opacity-50'
                      : 'bg-neutral-100'
                  }`}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={() => onDragOver(index)}
                  onDragEnd={onDragEnd}
                >
                  <div className="flex flex-col items-center w-16">
                    <img
                      src={item.userProfileIcon}
                      alt={`${item.userName} 프로필 사진`}
                      className="w-9 h-9 rounded-full mb-1"
                    />
                    <span className="text-xs font-bold">{item.userName}</span>
                  </div>
                  <span className="text-sm text-black ml-2">
                    {item.userDestination}
                  </span>
                  <img
                    src={changeOrderIcon}
                    alt="경로 순서 변경"
                    className="w-4 h-3.5 ml-4"
                  />
                </div>
                {index < destinations.length - 1 && (
                  <div className="border-b border-dashed border-neutral-300 my-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateChatRoom}
          className="py-3 px-4 mx-auto bg-main text-white font-bold text-sm rounded-xl shadow-md"
        >
          예상비용 확인하기
        </button>

        <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            결제자 설정
          </label>
          <select
            value={paymentUser}
            onChange={(e) => setPaymentUser(e.target.value)}
            className="h-12 mt-2 bg-neutral-100 w-full rounded border-r-8 border-transparent px-4 text-sm shadow-md"
          >
            {destinations.map((item) => (
              <option key={item.userName} value={item.userName}>
                {item.userName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            모집 인원 설정
          </label>
          <select
            value={userCount}
            onChange={(e) => setUserCount(parseInt(e.target.value, 10))}
            className="h-12 mt-2 bg-neutral-100 w-full rounded border-r-8 border-transparent px-4 text-sm shadow-md"
          >
            {[1, 2, 3].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            모집 성별 선택
          </label>
          <select
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            className="h-12 mt-2 bg-neutral-100 w-full rounded border-r-8 border-transparent px-4 text-sm shadow-md"
          >
            <option value="무관">무관</option>
            <option value="동성">동성</option>
          </select>
        </div>
      </div>

      <CheckExpectedCost isOpen={isPopupOpen} onClose={closePopup}>
        <div className="text-center mb-4">
          <div className="text-lg font-bold">총 {userCount}명</div>
          <div className="text-lg font-bold">32,600원</div>
        </div>
        <div className="mb-4">
          {destinations.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <img
                src={item.userProfileIcon}
                alt={`${item.userName} 프로필 사진`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-grow">
                <div className="text-sm font-bold">{item.userName}</div>
                <div className="text-sm">
                  예상금액 {item.estimatedCost.toLocaleString()}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </CheckExpectedCost>
    </div>
  );
}

export default TaxiChattingSettingPage;
