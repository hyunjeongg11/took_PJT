import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { calculateTotalExpectedCostApi } from '../../apis/taxi';
import { usePosition } from '../../store/position';

// todo: 택시 파티 경로 조회 api 연동하여 실제 데이터와 연동 필요
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
  {
    userName: '정희수',
    userId: 3,
    imgNo: 21,
    gender: '여성',
    userDestination: '부산 사하구 하신번영로157번길 39 영진돼지국밥',
    latitude: 35.0966354,
    longitude: 128.9578812,
    expectedCost: 9500,
  },
];

const tempUser = {
  userName: '차민주',
  userId: 1,
  gender: '여성',
};

function CurrentPathListPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalExpectedCost, setTotalExpectedCost] = useState(null);
  const { latitude, longitude } = usePosition();

  const handleOpenPopup = async () => {
    try {
      const locations = [
        { lat: latitude, lon: longitude }, // 현재 위치를 첫 번째로 추가
        ...tempData.map((user) => ({
          lat: user.latitude,
          lon: user.longitude,
        })),
      ];

      const users = tempData.map((user) => ({
        userSeq: user.userId,
        cost: user.expectedCost,
      }));

      const params = {
        locations,
        users,
      };

      const result = await calculateTotalExpectedCostApi(params);
      setTotalExpectedCost(result);
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Error calculating total expected cost:', error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          현재 경로 목록
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col px-8 py-4 space-y-6">
        {tempData.map((item, index) => (
          <div key={index}>
            <div className="flex items-center mb-2">
              <div className="text-2xl font-bold mr-4">{index + 1}</div>
              <div className="flex flex-col items-center w-16 mr-2">
                <img
                  src={getProfileImagePath(item.imgNo)}
                  alt={`${item.userName} 프로필 사진`}
                  className="w-10 h-10 mb-1"
                />
                <span className="text-sm font-bold">{item.userName}</span>
              </div>
              <span className="text-sm text-black ml-2">
                {item.userDestination}
              </span>
            </div>
            {index < tempData.length - 1 && (
              <div className="border-b border-dashed border-neutral-300 mt-4"></div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleOpenPopup}
        className="py-3 px-4 mt-4 mx-auto bg-main text-white font-bold text-sm rounded-xl shadow-md"
      >
        예상비용 확인하기
      </button>

      {totalExpectedCost && (
        <CheckExpectedCost
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          destinations={tempData}
          tempUser={tempUser}
          totalExpectedCost={totalExpectedCost}
        />
      )}
    </div>
  );
}

export default CurrentPathListPage;
