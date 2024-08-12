import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/taxi/plus.png'; // '+' 아이콘 경로
import enterIcon from '../../assets/taxi/enter.png'; // 입장 가능 아이콘
import notEnterIcon from '../../assets/taxi/notEnter.png'; // 입장 불가능 아이콘
import locationIcon from '../../assets/taxi/location.png';
import getProfileImagePath from '../../utils/getProfileImagePath';
import backIcon from '../../assets/delivery/whiteBack.svg';
import { useUser } from '../../store/user.js';
import { usePosition } from '../../store/position.js';
import { getNearByUserPositionApi } from '../../apis/position/userPosition.js';
import { getTaxiPartyListApi, getTaxiPartyPathApi } from '../../apis/taxi.js';
import { getUserInfoApi } from '../../apis/user.js';
import { getAddr } from '../../utils/map.js';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <img
      src={backIcon}
      alt="뒤로"
      className="w-6 h-6 mx-6 mt-1.5 absolute top-0 left-0"
      onClick={handleBackClick}
    />
  );
};

function TaxiMainPage() {
  const navigate = useNavigate();
  const user = useUser();
  const { seq: userSeq } = user;
  const { latitude, longitude } = usePosition();

  const [location, setLocation] = useState('');
  const [taxiParties, setTaxiParties] = useState([]);
  const [userGender, setUserGender] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      if (latitude && longitude) {
        try {
          const addr = await getAddr(latitude, longitude);
          setLocation(addr);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
    };

    const fetchUserGender = async () => {
      try {
        const userInfo = await getUserInfoApi({ userSeq });
        setUserGender(userInfo.gender);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchTaxiParties = async () => {
      try {
        const nearbyUsers = await getNearByUserPositionApi({
          userSeq,
          lat: latitude,
          lon: longitude,
        });
        const userSeqs = nearbyUsers.map((user) => user.userSeq);
        userSeqs.push(userSeq); // 나의 userSeq를 추가

        const taxiPartyList = await getTaxiPartyListApi({ userSeqs });

        const taxiPartiesData = await Promise.all(
          taxiPartyList.map(async (party) => {
            const userInfo = await getUserInfoApi({ userSeq: party.userSeq });

            const taxiPathResponse = await getTaxiPartyPathApi(party.taxiSeq);

            const taxiPath = Array.isArray(taxiPathResponse)
              ? taxiPathResponse
              : [];
            const destinations = taxiPath.map((path) => path.destiName);

            return {
              ...party,
              imgNo: userInfo.imageNo,
              userGender: userInfo.gender, // 작성자의 성별 추가
              destinations,
            };
          })
        );

        setTaxiParties(taxiPartiesData);
      } catch (error) {
        console.error('Error fetching taxi parties:', error);
      }
    };

    if (userSeq) {
      fetchLocation();
      fetchUserGender();
      fetchTaxiParties();
    }
  }, [userSeq, latitude, longitude]);

  const handleCreateTaxi = () => {
    navigate('/taxi/create');
  };

  const handleEnterChatRoom = (chatRoomId) => {
    navigate(`/chat/taxi/${chatRoomId}`);
  };

  // 필터링 로직 수정
  const filteredData = taxiParties.filter((item) => {
    if (item.gender === false) {
      return true; // gender가 false이면 무관이므로 항상 포함
    }
    return item.userGender === userGender; // 작성자의 성별과 현재 유저의 성별 비교
  });

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen bg-main">
      <div className="bg-main py-4">
        <div className="flex items-center px-4 relative mb-4 mt-3">
          <BackButton />
          <div className="flex-grow text-center text-2xl font-bold text-white">
            택시{' '}
            <span className="font-dela">
              took<span className="font-noto">!</span>
            </span>
          </div>
        </div>
        <div className="flex items-center px-4 mt-2">
          <img
            src={locationIcon}
            alt="location"
            className="w-4 h-4 mr-2 ml-2"
          />
          <div className="text-sm font-semibold text-gray-700">{location}</div>
        </div>
      </div>
      <div className="px-2 py-4 bg-white h-screen rounded-t-3xl overflow-y-auto">
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
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.gender === false
                        ? 'bg-white border border-neutral-300 text-gray-700'
                        : item.gender
                          ? 'bg-pink-200 text-pink-600'
                          : 'bg-blue-200 text-blue-600'
                    }`}
                  >
                    {item.gender ? '여성' : '무관'}
                  </div>
                </div>
                <div className="flex flex-wrap mb-2 overflow-x-auto space-x-1">
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
                    if (item.count < item.max) {
                      handleEnterChatRoom(item.chatRoomId);
                    }
                  }}
                >
                  <img
                    src={item.count < item.max ? enterIcon : notEnterIcon}
                    alt="enter status"
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs font-semibold text-gray-700">
                  {item.count} / {item.max}
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
