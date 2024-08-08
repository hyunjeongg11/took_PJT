import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import searchIcon from '../../assets/taxi/search.png';
import { useUser } from '../../store/user.js';
import { usePosition } from '../../store/position.js';
import { createChatApi } from '../../apis/chat/chat.js';
import {
  createTaxiPartyApi,
  addTaxiPartyMemberApi,
  calculateIndividualExpectedCostApi,
  isUserJoinedTaxiPartyApi,
} from '../../apis/taxi.js';

const CreateChattingPage = () => {
  const [destination, setDestination] = useState('');
  const [userCount, setUserCount] = useState(1);
  const [genderPreference, setGenderPreference] = useState('무관');
  const { seq: userSeq } = useUser();
  const { latitude, longitude } = usePosition();
  const navigate = useNavigate();

  const handleCreateChatRoom = async () => {
    try {
      // 1. 파티 참가 여부 확인
      const isJoined = await isUserJoinedTaxiPartyApi(userSeq);
      if (isJoined) {
        alert('이미 참여중입니다');
        navigate('/taxi/main');
        return;
      }

      // 2. 방생성
      const chatParams = {
        roomTitle: destination,
        userSeq,
        category: 2, // 택시 카테고리 : 2
      };
      const chatResponse = await createChatApi(chatParams);
      const { roomSeq } = chatResponse;

      // 3. 파티 생성
      const genderValue = genderPreference === '동성';

      const taxiParams = {
        gender: genderValue,
        max: parseInt(userCount, 10),
        roomSeq,
        userSeq,
      };
      const taxiResponse = await createTaxiPartyApi(taxiParams);
      const { taxiSeq } = taxiResponse;

      // 4. 비용 계산
      const costParams = {
        startLat: latitude,
        startLon: longitude,
        endLat: 35, // todo : 임시로 35로 설정
        endLon: 128, // todo : 임시로 128로 설정
      };
      const costResponse = await calculateIndividualExpectedCostApi(costParams);
      const { cost } = costResponse;

      // 5. 방장 정보 추가
      const memberParams = {
        taxiSeq,
        userSeq,
        destiName: destination,
        destiLat: 35, // 임시로 35로 설정
        destiLon: 128, // 임시로 128로 설정
        cost,
        routeRank: 1,
      };
      await addTaxiPartyMemberApi(memberParams);

      alert('채팅방과 택시 파티가 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('Error creating chat room or taxi party:', error);
      alert('채팅방 또는 택시 파티 생성 중 오류가 발생했습니다.');
    }
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
};

export default CreateChattingPage;