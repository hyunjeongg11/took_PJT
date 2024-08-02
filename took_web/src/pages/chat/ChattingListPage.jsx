import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import taxiIcon from '../../assets/chat/taxiIcon.png';
import deliveryIcon from '../../assets/chat/deliveryIcon.png';
import buyingIcon from '../../assets/chat/buyingIcon.png';
import tookIcon from '../../assets/chat/tookIcon.png';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { connect } from '../../apis/chat/socket';
import { getChatListApi } from '../../apis/chat/chat'


const tempData = [
  {
    chatRoomId: 1,
    chatCategory: 'taxi',
    chatUser: '명지',
    recentChatMessage: '정산 완료 되었습니다.',
    recentChatTime: '2024-07-30 08:58:00',
    unreadMessages: 2,
  },
  {
    chatRoomId: 2,
    chatCategory: 'delivery',
    chatUser: 'BBQ 명지점',
    recentChatMessage: '메뉴 다 넣었어요!',
    recentChatTime: '2024-07-29 18:58:00',
    unreadMessages: 1,
  },

];

function formatTime(timeString) {
  const date = new Date(timeString);
  const now = new Date();
  const diff = (now - date) / 1000 / 60; // difference in minutes

  if (diff < 1) {
    return '방금 전';
  } else if (diff < 60) {
    return `${Math.floor(diff)}분 전`;
  } else if (diff < 24 * 60) {
    return `${Math.floor(diff / 60)}시간 전`;
  } else if (diff < 7 * 24 * 60) {
    return `${Math.floor(diff / (24 * 60))}일 전`;
  } else if (diff < 30 * 24 * 60) {
    return `${Math.floor(diff / (7 * 24 * 60))}주 전`;
  } else if (diff < 12 * 30 * 24 * 60) {
    return `${Math.floor(diff / (30 * 24 * 60))}개월 전`;
  } else {
    return `${Math.floor(diff / (12 * 30 * 24 * 60))}년 전`;
  }
}

function getIcon(category) {
  switch (category) {
    case 2:
      return taxiIcon;
    case 1:
      return deliveryIcon;
    case 3:
      return buyingIcon;
    case 4:
      return tookIcon;
    default:
      return null;
  }
}

function isEnglish(str) {
  return /^[A-Za-z\s]+$/.test(str);
}

function ChattingListPage() {
  const socket = new SockJS('https://i11e205.p.ssafy.io/ws');
  let stompClient = Stomp.over(socket);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // const sortedTempData = tempData.sort(
  //   (a, b) => new Date(b.recentChatTime) - new Date(a.recentChatTime)
  // );

  const handleChatRoomClick = (chatRoomId) => {
    navigate(`/chat/${chatRoomId}`);
  };

  const loadChatRooms = async () => {
    const response = await getChatListApi();
    console.log(response);
    setRooms(response);
    console.log("rooms", rooms);
  };


  useEffect(() => {
    // connect({ stompClient, loadChatRooms });
    loadChatRooms();
  }, []);

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2 flex-grow ml-11 text-left text-xl font-bold text-main">
          <span className="font-dela">took</span> 채팅
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col">
        {rooms.map((chat) => (
          <div
            key={chat.roomSeq}
            className="flex items-center px-6 py-4 border-b border-gray-200 cursor-pointer"
            onClick={() => handleChatRoomClick(chat.roomSeq)}
          >
            <img
              src={getIcon(chat.category)}
              alt={chat.category}
              className="w-11 h-11 mr-4"
            />
            <div className="flex-grow">
              <div className="flex justify-between">
                <div
                  className={`text-base font-bold ${isEnglish(chat.chatUser) ? 'font-dela mb-1' : ''}`}
                >
                  {chat.roomTitle}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTime(chat.createdAt)}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  {chat.recentChatMessage}
                </div>
                {chat.unreadMessages > 0 && (
                  <div className="text-xs font-bold text-white bg-main rounded-full px-2.5 py-0.5">
                    {chat.unreadMessages}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChattingListPage;
