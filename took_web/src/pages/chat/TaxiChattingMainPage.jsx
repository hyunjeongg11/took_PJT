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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ParticipantList from '../../components/chat/ParticipantList';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


function TaxiChattingMainPage() {
  const { id } = useParams();
  const { seq } = useUser();
  const [messages, setMessages] = useState(tempMessages);
  const [ users, setUsers ] = useState([]); 
  const [inputMessage, setInputMessage] = useState('');
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showActionIcons, setShowActionIcons] = useState(false);
  const [ currentModal, setCurrentModal ] = useState(null);
  const [showParticipantList, setShowParticipantList] = useState(false);

  const scrollContainerRef = useRef(null);
  const actionIconsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const lastDateRef = useRef('');
  const textareaRef = useRef(null);
  const stompClient = useRef(null);
  const currentSubscription = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [taxiInfo, setTaxiInfo] = useState(null);
  const chatRoom = location.state?.chatRoom || null;
  // todo : 채팅방 목록에서는 chatRoom에 roomTitle, 리더의 userSeq 담고, 
  // id에 url 파라미터로 roomSeq 담아서 보내도록 했는데, 택시 상세 페이지에서 채팅방으로 넘어갈 때도 동일하게 넘어가도록 구현 필요 ( ChattingListPage 참고)


  // const [showMenu, setShowMenu] = useState(false); // 메뉴 보이기 상태 추가
  // const [showModal, setShowModal] = useState(false); // 모달창 보이기 상태 추가
  // const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가
  const [taxiStatus, setTaxiStatus] = useState(tempTaxi.status); // 택시 상태 추가
  const [showSettlementButton, setShowSettlementButton] = useState(false); // 정산 버튼 상태 추가
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // 키보드 보이기 상태 추가
  useEffect(() => {
    const socket = new SockJS(`${SERVER_URL}/ws`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      console.log('WebSocket connected');
      enterRoom();
      loadUsers();
      // loadTaxiInfo(); // todo: 이 함수 구현 후 주석 해제하기
    });

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  });

  const loadTaxiInfo = async () => {
    // RoomSeq는 id에서 확인 가능
    // todo:  RoomSeq 가지고 택시 정보 api로 불러오기
    //
  }

  const fetchRoomMessages = async () => {
    try {
      const response = await getChatRoomMessageApi({
        roomSeq: id,
        userSeq: seq,
      });
      setMessages(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsersApi(id);
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  
  const enterRoom = () => {
    if (currentSubscription.current) {
      currentSubscription.current.unsubscribe();
    }
    currentSubscription.current = subscribeToRoomMessages(id);
    fetchRoomMessages();
  };

  function subscribeToRoomMessages(roomSeq) {
    return stompClient.current.subscribe(
      `/sub/chat/room/${roomSeq}`,
      (messageOutput) => {
        const newMessage = JSON.parse(messageOutput.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    );
  }


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
      // todo 채팅방 나갈 때 로직 더 생각해보기! 일단은 채팅방만 나가도록 구현해둠
      navigate(-1);
    }
  
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };}
  

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
          {chatRoom?.roomTitle || '채팅방'}
        </div>
        <FaBars className="mt-2.5" onClick={handleShowParticipantList} />
      </div><div className="mt-1 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

<div className="w-full px-2 py-1">
  <div
    className={`flex items-start p-2 m-1 rounded-lg shadow-md ${isCollapsed ? 'bg-opacity-80 bg-white shadow-none' : 'bg-white'}`}
  >
    <img src={speaker} alt="speaker" className="w-6 h-6 ml-1" />
    <div className="ml-2 flex-grow">
      <div className="text-sm mt-[2px]"></div>
      {!isCollapsed && (
        <div className="text-xs flex-col gap-2 justify-between flex py-2">
          <div className="mb-1.5">수령 장소
            <span className="ml-5">{deliveryInfo?.pickupPlace || ''}</span>
          </div>
          <div className="mb-1.5">주문 링크
            <span className="ml-5"><a href={deliveryInfo?.notice || ''} className="underline">함께 주문하러 가기</a></span>
          
          </div>
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
{/* 
      {/* {showMenu && (
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
      )} */}

      {/* {showModal && (
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
      )} */}
{/* 
      <div className="w-full px-2 py-1">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
          <img src={speaker} alt="speaker" className="w-6 h-6 mx-1" />
          <div className="text-sm text-gray-700">경로를 설정해주세요!</div>
        </div>
      </div> */} */}

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

      {showParticipantList && (
        <ParticipantList
          participants={users}
          onClose={handleCloseParticipantList}
          onSignOut={leaveRoom}
          leaderSeq={chatRoom.userSeq}
        />
      )}
    </div>
  );
}


export default TaxiChattingMainPage;
