import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/common/BackButton';
import { useNavigate } from 'react-router-dom';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { formatDateOnly, formatTime } from '../../utils/formatDate';
import speaker from '../../assets/common/speaker.png';
import listIcon from '../../assets/chat/list.png';
import locationIcon from '../../assets/chat/location.png';
import boardIcon from '../../assets/chat/boardTaxi.png';
import doneIcon from '../../assets/chat/doneTaxi.png';
import {
  FaPaperPlane,
  FaArrowDown,
  FaTimes,
  FaBars,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { FaLocationDot, FaCrown, FaCalculator } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';

const tempMember = [
  {
    member_seq: 1,
    party_seq: 1,
    user_seq: 1,
    userName: '차민주',
    imgNo: 19,
    cost: 13000,
    real_cost: 12000,
    status: true,
    receive: false,
    is_leader: true,
    gender: false,
    created_at: '2024-07-06T00:23:00',
    destination: '부산시 강서구 녹산산단335로 7 송정삼정그린코아더시티',
  },
  {
    member_seq: 2,
    party_seq: 1,
    user_seq: 2,
    userName: '조현정',
    imgNo: 20,
    cost: 8000,
    real_cost: 7500,
    status: true,
    receive: false,
    is_leader: false,
    gender: false,
    created_at: '2024-07-06T00:23:00',
    destination: '부산시 강서구 명지국제5로 170-5 명일초등학교',
  },
  {
    member_seq: 3,
    party_seq: 1,
    user_seq: 3,
    userName: '정희수',
    imgNo: 18,
    cost: 16000,
    real_cost: 14500,
    status: true,
    receive: false,
    is_leader: false,
    gender: false,
    created_at: '2024-07-06T00:23:00',
    destination: '부산시 서구 대영로73번길 39',
  },
];

const tempUser = {
  user_seq: 1,
  userName: '차민주',
  imgNo: 19,
  gender: false,
};

const tempTaxi = {
  taxi_seq: 1,
  user_seq: 1,
  room_seq: 1,
  party_seq: 1,
  room_title: '강서구 명지동',
  gender: false, // 여성
  count: 3,
  max: 3,
  status: 'OPEN',
  created_at: '2024-07-06T00:23:00',
  finishTime: '2024-07-06T18:30:00',
  cost: 37000, // 현재 위치에서 목적지까지 예상 비용
  master: 1, // 방장
  payer: 1, // 결제자
};

const tempMessages = [
  {
    id: 1,
    user_seq: 1,
    userName: '차민주',
    message: '안녕하세요!목적지가 어디신가요?',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 2,
    user_seq: 2,
    userName: '조현정',
    message: '안녕하세요~ 강서구 녹산동에 삼정그린코아더시티 가능한가요?',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 3,
    user_seq: 1,
    userName: '차민주',
    message: '네 가능합니다! 경로에 추가해주세요',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 4,
    user_seq: 3,
    userName: '정희수',
    message: '안녕하세요~ 서구 동대신동2가에 삼익아파트 가능한가요?',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 5,
    user_seq: 1,
    userName: '차민주',
    message: '네 가능합니다! 경로에 추가해주세요',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 6,
    user_seq: 3,
    userName: '정희수',
    message: '알겠습니다!',
    timestamp: '2024-07-06T10:12:00',
  },
];

function TaxiChattingMainPage() {
  const [messages, setMessages] = useState(tempMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // 메뉴 보이기 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달창 보이기 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가
  const [taxiStatus, setTaxiStatus] = useState(tempTaxi.status); // 택시 상태 추가
  const [showSettlementButton, setShowSettlementButton] = useState(false); // 정산 버튼 상태 추가
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // 키보드 보이기 상태 추가
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);
  const lastDateRef = useRef('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      user_seq: 1,
      userName: '차민주',
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowScrollButton(false);
    }, 100);
  };

  const getUserProfileImgNo = (user_seq) => {
    const user = tempMember.find((member) => member.user_seq === user_seq);
    return user ? user.imgNo : 1; // imgNo 기본값을 1로 설정
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100;
    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollButton(false);
  };

  const toggleActionIcons = () => {
    setShowActionIcons(!showActionIcons);
  };

  const handleClickOutside = (event) => {
    if (
      actionIconsRef.current &&
      !actionIconsRef.current.contains(event.target)
    ) {
      setShowActionIcons(false);
    }
  };

  const handleSettingDestination = () => {
    navigate('/taxi/path');
  };

  const handleCheckDestinationList = () => {
    navigate('/taxi/path-list');
  };

  const handleChatSetting = () => {
    navigate('/taxi/setting');
  };

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleKickMember = (userName) => {
    openModal(`${userName}님을 채팅방에서 내보내시겠습니까?`);
  };

  const handleLeaveChatting = () => {
    openModal('채팅방을 나가시겠습니까?');
  };

  const handleConfirmLeaveChatting = () => {
    navigate('/chat/list');
    closeModal();
  };

  const handleBoardTaxi = () => {
    openModal('탑승 처리하시겠습니까?');
  };

  const handleDoneTaxi = () => {
    openModal('하차 처리하시겠습니까?');
  };

  const handleConfirmBoardTaxi = () => {
    setTaxiStatus('BOARD');
    closeModal();
  };

  const handleConfirmDoneTaxi = () => {
    setTaxiStatus('DONE');
    setShowSettlementButton(true);
    closeModal();
  };

  const handleSettlement = () => {
    navigate('/taxi/input');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 1;
    setShowScrollButton(!isAtBottom);
  }, [messages]);

  useEffect(() => {
    if (tempTaxi.count === tempTaxi.max) {
      setTaxiStatus('FILLED');
    }
  }, [tempTaxi.count]);

  useEffect(() => {
    const handleKeyboardShow = () => {
      setIsKeyboardVisible(true);
    };
    const handleKeyboardHide = () => {
      setIsKeyboardVisible(false);
    };

    window.addEventListener('keyboardDidShow', handleKeyboardShow);
    window.addEventListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      window.removeEventListener('keyboardDidShow', handleKeyboardShow);
      window.removeEventListener('keyboardDidHide', handleKeyboardHide);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#FFF7ED] max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-5 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          {tempTaxi.room_title}
        </div>
        <FaBars className="mt-2.5" onClick={handleMenuToggle} />
      </div>

      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-4/5 h-full bg-white shadow-md p-4 relative">
            <button
              onClick={handleMenuToggle}
              className="text-gray-400 focus:outline-none absolute top-5 right-4"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="text-base font-bold mt-6 ml-1 mb-4">경로</div>
            <ul>
              {tempMember.map((member) => (
                <li
                  key={member.user_seq}
                  className="flex items-center justify-between mb-2 py-1"
                >
                  <div className="items-center flex flex-row text-sm text-black">
                    <FaLocationDot className="mr-1 w-4 h-4 text-neutral-300" />
                    <span className="px-2">{member.destination}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

            <h2 className="text-base font-bold mt-6 mb-4 ml-1">참여자</h2>
            <ul>
              {tempMember.map((member) => (
                <li
                  key={member.user_seq}
                  className="flex items-center justify-between mb-2 ml-1"
                >
                  <div className="flex items-center py-2">
                    <img
                      src={getProfileImagePath(member.imgNo)}
                      alt={member.userName}
                      className="w-8 h-8 mr-2"
                    />
                    <span className="text-sm">{member.userName}</span>
                    {tempTaxi.user_seq === member.user_seq && (
                      <div className="ml-1 text-xs bg-neutral-400 px-1.5 py-1 rounded-full text-white">
                        나
                      </div>
                    )}
                    {tempTaxi.master === member.user_seq && (
                      <FaCrown className="text-yellow-500 ml-1 w-5" />
                    )}
                  </div>
                  {tempTaxi.user_seq === tempTaxi.payer &&
                    member.user_seq === tempTaxi.payer && (
                      <div className="ml-1 text-xs bg-main px-2 py-1 rounded-lg shadow-sm text-white">
                        결제자
                      </div>
                    )}
                  {tempTaxi.user_seq === tempTaxi.master &&
                    member.user_seq !== tempTaxi.master && (
                      <button
                        className="text-red-600 border-2 border-red-600 rounded-lg py-1 px-2 text-xs"
                        onClick={() => handleKickMember(member.userName)}
                      >
                        내보내기
                      </button>
                    )}
                </li>
              ))}
            </ul>
            {taxiStatus !== 'BOARD' && taxiStatus !== 'DONE' && (
              <button
                className="absolute bottom-4 left-4 text-gray-400"
                onClick={handleLeaveChatting}
              >
                <FaSignOutAlt className="w-6 h-6" />
              </button>
            )}
            {tempTaxi.master === tempTaxi.user_seq && (
              <button
                className="absolute bottom-4 right-4 text-gray-400"
                onClick={handleChatSetting}
              >
                <IoIosSettings className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center text-center text-base items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-64">
            <p className="mb-4">{modalMessage}</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-black text-sm px-8 py-2 rounded-lg font-bold"
              >
                취소
              </button>
              {modalMessage === '채팅방을 나가시겠습니까?' ? (
                <button
                  onClick={handleConfirmLeaveChatting}
                  className="bg-main text-white text-sm px-8 py-2 rounded-lg font-bold"
                >
                  확인
                </button>
              ) : modalMessage === '탑승 처리하시겠습니까?' ? (
                <button
                  onClick={handleConfirmBoardTaxi}
                  className="bg-main text-white text-sm px-8 py-2 rounded-lg font-bold"
                >
                  확인
                </button>
              ) : (
                <button
                  onClick={handleConfirmDoneTaxi}
                  className="bg-main text-white text-sm px-8 py-2 rounded-lg font-bold"
                >
                  확인
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-2 py-1">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
          <img src={speaker} alt="speaker" className="w-6 h-6 mx-1" />
          <div className="text-sm text-gray-700">경로를 설정해주세요!</div>
        </div>
      </div>

      <div
        className="flex-grow overflow-y-scroll px-4 py-2 space-y-4 relative"
        onScroll={handleScroll}
        ref={scrollContainerRef}
        style={{ paddingBottom: '100px' }}
      >
        {messages.map((msg, index, array) => {
          const sameUserAndTime =
            index > 0 &&
            msg.user_seq === array[index - 1].user_seq &&
            msg.timestamp === array[index - 1].timestamp;
          const lastMessageFromSameUser =
            index < array.length - 1 &&
            msg.user_seq === array[index + 1].user_seq &&
            msg.timestamp === array[index + 1].timestamp;
          const showDate =
            lastDateRef.current !== formatDateOnly(msg.timestamp);
          lastDateRef.current = formatDateOnly(msg.timestamp);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="w-1/2 text-center text-xs mx-auto py-1 bg-neutral-200 bg-opacity-70 rounded-full text-black mt-2 mb-5">
                  {formatDateOnly(msg.timestamp)}
                </div>
              )}
              <div
                className={`flex ${msg.user_seq === 1 ? 'justify-end' : 'justify-start'}`}
              >
                {msg.user_seq !== 1 && (
                  <div className="flex flex-col items-center mr-2">
                    <img
                      src={getProfileImagePath(
                        getUserProfileImgNo(msg.user_seq)
                      )}
                      alt={msg.userName}
                      className="w-9 h-9 rounded-full self-start"
                    />
                  </div>
                )}
                <div className="flex flex-col max-w-[88%]">
                  {!sameUserAndTime && (
                    <span
                      className={`text-[9px] mb-1 text-black ${msg.user_seq === 1 ? 'text-right' : 'text-left'}`}
                    >
                      {msg.userName}
                    </span>
                  )}
                  <div className="flex items-end">
                    {msg.user_seq === 1 && !lastMessageFromSameUser && (
                      <div className="text-[9px] text-gray-400 mr-2 whitespace-nowrap">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                    <div
                      className={`p-2 rounded-xl shadow-md ${msg.user_seq === 1 ? 'bg-main text-white' : 'bg-white text-black'}`}
                    >
                      <div className="text-sm">{msg.message}</div>
                    </div>
                    {msg.user_seq !== 1 && !lastMessageFromSameUser && (
                      <div className="text-[9px] text-gray-400 ml-2 whitespace-nowrap">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
                {msg.user_seq === 1 && (
                  <div className="flex flex-col items-center ml-2">
                    <img
                      src={getProfileImagePath(
                        getUserProfileImgNo(msg.user_seq)
                      )}
                      alt={msg.userName}
                      className="w-9 h-9 rounded-full self-start"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full ${isKeyboardVisible ? 'hidden' : ''}`}
      >
        {showSettlementButton && (
          <button
            onClick={handleSettlement}
            className="w-full py-4 bg-neutral-400 text-white text-lg font-bold flex items-center justify-center"
          >
            <FaCalculator className="mr-2" />
            정산하기
          </button>
        )}
        <div className="w-full px-2 py-2 bg-white flex items-center relative">
          <button onClick={toggleActionIcons} className="focus:outline-none">
            <MdAdd
              className={`text-gray-400 cursor-pointer mr-2 w-6 h-6 transform transition-transform ${showActionIcons ? 'rotate-45' : ''}`}
            />
          </button>
          <div className="relative flex-grow">
            <input
              type="text"
              className="flex-grow w-full pl-4 pr-10 py-2 rounded-2xl bg-gray-100 focus:outline-none"
              placeholder="채팅 메시지 보내기 "
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className={`absolute inset-y-1 right-0 px-3 py-2 ${inputMessage.trim() === '' ? 'bg-gray-300' : 'bg-main'} text-white rounded-2xl mr-2 flex items-center justify-center focus:outline-none`}
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ''}
            >
              <FaPaperPlane className="w-5 h-4" />
            </button>
          </div>
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-16 right-4 p-2 bg-white text-gray-500 rounded-full shadow-md"
            >
              <FaArrowDown className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {showActionIcons && (
        <div
          className="w-full px-4 py-2 bg-white flex justify-around absolute bottom-14 left-0 z-50"
          ref={actionIconsRef}
        >
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-11 h-11 rounded-full bg-[#AEC8F0] flex items-center justify-center"
              onClick={handleSettingDestination}
            >
              <img src={locationIcon} alt="경로 설정" className="w-5 h-6" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">경로 설정</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full bg-[#E4C0ED] flex items-center justify-center"
              onClick={handleCheckDestinationList}
            >
              <img src={listIcon} alt="현재 경로 목록" className="w-5 h-6" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">
              현재 경로 목록
            </span>
          </div>
        </div>
      )}

      {tempTaxi.payer === tempUser.user_seq && (
        <>
          {taxiStatus === 'FILLED' && (
            <button
              onClick={handleBoardTaxi}
              className="absolute bottom-16 left-4"
            >
              <img src={boardIcon} alt="탑승하기" className="w-14 h-14" />
            </button>
          )}
          {taxiStatus === 'BOARD' && (
            <button
              onClick={handleDoneTaxi}
              className="absolute bottom-16 left-4"
            >
              <img src={doneIcon} alt="하차하기" className="w-14 h-14" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default TaxiChattingMainPage;
