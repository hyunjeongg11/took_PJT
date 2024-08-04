import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import getProfileImagePath from '../../utils/getProfileImagePath';

const tempData = [
  {
    userName: '차민주',
    userId: 1,
    imgNo: 20,
    gender: '여성',
    userDestination: '부산 강서구 녹산산단335로 7 송정삼정그린코아더시티',
    expectedCost: 13800,
  },
  {
    userName: '조현정',
    userId: 2,
    imgNo: 19,
    gender: '여성',
    userDestination: '부산 강서구 명지국제5로 170-5 명일초등학교',
    expectedCost: 11500,
  },
  {
    userName: '정희수',
    userId: 3,
    imgNo: 21,
    gender: '여성',
    userDestination: '부산 강서구 명지국제5로 170-5 명일초등학교',
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

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
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

      <CheckExpectedCost
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        destinations={tempData}
        tempUser={tempUser}
      />
    </div>
  );
}

export default CurrentPathListPage;
