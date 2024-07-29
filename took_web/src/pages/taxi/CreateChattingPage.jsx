import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import searchIcon from '../../assets/taxi/search.png';

const tempUser = {
  gender: '여성',
};

function CreateChattingPage() {
  const [destination, setDestination] = useState('');
  const [userCount, setUserCount] = useState(1);
  const [genderPreference, setGenderPreference] = useState('무관');

  const handleCreateChatRoom = () => {
    // todo: 채팅방 생성 로직을 추가
    console.log('목적지:', destination);
    console.log('모집 인원:', userCount);
    console.log('모집 성별:', genderPreference);
    // 일단 이렇게
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          채팅방 생성
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col px-6 py-4 space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            목적지 설정
          </label>
          <div className="mt-1 relative rounded-md">
            <input
              type="text"
              className="block w-full pr-10 py-4 px-3 shadow-md bg-neutral-100 border-gray-300 focus:outline-none focus:ring-main focus:border-main text-sm rounded-md"
              placeholder="목적지를 입력하세요"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <img
                src={searchIcon}
                alt="목적지 검색"
                className="h-6 w-6 text-gray-400" 
              />
            </button>
          </div>
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

      <button
        onClick={handleCreateChatRoom}
        className="mt-10 mx-20 py-3 px-4 bg-main text-white font-bold rounded-2xl shadow-md"
      >
        채팅방 생성
      </button>
    </div>
  );
}

export default CreateChattingPage;
