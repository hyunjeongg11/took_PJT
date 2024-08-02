// pages/chat/DeliveryChattingMainPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/common/BackButton';
import getProfileImagePath from '../../utils/getProfileImagePath';
import {
  formatDateOnly,
  formatTime,
  formatDateWithYear,
} from '../../utils/formatDate';
import speaker from '../../assets/common/speaker.png';
import delivery from '../../assets/chat/delivery.png';
import calculator from '../../assets/chat/calculator.png';
import money from '../../assets/chat/money.png';
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
import DeliveryModal from '../../components/chat/DeliveryModal';
import ParticipantList from '../../components/chat/ParticipantList';

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
    imgNo: 20,
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
    imgNo: 18,
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

const tempDelivery = {
  delivery_seq: 1,
  user_seq: 1,
  room_seq: 1,
  party_seq: 1,
  storeName: 'BBQ 명지점',
  pickupPlace: '송정삼정그린코아 1층',
  deliveryTip: 3500,
  deliveryTime: '2024-07-06T18:30:00',
  status: 'OPEN',
  created_at: '2024-07-06T00:23:00',
  finishTime: '2024-07-06T18:30:00',
};

const tempMessages = [
  {
    id: 1,
    user_seq: 1,
    userName: '조현정',
    message: '안녕하세요! BBQ 배달방이에요~',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 2,
    user_seq: 3,
    userName: '차민주',
    message: '안녕하세요! 메뉴 담을까요?',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 3,
    user_seq: 2,
    userName: '정희수',
    message: '네! 6시에 주문할 예정입니다.',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 4,
    user_seq: 4,
    userName: '이재찬',
    message: '저는 메뉴 다 담았습니다!',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 5,
    user_seq: 2,
    userName: '정희수',
    message: '저도요~',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 6,
    user_seq: 1,
    userName: '조현정',
    message: '6시까지 다른분들 기다렸다가 주문하겠습니다 :-)',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 7,
    user_seq: 3,
    userName: '차민주',
    message: '넵! 감사합니다!',
    timestamp: '2024-07-06T10:12:00',
  },
  {
    id: 8,
    user_seq: 4,
    userName: '이재찬',
    message: '좋은아침입니다!',
    timestamp: '2024-07-07T10:12:00',
  },
];

function DeliveryChattingMainPage() {
  const [messages, setMessages] = useState(tempMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);
  const lastDateRef = useRef('');
  const textareaRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      user_seq: 1,
      userName: '조현정',
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

  const handleClickOutside = (event) => {
    if (
      actionIconsRef.current &&
      !actionIconsRef.current.contains(event.target)
    ) {
      setShowActionIcons(false);
    }
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
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 72)}px`;
    }
  }, [inputMessage]);

  return (
    <div className="flex flex-col bg-[#FFF7ED] max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-5 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          {tempDelivery.storeName}
        </div>
        <FaBars className="mt-2.5" onClick={handleShowParticipantList} />
      </div>
      <div className="mt-1 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

      <div className="w-full px-2 py-1">
        <div className="flex items-start bg-white p-2 rounded-lg shadow-md">
          <img src={speaker} alt="speaker" className="w-6 h-6 ml-1" />
          <div className="ml-2 flex-grow">
            <div className="text-sm mt-[2px]">{tempDelivery.pickupPlace}</div>
            {!isCollapsed && (
              <div className="text-sm text-gray-500">
                함께 주문하기 :
                <a href="https://s.baemin.com/bfp.lty8b" className="underline">
                  {' '}
                  https://s.baemin.com/bfp.lty8b
                </a>
              </div>
            )}
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
        {messages.map((msg, index, array) => {
          const sameUserAndTime =
            index > 0 &&
            msg.user_seq === array[index - 1].user_seq &&
            formatTime(msg.timestamp) ===
              formatTime(array[index - 1].timestamp);
          const lastMessageFromSameUser =
            index < array.length - 1 &&
            msg.user_seq === array[index + 1].user_seq &&
            formatTime(msg.timestamp) ===
              formatTime(array[index + 1].timestamp);
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
                {msg.user_seq !== 1 && !sameUserAndTime && (
                  <div className="flex flex-col items-center mr-2">
                    <img
                      src={getProfileImagePath(
                        getUserProfileImgNo(msg.user_seq)
                      )}
                      alt={msg.userName}
                      className="w-9 h-9 self-start"
                    />
                  </div>
                )}
                <div className="flex flex-col max-w-[80%]">
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
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
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
                      className="w-9 h-9 self-start"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full px-2 py-2 bg-white flex items-center relative">
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
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-16 right-4 p-2 bg-white text-gray-500 rounded-full shadow-md"
          >
            <FaArrowDown className="w-3 h-3" />
          </button>
        )}
      </div>

      {showActionIcons && (
        <div
          className="w-full px-4 py-2 bg-white flex justify-around"
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
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full bg-[#E4C0ED] flex items-center justify-center"
              onClick={() => openModal('money')}
            >
              <img src={money} alt="주문금액" className="w-7 h-7" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">주문금액</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-full bg-[#D2ACA4] flex items-center justify-center"
              onClick={() => openModal('delivery')}
            >
              <img src={delivery} alt="배달" className="w-6 h-5" />
            </div>
            <span className="mt-1 text-[11px] text-gray-500">배달</span>
          </div>
        </div>
      )}

      {currentModal === 'calculator' && (
        <CalculatorModal onClose={closeModal} tempMember={tempMember} />
      )}
      {currentModal === 'money' && (
        <MoneyModal onClose={closeModal} tempMember={tempMember} />
      )}
      {currentModal === 'delivery' && (
        <DeliveryModal onClose={closeModal} tempMember={tempMember} />
      )}
      {showParticipantList && (
        <ParticipantList
          participants={tempMember}
          onClose={handleCloseParticipantList}
        />
      )}
    </div>
  );
}

export default DeliveryChattingMainPage;
