import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { usePosition } from '../../store/position';
import changeOrderIcon from '../../assets/taxi/changeOrder.png';
import { useUser } from '../../store/user.js';
import { getUserInfoApi } from '../../apis/user.js';
import {
  calculateTotalExpectedCostApi,
  updateTaxiPartyApi,
  setDestinationRankApi,
  getAllTaxiPartyMembersApi,
} from '../../apis/taxi';

function TaxiChattingSettingPage() {
  useParams();
  const {
    state: { taxiSeq, taxiParty },
  } = useLocation();
  const navigate = useNavigate(); // navigate 추가
  const [destinations, setDestinations] = useState([]);
  const [paymentUser, setPaymentUser] = useState('');
  const [userCount, setUserCount] = useState(taxiParty.max - 1);
  const [genderPreference, setGenderPreference] = useState(
    taxiParty.gender === true ? '동성' : '무관'
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalExpectedCost, setTotalExpectedCost] = useState(null);
  const { latitude, longitude } = usePosition();
  const { seq: currentUserSeq } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 모든 택시 파티 멤버 조회
        const members = await getAllTaxiPartyMembersApi(taxiSeq);

        // 1-1. routeRank로 정렬
        const sortedMembers = members.sort((a, b) => a.routeRank - b.routeRank);
        setDestinations(sortedMembers);

        // 2. 현재 사용자 정보 가져오기
        const userInfo = await getUserInfoApi({ userSeq: currentUserSeq });
        setCurrentUser(userInfo);

        // 3. 각 멤버의 정보 가져오기 (프로필 이미지 및 이름)
        const userInfoMap = {};
        for (const member of members) {
          const info = await getUserInfoApi({ userSeq: member.userSeq });
          userInfoMap[member.userSeq] = info;
        }
        setUserInfos(userInfoMap);

        // 초기 결제자 설정
        if (members.length > 0) {
          setPaymentUser(taxiParty.master);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [taxiSeq, currentUserSeq]);

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
    // 드래그가 끝난 후 순서를 기준으로 routeRank 재설정
    const updatedDestinations = destinations.map((dest, index) => ({
      ...dest,
      routeRank: index + 1, // 1부터 시작하는 순서로 설정
    }));
    setDestinations(updatedDestinations);
    setDraggingIndex(null);
  };

  const handleCheckExpectedCost = async () => {
    try {
      const locations = [
        { lat: latitude, lon: longitude }, // 현재 위치를 첫번째로 추가
        ...destinations.map((dest) => ({
          lat: dest.destiLat,
          lon: dest.destiLon,
        })),
      ];

      const users = destinations.map((dest) => ({
        userSeq: dest.userSeq,
        cost: dest.cost,
      }));

      const params = {
        locations,
        users,
      };

      const result = await calculateTotalExpectedCostApi(params);
      console.log('result: ', result);
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
    const genderValue = genderPreference === '동성';

    const params = {
      taxiSeq,
      master: paymentUser,
      max: userCount,
      gender: genderValue,
    };

    try {
      // 1. 택시 파티 업데이트 API 호출
      console.log('Updating taxi party with params:', params); // API 호출 전 파라미터 확인
      const updateResponse = await updateTaxiPartyApi(params);
      console.log('Update response:', updateResponse); // API 응답 확인

      console.log('destinations :', destinations);
      // 2. 목적지 순서 설정 API 호출
      for (let i = 0; i < destinations.length; i++) {
        const rankParams = {
          taxiSeq,
          destiName: destinations[i].destiName,
          routeRank: i + 1,
        };
        console.log('Rank params: ', rankParams); // API 호출 전 파라미터 확인
        const rankResponse = await setDestinationRankApi(rankParams);
      }

      console.log('All API calls successful, navigating...');
      // API 호출이 성공하면 채팅 페이지로 이동
      navigate(`/chat/taxi/${taxiParty.roomSeq}`, {
        state: {
          roomSeq: taxiParty.roomSeq,
          taxiSeq,
        },
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      // alert('설정 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {}
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
                      src={getProfileImagePath(
                        userInfos[item.userSeq]?.imageNo || 1
                      )}
                      alt={`${userInfos[item.userSeq]?.userName || 'Unknown'} 프로필 사진`}
                      className="w-9 h-9 mb-1"
                    />
                    <span className="text-xs font-bold">
                      {userInfos[item.userSeq]?.userName || 'Unknown'}
                    </span>
                  </div>
                  <span className="text-sm text-black ml-2">
                    {item.destiName}
                  </span>
                  <img
                    src={changeOrderIcon}
                    alt="경로 순서 변경"
                    className="w-4 h-3.5 ml-auto"
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
            onChange={(e) => setPaymentUser(parseInt(e.target.value, 10))}
            className="h-12 mt-2 bg-neutral-100 w-full rounded border-r-8 border-transparent px-4 text-sm shadow-md"
          >
            {destinations.map((item) => (
              <option key={item.userSeq} value={item.userSeq}>
                {userInfos[item.userSeq]?.userName || 'Unknown'}
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
        currentUser={currentUser}
        totalExpectedCost={totalExpectedCost} // 총 예상 비용 전달
      />
    </div>
  );
}

export default TaxiChattingSettingPage;
