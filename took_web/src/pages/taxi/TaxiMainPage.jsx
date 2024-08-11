import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/delivery/whiteBack.svg';
import plusIcon from '../../assets/taxi/plus.png'; // '+' 아이콘 경로
import enterIcon from '../../assets/taxi/enter.png'; // 입장 가능 아이콘
import notEnterIcon from '../../assets/taxi/notEnter.png'; // 입장 불가능 아이콘
import locationIcon from '../../assets/taxi/location.png';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { useUser } from '../../store/user.js';
import { usePosition } from '../../store/position.js';
import { getNearByUserPositionApi } from '../../apis/position/userPosition.js';
import {
  getTaxiPartyListApi,
  getTaxiPartyPathApi,
  addTaxiPartyMemberApi,
  isUserJoinedTaxiPartyApi,
  getAllTaxiPartyMembersApi,
  updateTaxiPartyStatusApi,
} from '../../apis/taxi.js';
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
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태

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

    // 유저 정보 가져옴 (성별 확인을 위해)
    const fetchUserGender = async () => {
      try {
        const userInfo = await getUserInfoApi({ userSeq });
        setUserGender(userInfo.gender);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    // 근처 유저
    const fetchTaxiParties = async () => {
      try {
        const nearbyUsers = await getNearByUserPositionApi({
          userSeq,
          lat: latitude,
          lon: longitude,
        });
        const userSeqs = nearbyUsers.map((user) => user.userSeq);
        userSeqs.push(userSeq);

        // 파티 리스트 조회
        const taxiPartyList = await getTaxiPartyListApi({ userSeqs });

        const taxiPartiesData = await Promise.all(
          taxiPartyList.map(async (party) => {
            const userInfo = await getUserInfoApi({ userSeq: party.userSeq });

            const taxiPathResponse = await getTaxiPartyPathApi(party.taxiSeq);

            const taxiPath = Array.isArray(taxiPathResponse)
              ? taxiPathResponse
              : [];

            const destinations = [...new Set(taxiPath.map((path) => path.destiName))];

            // count와 max 비교하여 status 업데이트
            if (party.count >= party.max + 1) {
              await updateTaxiPartyStatusApi({ taxiSeq: party.taxiSeq, status: 'FILLED' });
              party.status = 'FILLED';
            }

            return {
              ...party,
              imgNo: userInfo.imageNo,
              userGender: userInfo.gender,
              destinations,
              taxiPath,
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

  // 채팅방 입장
  const handleEnterChatRoom = (chatRoomId, taxiSeq, roomSeq) => {
    navigate(`/chat/taxi/${chatRoomId}`, {
      state: { taxiSeq, roomSeq },
    });
  };

  // 택시 파티 참여 또는 채팅방 입장
  const handleAddMemberOrEnterChat = async (item) => {
    try {
      // 1. 기존 멤버 중복 체크
      const allMembers = await getAllTaxiPartyMembersApi(item.taxiSeq);
      const isAlreadyMember = allMembers.some(
        (member) => member.userSeq === userSeq
      );

      // 2. 이미 참여 중이면 바로 채팅방으로 이동
      if (isAlreadyMember) {
        handleEnterChatRoom(item.roomSeq, item.taxiSeq, item.roomSeq);
        return;
      }

      // 3. 'FILLED' 상태 체크
      if (item.status === 'FILLED') {
        setModalMessage('해당 택시 took은 \n모집이 완료되었습니다.');
        return;
      }

      // 4. 다른 파티에 참여 중인지 확인
      const userStatus = await isUserJoinedTaxiPartyApi(userSeq);

      if (userStatus.isJoined) {
        setModalMessage('이미 다른 택시 took에 참여중입니다.');
        return;
      }

      // 5. 다른 파티에 참여 중이지 않으면 멤버 추가 후 채팅방으로 이동
      const memberData = {
        taxiSeq: item.taxiSeq,
        userSeq: userSeq,
        destiName: item.taxiPath[0].destiName,
        destiLat: item.taxiPath[0].destiLat,
        destiLon: item.taxiPath[0].destiLon,
        cost: item.taxiPath[0].cost,
        routeRank: item.taxiPath[0].routeRank,
      };

      const response = await addTaxiPartyMemberApi(memberData);
      if (response) {
        console.log('Member added successfully:', response);
        handleEnterChatRoom(item.roomSeq, item.taxiSeq, item.roomSeq);
      }
    } catch (error) {
      console.error('Error processing taxi party participation:', error);
    }
  };

  const handleCreateTaxi = () => {
    navigate('/taxi/create');
  };

  const closeModal = () => {
    setModalMessage('');
  };

  const filteredData = taxiParties.filter((item) => {
    if (item.gender === false) {
      return true;
    }
    return item.userGender === userGender;
  });

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen bg-main mb-12">
      <div className="bg-main py-4">
        <div className="flex items-center px-4 relative mb-4 mt-3">
          <BackButton />
          <div className="flex-grow text-center text-2xl font-bold text-white">
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
                        ? userGender === 'M'
                          ? 'bg-blue-200 text-blue-600'
                          : 'bg-pink-200 text-pink-600'
                        : 'bg-blue-200 text-blue-600'
                    }`}
                  >
                    {item.gender
                      ? userGender === 'M'
                        ? '남성'
                        : '여성'
                      : '무관'}
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
                    handleAddMemberOrEnterChat(item);
                  }}
                >
                  <img
                    src={item.status === 'FILLED' ? notEnterIcon : enterIcon}
                    alt="enter status"
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs font-semibold text-gray-700">
                  {item.count} / {item.max + 1}
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

      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 whitespace-pre-line">
          <div
            className="bg-white p-6 rounded-xl shadow-lg"
            style={{ width: '250px' }}
          >
            <p
              className="text-center font-semibold"
              style={{ fontSize: '16px' }}
            >
              {modalMessage}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-neutral-300 text-white font-bold rounded-xl mx-auto block"
              onClick={closeModal}
              style={{ width: '100px' }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaxiMainPage;
