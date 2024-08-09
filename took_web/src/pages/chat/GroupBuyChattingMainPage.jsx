// GroupBuyChattingMainPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsTruck } from 'react-icons/bs';
import { formatTime } from '../../utils/formatDate';
import { useUser } from '../../store/user';
import speaker from '../../assets/common/speaker.png';
import calculator from '../../assets/chat/calculator.png';
import { PiHandArrowDown } from 'react-icons/pi';
import {
  FaChevronUp,
  FaChevronDown,
  FaPaperPlane,
  FaArrowDown,
  FaBars,
} from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import CalculatorModal from '../../components/chat/CalculatorModal';
import MoneyModal from '../../components/chat/MoneyModal';
import ParticipantList from '../../components/chat/ParticipantList';
import ArrivalNotificationModal from '../../components/chat/ArrivalNotificationModal';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getChatRoomMessageApi, getUsersApi } from '../../apis/chat/chat';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// todo: 실제 데이터와 연결 필요
const tempMember = [
  {
    member_seq: 1,
    party_seq: 1,
    user_seq: 1,
    userName: '조현정',
    imgNo: 19,
    cost: 13000,
    real_cost: 12000,
    status: true,
    receive: false,
    is_leader: true,
    created_at: '2024-07-06T00:23:00',
  },
  {
    member_seq: 2,
    party_seq: 1,
    user_seq: 2,
    userName: '정희수',
    imgNo: 12,
    cost: 8000,
    real_cost: 7500,
    status: true,
    receive: false,
    is_leader: false,
    created_at: '2024-07-06T00:23:00',
  },
  {
    member_seq: 3,
    party_seq: 1,
    user_seq: 3,
    userName: '차민주',
    imgNo: 2,
    cost: 16000,
    real_cost: 14500,
    status: true,
    receive: false,
    is_leader: false,
    created_at: '2024-07-06T00:23:00',
  },
  {
    member_seq: 4,
    party_seq: 1,
    user_seq: 4,
    userName: '이재찬',
    imgNo: 8,
    cost: 16000,
    real_real_cost: 14500,
    status: true,
    receive: false,
    is_leader: false,
    created_at: '2024-07-06T00:23:00',
  },
];

const tempData = {
  shopSeq: 8, // 채팅방 연결 전까지는 임시로 8번으로 !!
  id: 1,
  title: '마이프로틴 공동구매 모집합니다',
  site: '마이프로틴',
  item: '프로틴',
  content: `마프대란 프로틴 같이 공동구매 하실 분 구해요
              <br />
              <br />
              8만원 이상 채워서 주문하고 싶어요! 같이 쿠폰 적용해서 주문해요!!!`,
  place: '송정삼정그린코아더시티 1층',
  current_person: 4,
  max_person: 6,
  img_no: 1,
  visit: 1,
  created_at: new Date(),
};

const tempMessages = [
  {
    id: 1,
    user_seq: 1,
    userName: '조현정',
    message:
      '여러분, 구매 사이트 확인하시고 각자 구매 정보 등록 부탁드립니다 :)',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 2,
    user_seq: 3,
    userName: '차민주',
    message: '네엡',
    timestamp: '2024-07-06T10:14:00',
  },
  {
    id: 3,
    user_seq: 2,
    userName: '정희수',
    message: '저 3천원치만 함께 주문해도 괜찮을까요?',
    timestamp: '2024-07-06T10:15:00',
  },
  {
    id: 4,
    user_seq: 4,
    userName: '이재찬',
    message: '넵! 상관 없을 것 같아요~!',
    timestamp: '2024-07-06T11:09:00',
  },
  {
    id: 5,
    user_seq: 2,
    userName: '정희수',
    message: '저도요~',
    timestamp: '2024-07-06T11:24:00',
  },
  {
    id: 6,
    user_seq: 1,
    userName: '조현정',
    message: '6시까지 다른분들 기다렸다가 주문하겠습니다 :-)',
    timestamp: '2024-07-06T12:26:00',
  },
  {
    id: 7,
    user_seq: 3,
    userName: '차민주',
    message: '넵! 감사합니다!',
    timestamp: '2024-07-06T13:45:00',
  },
  {
    id: 8,
    user_seq: 4,
    userName: '이재찬',
    message: '좋은아침입니다!',
    timestamp: '2024-07-07T08:18:00',
  },
];

function GroupBuyChattingMainPage() {
  const { id } = useParams();
  const { seq } = useUser();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [messages, setMessages] = useState(tempMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);
  const lastDateRef = useRef('');
  const textareaRef = useRef(null);
  const stompClient = useRef(null);
  const currentSubscription = useRef(null);
  const chatRoom = location.state?.chatRoom || null;
  console.log('chatRoom', chatRoom);

  useEffect(() => {
    const socket = new SockJS(`${SERVER_URL}/ws`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      console.log('WebSocket connected');
      enterRoom();
      loadUsers();
    });
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const enterRoom = () => {
    if (currentSubscription.current) {
      currentSubscription.current.unsubscribe();
    }
    currentSubscription.current = subscribeToRoomMessages(id);
    fetchRoomMessages();
  };

  const subscribeToRoomMessages = (roomSeq) => {
    return stompClient.current.subscribe(
      `/sub/chat/room/${roomSeq}`,
      (message) => {
        const data = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    );
  };

  const fetchRoomMessages = async () => {
    try {
      const response = await getChatRoomMessageApi({
        roomSeq: id,
        userSeq: seq,
      });
      setMessages(response);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsersApi(id);
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 1;
    setShowScrollButton(!isAtBottom);
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 72)}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const messageRequest = {
      type: 'TALK',
      roomSeq: id,
      userSeq: seq,
      message: inputMessage,
    };

    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        '/pub/message/send',
        {},
        JSON.stringify(messageRequest)
      );
      setInputMessage('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  const leaveRoom = ({ roomSeq, userSeq }) => {
    if (stompClient.current && stompClient.current.connected) {
      const leaveRequest = { roomSeq, userSeq };
      stompClient.current.send(
        '/pub/room/leave',
        {},
        JSON.stringify(leaveRequest)
      );
    }
    navigate(-1);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 1;
    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollButton(false);
  };

  const toggleActionIcons = () => {
    setShowActionIcons(!showActionIcons);
  };

  const openModal = (modalType) => {
    setCurrentModal(modalType);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const handleShowParticipantList = () => {
    setShowParticipantList(true);
  };

  const handleCloseParticipantList = () => {
    setShowParticipantList(false);
  };

  const handleShowArrivalModal = () => {
    setShowArrivalModal(true);
  };

  const handleCloseArrivalModal = () => {
    setShowArrivalModal(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-[#FFF7ED] max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-5 py-3">
        <BackButton />
        <div className="mt-3 flex-grow text-center text-base font-bold text-black">
          {chatRoom?.roomTitle || '채팅방'}
        </div>
        <FaBars className="mt-2.5" onClick={handleShowParticipantList} />
      </div>
      <div className="mt-1 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

      <div className="w-full px-2 py-1">
        <div
          className={`flex items-start p-2 m-1 rounded-lg shadow-md ${isCollapsed ? 'bg-opacity-80 bg-white shadow-none' : 'bg-white'}`}
        >
          <img src={speaker} alt="speaker" className="w-6 h-6 ml-1" />
          <div className="ml-2 flex-grow">
            <div className="text-sm mt-[2px]"></div>
            {!isCollapsed && (
              <div className="text-xs flex-col gap-2 justify-between flex py-2">
                <div className="mb-1.5">
                  물품명 <span className="ml-5">{tempData.item}</span>
                </div>
                <div className="mb-1.5">
                  구매링크
                  <a
                    href="https://www.myprotein.co.kr"
                    className="underline ml-3 overflow-hidden "
                  >
                    https://www.myprotein.co.kr
                  </a>
                </div>
                <div>
                  수령장소 <span className="ml-2">{tempData.place}</span>
                </div>
              </div>
            )}
            {/* <div className="mt-1 w-full border-1 border-solid bg-black min-h-[0.5px]" /> */}
            {/* <div className="text-xs mt-2 mb-1 mr-3 ml-1 flex justify-between">
              <span onClick={() => navigate('/groupbuy/order')}>
                상품 주문 정보 등록
              </span>{' '}
              |
              <button
                onClick={handleShowArrivalModal}
                className="focus:outline-none"
              >
                물품 도착 !
              </button>{' '}
              |
              <span onClick={() => navigate('/groupbuy/order')}>
                전체 구매 정보
              </span>
            </div> */}
          </div>
          <button onClick={toggleCollapse} className="focus:outline-none">
            {isCollapsed ? (
              <FaChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <FaChevronUp className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div
        className="flex-grow overflow-y-scroll px-4 py-2 space-y-4 relative"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => {
            const { userSeq, message: text, createdAt } = message;
            const isCurrentUser = userSeq === seq;
            const messageDate = new Date(createdAt);
            const formattedTime = formatTime(messageDate);

            const user = users.find((user) => user.userSeq === userSeq);
            const userProfileImage = user
              ? getProfileImagePath(user.imageNo)
              : '';
            const userName = user ? user.userName : '';

            return (
              <div
                key={index}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}
              >
                {isCurrentUser ? (
                  <>
                    <div className="flex items-end flex-col mr-2">
                      {/* <span className="text-xs text-gray-500 text-right mb-1">{userName}</span> */}
                      <div className="flex items-end ">
                        <div className="text-[10px] text-gray-500 top-full mr-2 left-0 mt-1">
                          {formattedTime}
                        </div>
                        <div className="px-4 py-2 rounded-xl max-w-xs shadow-md bg-main text-white relative">
                          {text}
                        </div>
                      </div>
                    </div>
                    <img
                      src={userProfileImage}
                      alt={userName}
                      className="w-8 h-8 ml-2"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={userProfileImage}
                      alt={userName}
                      className="w-8 h-8 mr-2 mt-2"
                    />
                    <div className="flex items-start flex-col ml-2">
                      <span className="text-xs text-gray-500 text-left mb-1">
                        {userName}
                      </span>
                      <div className="flex items-end">
                        <div className="px-4 py-2 rounded-xl max-w-xs shadow-md bg-white relative">
                          {text}
                        </div>
                        <div className="text-[10px] text-gray-500  mt-1 ml-2">
                          {formattedTime}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center rounded-xl m-2 text-sm py-1 shadow bg-gray-500 bg-opacity-10">
            메시지가 없습니다.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 p-2 bg-main text-white rounded-full"
        >
          <FaArrowDown />
        </button>
      )}

      {/* <div className="w-full px-2 py-2 bg-white flex items-center relative">
        <button onClick={toggleActionIcons} className="focus:outline-none">
          <MdAdd
            className={`text-gray-400 cursor-pointer mr-2 w-6 h-6 transform transition-transform ${showActionIcons ? 'rotate-45' : ''}`}
          />
        </button>
        <div className="relative flex-grow">
          <textarea
            ref={textareaRef}
            className="flex-grow w-full pl-4 pr-10 py-2 rounded-2xl bg-gray-100 focus:outline-none resize-none max-h-24"
            placeholder="채팅 메시지 보내기"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows={1}
            style={{ overflow: 'hidden' }}
          />
          <button
            className={`absolute right-2 bottom-3.5 px-3 py-1.5 ${inputMessage.trim() === '' ? 'bg-gray-300' : 'bg-main'} text-white rounded-2xl flex items-center justify-center focus:outline-none`}
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
          >
            <FaPaperPlane className="w-5 h-4" />
          </button>
        </div>
        
      </div> */}
      <div className="flex flex-col">
        <div className="relative bottom-0 left-0 right-0 bg-white p-2 shadow-md flex items-center">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows="1"
            onKeyDown={handleKeyPress}
            className="flex-grow p-2 border rounded-lg resize-none overflow-hidden"
            placeholder="메시지를 입력하세요"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-main text-white rounded-full"
          >
            <FaPaperPlane />
          </button>
          <MdAdd
            onClick={toggleActionIcons}
            className="ml-2 text-2xl text-main cursor-pointer"
          />
        </div>
      </div>

      {showActionIcons && (
        <div
          className="w-full px-4 py-12 bg-white flex justify-around"
          ref={actionIconsRef}
        >
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-11 h-11 rounded-full bg-[#AEC8F0] flex items-center justify-center"
              onClick={() => openModal('calculator')}
            >
              <img src={calculator} alt="정산" className="w-6 h-6" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">정산</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <div
              className="w-11 h-11 rounded-full bg-[#E4C0ED] flex items-center justify-center"
              onClick={() => navigate(`/groupbuy/order/${tempData.shopSeq}`)}
            >
              <BsTruck className="text-white w-7 h-7" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">배송</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full bg-[#D2ACA4] flex items-center justify-center"
              onClick={() => navigate(`/groupbuy/total/${tempData.shopSeq}`)}
            >
              <AiOutlineInfoCircle className="text-white w-6 h-6" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">주문 정보</span>
          </div>
          <div
            onClick={handleShowArrivalModal}
            className="flex flex-col items-center"
          >
            <div className="w-11 h-11 rounded-full bg-[#C0E0A0] flex items-center justify-center">
              <PiHandArrowDown className="text-white w-6 h-6" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">수령 확인</span>
          </div>
        </div>
      )}

      {currentModal === 'money' && (
        <MoneyModal onClose={closeModal} tempMember={tempMember} />
      )}
      {currentModal === 'calculator' && (
        <CalculatorModal onClose={closeModal} tempMember={tempMember} />
      )}

      {showParticipantList && (
        <ParticipantList
          participants={users}
          onClose={handleCloseParticipantList}
          onSignOut={leaveRoom}
          leaderSeq={chatRoom.userSeq}
        />
      )}
      {showArrivalModal && (
        <ArrivalNotificationModal
          members={tempMember}
          onClose={handleCloseArrivalModal}
          shopSeq={tempData.shopSeq}
        />
      )}
    </div>
  );
}

export default GroupBuyChattingMainPage;
