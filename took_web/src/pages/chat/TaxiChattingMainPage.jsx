import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/common/BackButton';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useUser } from '../../store/user';
import { getChatRoomMessageApi, getUsersApi } from '../../apis/chat/chat';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { formatDateOnly, formatTime } from '../../utils/formatDate';
import speaker from '../../assets/common/speaker.png';
import listIcon from '../../assets/chat/list.png';
import locationIcon from '../../assets/chat/location.png';
import boardIcon from '../../assets/chat/boardTaxi.png';
import doneIcon from '../../assets/chat/doneTaxi.png';
import { FaPaperPlane, FaArrowDown, FaBars } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa6';
import { MdAdd } from 'react-icons/md';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ParticipantList from '../../components/chat/ParticipantList';
import { updateTaxiPartyStatusApi } from '../../apis/taxi'; // Import the new API function
import TaxiChattingMenu from '../../components/taxi/TaxiChattingMenu';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// todo: 특정 채팅방에 속한 유저 조회 api 연동 -> userSeq, userName, imageNo 가져오기

// todo: 택시 파티 모든 멤버 조회 api 연동
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

// todo: useUser로 현재 로그인한 사용자 데이터와 연동
const tempUser = {
  user_seq: 1,
  userName: '차민주',
  imgNo: 19,
  gender: false,
};

// todo: 특정 택시 파티 조회 api 연동해서 데이터 가져오기
const tempTaxi = {
  taxi_seq: 1,
  user_seq: 1,
  room_seq: 1,
  party_seq: 1,
  room_title: '강서구 명지동',
  gender: false,
  count: 4,
  max: 4,
  status: 'OPEN',
  created_at: '2024-07-06T00:23:00',
  finishTime: '2024-07-06T18:30:00',
  cost: 37000,
  master: 1,
  payer: 1,
};

// todo: 채팅방의 모든 메시지 조회 api 연동
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
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [taxiStatus, setTaxiStatus] = useState(tempTaxi.status);
  const [showSettlementButton, setShowSettlementButton] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
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
    return user ? user.imgNo : 1;
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
    openModal(`${userName}님을 채팅방에서\n내보내시겠습니까?`);
  };

  const handleLeaveChatting = () => {
    openModal('채팅방을 나가시겠습니까?');
  };

  const handleConfirmLeaveChatting = () => {
    navigate('/chat/list');
    closeModal();
  };

  const handleBoardTaxi = async () => {
    openModal('탑승 처리하시겠습니까?');
  };

  const handleDoneTaxi = async () => {
    openModal('하차 처리하시겠습니까?');
  };

  const handleConfirmBoardTaxi = async () => {
    await updateTaxiPartyStatusApi({ taxiSeq: tempTaxi.taxi_seq });
    setTaxiStatus('BOARD');
    closeModal();
  };

  const handleConfirmDoneTaxi = async () => {
    await updateTaxiPartyStatusApi({ taxiSeq: tempTaxi.taxi_seq });
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
      const updateStatus = async () => {
        await updateTaxiPartyStatusApi({ taxiSeq: tempTaxi.taxi_seq });
        setTaxiStatus('FILLED');
      };
      updateStatus();
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
        <TaxiChattingMenu
          tempMember={tempMember}
          tempTaxi={tempTaxi}
          taxiStatus={taxiStatus}
          handleMenuToggle={handleMenuToggle}
          handleKickMember={handleKickMember}
          handleLeaveChatting={handleLeaveChatting}
          handleChatSetting={handleChatSetting}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center text-center text-base items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-64">
            <p className="whitespace-pre-line mb-4">{modalMessage}</p>
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
                className={`flex ${
                  msg.user_seq === 1 ? 'justify-end' : 'justify-start'
                }`}
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
                      className={`text-[9px] mb-1 text-black ${
                        msg.user_seq === 1 ? 'text-right' : 'text-left'
                      }`}
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
                      className={`p-2 rounded-xl shadow-md ${
                        msg.user_seq === 1
                          ? 'bg-main text-white'
                          : 'bg-white text-black'
                      }`}
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
        className={`absolute bottom-0 left-0 w-full ${
          isKeyboardVisible ? 'hidden' : ''
        }`}
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
              className={`text-gray-400 cursor-pointer mr-2 w-6 h-6 transform transition-transform ${
                showActionIcons ? 'rotate-45' : ''
              }`}
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
              className={`absolute inset-y-1 right-0 px-3 py-2 ${
                inputMessage.trim() === '' ? 'bg-gray-300' : 'bg-main'
              } text-white rounded-2xl mr-2 flex items-center justify-center focus:outline-none`}
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
