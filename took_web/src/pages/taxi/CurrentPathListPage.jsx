import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';
import CheckExpectedCost from '../../components/taxi/CheckExpectedCost';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { calculateTotalExpectedCostApi } from '../../apis/taxi';
import { useLocation } from 'react-router-dom';
import { usePosition } from '../../store/position';
import { getUserInfoApi } from '../../apis/user';

function CurrentPathListPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalExpectedCost, setTotalExpectedCost] = useState(null);
  const [tempData, setTempData] = useState([]);
  const { latitude, longitude } = usePosition();
  const location = useLocation();
  const { members, taxiParty } = location.state || {};

  useEffect(() => {
    const fetchUserInfo = async () => {
      const updatedTempData = await Promise.all(
        members.map(async (member) => {
          try {
            const userInfo = await getUserInfoApi({ userSeq: member.userSeq });
            return {
              userName: userInfo.userName || 'Unknown', // 가져온 사용자 이름
              userId: member.userSeq,
              imgNo: userInfo.imageNo || 1, // 가져온 프로필 이미지 번호
              userDestination: member.destiName,
              latitude: member.destiLat,
              longitude: member.destiLon,
              expectedCost: member.cost,
            };
          } catch (error) {
            console.error(
              `Failed to fetch user info for userSeq: ${member.userSeq}`,
              error
            );
            return {
              userName: 'Unknown',
              userId: member.userSeq,
              imgNo: 1,
              userDestination: member.destiName,
              latitude: member.destiLat,
              longitude: member.destiLon,
              expectedCost: member.cost,
            };
          }
        })
      );
      setTempData(updatedTempData);
    };

    fetchUserInfo();
  }, [members]);

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
          <div key={item.userId}> {/* userId를 고유 key로 사용 */}
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
          tempUser={{ userName: '차민주', userId: 1 }} // 실제 사용자 정보로 교체 가능
          totalExpectedCost={totalExpectedCost}
        />
      )}
    </div>
  );
}

export default CurrentPathListPage;
