import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { usePosition } from '../../store/position';
import changeOrderIcon from '../../assets/taxi/changeOrder.png';
import { calculateTotalExpectedCostApi, updateTaxiPartyApi, setDestinationRankApi } from '../../apis/taxi';

// todo: 택시 파티 경로 조회 api 사용해서 실제 데이터와 연동 필요
const tempData = [
  {
    userName: '차민주',
    userId: 1,
    imgNo: 5,
    gender: '여성',
    userDestination: '부산 강서구 녹산산단335로 7 송정삼정그린코아더시티',
    latitude: 35.0894681,
    longitude: 128.8535056,
    expectedCost: 13800,
  },
  {
    userName: '조현정',
    userId: 2,
    imgNo: 6,
    gender: '여성',
    userDestination: '부산 강서구 명지국제5로 170-5 명일초등학교',
    latitude: 35.1094409,
    longitude: 128.922555,
    expectedCost: 11500,
  },
];

const tempUser = {
  userName: '차민주',
  userId: 1,
  gender: '여성',
};

function TaxiChattingSettingPage() {
  const [destinations, setDestinations] = useState(tempData);
  const [paymentUser, setPaymentUser] = useState(tempData[0].userName);
  const [userCount, setUserCount] = useState(1);
  const [genderPreference, setGenderPreference] = useState('무관'); // 모집 성별
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalExpectedCost, setTotalExpectedCost] = useState(null);
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    // Handle the logic when the latitude or longitude changes
  }, [latitude, longitude]);

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

  const handleCheckExpectedCost = async () => {
    try {
      const locations = [
        { lat: latitude, lon: longitude }, // 현재 위치를 첫번째로 추가
        ...destinations.map((dest) => ({
          lat: dest.latitude,
          lon: dest.longitude,
        })),
      ];

      const users = destinations.map((dest) => ({
        userSeq: dest.userId,
        cost: dest.expectedCost,
      }));

      const params = {
        locations,
        users,
      };

      const result = await calculateTotalExpectedCostApi(params);
      setTotalExpectedCost(result);
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Error calculating expected cost:', error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveSettings = async () => {
    const masterUser = destinations.find((user) => user.userName === paymentUser);
    if (!masterUser) {
      console.error('Error: Payment user not found');
      return;
    }

    const genderValue = genderPreference === '동성';
    
    const params = {
      taxiSeq: 1, // Replace with actual taxiSeq
      master: masterUser.userId,
      max: userCount,
      gender: genderValue,
    };

    try {
      await updateTaxiPartyApi(params);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }

    // 목적지 순서 설정 API 호출
    for (let i = 0; i < destinations.length; i++) {
      const rankParams = {
        taxiSeq: 1, // Replace with actual taxiSeq
        destiName: destinations[i].userDestination,
        routeRank: i + 1, // 순서는 1부터 시작
      };

      try {
        await setDestinationRankApi(rankParams);
        console.log(`Rank for destination ${destinations[i].userDestination} set successfully`);
      } catch (error) {
        console.error(`Error setting rank for destination ${destinations[i].userDestination}:`, error);
      }
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3 relative">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          채팅방 설정
        </div>
        <button
          onClick={handleSaveSettings}
          className="absolute right-4 mt-2.5 bg-main text-white py-1 px-3 rounded-lg text-sm font-bold"
        >
          저장
        </button>
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
                      src={getProfileImagePath(item.imgNo)}
                      alt={`${item.userName} 프로필 사진`}
                      className="w-9 h-9 mb-1"
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
          onClick={handleCheckExpectedCost}
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

      <CheckExpectedCost
        isOpen={isPopupOpen}
        onClose={closePopup}
        destinations={destinations}
        tempUser={tempUser}
        totalExpectedCost={totalExpectedCost} // 총 예상 비용 전달
      />
    </div>
  );
}

export default TaxiChattingSettingPage;
