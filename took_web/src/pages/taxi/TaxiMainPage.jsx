import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/delivery/whiteBack.svg';
import plusIcon from '../../assets/taxi/plus.png'; // '+' 아이콘 경로
import enterIcon from '../../assets/taxi/enter.png'; // 입장 가능 아이콘
import notEnterIcon from '../../assets/taxi/notEnter.png'; // 입장 불가능 아이콘
import locationIcon from '../../assets/taxi/location.png';
import getProfileImagePath from '../../utils/getProfileImagePath';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <img
      src={backIcon}
      alt="뒤로"
      className="w-6 h-6 mx-6 mt-6 absolute top-0 left-0"
      onClick={handleBackClick}
    />
  );
};

const tempUser = {
  gender: '여성',
  location: '부산광역시 부산진구 부전동 169-1',
};

const tempData = [
  {
    imgNo: 1,
    gender: '무관',
    destinations: ['강서구 명지동', '사하구 하단동'],
    userCount: 3,
    userNowCount: 2,
    chatRoomId: 'room1',
  },
  {
    imgNo: 2,
    gender: '여성',
    destinations: ['연제구 연산동', '금정구 구서동'],
    userCount: 3,
    userNowCount: 2,
    chatRoomId: 'room2',
  },
  {
    imgNo: 3,
    gender: '무관',
    destinations: ['수영구 수영동', '해운대구 좌동'],
    userCount: 2,
    userNowCount: 2,
    chatRoomId: 'room3',
  },
  {
    imgNo: 4,
    gender: '남성',
    destinations: ['사상구 감전동', '사상구 주례동'],
    userCount: 4,
    userNowCount: 2,
    chatRoomId: 'room4',
  },
];

function TaxiMainPage() {
  const navigate = useNavigate();

  const handleCreateTaxi = () => {
    navigate('/taxi/create');
  };

  const handleEnterChatRoom = () => {
    // navigate(`/chat-room/${chatRoomId}`);
  };

  const filteredData = tempData.filter((item) =>
    tempUser.gender === '여성'
      ? item.gender === '여성' || item.gender === '무관'
      : tempUser.gender === '남성'
        ? item.gender === '남성' || item.gender === '무관'
        : true
  );

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen bg-main">
      <div className="bg-main py-4">
        <div className="flex flex-row px-4">
        <BackButton />
          <div className="ml-10 mt-0.5 items-center flex-grow text-2xl font-bold text-white">
            택시{' '}
            <span className="font-dela">
              took <span className="font-noto">!</span>
            </span>
          </div>
        </div>
        <div className="flex items-center px-4 mt-2">
          <img
            src={locationIcon}
            alt="location"
            className="w-4 h-4 mr-2 ml-2"
          />
          <div className="text-sm font-semibold text-gray-700">
            {tempUser.location}
          </div>
        </div>
      </div>
      <div className="px-2 py-4 bg-white h-screen rounded-t-3xl">
        {filteredData.map((item, index) => (
          <div key={index} className="px-4 py-2 rounded-lg">
            <div className="flex items-center">
              <img
                src={getProfileImagePath(item.imgNo)}
                alt="user profile"
                className="w-12 h-12 mr-3"
              />
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${item.gender === '무관' ? 'bg-white border border-neutral-300 text-gray-700' : item.gender === '여성' ? 'bg-pink-200 text-pink-600' : 'bg-blue-200 text-blue-600'}`}
                  >
                    {item.gender}
                  </div>
                </div>
                <div className="flex flex-wrap mb-2">
                  {item.destinations.map((destination, i) => (
                    <div
                      key={i}
                      className="bg-neutral-300 text-gray-700 text-xs font-bold mr-1 mb-1 px-2 py-1 rounded-lg"
                    >
                      {destination}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center w-9">
                <button
                  className="mb-2"
                  onClick={() => {
                    if (item.userNowCount < item.userCount) {
                      handleEnterChatRoom(item.chatRoomId);
                    }
                  }}
                >
                  <img
                    src={
                      item.userNowCount < item.userCount
                        ? enterIcon
                        : notEnterIcon
                    }
                    alt="enter status"
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs font-semibold text-gray-700">
                  {item.userNowCount} / {item.userCount}
                </span>
              </div>
            </div>
            <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-10 right-6 bg-main text-white p-2 rounded-full shadow-lg"
        onClick={handleCreateTaxi}
      >
        <img src={plusIcon} alt="+" className="w-8 h-8" />
      </button>
    </div>
  );
}

export default TaxiMainPage;
