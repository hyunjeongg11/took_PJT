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
import {
  updateTaxiPartyStatusApi,
  getAllTaxiPartyMembersApi,
  getTaxiPartyApi,
} from '../../apis/taxi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import TaxiChattingMenu from '../../components/taxi/TaxiChattingMenu';
import { getUserInfoApi } from '../../apis/user';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function TaxiChattingMainPage() {
  const { id: roomSeq } = useParams(); // URL에서 chatRoomId를 가져옴
  const location = useLocation();
  const { taxiSeq } = location.state || {}; // state에서 taxiSeq와 roomSeq를 가져옴
  const { seq: userSeq, setName } = useUser(); // useUser에서 userSeq를 가져옴
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [taxiStatus, setTaxiStatus] = useState('');
  const [showSettlementButton, setShowSettlementButton] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [taxiParty, setTaxiParty] = useState(null);
  const [members, setMembers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [userName, setUserName] = useState('');
  // console.log('taxiSeq:', taxiSeq);
  // console.log('roomSeq:', roomSeq);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);
  const lastDateRef = useRef('');
  console.log('taxiParty 정보: ', taxiParty);
  console.log('members 정보: ', members);

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfoApi({ userSeq });
        setUserName(userInfo.userName);
        setName(userInfo.userName);
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
      }
    };

    if (userSeq) {
      fetchUserInfo();
    }
  }, [userSeq, setName]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      user_seq: userSeq,
      userName: userName,
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

  const getUserProfileImgNo = (user_seq) => {
    const user = members.find((member) => member.userSeq === user_seq);
    return user ? user.imgNo : 1;
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

  const handleKickMember = (userName) => {
    openModal(`${userName}님을 채팅방에서\n내보내시겠습니까?`);
  };

  // const handleClickOutside = (event) => {
  //   if (
  //     actionIconsRef.current &&
  //     !actionIconsRef.current.contains(event.target)
  //   ) {
  //     setShowActionIcons(false);
  //   }
  // };

  // const handleSettingDestination = () => {
  //   navigate('/taxi/path');
  // };

  // const handleCheckDestinationList = () => {
  //   navigate('/taxi/path-list');
  // };

  // const handleChatSetting = () => {
  //   navigate('/taxi/setting');
  // };

  // const openModal = (message) => {
  //   setModalMessage(message);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // const handleMenuToggle = () => {
  //   setShowMenu(!showMenu);
  // };

  // const handleKickMember = (userName) => {
  //   openModal(`${userName}님을 채팅방에서 내보내시겠습니까?`);
  // };

  // const handleLeaveChatting = () => {
  //   openModal('채팅방을 나가시겠습니까?');
  // };

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
    await updateTaxiPartyStatusApi({ taxiSeq: taxiParty.taxiSeq });
    setTaxiStatus('BOARD');
    closeModal();
  };

  const handleConfirmDoneTaxi = async () => {
    await updateTaxiPartyStatusApi({ taxiSeq: taxiParty.taxiSeq });
    setTaxiStatus('DONE');
    setShowSettlementButton(true);
    closeModal();
  };

  const handleSettlement = () => {
    navigate('/taxi/input');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!taxiSeq || !userSeq || !roomSeq) return; // 필요한 값이 없는 경우 종료
  
    const fetchTaxiPartyData = async () => {
      try {
        const [taxiPartyData, membersData, chatUsersData, messagesData] = await Promise.all([
            getTaxiPartyApi(taxiSeq),
            getAllTaxiPartyMembersApi(taxiSeq),
            getUsersApi(taxiSeq),
            getChatRoomMessageApi({
              roomSeq: roomSeq,
              userSeq: userSeq,
            }),
          ]);
  
        setTaxiParty(taxiPartyData);
        setTaxiStatus(taxiPartyData.status);
        setMembers(membersData);
        setChatUsers(chatUsersData);
        setMessages(messagesData);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };
  
    fetchTaxiPartyData();
  }, [taxiSeq, userSeq, roomSeq]); // 필요한 의존성만 지정
  

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
    if (taxiParty && taxiParty.count === taxiParty.max) {
      const updateStatus = async () => {
        await updateTaxiPartyStatusApi({ taxiSeq: taxiParty.taxiSeq });
        setTaxiStatus('FILLED');
      };
      updateStatus();
    }
  }, [taxiParty]);

  // useEffect(() => {
  //   const handleKeyboardShow = () => {
  //     setIsKeyboardVisible(true);
  //   };
  //   const handleKeyboardHide = () => {
  //     setIsKeyboardVisible(false);
  //   };

  //   window.addEventListener('keyboardDidShow', handleKeyboardShow);
  //   window.addEventListener('keyboardDidHide', handleKeyboardHide);

  //   return () => {
  //     window.removeEventListener('keyboardDidShow', handleKeyboardShow);
  //     window.removeEventListener('keyboardDidHide', handleKeyboardHide);
  //   };
  // }, []);

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
          {members.length > 0 ? members[0].destiName : 'Loading...'}
        </div>

        <FaBars className="mt-2.5" onClick={handleMenuToggle} />
      </div>
      <div className="mt-1 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

      {showMenu && (
        <TaxiChattingMenu
          members={members}
          taxiParty={taxiParty}
          taxiStatus={taxiStatus}
          handleMenuToggle={handleMenuToggle}
          handleKickMember={handleKickMember}
          handleLeaveChatting={handleLeaveChatting}
          handleChatSetting={handleChatSetting}
        />
      )}

      {/* {showModal && (
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
      )} */}
      {/* 
      <div className="w-full px-2 py-1">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
          <img src={speaker} alt="speaker" className="w-6 h-6 mx-1" />
          <div className="text-sm text-gray-700">경로를 설정해주세요!</div>
        </div>
      </div> */}

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
                className={`flex ${
                  msg.user_seq === userSeq ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.user_seq !== userSeq && (
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
                        msg.user_seq === userSeq ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.userName}
                    </span>
                  )}
                  <div className="flex items-end">
                    {msg.user_seq === userSeq && !lastMessageFromSameUser && (
                      <div className="text-[9px] text-gray-400 mr-2 whitespace-nowrap">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                    <div
                      className={`p-2 rounded-xl shadow-md ${
                        msg.user_seq === userSeq
                          ? 'bg-main text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <div className="text-sm">{msg.message}</div>
                    </div>
                    {msg.user_seq !== userSeq && !lastMessageFromSameUser && (
                      <div className="text-[9px] text-gray-400 ml-2 whitespace-nowrap">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
                {msg.user_seq === userSeq && (
                  <div className="flex flex-col items-center ml-2">
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

      <div
        className={`absolute bottom-0 left-0 w-full ${
          isKeyboardVisible ? 'hidden' : ''
        }`}
      >
        {showSettlementButton && (
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-main text-white rounded-full"
          >
            <FaPaperPlane />
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
        <CalculatorModal
          onClose={closeModal}
          tempMember={users}
          leader={chatRoom.userSeq}
        />
      )}
      {currentModal === 'money' && (
        <MoneyModal onClose={closeModal} tempMember={users} />
      )}
      {currentModal === 'delivery' && (
        <DeliveryModal onClose={closeModal} tempMember={users} />
      )}

      {taxiParty?.master === userSeq && (
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
