// pages/chat/ChattingMainPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/common/BackButton';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { getChatRoomMessageApi } from '../../apis/chat/chat';
import { useParams } from 'react-router-dom';
import { useUser } from '../../store/user';
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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


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


function ChattingMainPage() {
  const { id } = useParams();
  const { seq } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);

  const getMessages = async () => {
    const response = await getChatRoomMessageApi({ roomSeq: id, userSeq: seq });
    console.log(response);
    setMessages(response);
  }

  const handleSendMessage = () => {
    //입력 메세지: inputMessage
    if (inputMessage.trim() === '') return;

    setInputMessage('');

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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


  useEffect(() => {
    getMessages();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);


  return (
    <div className="flex flex-col bg-[#FFF7ED] max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-5 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          {tempDelivery.storeName}
        </div>
        <FaBars className="mt-2.5" />
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
        
        ref={scrollContainerRef}
      >
        {/* {messages.map((msg, index, array) => {
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
        })} */}
        <div ref={messagesEndRef} />
      </div>

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
      {currentModal === 'money' && <MoneyModal onClose={closeModal} />}
      {currentModal === 'delivery' && (
        <DeliveryModal onClose={closeModal} tempMember={tempMember} />
      )}
    </div>
  );
}

export default ChattingMainPage;
